---
title: Vat
description: The Maker Protocol's Core Accounting System
group: smart-contracts
components:
  - vaults
  - vat
tags:
  - balances
slug: vat-detailed-documentation
contentType: documentation
parent: introduction-to-core-module
---

# Vat

- **Contract Name: Vat.sol**
- **Type/Category:** DSS —&gt; Core System Accounting
- [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
- [**Contract Source**](https://github.com/makerdao/dss/blob/master/src/vat.sol)
- [**Etherscan**](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)

## 1. Introduction (Summary)

The `Vat` is the core Vault engine of `dss`. It stores Vaults and tracks all the associated Dai and Collateral balances. It also defines the rules by which Vaults and balances can be manipulated. The rules defined in the `Vat` are immutable, so in some sense, the rules in the `Vat` can be viewed as the constitution of `dss`.

![](/images/documentation/mcd-system-2.0%20%282%29.png)

## 2. Contract Details

### **Glossary (Vat -** Vault **Engine)**

- `gem`: collateral tokens.
- `dai`: stablecoin tokens.
- `sin`: unbacked stablecoin (system debt, not belonging to any `urn`).
- `ilks`: a mapping of `Ilk` types.
- `Ilk`: a collateral type.
  - `Art`: total normalized stablecoin debt.
  - `rate`: stablecoin debt multiplier (accumulated stability fees).
  - `spot`: collateral price with safety margin, i.e. the maximum stablecoin allowed per unit of collateral.
  - `line`: the debt ceiling for a specific collateral type.
  - `dust`: the debt floor for a specific collateral type.
- `urns`: a mapping of `Urn` types.
- `Urn`: a specific Vault.
  - `ink`: collateral balance.
  - `art`: normalized outstanding stablecoin debt.
- `init`: create a new collateral type.
- `slip`: modify a user's collateral balance.
- `flux`: transfer collateral between users.
- `move`: transfer stablecoin between users.
- `grab`: liquidate a Vault.
- `heal`: create / destroy equal quantities of stablecoin and system debt (`vice`).
- `fold`: modify the debt multiplier, creating / destroying corresponding debt.
- `suck`: mint unbacked stablecoin (accounted for with `vice`).
- `Line`: the total debt ceiling for all collateral types.
- `frob`: modify a Vault.
  - `lock`: transfer collateral into a Vault.
  - `free`: transfer collateral from a Vault.
  - `draw`: increase Vault debt, creating Dai.
  - `wipe`: decrease Vault debt, destroying Dai.
  - `dink`: change in collateral.
  - `dart`: change in debt.
- `fork`: to split a Vault - binary approval or splitting/merging Vaults.
  - `dink`: amount of collateral to exchange.
  - `dart`: amount of stablecoin debt to exchange.
- `wish`: check whether an address is allowed to modify another address's gem or dai balance.
  - `hope`: enable `wish` for a pair of addresses.
  - `nope`: disable `wish` for a pair of addresses.

**Note:** `art` and `Art` represent normalized debt, i.e. a value that when multiplied by the correct rate gives the up-to-date, current stablecoin debt.

#### **Accounting**

- `debt` is the sum of all `dai` (the total quantity of dai issued).
- `vice` is the sum of all `sin` (the total quantity of system debt).
- `Ilk.Art` the sum of all `art` in the `urn`s for that `Ilk`.
- `debt` is `vice` plus the sum of `Ilk.Art * Ilk.rate` across all `ilks`.

#### **Collateral**

- `gem` can always be transferred to any address by it's owner.

#### **Dai**

- `dai` can only move with the consent of it's owner.
- `dai` can always be transferred to any address by it's owner.

## 3. Mechanisms & Concepts

The core Vault, Dai, and collateral state is kept in the `Vat`. The `Vat` contract has no external dependencies and maintains the central "Accounting Invariants" of Dai. The core principles that apply to the `vat` are as follows:

1. **Dai cannot exist without collateral:**

- An `ilk` is a particular type of collateral.
- Collateral `gem` is assigned to users with `slip`.
- Collateral `gem` is transferred between users with `flux`.

**2. The Vault data structure is the `Urn`:**

- has `ink` - encumbered collateral
- has `art` - encumbered, normalized debt

**3. Similarly, a collateral is an `Ilk`:**

- has `Art` - encumbered, normalized debt
- has `rate` - debt scaling factor (discussed further below)
- has `spot` - price with safety margin
- has `line` - debt ceiling
- has `dust` - debt floor

**Note:** Above, when using the term "encumbered", this refers to being "locked in a Vault".

### Vault Management

- Vaults are managed via `frob(i, u, v, w, dink, dart)`, which modifies the Vault of user `u`, using `gem` from user `v`and creating `dai` for user `w`.
- Vaults are confiscated via `grab(i, u, v, w, dink, dart)`, which modifies the Vault of user `u`, giving `gem` to user `v`and creating `sin` for user `w`. `grab` is the means by which Vaults are liquidated, transferring debt from the Vault to a users `sin` balance.
- Sin represents "seized" or "bad" debt and can be canceled out with an equal quantity of Dai using `heal(uint rad` where `msg.sender` is used as the address for the `dai` and `sin` balances.
  - **Note:** Only the Vow will ever have `sin`, so only the Vow can successfully call `heal`. This is because whenever `grab` and `suck` are called, the Vow's address is passed as the recipient of `sin`. Note that this is contingent on the current design and implementation of the system.
  - **Note:** `heal` can only be called with a positive number (uint) and will `sub(dai[u])` along with `sub`ing the `sin`.
- The quantity `dai` can be transferred between users with `move`.

### **Rate Updates via `fold(bytes32 ilk, address u, int rate)`**

An ilk's `rate` is the conversion factor between any normalized debt (`art`) drawn against it and the present value of that debt with accrued fees. The `rate` parameter to `fold` is actually the change in the `Ilk.rate` value, i.e. a difference of scaling factors (new - old). It is a signed integer, and hence current account values may increase or decrease. The quantity `Ilk.Art*rate` is added to the `dai` balance of the address `u` (representing an increase or decrease in system surplus); the debt balances of all Vaults collateralized with the specified `Ilk` are updated implicitly via the addition of `rate` to `Ilk.rate`.

For more information on Rates and System Stabilization, see the Rates Module and System Stabilizer Module documentation below:

- [Rates Module](https://docs.makerdao.com/smart-contract-modules/rates-module)
- [System Stabilizer ](https://docs.makerdao.com/smart-contract-modules/system-stabilizer-module)

## 4. Gotchas

The methods in the `Vat` are written to be as generic as possible and as such have interfaces that can be quite verbose. Care should be taken that you have not mixed the order of parameters.

Any module that is `auth`ed against the `Vat` has full root access, and can therefore steal all collateral in the system. This means that the addition of a new collateral type (and associated adapter) carries considerable risk.

## 5. Failure Modes

#### Coding Error

A bug in the `Vat` could be catastrophic and could lead to the loss (or locking) of all Dai and Collateral in the system. It could become impossible to modify Vault's or to transfer Dai. Auctions could cease to function. Shutdown could fail.

#### Feeds

The `Vat` relies upon a set of trusted oracles to provide price data. Should these price feeds fail, it would become possible for unbacked Dai to be minted, or safe Vaults could be unfairly liquidated.

#### Governance

Governance can authorize new modules against the `Vat`. This allows them to steal collateral (`slip`) or mint unbacked Dai (`suck` / addition of worthless collateral types). Should the cryptoeconomic protections that make doing so prohibitively expensive fail, the system may be vulnerable and left open for bad actors to drain collateral.

#### Adapters

The `Vat` relies on external Adapter contracts to ensure that the collateral balances in the `Vat` represent real external collateral balances. Adapter contracts are authorized to make arbitrary modifications to all collateral balances. A faulty collateral adapter could result in the loss of all collateral in the system.
