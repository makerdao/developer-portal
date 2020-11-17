---
title: Rates Module
description: The Maker Protocol's Rate Accumulation Mechanism
group: smart-contracts
components:
  - dsr
  - vaults
tags:
  - dsr
  - vaults
slug: introduction-to-rates-module
contentType: documentation
root: true
---

# Rates Module

* **Module Name:** Rates Module
* **Type/Category:** Rates
* [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki#system-architecture)
* **Contract Sources:**
  * [**Jug**](https://github.com/makerdao/dss/blob/master/src/jug.sol)
  * [**Pot**](https://github.com/makerdao/dss/blob/master/src/pot.sol)

## Introduction

A fundamental feature of the MCD system is to accumulate stability fees on Vault debt balances, as well as interest on Dai Savings Rate \(DSR\) deposits.

The mechanism used to perform these accumulation functions is subject to an important constraint: accumulation must be a constant-time operation with respect to the number of Vaults and the number of DSR deposits. Otherwise, accumulation events would be very gas-inefficient \(and might even exceed block gas limits\).

For both stability fees and the DSR, the solution is similar: store and update a global "cumulative rate" value \(per-collateral for stability fees\), which can then be multiplied by a normalized debt or deposit amount to give the total debt or deposit amount when needed.

**This can be described more concretely with mathematical notation:**

* Discretize time in 1-second intervals, starting from _t_\_0;
* Let the \(per-second\) stability fee at time _t_ have value _F\_i_ \(this generally takes the form 1+_x_, where _x_ is small\)
* Let the initial value of the cumulative rate be denoted by _R_\_0
* Let a Vault be created at time _t\_0_ with debt _D_\_0 drawn immediately; the normalized debt _A_ \(which the system stores on a per-Vault basis\) is calculated as _D_\_0/_R_\_0

**Then the cumulative rate** _**R**_ **at time** _**T**_ **is given by:**

$$
R(t) \equiv R_0 \prod_{i=t_0 + 1}^{t} F_i = R_0 \cdot F_{t_0 + 1} \cdot F_{t_0 + 2} \cdots F_{t-1} \cdot F_t
$$

And the total debt of the Vault at time _t_ would be:

$$
D(t) \equiv A \cdot R(t) = D_0 \prod_{t=1}^{T} F_i
$$

In the actual system, _R_ is not necessarily updated with every block, and thus actual _R_ values within the system may not have the exact value that they should in theory. The difference in practice, however, should be minor, given a sufficiently large and active ecosystem.

Detailed explanations of the two accumulation mechanisms may be found below.

## Stability Fee Accumulation

### Overview

Stability fee accumulation in MCD is largely an interplay between two contracts: the [Vat](https://www.notion.so/makerdao/Vat-Core-Accounting-5314995c98e544c4aaa0ebedb01988ad) \(the system's central accounting ledger\) and the [Jug](https://docs.makerdao.com/smart-contract-modules/rates-module/jug-detailed-documentation) \(a specialized module for updating the cumulative rate\), with the [Vow](https://docs.makerdao.com/smart-contract-modules/system-stabilizer-module/vow-detailed-documentation) involved only as the address to which the accumulated fees are credited.

![](/images/documentation/rates.png)

The Vat stores, for each collateral type, an `Ilk` struct that contains the cumulative rate \(`rate`\) and the total normalized debt associated with that collateral type \(`Art`\). The Jug stores the per-second rate for each collateral type as a combination of a `base` value that applies to all collateral types, and a `duty` value per collateral. The per-second rate for a given collateral type is the sum of its particular `duty` and the global `base`.

Calling `Jug.drip(bytes32 ilk)` computes an update to the ilk's `rate` based on `duty`, `base`, and the time since `drip` was last called for the given ilk \(`rho`\). Then the Jug invokes `Vat.fold(bytes32 ilk, address vow, int rate_change)` which:

* adds `rate_change` to `rate` for the specified ilk
* increases the [Vow](https://www.notion.so/makerdao/Vow-Detailed-Documentation-7f3074dd92514db59efb6f128919b2c5)'s surplus by `Art*rate_change`
* increases the system's total debt \(i.e. issued Dai\) by `Art*rate_change`.

Each individual Vault \(represented by an `Urn` struct in the Vat\) stores a "normalized debt" parameter called `art`. Any time it is needed by the code, the Vault's total debt, including stability fees, can be calculated as `art*rate` \(where `rate` corresponds to that of the appropriate collateral type\). Thus an update to `Ilk.rate` via `Jug.drip(bytes32 ilk)` effectively updates the debt for all Vaults collateralized with `ilk` tokens.

### Example With Visualizations

Suppose at time 0, a Vault is opened and 20 Dai is drawn from it. Assume that `rate` is 1; this implies that the stored `art` in the Vault's `Urn` is also 20. Let the `base` and `duty` be set such that after 12 years, `art*rate` = 30 \(this corresponds to an annual stability of roughly 3.4366%\). Equivalently, `rate` = 1.5 after 12 years. Assuming that `base + duty` does not change, the growth of the effective debt can be graphed as follows:

![](/images/documentation/debt_initial.png)

Now suppose that at 12 years, an additional 10 Dai is drawn. The debt vs time graph would change to look like:

![](/images/documentation/debt_second_draw.png)

What `art` would be stored in the Vat to reflect this change? \(hint: _not_ 30!\) Recall that `art` is defined from the requirement that `art * rate` = Vault debt. Since the Vault's debt is known to be 40 and `rate` is known to be 1.5, we can solve for `art`: 40/1.5 ~ 26.67.

The `art` can be thought of as "debt at time 0", or "the amount of Dai that if drawn at time zero would result in the present total debt". The graph below demonstrates this visually; the length of the green bar extending upwards from t = 0 is the post-draw `art` value.

![](/images/documentation/debt_projected.png)

Some consequences of the mechanism that are good to keep in mind:

* There is no stored history of draws or wipes of Vault debt
* There is no stored history of stability fee changes, only the cumulative effective `rate`
* The `rate` value for each collateral perpetually increases \(unless the fee becomes negative at some point\)

### Who calls `drip`?

The system relies on market participants to call `drip` rather than, say, automatically calling it upon Vault manipulations. The following entities are motivated to call `drip`:

* Keepers seeking to liquidate Vaults \(since the accumulation of stability fees can push a Vault's collateralization ratio into unsafe territory, allowing Keepers to liquidate it and profit in the resulting collateral auction\)
* Vault owners wishing to draw Dai \(if they don't call `drip` prior to drawing from their Vault, they will be charged fees on the drawn Dai going back to the last time `drip` was called—unless no one calls `drip` before they repay their Vault, see below\)
* MKR holders \(they have a vested interest in seeing the system work well, and the collection of surplus in particular is critical to the ebb and flow of MKR in existence\)

Despite the variety of incentivized actors, calls to `drip` are likely to be intermittent due to gas costs and tragedy of the commons until a certain scale can be achieved. Thus the value of the `rate` parameter for a given collateral type may display the following time behavior:

![](/images/documentation/intermittent_drip.png)

Debt drawn and wiped between `rate` updates \(i.e. between `drip` calls\) would have no stability fees assessed on it. Also, depending on the timing of updates to the stability fee, there may be small discrepancies between the actual value of `rate` and its ideal value \(the value if `drip` were called in every block\). To demonstrate this, consider the following:

* at t = 0, assume the following values:

$$
\text{rate} = 1 \text{ ; total fee} = f
$$

in a block with t = 28, `drip` is called—now:

$$
\text{rate} = f^{28}
$$

in a block with t = 56, the fee is updated to a new, different value:

$$
\text{totalfee}  \xrightarrow{} g
$$

in a block with t = 70, `drip` is called again; the actual value of `rate` that obtains is:

$$
\text{rate} = f^{28} g^{42}
$$

however, the "ideal" `rate` \(if `drip` were called at the start of every block\) would be:

$$
\text{rate}_{ideal} = f^{56}g^{14}
$$

Depending on whether _f_ &gt; _g_ or _g_ &gt; _f_, the net value of fees accrued will be either too small or too large. It is assumed that `drip` calls will be frequent enough such inaccuracies will be minor, at least after an initial growth period. Governance can mitigate this behavior by calling `drip` immediately prior to fee changes. The code in fact enforces that `drip` must be called prior to a `duty` update, but does not enforce a similar restriction for `base` \(due to the inefficiency of iterating over all collateral types\).

## Dai Savings Rate Accumulation

### Overview

DSR accumulation is very similar to stability fee accumulation. It is implemented via the [Pot](https://docs.makerdao.com/smart-contract-modules/rates-module/pot-detailed-documentation), which interacts with the Vat \(and again the Vow's address is used for accounting for the Dai created\). The Pot tracks normalized deposits on a per-user basis \(`pie[usr]`\) and maintains a cumulative interest rate parameter \(`chi`\). A `drip` function analogous to that of Jug is called intermittently by economic actors to trigger savings accumulation.

![](/images/documentation/blank_diagram_-3-.png)

The per-second \(or "instantaneous"\) savings rate is stored in the `dsr` parameter \(analogous to `base+duty` in the stability fee case\). The `chi` parameter as a function of time is thus \(in the ideal case of `drip` being called every block\) given by:

$$
\text{chi}(t) \equiv \text{chi}0 \prod{i=t_0 + 1}^{t} \text{dsr}_i
$$

where chi\_0 is simply chi\(_t_\_0\).

Suppose a user joins _N_ Dai into the Pot at time _t_\_0. Then, their internal savings Dai balance is set to:

$$
\text{pie[usr]} = N / \text{chi}_0
$$

The total Dai the user can withdraw from the Pot at time _t_ is:

$$
\text{pie[usr]} \cdot \text{chi}(t) = N \prod_{i=t_0 + 1}^{t} \text{dsr}_i
$$

Thus we see that updates to `chi` effectively increase all Pot balances at once, without having to iterate over all of them.

After updating `chi`, `Pot.drip` then calls `Vat.suck` with arguments such that the additional Dai created from this savings accumulation is credited to the Pot contract while the Vow's `sin` \(unbacked debt\) is increased by the same amount \(the global debt and unbacked debt tallies are increased as well\). To accomplish this efficiently, the Pot keeps track of a the total sum of all individual `pie[usr]` values in a variable called `Pie`.

### Notable Properties

The following points are useful to keep in mind when reasoning about savings accumulation \(all have analogs in the fee accumulation mechanism\):

* if `drip` is called only infrequently, the instantaneously value of `chi` may differ from the ideal
* the code requires that `drip` be called prior to `dsr` changes, which eliminates deviations of `chi` from its ideal value due to such changes not coinciding with `drip` calls
* `chi` is a monotonically increasing value unless the effective savings rate becomes negative \(`dsr` &lt; `ONE`\)
* There is no stored record of depositing or withdrawing Dai from the Pot
* There is no stored record of changes to the `dsr`

### Who calls `drip`?

The following economic actors are incentivized \(or forced\) to call `Pot.drip`:

* any user withdrawing Dai from the Pot \(otherwise they lose money!\)
* any user putting Dai into the Pot—this is not economically rational, but is instead forced by smart contract logic that requires `drip` to be called in the same block as new Dai is added to the Pot \(otherwise, an economic exploit that drains system surplus is possible\)
* any actor with a motive to increase the system debt, for example a Keeper hoping to trigger flop \(debt\) auctions

## A Note On Setting Rates

Let's see how to set a rate value in practice. Suppose it is desired to set the DSR to 0.5% annually. Assume the real rate will track the ideal rate. Then, we need a per-second rate value _r_ such that \(denoting the number of seconds in a year by _N_\):

$$
r^N = 1.005
$$

An arbitrary precision calculator can be used to take the _N_-th root of the right-hand side \(with _N_ = 31536000 = 365_24_60\*60\), to obtain:

$$
r = 1.000000000158153903837946258002097...
$$

The `dsr` parameter in the Pot implementation is interpreted as a `ray`, i.e. a 27 decimal digit fixed-point number. Thus we multiply by 10^27 and drop anything after the decimal point:

$$
\text{dsr} = 1000000000158153903837946258
$$

The `dsr` could then be set to 0.5% annually by calling:

`Pot.file("dsr", 1000000000158153903837946258)`

