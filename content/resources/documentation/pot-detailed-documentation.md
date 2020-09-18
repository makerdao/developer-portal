---
title: 'Pot - Detailed Documentation'
description: The Dai Savings Rate
tags: ['dsr']
slug: pot-detailed-documentation
parent: 'dsr'
contentType: 'documentation'
---

# Pot - Detailed Documentation

- **Contract Name:** pot.sol
- **Type/Category:** DSS —&gt; Rates Module
- \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
- \*\*\*\*[**Contract Source**](https://github.com/makerdao/dss/blob/master/src/pot.sol)
- \*\*\*\*[**Etherscan**](https://etherscan.io/address/0x197e90f9fad81970ba7976f33cbd77088e5d7cf7)

## 1. Introduction \(Summary\)

The Pot is the core of the`Dai Savings Rate`. It allows users to deposit `dai` and activate the Dai Savings Rate and earning savings on their `dai`. The DSR is set by Maker Governance, and will typically be less than the base stability fee to remain sustainable. The purpose of Pot is to offer another incentive for holding Dai.

## 2. Contract Details

#### Math

- `mul(uint, uint)`, `rmul(uint, uint)`, `add(uint, uint)`& `sub(uint, uint)` - will revert on overflow or underflow
- `rpow(uint x, uint n, uint base)`, used for exponentiation in `drip`, is a fixed-point arithmetic function that raises `x` to the power `n`. It is implemented in assembly as a repeated squaring algorithm. `x` \(and the result\) are to be interpreted as fixed-point integers with scaling factor `base`. For example, if `base == 100`, this specifies two decimal digits of precision and the normal decimal value 2.1 would be represented as 210; `rpow(210, 2, 100)` should return 441 \(the two-decimal digit fixed-point representation of 2.1^2 = 4.41\). In the current implementation, 10^27 is passed for `base`, making `x` and the `rpow` result both of type `ray` in standard MCD fixed-point terminology. `rpow`’s formal invariants include “no overflow” as well as constraints on gas usage.

#### Auth

- `wards` are allowed to call protected functions \(Administration\)

#### Storage

- `pie` - stores the address' `Pot` balance.
- `Pie` - stores the total balance in the `Pot`.
- `dsr` - the `dai savings rate`. It starts as `1` \(`ONE = 10^27`\), but can be updated by governance.
- `chi` - the rate accumulator. This is the always increasing value which decides how much `dai` - given when `drip()` is called.
- `vat` - an address that conforms to a `VatLike` interface. It is set during the constructor and **cannot be changed**.
- `vow` - an address that conforms to a `VowLike` interface. Not set in constructor. Must be set by governance.
- `rho` - the last time that drip is called.

The values of `dsr` and `vow` can be changed by an authorized address in the contract \(i.e. Maker Governance\). The values of `chi`, `pie`, `Pie`, and `rho` are updated internally in the contract and cannot be changed manually.

## 3. Key Mechanisms & Concepts

#### drip\(\)

- Calculates the most recent `chi` and pulls `dai` from the `vow` \(by increasing the `Vow`'s `Sin`\).
- A user should always make sure that this has been called before calling the `exit()` function.
- drip has to be called before a user `join`s and it is in their interest to call it again before they `exit`, but there isn't a set rule for how often drip is called.

#### join\(uint wad\)

- `uint wad` this parameter is based on the amount of dai \(since `wad` = `dai`/ `chi` \) that you want to `join` to the `pot`. The `wad * chi` must be present in the `vat` and owned by the `msg.sender`.
- the `msg.sender`'s `pie` amount is updated to include the `wad`.
- the total `Pie` amount is also updated to include the `wad`.

#### exit\(uint wad\)

- `exit()` essentially functions as the exact opposite of `join()`.
- `uint wad` this parameter is based on the amount of dai that you want to `exit` the `pot`. The `wad * chi` must be present in the `vat` and owned by the `pot` and must be less than `msg.sender`'s `pie` balance.
- The `msg.senders` `pie` amount is updated by subtracting the `wad`.
- The total `Pie` amount is also updated by subtracting the `wad`.

#### Administration

Various file function signatures for administering `Pot`:

- Setting new dsr \(`file(bytes32, uint256)`\)
- Setting new vow \(`file(bytes32, address)`\)

### Usage

The primary usage will be for `addresses` to store their `dai` in the `pot` to accumulate interest over time

## 4. Gotchas / Integration Concerns

- The `dsr` is set \(globally\) through the governance system. It can be set to any number &gt; 0%. This includes the possibility of it being set to a number that would cause the DSR to accumulate faster than the collective Stability Fees, thereby accruing system debt and eventually causing MKR to be minted.
- If `drip()` has not been called recently before an address calls `exit()` they will not get the full amount they have earned over the time of their deposit.
- If a user wants to `join` or `exit` 1 DAI into/from the Pot, they should send a `wad` = to `1 / chi` as the amount moved from their balance will be `1 * chi` \(for an example of this, see [DSS-Proxy-Actions](https://github.com/makerdao/dss-proxy-actions/blob/master/src/DssProxyActions.sol#L547)

## 5. Failure Modes and Impact

#### Coding Error

A bug in the `Pot` could lead to locking of `dai` if the `exit()` function or the underlying `vat.suck()` or `vat.move()` functions were to have bugs.

#### Governance

The `dsr` rate initially can be set through the Chief. Governance will be able to change the DSR based on the rules that the DS-Chief employs \(which would include a Pause for actions\).

One serious risk is if governance chooses to set the `dsr` to an extremely high rate, this could cause the system's fees to be far too high. Furthermore, if governance allows the `dsr` to \(significantly\) exceed the system fees, it would cause debt to accrue and increase the Flop auctions.
