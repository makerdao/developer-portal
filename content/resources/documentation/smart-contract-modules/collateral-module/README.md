---
title: Collateral Module
description: Adapters and Auction contracts for each specific collateral type
group: smart-contracts
components:
  - vat
  - vaults
tags:
  - collateral
slug: introduction-to-collateral-module
contentType: documentation
root: true
---

# Collateral Module

* **Module Name:** Collateral Module
* **Type/Category:** DSS —&gt; Join.sol & Flip.sol
* [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
* **Contract Sources:** 
  * [**Join**](https://github.com/makerdao/dss/blob/master/src/join.sol)
  * [**Flipper**](https://github.com/makerdao/dss/blob/master/src/flip.sol)

## 1. Introduction \(Summary\)

The collateral module is deployed for every new `ilk` (collateral type) added to `Vat`. It contains all the adapters and auction contracts for one specific collateral type.

For other information related to the collateral module, read the following resources:

* [Auctions & Keepers within MCD 101](https://github.com/makerdao/developerguides/blob/master/keepers/auctions/auctions-101.md)
* [How to Run Your Own Auction Keeper Bot in MCD Blog Post](https://blog.makerdao.com/how-to-run-your-own-auction-keeper-bot-in-mcd/)

## 2. Module Details

The Collateral Module has 2 core components consisting of the `Join` and `Flip` contracts.

### The Collateral Module is built up of two components:

1. [**Join Documentation**](https://docs.makerdao.com/smart-contract-modules/collateral-module/join-detailed-documentation)
2. [**Flip Documentation**](https://docs.makerdao.com/smart-contract-modules/collateral-module/flipper-detailed-documentation)

## 3. Key Mechanism and Concepts

#### Summary of the **Collateral Module Components**

* `Join` - adapters that are used to deposit/withdraw unlocked collateral into the `Vat`. Join contains three smart contracts:

  1. `GemJoin`
  2. `ETHJoin`
  3. `DaiJoin`.

  Each of the `join` contracts are specifically used for the given token type to be `join`'ed to the `vat`. Due to this fact, each `join` contract has slightly different logic to account for the different types of tokens within the system.

* `Flipper` - collateral Auctions are used to sell collateral from Vaults that have become undercollateralized in order to preserve the collateralization of the system. The `Cat` sends bitten collateral to the Flip module to be auctioned off to Keepers. The collateral auction has two phases: `tend` and `dent`. See the **Gotchas** section of the Flipper's [documentation](https://docs.makerdao.com/smart-contract-modules/collateral-module/flipper-detailed-documentation) for more on the `tend` and `dent` auction phases.

#### How exactly do the `Join` and `Flipper` contracts help the MCD system operate?

* `Join` - the purpose of join adapters is to retain the security of the system, allowing only trusted smart contracts to add/remove value to/from the `Vat`. The location of collateral deposited/locked in Vaults is in the respective Join adapter.
* `Flipper` - the purpose of collateral auctions is to decrease the market risk of collateral that is backing Dai. The main priorities of the Flipper are:
  * To cover the amount of total debt (minted Dai + accrued fees) of the Vault.
  * To return as much collateral back to the Vault owner as possible.

## 4. Gotchas \(Potential sources of user error\)

* When a user desires to enter the system and interact with the `dss` contracts, they must use one of the `join` contracts.
* If there was a contract bug in a `join` contract and a user was to call `join` by accident, they can still retrieve their tokens back through the corresponding `exit` call on the given `join` contract.

## 5. Failure Modes

**There could potentially be a `vat` upgrade that would require new `join` contracts to be created**

If a `gem` contract were to go through a token upgrade or have the tokens frozen while a user's collateral was in the system, there could potentially be a scenario in which the users were unable to redeem their collateral after the freeze or upgrade was finished. This seems to be a small risk though because it would seem likely that the token going through this upgrade would want to work alongside the maker community to be sure this was not an issue.

**Potential Phishing Attacks**

As the MCD system evolves, we will see many more `join` contracts, user interfaces, etc. This surfaces the potential for a user to have their funds stolen by a malicious `join` contract which would send tokens to an external contract or wallet, instead of the `vat`.
