---
description: A delegatecall based proxy with an enforced delay
---

# Pause - Detailed Documentation

* **Contract Name:** pause.sol
* **Type/Category:** Governance Module
* \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki#system-architecture)
* \*\*\*\*[**Contract Source**](https://github.com/dapphub/ds-pause/blob/master/src/pause.sol)

## 1. Introduction \(Summary\)

The `ds-pause` is a _delegatecall_ based proxy with an enforced delay. This allows authorized users to schedule function calls that can only be executed once a predetermined waiting period has elapsed. The configurable delay attribute sets the minimum wait time that will be used during the governance of the system.

![](../../.gitbook/assets/pause.png)

## 2. Contract Details:

#### Key Functionalities \(as defined in the smart contract\)

**Plans** A plan describes a single _delegatecall_ operation and a unix timestamp `eta` before which it cannot be executed.

**A plan consists of:**

* `usr`: address to delegatecall into
* `tag`: the expected codehash of usr
* `fax`: calldata to use
* `eta`: first possible time of execution \(as seconds since unix epoch\)

It is important to note that each plan has a unique id, defined as a keccack256\(abi.encode\(usr, tag, fax, eta\)\).

#### **Operations**

Plans can be manipulated in the following ways:

* `plot`: schedule a plan
* `exec`: execute a scheduled plan
* `drop`: cancel a scheduled plan

The `pause` contract contains the `DSPauseProxy` contract in order to allow plan to be executed in an isolated storage context to protect the pause from malicious storage modification during plan execution.

## 3. Key Mechanisms & Concepts

The `ds-pause` was designed to be used as a component in the Maker Protocol’s governance system in order to give affected parties time to respond to decisions. If those affected by governance decisions have e.g. exit or veto rights, then the pause can serve as an effective check on governance power.

## 4. Gotchas \(Potential source of user error\)

#### **Identity & Trust**

In order to protect the internal storage of the pause from malicious writes during plan execution, we perform the `delegatecall` operation in a separate contract with an isolated storage context \(DSPauseProxy\), where each pause has its own individual proxy.

This means that plans are executed with the identity of the `proxy`. Thus when integrating the pause into some auth scheme, you will want to trust the pause's proxy and not the pause itself.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

**A break of any of the following would be classified as a critical issue:**

**High level**

* There is no way to bypass the delay
* The code executed by the delegatecall cannot directly modify storage on the pause
* The pause will always retain ownership of it's proxy

**Administrative**

* authority, owner, and delay can only be changed if an authorized user plots a plan to do so

**Plot**

* A plan can only be plotted if its eta is after block.timestamp + delay
* A plan can only be plotted by authorized users

**Exec**

* A plan can only be executed if it has previously been plotted
* A plan can only be executed once it's eta has passed
* A plan can only be executed if its tag matches extcodehash\(usr\)
* A plan can only be executed once
* A plan can be executed by anyone

**Drop**

* A plan can only be dropped by authorized users

#### Other Failure Modes

`DSPause.delay` - when the pause delay is set to the maximum, governance can no longer modify the system.

`DSPause.delay` - when the pause delay is set to the minimum, it is easier to pass malicious governance actions.

