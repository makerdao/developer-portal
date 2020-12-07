---
title: Dai - Detailed Documentation
description: The Dai Token Contract
group: smart-contracts
components:
  - dai
tags:
  - token
slug: dai-detailed-documentation
contentType: documentation
parent: introduction-to-dai-module
---

# Dai - Detailed Documentation

- **Contract Name:** dai.sol
- **Type/Category:** DSS —&gt; Dai Module
- [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
- [**Contract Source**](https://github.com/makerdao/dss/blob/master/src/dai.sol)
- [**Etherscan**](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)

## 1. Introduction (Summary)

The `Dai` contract is the user-facing ERC20 token contract maintaining the accounting for external Dai balances. Most functions are standard for a token with changing supply, but it also notably features the ability to issue approvals for transfers based on signed messages.

![Dai Interactions with the Maker Protocol](/images/documentation/screen-shot-2019-11-17-at-2.08.05-pm.png)

## 2. Contract Details

### DAI (Glossary)

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

#### **Units**

- `wad` - fixed point decimal with 18 decimals (for basic quantities, e.g. balances).

## 3. Key Mechanisms & Concepts

For the most part, `dai.sol` functions as a typical ERC20 token. These tokens have been already been [heavily documented here](https://eips.ethereum.org/EIPS/eip-20) and it is recommended to read through that documentation for the core functions of an ERC20 token.

#### Differences From ERC20:

1. `transferFrom` in the DAI contract works in a slightly different form than the generic `transferFrom` function. The DAI contract allows for "unlimited approval". Should the user approve an address for the maximum uint256 value, then that address will have unlimited approval until told otherwise.
2. `push`, `pull` & `move` are aliases for `transferFrom` calls in the form of `transferFrom(msg.sender, usr, amount)` , `transferFrom(usr, msg.sender, amount)` & `transferFrom(src, dst, amount)` .
3. `permit` is a signature-based approval function. This allows for an end-user to sign a message which can then be relayed by another party to submit their approval. This can be useful for applications in which the end-user does not need to hold `ETH`.
   - In order to use this functionality, a user's address must sign a message with the `holder`, `spender`, `nonce`, `expiry` and the `allowed` amount. This can then be submitted to `Permit()` to update the user's approval.

## 4. Gotchas (Potential Source of User Error)

Unlimited allowance is a relatively uncommon practice (though becoming more common). This could be something used to trick a user by a malicious contract into giving access to all their DAI. This is concerning in upgradeable contracts where the contract may appear innocent until upgraded to a malicious contract.

DAI is also susceptible to the known [ERC20 race condition](https://github.com/0xProject/0x-monorepo/issues/850), but should not normally be an issue with unlimited approval. We recommend any users using the `approval` for a specific amount be aware of this particular issue and use caution when authorizing other contracts to perform transfers on their behalf.

There is a slight deviation in `transferFrom` functionality: If the `src == msg.sender` the function does not require `approval` first and treats it as a normal `transfer` from the `msg.sender` to the `dst`.

#### Built-in meta-transaction functionality of Dai

The Dai token provides offchain approval, which means that as an owner of an ETH address, you can sign a permission (using the permit() function) which basically grants allowance to another ETH address. The ETH address that you provide permission to can then take care of the execution of the transfer but has an allowance.

## 5. Failure Modes (Bounds on Operating Conditions & External Risk Factors)

- N/a
