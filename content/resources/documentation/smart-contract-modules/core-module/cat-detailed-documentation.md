---
title: Cat - Detailed Documentation
description: The Maker Protocol's Liquidation Agent
group: smart-contracts
components:
  - auctions
tags:
  - liquidations
slug: cat-detailed-documentation
contentType: documentation
parent: introduction-to-core-module
---

# Cat - Detailed Documentation

- **Contract Name:** cat.sol
- **Type/Category:** DSS
- [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
- [**Contract Source**](https://github.com/makerdao/dss/blob/master/src/cat.sol)
- [**Etherscan**](https://etherscan.io/address/0x78f2c2af65126834c51822f56be0d7469d7a523e)

## 1. Introduction \(Summary\)

The `Cat` is the system's liquidation agent, it enables keepers to mark positions as unsafe and sends them to auction.

![](/images/documentation/screen-shot-2019-11-17-at-2.22.55-pm.png)

## 2. Contract Details

### Glossary \(Cat\)

#### **Math**

- `mul(uint, uint)`/`rmul(uint, uint)` - will revert on overflow or underflow
- `bite(bytes32, address)` will revert if `lot` or `art` are larger than or equal to 2^255.
- `bite` will not leave a Vault with debt and no collateral.

#### **Auth**

- `wards` are allowed to call protected functions (Administration and `cage()`)

#### **Storage**

- `ilks` stores `Ilk` structs
  - `Ilk` is the struct with the address of the collateral auction contract (`flip`), the penalty for that collateral to be liquidated (`chop`) and the maximum size of collateral that can be auctioned at once (`dunk`).
- `live` must be `1` for the `Cat` to `bite`. (see `cage` in mechanisms)
- `box` the limit on the debt and penalty fees available for auction. [RAD]
- `dunk` ("debt chunk") amount of debt plus penalty fee per auction, in Dai. [RAD]
- `vat` address that conforms to a `VatLike` interface (see [`vat` documentation](https://docs.makerdao.com/smart-contract-modules/core-module/vat-detailed-documentation) for more info). It is set during the constructor and **cannot be changed**.
- `vow` address that conforms to a `VowLike` interface (see [`vow` documentation](https://docs.makerdao.com/smart-contract-modules/system-stabilizer-module/vow-detailed-documentation) for more info).

The values of all parameters here (except `vat`) are changeable by an address that is `rely`ed on. For instance, the `End` module should be `auth`ed to allow for it to call `cage()` and update `live` from 1 to 0. Governance (through an `auth`ed address) should be able to add collateral types to `Cat`, update their parameters, and change the `vow`.

#### **Unsafe**

`bite` can be called at anytime but will only succeed if the Vault is unsafe. A Vault is unsafe when its locked collateral (`ink`) times its collateral's liquidation price (`spot`) is less than its debt (`art` times the fee for the collateral `rate`). Liquidation price is the oracle-reported price scaled by the collateral's liquidation ratio.

#### **Events**

- `Bite`: emitted when a `bite(bytes32, address)` is successfully executed. Contains:
  - `ilk`: Collateral
  - `urn`: Vault address
  - `ink`: see `lot` in `bite`
  - `art`: see `art` in `bite`
  - `tab`: see `tab` in `bite`
  - `flip`: address of the auction contract
  - `id`: ID of the auction in the `Flipper`

## 3. Key Mechanisms & Concepts

#### **cage()**

- `auth`
- sets `live` to 0 (prevents `bite`). See [`End` documentation ](https://docs.makerdao.com/smart-contract-modules/shutdown/end-detailed-documentation)for further description.
- Once `live=0` it cannot be set back to 1.

#### **bite\(bytes32 ilk, address urn\)**

- `bytes32 ilk` parameter represents the collateral type that is being bitten.
- `address urn` the address that identifies the Vault being bitten.
- returns `uint id` which is the ID of the new auction in the `Flipper`.
- `bite` checks if the Vault is in an unsafe position and if it is, it starts a Flip auction for a piece of the collateral to cover a share of the debt.

The following is a line-by-line explanation of what `bite` does.

```solidity
function bite(bytes32 ilk, address urn) public returns (uint id) {
  // Get the rate, spot, and dust from the ilk in the vat.
  (,uint256 rate,uint256 spot,,uint256 dust) = vat.ilks(ilk);
  // get the ink and art from the urn from the Vat.
  (uint256 ink, uint256 art) = vat.urns(ilk, urn);

  // ensure End has not happened
  require(live == 1);
  // require the Vault to be unsafe (see definition above).
  require(spot > 0 && mul(ink, spot) < mul(art, rate), "Cat/not-unsafe");

    // Loads the `ilk` data into memory as an optimization.
  Ilk memory milk = ilks[ilk];
  // Declares a variable that will be assigned in the following scope.
  uint256 dart;

    // Defines a new scope, this prevents a stack too deep error in solidity
  {
        // Calculate the available space in the box
    uint256 room = sub(box, litter);

    // test whether the remaining space in the litterbox is dusty
    require(litter < box && room >= dust, "Cat/liquidation-limit-hit");

        // Sets the amount of debt to be covered by the auction.
    // (smaller of either the amount of normalized debt, maximum debt chunk size, or space in the box)
    // divided by the rate, divided by the penalty fee.
    dart = min(art, mul(min(milk.dunk, room), WAD) / rate / milk.chop);
  }

    // Takes the minimum of the collateral balance or the
  // amount of collateral represented by the debt to be covered
  uint256 dink = min(ink, mul(ink, dart) / art);

    // Prevents no-collateral auctions
  require(dart >  0      && dink >  0     , "Cat/null-auction");
  // Protects against int overflow when converting from uint to int
  require(dart <= 2**255 && dink <= 2**255, "Cat/overflow"    );

    // Called in this way, vat.grab will:
  // - Remove the dink and the dart from the bitten Vault (urn)
  // - Adds the collateral (dink) to the Cat's gem
  // - Adds the debt (dart) to the Vow's debt (vat.sin[vow])
  // - Increases the total unbacked dai (vice) in the system
  // This may leave the CDP in a dusty state
  vat.grab(
    ilk, urn, address(this), address(vow), -int256(dink), -int256(dart)
  );
  // Adds the debt to the debt-queue in Vow (Vow.Sin and Vow.sin[now])
  vow.fess(mul(dart, rate));

  { // Avoid stack too deep
    // This calcuation will overflow if dart*rate exceeds ~10^14,
    // i.e. the maximum dunk is roughly 100 trillion DAI.
    // Multiplies the accumulated rate by the normalized debt to be covered
    // to get the total debt tab (debt + stability fee + liquidation penalty) for the auction.
    uint256 tab = mul(mul(dart, rate), milk.chop) / WAD;
    // Updates the amount of litter in the box
    litter = add(litter, tab);

        // Calls kick on the collateral's Flipper contract.
    // tab is the total debt to be sent to auction
    // gal: address(vow) sets up the Vow as the recipient of the Dai income for this auction
    // bid: 0 indicates that this is the opening bid
    // This moves the collateral from the Cat's gem to the Flipper's gem in the Vat
    id = Kicker(milk.flip).kick({
        urn: urn,
        gal: address(vow),
        tab: tab,
        lot: dink,
        bid: 0
    });
  }

  // Emits an event about the bite to notify actors (for instance keepers) about the new auction
  emit Bite(ilk, urn, dink, dart, mul(dart, rate), milk.flip, id);
}
```

#### **Administration**

Various file function signatures for administering `Cat`:

- Setting new vow (`file(bytes32, address)`)
- Setting new collateral (`file(bytes32, bytes32, address)`)
- Setting penalty or dunk size for collateral (`file(bytes32, bytes32, uint)`)

### **Usage**

The primary usage will be for keepers to call `bite` on a Vault they believe to be unsafe in order to start the auction process.

## 4. Gotchas \(Potential source of user error\)

- When the `Cat` is upgraded, there are multiple references to it that must be updated at the same time (`End`, `Vat.rely`, `Vow.rely`). It must also rely on the `End`, the system's `pause.proxy()`
- A `Vat` upgrade will require a new `Cat`
- The Cat stores each `Ilk`'s liquidation penalty and maximum auction size.
- Each ilk will be initiated with the `file` for their `Flipper`; however, auctions cannot start until `file` is also called to set the `chop` and the `dunk`. Without these auctions for either 0 gems or 0 dai would be created by calling `bite` on an unsafe Vault.
- `bite` needs to be called `n` times where `n = urn.ink / ilks[ilk].dunk` if `n > 1`. This allows for the possibility that the Vault becomes safe between `bite` calls either through increased collateral (in value or quantity), or decreased debt.
- Calling `bite` returns the auction `id` and emits and event with the `id`. This is required to bid in the `Flipper` on the auction.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

#### **Coding Error**

A bug in the `Cat` could lead to loss (or locking) of Dai and Collateral by assigning it to an address that cannot recover it (i.e. a bad Vow address or an incorrectly programmed Flipper). The main coding failure mode of `Cat` is if it has a bug that causes auctions to cease to function. This would require upgrading the system to a corrected `Cat` contract. If there is a bug in `Cat` that reverts on `cage` then it would cause Shutdown could fail (until a correct `Cat` is launched).

#### **Feeds**

The `Cat` relies indirectly on the price Feeds as it looks to the `Vat`'s tracking of the collateral prices (`spot`) to determine Vault safety. If this system breaks down, it could lead to theft of collateral (too low `spot`) or unbacked Dai (incorrectly high `spot`).

#### **Governance**

Governance can authorize and configure new collaterals for `Cat`. This could lead to misconfiguration or inefficiencies in the system. Misconfiguration could cause `Cat` not to operate properly or at all. For instance, if an `Ilk.dunk` is set to be greater than 2 255 could allow for very, very large Vaults to be un-`bite`-able.

Inefficiencies in the `dunk` or `chop` could affect auctions. For instance, a `dunk` that is too large or too small could lead to disincentives for keepers to participate in auctions. A `chop` that is too small would not sufficiently dis-incentivize risky Vaults and too large could lead to it being converted to bad debt. Further discussion of how the parameters could lead to system attacks is described in this [Auction Grinding paper](https://github.com/livnev/auction-grinding/blob/master/grinding.pdf).

#### **Flipper**

The `Cat` relies on an external Flipper contract to run the auction and moves the collateral from the `Cat` to the `Flipper` contracts in the `Vat`. A faulty collateral auction contract could result in the loss of collateral or dai or non-functioning auctions.
