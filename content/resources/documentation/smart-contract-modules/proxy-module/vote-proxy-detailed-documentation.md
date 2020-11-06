---
description: >-
  Allowing MKR users to vote with a hot or cold wallet using a proxy voting
  identity
---

# Vote Proxy - Detailed Documentation

* **Contract Name:** VoteProxy.sol
* **Type/Category:** Proxy Module
* \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki#system-architecture)
* \*\*\*\*[**Contract Source**](https://github.com/makerdao/vote-proxy/blob/master/src/VoteProxy.sol)

## 1. Introduction \(Summary\)

The `VoteProxy` contract allows for MKR users to vote with a hot or cold wallet using a proxy voting identity instead of interacting directly with the chief. In addition to supporting two different voting mechanisms, the vote proxy also minimizes the time that MKR owners need to have their wallet\(s\) online.

![](../../.gitbook/assets/pause.png)

## 2. Contract Details

### Vote Proxy \(Glossary\)

* `approvals`: A mapping of candidate addresses to their `uint` weight.
* `slate` - A mapping of `bytes32` to `address` arrays. Represents sets of candidates. Weighted votes are given to slates.
* `votes`: A mapping of voter addresses to the slate they have voted for.
* `GOV`: `DSToken` used for voting.
* `IOU`: `DSToken` issued in exchange for locking `GOV` tokens.

## 3. Key Mechanisms & Concepts

The `VoteProxy` contract enables MKR owners to vote with the full weight of the MKR they own, for both for Governance and Executive votes. As mentioned above, this process also reduces the risk for MKR users when voting with a cold wallet. This is done by allowing the MKR owner to designate a “hot wallet” which is used to transfer MKR to the proxy and can only be used for voting on Governance and Executive votes. The “hot wallet” can then be used to lock MKR in the voting system and draw it back to their cold wallet.

### Key Functionalities \(as defined in the smart contract\)

**`auth`** - Checks to confirm that the sender must be a Cold or Hot Wallet.

**`lock` -** Charges the user `wad` MKR tokens, issues an equal amount of IOU tokens to the VoteProxy, and adds `wad` weight to the candidates on the user's selected slate.

**`free` -** Charges the user `wad` IOU tokens, issues an equal amount of MKR tokens to the user, and subtracts `wad` weight from the candidates on the user's selected slate.

**`vote`** - Saves a set of ordered addresses as a slate, moves the voter's weight from their current slate to the new slate, and returns the slate's identifier.

`vote(bytes32 slate)` - Removes voter's weight from their current slate and adds it to the specified slate.

## 4. Gotchas \(Potential source of user error\)

* **One-time proxy setup cost**
  * As a new proxy contract user, you will need to set it up before you can use it for future voting. The price of the setup will depend on the current Ethereum gas price but will ultimately make voting easier and safer for users.
* Any MKR moved/transferred from a user's vote proxy during a Polling vote, will be subtracted/removed from any existing poll that a user has voted on. For your vote to count, you must ensure the MKR is in your wallet when the poll ends.
* **Note:** For the users who don't want to use the `VoteProxy`, they can now vote directly with a single wallet, by depositing directly into Chief and then voting with their wallet.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

* The loss of private keys for both the hot and cold wallet will prevent you from voting.

