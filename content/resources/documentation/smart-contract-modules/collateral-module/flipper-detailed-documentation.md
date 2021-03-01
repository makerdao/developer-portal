---
title: Flipper
description: The Maker Protocol's Collateral Auction House
group: smart-contracts
components:
  - auctions
  - system stabilizer
  - flipper
tags:
  - auctions
slug: flipper-detailed-documentation
contentType: documentation
parent: introduction-to-collateral-module
---

# Flipper

- **Contract Name:** flip.sol
- **Type/Category:** DSS —&gt; Collateral Auction Module
- \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
- \*\*\*\*[**Contract Source**](https://github.com/makerdao/dss/blob/master/src/flip.sol)
- **Etherscan**
  - \*\*\*\*[**Flip ETH-A**](https://etherscan.io/address/0xF32836B9E1f47a0515c6Ec431592D5EbC276407f)
  - \*\*\*\*[**Flip BAT-A**](https://etherscan.io/address/0xf7c569b2b271354179aacc9ff1e42390983110ba#code)

## 1. Introduction (Summary)

**Summary:** Collateral Auctions are used to sell collateral from Vaults that have become undercollateralized in order to preserve the collateralization of the system. The Cat sends bitten collateral to the Flip module to be auctioned off to keepers. The collateral auction has two phases: `tend` and `dent`.

![Flip Interactions with the Maker Protocol ](/images/documentation/screen-shot-2019-11-17-at-2.01.16-pm.png)

## 2. Contract Details

#### Flipper (Glossary)

- `wards [usr: address]`, `rely`/`deny`/`auth` - Auth mechanisms
- `Bid` - State of a specific Auction {`bid`, `lot`, `guy`, `tic`, `end`, `usr`, `gal`, `tab`}
  - `bid` - Bid amount (DAI)/ DAI paid
  - `lot` - quantity up for auction / collateral gems for sale
  - `guy` - high bidder (address)
  - `tic` - Bid expiry
  - `end` - when the auction will finish / max auction duration
  - `usr` - address of the Vault being auctioned. Receives gems during the `dent` phase
  - `gal` - recipient of auction income / receives dai income (this is the Vow contract)
  - `tab` - total dai wanted from the auction / total dai to be raised (in flip auction)
- `bids[id: uint]` - storage of all bids
- `vat` - storage of the Vat's address
- `ilk` - id of the Ilk for which the Flipper is responsible
- `beg` - minimum bid increase (default: 5%)
- `ttl` - bid duration (default: 3 hours)
- `tau` - auction length (default: 2 days)
- `kicks` - Total auction count, used to track auction `id`s
- `kick` - function used by `Cat` to start an auction / Put collateral up for auction
- `tick` - restart an auction if there have been 0 bids and the `end` has passed
- `tend` - first phase of an auction. Increasing Dai `bid`s for a set `lot` of Gems
- `dent` - second phase of an auction. Set Dai `bid` for a decreasing `lot` of Gems
- `file` - function used by governance to set `beg`, `ttl`, and `tau`
- `deal` - claim a winning bid / settles a completed auction
- `yank` - used during Global Settlement to move `tend` phase auctions to the `End` by retrieving the collateral and repaying dai to the highest bidder.
- `claw`: reduces the amount of litter in the Cat's box

### **Parameters Set By Governance (through `file`)**

- `beg`
- `ttl`
- `tau`

Also, `Cat`'s `dunk` and `chop` also inform how `Flip` works as the `dunk` becomes the `Bid.lot` and influences, along with the `chop`, the `Bid.tab`.

### Parameters Not Set By Governance

- `vat`
- `ilk`

Both of these are set in the constructor and cannot be changed. If the Vat address is changed and each time a new collateral is added to the system, a new Flip will need to be deployed.

### Authorizations

The Flipper must be `Vat.wish`'ed on by the `Cat` in order to `flux` during `kick`.

The `End` must be `rely`'ed on by the Flipper to allow for `yank`.

The `Cat` must be `rely`'ed on by the Flipper to allow for `kick`.

## 3. Key Mechanisms & Concepts

The Flip auction process begins with Maker Governance voters determining the collateral's minimum collateralization ratio (`Spot.Ilk.mat`) which is then tested against the Vault's state (collateral price, total debt owed) to determine whether the Vault is safe (See `Cat` documentation for more information on the `bite` process). The last step of a `bite` is to `kick` a `Flip` auction for that specific collateral. Note that the liquidation penalty gets added to the `tab` when the `Flip` auction gets kicked. This only determines when the auction switches from `tend` to `dent`. However, this amount is not added to the total debt amount (only to the part that is being **partially liquidated**) unless everything has in fact been liquidated.

Governance also determines the size of the `lot` (where a `lot` is the quantity of collateral gems up for auction in a `flip` auction) when a Vault gets bitten. This allows for partial liquidations of large Vaults. Partial liquidations make auctions more flexible and less likely to impact the base collateral price by creating a single large auction. They also allow large Vaults to become safe again if the price recovers before the Vault is fully liquidated. Keepers will want to keep this in mind when biting unsafe Vaults as well since they will have a choice to start one or many partial liquidation auctions.

Starting in the `tend`-phase, bidders compete for a fixed `lot` amount of Gem with increasing `bid` amounts of Dai. Once `tab` amount of Dai has been raised, the auction moves to the `dent`-phase. The point of the `tend` phase is to raise Dai to cover the system's debt.

During the `dent`-phase bidders compete for decreasing `lot` amounts of Gem for the fixed `tab` amount of Dai. Forfeited Gem is returned to the liquidated Urn for the owner to retrieve. The point of the `dent` phase is to return as much collateral to the Vault holder as the market will allow.

Once the auction's last bid has expired or the auction itself has reached the `end` anyone can call `deal` to payout the highest bidder (`Bid.guy`). This moves Gem's from the Flipper's balance in the Vat to the bidder's balance.

![A diagram detailing the interactions a user has with Flipper, Cat and the Vow.](/images/documentation/flip_auction_diagram_interaction.png)

## 4. Gotchas (Potential Source of User Error)

#### **Keepers**

In the context of running a keeper (more info [here](https://github.com/makerdao/developerguides/tree/master/keepers)) to perform bids within an auction, a primary failure mode would occur when a keeper specifies an unprofitable price for the collateral.

- This failure mode is due to the fact that there is nothing the system can do to stop a user from paying significantly more than the fair market value for the token in an auction (this goes for all auction types, `flip, flop, and flap`).
- Keepers that are performing badly are primarily at risk during the `dent` phase since they could return too much collateral to the original Vault and end up overpaying (i.e. pay too much Dai (`bid`) for too few gems (`lot`)).

#### **Bidding Requirements during an auction**

During `tend`, `bid` amounts will increase by a `beg` percentage with each new `tend`. The bidder must know the auction's `id`, specify the right amount of `lot` for the auction, bid at least `beg`% more than the last bid but not more than `tab` and must have a sufficient `Vat.dai` balance.

During `dent`, `lot` amounts will decrease by a `beg` percentage with each new `dent`. The bidder must know the auction's `id`, specify the right amount of `bid` for the auction and offer to take `beg`% less `lot` than the last bid.

#### **Placing Bids**

When a `tend` bid is beaten out by another bidder, the new winner's internal DAI balance is used to refund the previous winning bidder. When a `dent` bid is beaten out by another bidder, the Flipper's gem balance is used to refund the Vault holder. Once placed, bids cannot be canceled.

**Illustration of the bidding flow:**

1. Cat `kick`s a new Flip Auction. The Cat emits a `bite` event with the Flipper's address and the auction `id`. The Flipper emits a `kick` event with the `id` and other auction details.

Start `tend` auction:

1. Bidder 1 makes a bid that increases the `bid` size by `beg`. Bidder 1's DAI balance in the Vat is decreased by `bid` and the Vow's DAI balance in the Vat is increased by `bid`.
2. Bidder 2 makes a bid that increases Bidder 1's `bid` by at least `beg`. Bidder 2's DAI balance in the Vat is decreased by `bid` and Bidder 1's DAI balance in the Vat is increased by `bid` (thereby refunding Bidder 1 for their now-losing bid). Bidder 2's DAI balance in the Vat is decreased by `bid` - Bidder 1's `bid` and the `Vow`'s DAI balance is increased by the same number. `tic` is reset to `now` + `ttl`
3. Bidder 1 makes a bid that increases Bidder 2's `bid` by at least `beg`. Bidder 1's DAI = `Vat.dai[bidder1]` - Bidder 2's previous `bid`; Bidder 2's DAI = `Vat.dai[bidder2]` + Bidder 2's previous `bid`. Then Bidder 1's DAI = `Vat.dai[bidder1] - (bid - Bidder 2's bid)` and Vow's DAI = `Vat.dai[bidder1] + (bid - Bidder 2's bid)`. `tic` is reset to `now` + `ttl`
4. Once a new `bid` comes in that is equal to the `tab` the `tend` phase is complete.

Start `dent` auction:

**Note:** _This phase must start before `tic` expires and before `bid.end` is passed._

1. Bidder 2 (and all the other bidders within the auction) decide it is no longer worth it to continue to increase their `bid`s, so they stop bidding. Once the `Bid.tic` expires, Bidder 1 calls `deal` and the gem tokens are sent to their Vat balance.

**Note:** An auction can also end in the `tend` phase by not reaching `tab` before the `tic` or `end` are reached. If this happens, then the winning bidder is awarded using the `deal` function and the difference between the final `bid` and the `tab` stays as bad debt in the `Vow` to be dealt with during a `Flop` auction.

#### The End

In the case of Global Settlement, the `End` is able to call `yank` on the Flipper. `Yank` closes a `tend`-phase auction by returning the `guy`'s Dai bid and moving the Gems from the Flipper to the `End`. `dent`-phase auctions can continue to the `deal` phase as they have already raised the necessary Dai and are in the process of returning Gems to the original Vault holder.

## 5. Failure Modes (Bounds on Operating Conditions & External Risk Factors)

### Bounds on Operating Conditions

Because `Flip.tend` compares the bidder's `bid` with the previous `bid * beg`, it will compare the two numbers at 10^63 precision (`rad * wad`). This means that any `bid` that is greater than 115,792,089,237,316 will cause an overflow. Governance should endeavour to not set `beg` or `lot` (via `Cat.ilks[ilk].dunk`) so that it is likely that an auction keeper would end up `bid`'ding that much DAI during the `tend` phase. This is very unlikely so long as the target price of Dai remains 1 USD, but is included here for awareness.

#### 1. [**See System Stabilizer Module Documentation**](/documentation/introduction-to-system-stabilizer-module)\*\*\*\*

#### 2. Last Minute Auction/Low Keeper Participation Risks

**Auction Grinding**

Auction grinding allows an attacker to generate debt, allow their Vault to be bitten, win their own auction to get their collateral back at a discount. This type of failure is most possible when the liquidation penalty is set too low.

For the full details about this risk, reference @livnev's Paper [here](https://github.com/livnev/auction-grinding/blob/master/grinding.pdf).
