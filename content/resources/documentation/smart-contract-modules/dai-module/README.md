---
title: Dai Module
description: The DAI token contract and all of the adapters DaiJoin adapters.
group: smart-contracts
components:
   - dai
tags:
   - token
slug: introduction-to-dai-module
contentType: documentation
root: true
---

# Dai Module

* **Module Name:** DAI Module
* **Type/Category: Proxy —&gt;** Dai.sol and DaiJoin.sol
* [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
* **Contract Sources:**
  * [**dai**](https://github.com/makerdao/dss/blob/master/src/dai.sol)
  * [**daiJoin**](https://github.com/makerdao/dss/blob/2318555e87b1798e322feaab36265a6e20d637be/src/join.sol#L100)

## 1. Introduction (Summary)

The origin of DAI was designed to represent any token that the core system considers equal in value to its internal debt unit. Thus, the **DAI Module** contains the DAI token contract and all of the adapters DaiJoin adapters.

## 2. Module Details

### Glossary (DAI)

**Key Functionalities (as defined in the smart contract)**

`Mint` - Mint to an address

`Burn` - Burn at an address

`Push` - Transfer

`Pull` - Transfer From

`Move` - Transfer From

`Approve` - Allow pulls and moves

`Permit` - Approve by signature

**Other**

`name` - Dai Stablecoin

`symbol` - DAI

`version` - 1

`decimals` - 18

`totalSupply` - Total DAI Supply

`balanceOf(usr: address)` - User balance

`allowance(src: address, dst: address)` - Approvals

`nonces(usr: address)` - Permit nonce

### Glossary (Join)

* `vat` - storage of the Vat’s address
* `ilk` - id of the Ilk for which a `GemJoin` is created for
* `gem` - the address of the `ilk` for transferring
* `dai` - the address of the `dai` token
* `one` - a 10^27 uint used for math in `DaiJoin`

### Core Module Components Documentation

1. [**Dai - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/dai-module/dai-detailed-documentation)
2. [**DaiJoin Documentation** ](https://docs.makerdao.com/smart-contract-modules/collateral-module/join-detailed-documentation#3-key-mechanisms-and-concepts)(referenced in Join - Detailed Documentation)

## 3. Key Mechanism and Concepts

#### Why are these components important to the Multi-Collateral Dai (MCD) System?

The `Dai` contract is the user facing ERC20 contract maintaining the accounting for external Dai balances. Most functions are standard for a token with changing supply, but it also notably features the ability to issue approvals for transfers based on signed messages.

`Join` consists of three smart contracts, one of which is the DaiJoin contract. Each join contract is created specifically to allow the given token type to be joined to the vat. Because of this, each join contract has slightly different logic to account for the different types of tokens within the system. The DaiJoin contract allows users to withdraw their Dai from the system into a standard ERC20 token.

## 4. Gotchas (Potential sources of user error)

* `DAI` is also susceptible to the known [ERC20 race condition](https://github.com/0xProject/0x-monorepo/issues/850), but should not normally be an issue with unlimited approval. We recommend any users using the `approval` for a specific amount be aware of this particular issue and use caution when authorizing other contracts to perform transfers on their behalf.
* There are limited sources of user error in the `join` contracts system due to the limited functionality of the system. Barring a contract bug, should a user call join by accident they could always get their tokens back through the corresponding exit call on the given join contract. The main issue to be aware of here would be a well-executed phishing attack. As the system evolves and potentially more join contracts are created, or more user interfaces are made, there is the potential for a user to have their funds stolen by a malicious join contract which does not actually send tokens to the vat, but instead to some other contract or wallet.

## 5. Failure Modes (Bounds on Operating Conditions & External Risk Factors)

**There could potentially be a `vat` upgrade that would require new `join` contracts to be created.**

If a `gem` contract were to go through a token upgrade or have the tokens frozen while a user's collateral was in the system, there could potentially be a scenario in which the users were unable to redeem their collateral after the freeze or upgrade was finished. This seems to be a small risk though because it would seem likely that the token going through this upgrade would want to work alongside the maker community to be sure this was not an issue.
