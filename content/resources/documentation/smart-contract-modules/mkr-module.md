---
title: MKR Module
description: The MKR Governance Token Implementation
group: smart-contracts
components:
  - mkr
  - governance
tags:
  - goverance
  - mcd
  - ds-token
  - erc20
slug: introduction-to-mkr-module
contentType: documentation
root: true
---

# MKR Module

- **Contract Name:** token.sol
- **Type/Category:** MKR Module
- [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki#system-architecture)
- [**Contract Source**](https://github.com/dapphub/ds-token/blob/master/src/token.sol)
- [**Etherscan**](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)

## 1. Introduction (Summary)

The MKR Module contains the MKR token, which is a deployed [Ds-Token](https://github.com/dapphub/ds-token) contract. It is an ERC20 token that provides a standard ERC20 token interface. It also contains logic for burning and authorized minting of MKR.

![MKR Interactions with the Maker Protocol](/images/documentation/screen-shot-2019-11-17-at-2.10.06-pm.png)

## 2. Contract Details

### Glossary (MKR)

- `guy` - user address
- `wad` - a quantity of tokens, usually as a fixed point integer with 10^18 decimal places.
- `dst` - refers to the destination address.

### Key Functionalities (as defined in the smart contract)

`mint` - credit tokens at an address whilst simultaneously increasing totalSupply (requires auth).

`burn` - debit tokens at an address whilst simultaneously decreasing totalSupply (requires auth).

#### **Aliases**

`push` - transfer an amount from msg.sender to a given address.

`pull` - transfer an amount from a given address to msg.sender (requires trust or approval).

`move` - transfer an amount from a given src address to a given dst address (requires trust or approval).

**Standard ERC-20**

`name` - returns the name of the token - e.g. "MyToken".

`symbol` - token symbol.

`decimals` - returns the number of decimals the token uses - e.g. `8`, means to divide the token amount by `100000000` to get its user representation.

`transfer` - transfers _\_value_ amount of tokens to _address \_to_, and **MUST** fire the Transfer event. This **SHOULD** throw if the message caller’s account balance does not have enough tokens to spend.

`transferFrom` - transfers \_value amount of tokens from address \_from to address \_to, and MUST fire the Transfer event.

`approve` - allows _\_spender_ to withdraw from your account multiple times, up to the _\_value_ amount. If this function is called again it overwrites the current allowance with _\_value_.

`totalSupply` - returns the total token supply.

`balanceOf` - returns the account balance of another account with _address \_owner_.

`allowance` - returns the amount which _\_spender_ is still allowed to withdraw from _\_owner_.

Further information about the ERC20 Token standard can be found [here](https://eips.ethereum.org/EIPS/eip-20).

**Important note:** there is a `transferFrom` auto approval when `src == msg.sender`.

## 3. Key Mechanisms & Concepts

Along with MKR having a standard ERC20 token interface, it also has the addition of DSAuth-protected mint and burn functions; binary approval via MAX_UINT; as well as a push, pull and move aliases for transferFrom operations.

**The MKR token has 3 methods of use within the Maker Protocol (reference** [**Maker Protocol 101 Presentation**](/documentation/maker-protocol-101)**):**

- **As a utility token:** As Dai stability fees earned on Vaults accrue within the Maker Protocol, MKR holders can use MKR to vote to enable the Flapper auction house to sell Dai surplus for MKR. Once the auction is complete the Maker protocol burns the MKR.
- **As a governance token:** MKR is used by MKR holders to vote for the risk management and business logic of the Maker Protocol. Tokens are a simple representation of voting power.
- **As a recapitalization resource:** MKR can autonomously be minted by the Flopper auction house and sold for DAI, which is used to recap the Maker Protocol in times of insolvency.

## 4. Gotchas (Potential source of user error)

- The MKR token is an ERC-20 token created using DSToken. A key difference to note between Dai and most other popular ERC20 tokens is that both these fields use `bytes32` instead of the `string` type.

## 5. Failure Modes (Bounds on Operating Conditions & External Risk Factors)

- `MKR.stop` - ES cannot be triggered. MKR in the chief can still vote, but cannot join or exit.
