# Oracle Security Module \(OSM\) - Detailed Documentation

* **Contract Name:** OSM
* **Type/Category:** Oracles - Price Feed Module
* \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki#system-architecture)
* \*\*\*\*[**Contract Source**](https://github.com/makerdao/osm/blob/master/src/osm.sol)

## 1. Introduction

### Summary

The OSM \(named via acronym from "Oracle Security Module"\) ensures that new price values propagated from the Oracles are not taken up by the system until a specified delay has passed. Values are read from a designated [DSValue](https://github.com/dapphub/ds-value) contract \(or any contract that has the `read()` and `peek()` interfaces\) via the `poke()` method; the `read()` and `peek()` methods will give the current value of the price feed, and other contracts must be whitelisted in order to call these. An OSM contract can only read from a single price feed, so in practice one OSM contract must be deployed per collateral type.

![](../../.gitbook/assets/osm.png)

## 2. Contract Details - Glossary \(OSM\)

### Storage Layout

* `stopped` : flag \(`uint256`\) that disables price feed updates if non-zero
* `src` : `address` of DSValue that the OSM will read from
* `ONE_HOUR` : 3600 seconds \(`uint16(3600)`\)
* `hop` : time delay between `poke` calls \(`uint16`\); defaults to `ONE_HOUR`
* `zzz` : time of last update \(rounded down to nearest multiple of `hop`\)
* `cur` : `Feed` struct that holds the current price value
* `nxt` : `Feed` struct that holds the next price value
* `bud` : mapping from `address` to `uint256`; whitelists feed readers

### Public Methods

#### Administrative Methods

These functions can only be called by authorized addresses \(i.e. addresses `usr` such that `wards[usr] == 1`\).

* `rely`/`deny` : add or remove authorized users \(via modifications to the `wards` mapping\)
* `stop()`/`start()` : toggle whether price feed can be updated \(by changing the value of `stopped`\)
* `change(address)` : change data source for prices \(by setting `src`\)
* `step(uint16)` : change interval between price updates \(by setting `hop`\)
* `void()` : similar to `stop`, except it also sets `cur` and `nxt` to a `Feed` struct with zero values
* `kiss(address)`/`diss(address)` : add/remove authorized feed consumers \(via modifications to the `buds` mapping\)

#### Feed Reading Methods

These can only be called by whitelisted addresses \(i.e. addresses `usr` such that `buds[usr] == 1`\):

* `peek()` : returns the current feed value and a boolean indicating whether it is valid
* `peep()` : returns the next feed value \(i.e. the one that will become the current value upon the next `poke()` call\), and a boolean indicating whether it is valid
* `read()` : returns the current feed value; reverts if it was not set by some valid mechanism

#### Feed Updating Methods

* `poke()` : updates the current feed value and reads the next one

`Feed` struct: a struct with two `uint128` members, `val` and `has`. Used to store price feed data.

## 3. Key Mechanisms & Concepts

The central mechanism of the OSM is to periodically feed a delayed price into the MCD system for a particular collateral type. For this to work properly, an external actor must regularly call the `poke()` method to update the current price and read the next price. The contract tracks the time of the last call to `poke()` in the `zzz` variable \(rounded down to the nearest multiple of `hop`; see [Failure Modes](https://docs.makerdao.com/smart-contract-modules/oracle-module/oracle-security-module-osm-detailed-documentation#5-failure-modes-bounds-on-operating-conditions-and-external-risk-factors) for more discussion of this\), and will not allow `poke()` to be called again until `block.timestamp` is at least `zzz+hop`. Values are read from a designated DSValue contract \(its address is stored in `src`\). The purpose of this delayed updating mechanism is to ensure that there is time to detect and react to an Oracle attack \(e.g. setting a collateral's price to zero\). Responses to this include calling `stop()` or `void()`, or triggering Emergency Shutdown.

Other contracts, if whitelisted, may inspect the `cur` value via the `peek()` and `read()` methods \(`peek()` returns an additional boolean indicating whether the value has actually been set; `read()` reverts if the value has not been set\). The `nxt` value may be inspected via `peep()`.

The contract uses a dual-tier authorization scheme: addresses mapped to 1 in `wards` may start and stop, set the `src`, call `void()`, and add new readers; addresses mapped to 1 in `buds` may call `peek()`, `peep()`, and `read()`.

## 4. Gotchas \(Potential Sources of User Error\)

### Confusing `peek()` for `peep()` \(or vice-versa\)

The names of these methods differ by only a single character and in current linguistic usage, both "peek" and "peep" have essentially the same meaning. This makes it easy for a developer to confuse the two and call the wrong one. The effects of such an error are naturally context-dependent, but could e.g. completely invalidate the purpose of the OSM if the `peep()` is called where instead `peek()` should be used. A mnemonic to help distinguish them: "since 'k' comes before 'p' in the English alphabet, the value returned by `peek()` comes before the value returned by `peep()` in chronological order". Or: "`peek()` returns the **k**urrent value".

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

#### `poke()` is not called promptly, allowing malicious prices to be swiftly uptaken

For several reasons, `poke()` is always callable as soon as `block.timestamp / hop` increments, regardless of when the last `poke()` call occurred \(because `zzz` is rounded down to the nearest multiple of `hop`\). This means the contract does not actually guarantee that a time interval of at least `hop` seconds has passed since the last `poke()` call before the next one; rather this is only \(approximately\) guaranteed if the last `poke()` call occurred shortly after the previous increase of `block.timestamp / hop`. Thus, a malicious price value can be acknowledged by the system in a time potentially much less than `hop`.

**This was a deliberate design decision. The arguments that favoured it, roughly speaking, are:**

* Providing a predictable time at which MKR holders should check for evidence of oracle attacks \(in practice, `hop` is 1 hour, so checks must be performed at the top of the hour\)
* Allowing all OSMs to be reliably poked at the same time in a single transaction

The fact that `poke` is public, and thus callable by anyone, helps mitigate concerns, though it does not eliminate them. For example, network congestion could prevent anyone from successfully calling `poke()` for a period of time. If an MKR holder observes that `poke` has not been promptly called, **the actions they can take include:**

1. Call `poke()` themselves and decide if the next value is malicious or not
2. Call `stop()` or `void()` \(the former if only `nxt` is malicious; the latter if the malicious value is already in `cur`\)
3. Trigger emergency shutdown \(if the integrity of the overall system has already been compromised or if it is believed the rogue oracle\(s\) cannot be fixed in a reasonable length of time\)

In the future, the contract's logic may be tweaked to further mitigate this \(e.g. by **only** allowing `poke()` calls in a short time window each `hop` period\).

### Authorization Attacks and Misconfigurations

Various damaging actions can be taken by authorized individuals or contracts, either maliciously or accidentally:

* Revoking access of core contracts to the methods that read values, causing mayhem as prices fail to update
* Completely revoking all access to the contract
* Changing `src` to either a malicious contract or to something that lacks a `peek()` interface, causing transactions that `poke()` the affected OSM to revert
* Calling disruptive functions like `stop` and `void` inappropriately

The only solution to these issues is diligence and care regarding the `wards` of the OSM.

