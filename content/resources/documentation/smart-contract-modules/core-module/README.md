---
title: Core Module
description: The State of the Maker Protocol
components:
  - vat
  - vaults
  - mcd
tags:
  - collateral
slug: introduction-to-core-module
contentType: documentation
group: smart-contracts
root: true
---

# Core Module

* **Module Name:** Vault Core Module
* **Type/Category:** Vault Core Module —&gt; \( Vat.sol, Cat.sol, Spot.sol \)
* [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
* **Contract Sources:**
  * [**Vat**](https://github.com/makerdao/dss/blob/master/src/vat.sol)\*\*\*\*
  * \*\*\*\*[**Cat**](https://github.com/makerdao/dss/blob/master/src/cat.sol)\*\*\*\*
  * \*\*\*\*[**Spot**](https://github.com/makerdao/dss/blob/master/src/spot.sol)\*\*\*\*

## 1. Introduction \(Summary\)

The **Core Module** is crucial to the system as it contains the entire state of the Maker Protocol and controls the central mechanisms of the system while it is in the expected normal state of operation.

## 2. Module Details

### Core Module Components Documentation

1. [**Vat - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/core-module/vat-detailed-documentation)
2. [**Cat - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/core-module/cat-detailed-documentation)
3. [**Spot - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/core-module/spot-detailed-documentation)

## 3. Key Mechanism and Concepts

* `Vat` - The core Vault, Dai, and collateral state is kept in the `Vat`. The `Vat` contract has no external dependencies and maintains the central "Accounting Invariants" of Dai.
* `Cat` - The system's liquidation agent. The two main mechanisms within it are:
  * **`cage()` -** This sets `live` to 0 \(and prevents bite\). Note that once live=0 it cannot be set back to 1. See [End documentation](https://docs.makerdao.com/smart-contract-modules/shutdown/end-detailed-documentation) for further details.
  * **`bite(bytes32 ilk, address urn)` -** In charge of Vault Liquidation. It checks if the Vault is in an unsafe position and if it is, it starts a Flip auction for a piece of the collateral to cover a share of the debt.
* `Spot` - `poke` is the only non-authenticated function in `spot`. The function takes in a `bytes32` of the `ilk` to be "poked". `poke` calls two `external` functions, `peek` and `file`.

## 4. Gotchas \(Potential sources of user error\)

* The methods in the `Vat` are written to be as generic as possible and as such have interfaces that can be quite verbose. Care should be taken that you have not mixed the order of parameters. Any module that is `auth`ed against the `Vat` has full root access, and can, therefore, steal all collateral in the system. This means that the addition of a new collateral type \(and associated adapter\) carries considerable risk.
* When the `Cat` is upgraded, there are multiple references to it that must be updated at the same time \(`End`, `Vat.rely`, `Vow.rely`\). It must also rely on the `End`, the system's `pause.proxy()`. Read more [here](https://docs.makerdao.com/smart-contract-modules/core-module/cat-detailed-documentation#4-gotchas-potential-source-of-user-error).
* The methods in the `spotter` are relatively basic compared to most other portions of `dss`. There is not much room for user error in the single unauthed method `poke`. If an incorrect `bytes32` is supplied the call will fail. Any module that is authed against the `spot` has full root access, and can, therefore, add and remove which `ilks` can be "poked". While not completely breaking the system, this could cause considerable risk.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

### Coding Errors

* `Vat` - A bug in the `Vat` could be catastrophic and could lead to the loss \(or locking\) of all Dai and Collateral in the system. It could become impossible to modify Vault's or to transfer Dai. Auctions could cease to function. Shutdown could fail.
* `Cat` - A bug in the `Cat` could lead to loss \(or locking\) of Dai and Collateral by assigning it to an address that cannot recover it \(i.e. a bad Vow address or an incorrectly programmed Flipper\). The main coding failure mode of `Cat` is if it has a bug that causes auctions to cease to function. This would require upgrading the system to a corrected `Cat` contract. If there is a bug in `Cat` that reverts on `cage` then it would cause Shutdown could fail \(until a correct `Cat` is launched\).
* `Spot` - A bug in `spot` would most likely result in the prices for collaterals not being updated anymore. In this case, the system would need to authorize a new `spot` which would then be able to update the prices. Overall this is not a catastrophic failure as this would only pause all price fluctuation for some period.

### Feeds

* `Vat` - relies upon a set of trusted oracles to provide price data. Should these price feeds fail, it would become possible for unbacked Dai to be minted, or safe Vaults could be unfairly liquidated.
* `Cat` - relies indirectly on the price Feeds as it looks to the `Vat`'s tracking of the collateral prices \(`spot`\) to determine Vault safety. If this system breaks down, it could lead to theft of collateral \(too low `spot`\) or unbacked Dai \(incorrectly high `spot`\).
* `Spot` - relies upon a set of trusted oracles to provide price data. Should these price feeds fail, it would become possible for unbacked Dai to be minted, or safe Vaults could be unfairly liquidated.

### Governance

* `Vat` - Governance can authorize new modules against the `Vat`. This allows them to steal collateral \(`slip`\) or mint unbacked Dai \(`suck`/addition of worthless collateral types\). Should the crypto economic protections that make doing so prohibitively expensive fail, the system may be vulnerable and left open for bad actors to drain collateral.
* `Cat` - Governance can authorize and configure new collaterals for `Cat`. This could lead to misconfiguration or inefficiencies in the system. Misconfiguration could cause `Cat` not to operate properly or at all. For instance, if an `Ilk.lump` is set to be greater than 2\*\*255 could allow for very, very large Vaults to be un-`bite`-able. Inefficiencies in the `lump` or `chop` could affect auctions. For instance, a `lump` that is too large or too small could lead to disincentives for keepers to participate in auctions. A `chop` that is too small would not sufficiently dis-incentivize risky Vaults and too large could lead to it being converted to bad debt. Further discussion of how the parameters could lead to system attacks is described in this [Auction Grinding paper](https://github.com/livnev/auction-grinding/blob/master/grinding.pdf).

