---
title: CDP Manager
description: Managing Vaults to be transferred between users
group: smart-contracts
components:
  - vaults
  - proxy
tags:
  - vaults
slug: cdp-manager-detailed-documentation
contentType: documentation
parent: introduction-to-proxy-module
---

# CDP Manager

- **Contract Name:** cdpManager.sol
- **Type/Category:** Vault Management
- [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki#system-architecture)
- [**Contract Source**](https://github.com/makerdao/dss-cdp-manager/tree/master/src)
- [**Etherscan**](https://etherscan.io/address/0x5ef30b9986345249bc32d8928b7ee64de9435e39)

## 1. Introduction (Summary)

**Summary:** The `DssCdpManager` (aka `manager`) was created to enable a formalized process for Vaults to be transferred between owners, much like assets are transferred. It is recommended that all interactions with Vaults be done through the CDP Manager. Once unlocked collateral has been deposited into the Maker Protocol, users can make use of the following features:

- Multi Vault ownership and numerical identification (users can own N number of Vaults)
- Vault transferability

![MCD System Diagram: Vault User and Vault Manager interaction diagram](/images/documentation/cdp-manager.png)

**Note:** The MCD system diagram above shows that the Vault user goes through the proxy in order to interact with the CDP Manager but it is also possible to directly use the CDP Manager contract.

## 2. Contract Details

### Key Functionalities (as defined in the smart contract)

- `cdpAllow(uint cdp, address usr, uint ok)`: Allow/Disallow (`ok`) a `usr` address to manage the `cdp`.
- `urnAllow(address usr, uint ok)` : Allow/Disallow (`ok`) a `usr` address to interact with an urn for the purposes of either entering (`src`) or quitting `(dst).`
- `open(bytes32 ilk, address usr)`: Opens a new Vault for `usr` to be used for an `ilk` collateral type.
- `give(uint cdp, address dst)`: Transfers `cdp` to `dst`.
- `frob(uint cdp, int dink, int dart)`: Increments/decrements the `ink` amount of collateral locked and increments/decrements the `art` amount of debt in the `cdp` depositing the generated DAI or collateral freed in the `cdp` address.
- `frob(uint cdp, address dst, int dink, int dart)`: Increments/decrements the `ink` amount of collateral locked and increments/decrements the `art` amount of debt in the `cdp` depositing the generated DAI or collateral freed into a **specified** `dst` address.
- `flux(bytes32 ilk, uint cdp, address dst, uint wad)`: Moves `wad` (precision 18) amount of collateral `ilk` from `cdp` to `dst`.
- `flux(uint cdp, address dst, uint wad)`: Moves `wad` amount of `cdp` collateral from `cdp` to `dst`.
- `move(uint cdp, address dst, uint rad)`: Moves `rad` (precision 45) amount of DAI from `cdp` to `dst`.
- `quit(uint cdp, address dst)`: Moves the collateral locked and debt generated from `cdp` to `dst`.

**Note:** `dst` refers to the destination address.

### Storage Layout

- `vat` : core contract address that holds the Vaults.
- `cdpi`: Auto incremental id.
- `urns`: Mapping `CDPId => UrnHandler`
- `list`: Mapping `CDPId => Prev & Next CDPIds` (double linked list)
- `owns`: Mapping `CDPId => Owner`
- `ilks`: Mapping `CDPId => Ilk` (collateral type)
- `first` : Mapping `Owner => First CDPId`
- `last`: Mapping `Owner => Last CDPId`
- `count`: Mapping `Owner => Amount of CDPs`
- `allows`: Mapping `Owner => CDPId => Allowed Addr => True/False`

## 3. Key Mechanisms & Concepts

### Summary

The CDP Manager was created as a way to enable Vaults to be treated more like assets that can be exchanged. Originally, the [dss](https://github.com/makerdao/dss/tree/master/src) core contracts did not have the functionality to enable transferring Vault positions. The CDP Manager was created to wrap this functionality and enable transferring between users.

### High-level Purpose

- The `manager` receives the `vat` address in its creation and acts as an interface contract between it and the users.
- The `manager` keeps an internal registry of `id => owner` and `id => urn` allowing for the `owner` to execute `vat` functions for their `urn` via the `manager`.
- The `manager` keeps a double linked list structure that allows the retrieval of all the Vaults that an `owner` has via on-chain calls.
  - In short, this is what the `GetCdps` is for. This contract is a helper contract that allows the fetching of all the Vaults in just one call.

### CDP **Manager Usage Example (common path):**

- A User executes `open` and gets a `CDPId` in return.
- After this, the `CDPId` gets associated with an `urn` with `manager.urns(cdpId)` and then `join`'s collateral to it.
- The user can then execute `frob` to choose which `dst` address they want to use to send the generated DAI to.
- If the user executes `frob` without `dst` then the generated DAI will remain in the Vault's `urn`. In this case, the user can `move` it at a later point in time.
  - Note that this is the same process for collateral that is freed after `frob` (for the `frob` function that doesn't require the `dst` address). The user can `flux` it to another address at a later time.
- In the case where a user wants to abandon the `manager`, they can use `quit` as a way to migrate their position of their Vault to another `dst` address.

## 4. Gotchas (Potential source of user error)

- For the developers who want to integrate with the `manager`, they will need to understand that the Vault actions are still in the `urn` environment. Regardless of this, the `manager` tries to abstract the `urn` usage by a `CDPId`. This means that developers will need to get the `urn` (`urn = manager.urns(cdpId)`) to allow the `join`ing of collateral to that Vault.
- As the `manager` assigns a specific `ilk` per `CDPId` and doesn't allow others to use it for theirs, there is a second `flux` function which expects an `ilk` parameter. This function has the simple purpose of taking out collateral that was wrongly sent to a Vault that can't handle it/is incompatible.
- **Frob Function(s):**
  - When you `frob` in the CDP manager, you generate new DAI in the `vat` via the CDP manager which is then deposited in the `urn` that the CDP manager manages. This process depends on which `frob` function you use (there exist **two** `frob` functions). In short, one allows a destination address and the other doesn’t require it.
  - If you use the `frob` function that has the destiny (`dst`) address, you are saying that you can send any Dai generated or collateral that has been freed. The second `frob` function is meant for leaving the collateral in the `urn` address because the `urn` is owned by the CDP manager. In this case, you would need to manually use the `flux` or `move` functions to get the DAI or collateral out. These functions (`flux` and `move`) may be more beneficial for a developer working with the proxy function, as it allows for more flexibility. For example, by using these functions you can move a specific amount of collateral and can use the other functions to do it. Overall, it can make working with it a little more flexible on specific developer needs.
- As mentioned above in the summary, the [dss](https://github.com/makerdao/dss/tree/master/src) core contracts originally did not have the functionality to enable the transfer of Vault positions. Since then, the core contracts have also implemented a native transfer functionality called `fork` which allows the transferring of a Vault to another address. However, there is a restriction, which is that the address owner that will be receiving the Vault needs to provide authorization that they do in fact want to receive it. This was created for the situation when a user is transferring the collateral that is locked as well as the debt generated. If you are simply moving collateral to another address, there is no issue but in the case that you are also transferring the debt generated, there is a chance of putting a perfectly safe Vault in a risky position. This makes the contract functionality a little more restrictive. Therefore, the CDP manager is a good option to keep a simple way of transferring Vaults and recognizing them via a numeric ID.

## 5. Failure Modes (Bounds on Operating Conditions & External Risk Factors)

### **Potential Issues around Chain Reorganization**

When `open` is executed, a new `urn` is created and a `cdpId` is assigned to it for a specific `owner`. If the user uses `join` to add collateral to the `urn` immediately after the transaction is mined, there is a chance that a reorganization of the chain occurs. This would result in the user losing the ownership of that `cdpId`/`urn` pair, therefore losing their collateral. However, this issue can only arise when avoiding the use of the [proxy functions](https://github.com/makerdao/dss-proxy-actions) via a [profile proxy](https://github.com/dapphub/ds-proxy) as the user will `open` the `cdp` and `join` collateral in the same transaction.
