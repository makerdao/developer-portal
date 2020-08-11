---
description: The Maker Protocol's Governance Contracts
---

# Governance Module

* **Module Name:** Governance Module
* **Type/Category:** Governance —&gt; Chief.sol, Pause.sol, Spell.sol
* [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
* **Contract Sources:**
  * [**Chief**](https://github.com/dapphub/ds-chief/blob/master/src/chief.sol)
  * [**Pause**](https://github.com/dapphub/ds-pause/blob/master/src/pause.sol)
  * [**Spell**](https://github.com/dapphub/ds-spell/blob/master/src/spell.sol)

## 1. Introduction \(Summary\)

The Governance Module contains the contracts that facilitate MKR voting, proposal execution, and voting security of the Maker Protocol.

## 2. Module Details

The Governance Module has 3 core components consisting of the `Chief`, `Pause` and `Spell` contracts.

### Governance Module Components Documentation

* \*\*\*\*[**Chief - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/governance-module/chief-detailed-documentation)
* \*\*\*\*[**Pause - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/governance-module/pause-detailed-documentation)
* \*\*\*\*[**Spell - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/governance-module/spell-detailed-documentation)

## 3. Key Mechanism and Concepts

#### Summary of the Governance **Module Components**

* `Chief` - The Ds-Chief smart contract provides a method to elect a **"chief"** contract via an approval voting system. This may be combined with another contract, such as `DSAuthority`, to elect a ruleset for a smart contract system.
* `Pause` - The `ds-pause` is a _delegatecall_ based proxy with an enforced delay. This allows authorized users to schedule function calls that can only be executed once a predetermined waiting period has elapsed. The configurable delay attribute sets the minimum wait time that will be used during the governance of the system.
* `Spell` - A `DS-Spell` is an un-owned object that performs one action or series of atomic actions \(multiple transactions\) one time only. This can be thought of as a one-off DSProxy with no owner \(no DSAuth mixing, it is not a DSThing\).

## 4. Gotchas \(Potential sources of user error\)

* `Chief`
  * In general, when we refer to the **"chief"**, it can be both addresses or people that represent contracts. Thus, ds-chief can work well as a method for selecting code for execution just as well as it can for realizing political processes.
  * **IOU Token:** The purpose of the IOU token is to allow for the chaining of governance contracts. In other words, this allows you to have a number of `DSChief`, `DSPrism`, or other similar contracts use the same governance token by means of accepting the IOU token of the `DSChief` contract before it is a governance token.
  * **Approval Voting:** This type of voting is when each voter selects which candidates they approve of, with the top n "most approved" candidates being then elected. Each voter can cast up to n + k votes, where k equals some non-zero positive integer. Read more [here](https://docs.makerdao.com/smart-contract-modules/governance-module/chief-detailed-documentation#approval-voting).
  * **Implementations:** If you are writing a front-end UI for this smart contract, please note that the address\[\] parameters that are passed to the `etch` and `vote` functions must be byte-ordered sets. Read more [here.](https://docs.makerdao.com/smart-contract-modules/governance-module/chief-detailed-documentation#implementations)
* `Pause`
  * **Identity & Trust:** In order to protect the internal storage of the pause from malicious writes during plan execution, a _delegatecall_ operation is performed in a separate contract with an isolated storage context \(DSPauseProxy\), where each pause has its own individual proxy. This means that plans are executed with the identity of the `proxy`. Thus when integrating the pause into some auth scheme, you will want to trust the pause's proxy and not the pause itself.
* `Spell`
  * The spell is only marked as "done" if the CALL it makes succeeds, meaning it did not end in an exceptional condition and it did not revert. Conversely, contracts that use return values instead of exceptions to signal errors could be successfully called without having the effect you might desire. "Approving" spells to take action on a system after the spell is deployed generally requires the system to use exception-based error handling to avoid griefing.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

* `Chief`
  * **MKR users moving their votes from one spell to another:** One of the biggest potential failure modes occurs when people are moving their votes from one spell to another. This opens up a gap/period of time when only a small amount of MKR is needed to lift a random hat.
* `Pause`
  * There is no way to bypass the delay.
  * The code executed by the _delegatecall_ cannot directly modify storage on the pause.
  * The pause will always retain ownership of it's proxy.
  * Read more [here.](https://docs.makerdao.com/smart-contract-modules/governance-module/pause-detailed-documentation#5-failure-modes-bounds-on-operating-conditions-and-external-risk-factors)
* `Spell`
  * The main failure mode of the `spell` arises when there is an instance of the spell remaining uncast when it has an amount of MKR voting for it that later becomes a target.

