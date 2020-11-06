---
title: Oracle Module
description: The Maker Protocol's Oracles
parent: oracles
tags:
  - oracles
slug: introduction-to-oracle-module
contentType: documentation
root: true
---

# Oracle Module

* **Module Name:** Oracle Module
* **Type/Category:** Oracles —&gt; OSM.sol & Median.sol
* \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
* **Contract Sources:**
  * \*\*\*\*[**Median**](https://github.com/makerdao/median/blob/master/src/median.sol)\*\*\*\*
  * \*\*\*\*[**OSM**](https://github.com/makerdao/osm/blob/master/src/osm.sol)\*\*\*\*

## 1. Introduction \(Summary\)

An oracle module is deployed for each collateral type, feeding it the price data for a corresponding collateral type to the `Vat`. The Oracle Module introduces the whitelisting of addresses, which allows them to broadcast price updates off-chain, which are then fed into a `median` before being pulled into the `OSM`. The `Spot`'ter will then proceed to read from the `OSM` and will act as the liaison between the `oracles` and `dss`.

## 2. Module Details

The Oracle Module has 2 core components consisting of the `Median` and `OSM` contracts.

### Oracle Module Components Documentation

* [**Median Documentation**](https://docs.makerdao.com/smart-contract-modules/oracle-module/median-detailed-documentation)\*\*\*\*
* \*\*\*\*[**OSM Documentation**](https://docs.makerdao.com/smart-contract-modules/oracle-module/oracle-security-module-osm-detailed-documentation)\*\*\*\*

## 3. Key Mechanism and Concepts

![Interaction Diagram \(Credit: MCD-101 Presentation, by Kenton Prescott\)](../../.gitbook/assets/oracles2.png)

#### Summary of the Oracle **Module Components**

* The **`Median`** provides Maker's trusted reference price. In short, it works by maintaining a whitelist of price feed contracts which are authorized to post price updates. Every time a new list of prices is received, the median of these is computed and used to update the stored value. The median has permissioning logic which is what enables the addition and removal of whitelisted price feed addresses that are controlled via governance. The permissioning logic allows governance to set other parameters that control the Median's behavior—for example, the `bar` parameter is the minimum number of prices necessary to accept a new median value.
* The **`OSM`** \(named via acronym from "Oracle Security Module"\) ensures that new price values propagated from the Oracles are not taken up by the system until a specified delay has passed. Values are read from a designated [DSValue](https://github.com/dapphub/ds-value) contract \(or any contract that implements the `read()` and `peek()` interface\) via the `poke()` method; the `read()` and `peek()` methods will give the current value of the price feed, and other contracts must be whitelisted in order to call these. An OSM contract can only read from a single price feed, so in practice one OSM contract must be deployed per collateral type.

## 4. Gotchas \(Potential sources of user error\)

#### **Relationship between the OSM and the Median:**

* You can read straight from the median and in return, you would get a more real-time price. However, this depends on the cadence of updates \(calls to poke\).
* The OSM is similar but has a 1-hour price delay. It has the same process for reading \(whitelist, auth, read and peek\) as a median. The way the OSM works, is you cannot update it directly but you can `poke` it to go and read from something that also has the same structure \(the `peek` method - in this case, its the median but you can set it to read from anything that conforms to the same interface\).
* Whenever the OSM reads from a source, it queues the value that it reads for the following hour or following `hop` property, which is set to 1 hour \(but can be anything\). When it is `poke`'d, it reads the value of the median and it will save the value. Then the previous value becomes that, so it is always off by an hour. After an hour passes, when `poke`d, the value that it saved becomes the current value and whatever value is in the median becomes the future value for the next hour.
* `spot` - if you poke it with an ilk \(ex: ETH\) it will read form the OSM and if the price is valid, it updates.

#### Relationship to the `Spot`'ter:

* In relation to the `Spot` the oracle module handles how market prices are recorded on the blockchain. The `Spot`ter operates as the interface contract, which external actors can use to retrieve the current market price from the Oracle module for the specified collateral type. The `Vat` in turn reads the market price from the `spot`ter.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

* `Median` - there is currently no way to turn off the oracle \(failure or returns false\) if all the oracles come together and sign a price of zero. This would result in the price being invalid and would return false on `peek`, telling us to not trust the value.
* `OSM`
  * `poke()` is not called promptly, allowing malicious prices to be swiftly uptaken.
  * Authorization Attacks and Misconfigurations.
  * Read more [here.](https://docs.makerdao.com/smart-contract-modules/oracle-module/oracle-security-module-osm-detailed-documentation#5-failure-modes-bounds-on-operating-conditions-and-external-risk-factors)

