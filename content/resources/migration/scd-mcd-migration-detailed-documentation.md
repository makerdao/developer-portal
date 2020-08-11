---
description: The Maker Protocol Upgrade Contract
---

# SCD &lt;&gt; MCD Migration

* **Contract Name:** scd-mcd-migration.sol
* **Type/Category:**  Migration
* \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki#system-architecture)
* \*\*\*\*[**Contract Source**](https://github.com/makerdao/scd-mcd-migration/blob/master/src/ScdMcdMigration.sol)
* \*\*\*\*[**Etherscan**](https://etherscan.io/address/0xc73e0383f3aff3215e6f04b0331d58cecf0ab849)

## 1. Introduction \(Summary\)

The Migration contract's purpose is to allow moving SAI and CDPs from the SCD system to the MCD system, thus becoming DAI and Vaults. It also allows users to move SAI/DAI in both directions should they want to exit MCD and go back to SCD.

![](../.gitbook/assets/scd-mcd.png)



![](../.gitbook/assets/scd-mcd2%20%281%29.png)

## 2. Contract Details

#### Key Functionalities

`swapSaiToDai` - Takes Sai \(ERC-20 DAI from Single Collateral System\) returns DAI \(ERC-20 DAI from MultiCollateral System\).

`swapDaiToSai` - Takes DAI \(ERC-20 DAI from MultiCollateral System\) returns Sai \(ERC-20 DAI from Single Collateral System\)

`migrate` - Moves a Vault from SCD to MCD by closing the SCD one and opening a corresponding MCD one.

#### Storage

`tub`: SCD Tub contract address

`vat`: MCD Vat Contract address

`cdpManager`: MCD CDP manager

`saiJoin`: SAI collateral adapter for MCD

`wethJoin`: WETH collateral adapter for MCD

`daiJoin`: DAI join adapter for MCD

## 3. Key Mechanisms & Concepts

**Overall this contract has two primary purposes:**

1. Two-way exchange for SAI and DAI
2. One-way transfer of Vaults

#### 1. `constructor` \(setup\)

#### 2. `swapSaiToDai`

Users of the current DAI system will want to move to the new MCD system. This function allows DAI holders to seamlessly convert their DAI. They will need to `approve` the migration contract on the SAI ERC-20 contract so that it can perform the `transferFrom`. The migration contract holds a Vault in MCD that takes SAI as collateral and allows it to exit MCD-DAI, which it does and returns to the `msg.sender`.

#### 3. `swapDaiToSai`

In case a user wants to go back to SAI, this function allows them to turn in their DAI in exchange for SAI. This requires the user `approve`s the migration contract on the DAI ERC-20 contract so that it can `transferFrom` then `join` the DAI back into MCD. This pays back the "debt" in its SAI-MCD Vault and allows it to retrieve the SAI "collateral" and return it to the `msg.sender`.

#### 4. `migrate`

This function is meant to be used in combination with the `MigrationProxyActions` as it requires the migration contract owns the SCD-Vault \(`cup`\) already and that the migration contract has enough MKR to pay the stability fees. The `MigrationProxyActions` `migrate` function `transferFrom`s the `msg.sender` to the migration contract so that the migration contract has enough MKR to pay the stability fee and close the `cup`.

The migration contract first draws its own SAI out of its MCD contract and uses that to pay back the debt for the `cup` \(along with the MKR it has from the proxy action to pay the fee\). Then it withdraws the PETH as WETH.

Next the migration contract opens a Vault using the MCD CDP manager and `join`s its WETH into its new Vault and withdraws enough DAI from the new Vault \(and pays back its Vault\) to compensate for the SAI it drew earlier in this step.

Lastly, the migration contract gives the MCD-Vault to the `msg.sender`.

## 4. Gotchas \(Potential source of user error\)

* Any special/unique information about the specific contract
* Anything that it may rely on, especially if it is not obvious
* Sources of user error if not explicitly defined

#### `swapSaiToDai`

The `wad` amount has to be below the debt ceiling for both the overall MCD system and the SAI collateral type, otherwise the `frob` will fail. This means that these governance parameters can impact the speed of the transition from SAI to DAI.

#### `swapDaiToSai`

The `wad` amount has to be below the amount of SAI collateral in the migration contract's Vault. If a user with DAI wants to move to SAI but no SAI users have already moved to DAI, then this will fail.

#### `migrate`

Because the migration contract will have to first draw SAI from its MCD collateral, the system will have to be seeded with SAI in the migration contract's Vault in an amount that exceeds the SAI debt for the `cup` being migrated.

If a user holds both a `cup` and SAI, they should decide whether it makes sense to:

1. Pay back the `cup` in SCD, then `migrate` their `cup` to MCD \(essentially just transfer the collateral to a new MCD Vault\).
2. `migrate` their `cup` with the debt in place, then use `swapSaiToDai` to get DAI which they can then use as an ERC-20 or payback their MCD debt.

One additional consideration, to close or migrate a `cup`, a user will have to purchase MKR in order to pay the stability fee and be able to `exit` the SCD system. However, once in MCD, new fees will be accrued \(and have to be paid\) in DAI. If a user's converted SAI does not cover their MCD debt + stability fee, they may have to purchase DAI on the open market.

Before SCD shutdown: Users who took out a Vault in SCD and then used the DAI to purchase something will either have to buy SAI on the open market to pay back their SCD debt or they will have to migrate their collateral to MCD.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

* **Potential for error:** Governance parameters around SAI collateral
  * Collateralization ratio has to be set to a very low number
  * Both `ilks["sai"].duty` and `Jug.base` have to be set to `0` during the migration period
* **Auth errors on Sai Join**
* Excess Sai in MCD \(i.e. more `cup`s are lost/not migrated than lost/not migrated Sai\): results in an auction and possibly MKR auction to cover bad debt.

**Migration**

* Sai debt ceiling to 0
* MCD.ilks\[sai\] debt ceiling to SCD.totalDai
* DSR value competitive with Compound to encourage migration

