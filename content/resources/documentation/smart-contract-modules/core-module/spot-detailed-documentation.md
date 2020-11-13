---
title: Spot - Detailed Documentation
description: The Maker Protocol's liaison between the Oracles and Core Contracts
component: smart-contracts
tags:
  - oracles
slug: spot-detailed-documentation
contentType: documentation
parent: introduction-to-core-module
---

# Spot - Detailed Documentation

- **Contract Name:** spot.sol
- **Type/Category:** DSS —&gt; Core Module
- \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
- \*\*\*\*[**Contract Source**](https://github.com/makerdao/dss/blob/master/src/spot.sol)
- \*\*\*\*[**Etherscan** ](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)

## 1. Introduction

The `Spot` liaison between the `oracles` and the core contracts. It functions as an interface contract and only stores the current `ilk` list.

![](/images/documentation/screen-shot-2019-11-17-at-2.26.39-pm.png)

## 2. Contract Details

#### **Math**

- All mathematical operations will revert on overflow or underflow

#### **Complexity**

- All methods execute in constant time

#### **Variables**

- `ilk` a given collateral type
- `ilk.pip` the contract which holds the current price of a given `ilk`
- `ilk.mat` the liquidation ratio for a given `ilk`
- `vat` the core of the mcd system
- `par` value of DAI in the reference asset \(e.g. \$1 per DAI\)

#### **Collateral**

- Only authorized users can update any variables in contract

## 3. Key **Mechanisms & Concepts**

### Poke

`poke` is the only non-authenticated function in `spot`. The function takes in a `bytes32` of the `ilk` to be "poked". `poke` calls two `external` functions:

1. `peek` calls the [OSM](https://docs.makerdao.com/smart-contract-modules/oracle-module/oracle-security-module-osm-detailed-documentation) for the given `ilk` and takes back in the `val` and `has`\(a boolean which is false if there was an error in the `osm`\). The second external call only happens if `has == true`.
2. When calculating the `spot`, the `par` is crucial to this calculation as it defines the relationship between DAI and 1 unit of value in the price. The `val` is then divided by the `par`\(to get a ratio of `val` to `DAI`\) and then the resulting value is divided by the `ilk.mat`. This gives us the current `spot` price for the given `ilk`.
3. `file` is then called after calculating the `spot`. This updates the `vat` with the current liquidation price of the `ilk` which the function was called for.

## 4. **Gotchas**

The methods in the `spotter` are relatively basic compared to most other portions of `dss`. There is not much room for user error in the single unauthed method `poke`. If an incorrect `bytes32` is supplied the call will fail.

Any module that is authed against the `spot` has full root access, and can, therefore, add and remove which `ilks` can be "poked". While not completely breaking the system, this could cause considerable risk.

## 5. **Failure Modes**

#### **Coding Error**

A bug in `spot` would most likely result in the prices for collaterals not being updated anymore. In this case, the system would need to authorize a new `spot` which would then be able to update the prices. Overall this is not a catastrophic failure as this would only pause all price fluctuation for some period.

#### **Feeds**

The `spot` relies upon a set of trusted oracles to provide price data. Should these price feeds fail, it would become possible for unbacked Dai to be minted, or safe Vaults could be unfairly liquidated.

#### Spot Price Becoming Stale

When `poke` is not called frequently enough, the `Vat`'s `spot` price will become stale. This could arise for a few reasons including tragedy of the commons or miner collusion and could lead to negative outcomes such as inappropriate liquidations, or the prevention of liquidations that should be possible.
