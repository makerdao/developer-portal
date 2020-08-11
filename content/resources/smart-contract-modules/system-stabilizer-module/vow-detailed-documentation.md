---
description: The Maker Protocol's Balance Sheet
---

# Vow - Detailed Documentation

* **Contract Name:** vow.sol
* **Type/Category:** DSS —&gt; System Stabilizer Module
* \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
* \*\*\*\*[**Contract Source**](https://github.com/makerdao/dss/blob/master/src/vow.sol)
* \*\*\*\*[**Etherscan**](https://etherscan.io/address/0xa950524441892a31ebddf91d3ceefa04bf454466)

## 1. Introduction \(Summary\)

The `Vow` contract represents the Maker Protocol's balance sheet. In particular, the `Vow` acts as the recipient of both the system surplus and system debt. Its main functions are to cover deficits via debt \(`Flop`\) auctions and discharge surpluses via surplus \(`Flap`\) auctions.

![Vow.sol Contract Interaction](../../.gitbook/assets/screen_shot_2019-11-04_at_5.34.15_pm.png)

**Pictured:**

* Inter-contract calls necessary for the module function

**Not pictured:**

* `cage` calls from `Vow` to `Flap` and `Flop`
* Auction and user auction interactions
* Governance calls / interactions

## 2. Contract Details

### **Vow \(Glossary\)**

* `sin`: the system debt queue.
* `Sin`: the total amount of debt in the queue.
* `Ash`: the total amount of on-auction debt.
* `wait`: length of the debt queue
* `sump`: debt auction bid size, i.e. the fixed debt quantity to be covered by any one debt auction
* `dump`: debt auction lot size, i.e. the starting amount of MKR offered to cover the `lot`/`sump`
* `bump`: surplus auction lot size, i.e. the fixed surplus quantity to be sold by any one surplus auction
* `hump`: surplus buffer, must be exceeded before surplus auctions are possible

**Other terms included in the above diagram:**

* `move`: transfers stablecoin between users.
* `kick`: starts an auction.

### **Liquidations Manager**

* **Fess** - Pushes bad debt to the auctions queue \(add debt to the queue\).
* **Flog** - Release queued debt for auction \(realize debt from the queue\).
* **Heal** - `vow` calls `heal` on the `vat` contract to cancel out surplus and debt. \(Optimize debt buffer \(`vat.heal`\)\).
* **Kiss** - Cancels out surplus and on-auction debt. Release on-auction debt and Heal \(`vat.heal`\).
* **Flap** - Trigger a surplus auction \(`flapper.kick`\)
* **Flop** - Trigger a deficit auction \(`flopper.kick`\)

#### **Authorization**

The `vow` contract calls `kick` on `flop` and `flap` to start an auction \(debt and surplus auctions, respectively\).

* `Flopper` \(Debt auctions\) - If the deficit is not covered in the forward auction portion of the `flip` auction, then debt auctions are used for getting rid of the Vow’s **debt** by auctioning off MKR for a fixed amount of Dai. Once the auction ends, the `Flop`per will then send the received Dai to the `Vow` in order to cancel its debt. Lastly, the `Flop`per will mint the MKR for the winning bidder.
* `Flapper` \(Surplus auctions\) - These are used for getting rid of the `Vow`’s **surplus** by auctioning off a fixed amount of internal Dai for MKR. Once the auction ends, the `Flap`per burns the winning MKR bid and sends internal Dai to the winning bidder.

#### System **Data**

* **System config**

  `Vow.wait` - Flop delay `Vow.sump` - Flop fixed bid size

  `Vow.dump` - Flop starting lot size `Vow.bump` - Flap fixed lot size `Vow.hump`- Surplus buffer

#### Debt \(**SIN\) Queue**

When a Vault is liquidated \(`bite` - [documentation](https://docs.makerdao.com/smart-contract-modules/core-module/cat-detailed-documentation#bite-bytes32-ilk-address-urn)\), the seized debt is put in a queue for an auction in a `Vow` \(labeled as `sin[timestamp]`- the system debt unit\). This occurs at the block timestamp of the `bite` action. It can be released for auction via `flog` \(`flog` releases queued debt for the auction\) once the allotted `Vow.wait` \(the flop delay\) time has expired.

The `Sin` is stored when it's in the debt queue, but the debt available to auction isn't explicitly stored anywhere. This is because the debt that is eligible for auction is derived by comparing the `Sin` \(i.e. debt on the holding queue\) with the dai balance of the `Vow` as recorded in `Vat.dai[Vow]`. For instance, if `Vat.sin[Vow]` is greater than the sum of `Vow.Sin` and the `Ash` \(debt currently on auction\), then the difference may be eligible for a `Flop` auction.

**Notes:**

* In the case of when a `cat.bite` / `vow.fess` is executed, the debt `tab` is added to `sin[now]` and `Sin`, which blocks that `tab` amount to be sent to the `flop` auction and all of the DAI is recovered with a `flip` auction. In theory, unblocking the `tab` amount in the `Sin` shouldn't be necessary, but in practice it actually is. If this debt is not unblocked, then when we have a real need to send a `flop` auction, we might have a big `Sin` that blocks it. To summarize, this means that each registry of `sin[era]` that has an amount &gt; 0 should be `flog`'ed before kicking a `flop` auction \(this is because in order to kick the whole thing, you need every register to be 0, otherwise, it would be blocking debt\).
  * Each `sin[era]` isn’t required to be a single `bite`, it will group all the `bite`’s that are in the same Ethereum block together.
  * The `auction-keeper` will `flog` every `era` with positive `Sin` if the `woe`+ `Sin` &gt;= `sump`, where `woe` = `vat.sin[vow]` - `vow.Sin` - `vow.Ash`**.** Where the components within `vat.sin(vow)` - `vow.Sin` - `vow.Ash` are defined as:
    * **`vat.sin(vow)`**- total bad debt
    * **`vow.Sin`** - debt blocked
    * **`vow.Ash`** - debt in auctions
* `Vow.sin` records individual portions of debt \(marked with a timestamp\). These are not directly auctioned off, but cleared when `flog` is called.
* If the `Sin` is not covered by holding a `flip` auction within the designated wait time \(`tau`\), the `Sin` “matures” and gets marked as bad debt to the `Vow`. This bad debt can be covered through a debt auction \(`flop`\) when it exceeds a minimum value \(the `lot` size\). In short, the time between the debt being added to the `sin[]` queue and becoming "mature" \(when it `flog`s off the queue and is eligible for `Flop` auction\) is the amount of time that `Flip` auction has to clear that debt. This is due to the fact that when a `Flip` auction receives DAI, it decreases the `Vow`'s DAI balance in the `Vat`.
* **Note:** In this case, there is a risk that a circumstance can occur where the `Vow.wait` is different than the `Flip.tau`. The main risk being related to `wait` &lt; `tau`, which would result in debt auctions running before the associated seized-collateral auctions could complete.

**Overall `Sin` can affect the system in the following way:**

1. There can be separate `Vow`s each with their own `sin`s
2. In the case of an upgrade, if we remove a `Vow` that has `sin`, this can create untracked bad debt in the system.

#### **Accounting**

`Vow.Sin` - This calculates the total queued debt in the system. `Vow.Ash`- This calculates the total on-auction debt.

## 3. Key Mechanisms & Concepts

It is important to note that the Maker Protocol will deviate from its equilibrium. This occurs when it receives system debt and system surplus through the collateral auctions and Vault stability fee accumulation. The `Vow` contract contains the logic to trigger both the debt \(`flop`\) and surplus \(`flap`\) auctions, which work to correct the system’s monetary imbalances.

**Summary**

* **System Debt:** In the case where Vaults are bitten \(liquidated\), their debt is taken on by the `Vow` contract as a `Sin` \(the system debt unit\). The `Sin` amount is then placed in the `Sin` queue. **Note:** When the `Sin` is not covered by a `flip` auction \(within the dedicated `wait` time, the `Sin` is considered to have bad debt to the `Vow`. This bad debt is then covered through a debt auction \(`flop`\) when it exceeds a minimum value \(the `lot` size\).
* **System Surplus:** Occurs from stability fee accumulation, resulting in additional internal Dai in the `Vow`. This surplus is then discharged through a surplus auction \(`flap`\).

## 4. Gotchas \(Potential source of user error\)

* When the `Vow` is upgraded, there are multiple references to it that must be updated at the same time \(`End`, `Jug`, `Pot`\).
* The `Vow` is the only user with a non-zero `Sin` balance \(not a `vat` invariant as there can be multiple `Vow`s\).
* Ilk storage is split across the `Vat`, `Jug`, `Pot` and `Vow` modules. The `cat` also stores the liquidation penalty and maximum auction size.
* A portion of the Stability Fee is allocated for the Dai Savings Rate \(DSR\) by increasing the amount of `Sin` in the `Vow` at every `Pot.drip( )` call.
* Setting an incorrect value for `vow` can cause the surplus to be lost or stolen.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

#### Vault Liquidation

* A failure mode could arise when no actors call `kiss`, `flog` or `heal` to reconcile/queue the debt.

#### Auctions

* A failure mode could arise if a user does not call `flap`or `flop` to kick off auctions.
* `Vow.wait`, when set too high \(`wait` is too long\), the `flop` auctions can no longer occur. This provides a risk of undercollateralization.
* `Vow.wait`, when set too low, can cause too many `flop` auctions, while preventing `flap` auctions from occurring.
* `Vow.bump`, when set too high, can result in no `flap` auctions being possible. Thus, if no `flap` auction takes place, there will be no MKR bidding as part of that process and, accordingly, no automated MKR burn as a result of a successful auction.
* `Vow.bump`, when set too low, results in `flap` auctions not being profitable for participants \(`lot` size is worth less than gas cost\). Thus, no MKR will be bid during a `flap` auction and, as a result, there will be no automated MKR burn.
* `Vow.sump`, when set too high, no `flop` auctions are possible. This results in the system not being able to recover from an undercollateralized state.
* `Vow.sump`, when set too low, `flop` auctions are not profitable for participants \(where the `lot` size is worth less than gas cost\). This results in MKR inflation due to automated MKR minting.
* `Vow.dump`, when set too high, `flop` auctions risk not being able to close or mint a large amount of MKR, creating a risk of MKR dilution and the possibility of a governance attack.
* `Vow.dump`, when set too low, `flop` auctions have to be `kick`ed many times before they will be interesting to keepers.
* `Vow.hump`, when set too high, the `flap` auctions would never occur. If a `flap` auction does not occur, there is no sale of surplus, and thus, no burning of bid MKR.
* `Vow.hump`, if set too low, can cause surplus to be auctioned off via `flap` auctions before it is used to cancel `sin` from liquidations, necessitating `flop` auctions and making the system run inefficiently.

