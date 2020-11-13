---
title: Proxy Module
description: Allowing Users to interact with the Maker Protocol more easily
group: smart-contracts
component:
  - proxy
tags:
  - proxy
slug: introduction-to-proxy-module
contentType: documentation
root: true
---

# Proxy Module

* **Module Name:** Proxy Module
* **Type/Category: Proxy —&gt;** DsrManager.sol, DssCdpManager.sol, VoteProxy.sol & DssProxyActions.sol
* \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
* **Source code:**
  * \*\*\*\*[**DSR Manager**](https://github.com/makerdao/dsr-manager/blob/master/src/DsrManager.sol)\*\*\*\*
  * \*\*\*\*[**CDP Manager**](https://github.com/makerdao/dss-cdp-manager/blob/master/src/DssCdpManager.sol)
  * \*\*\*\*[**Vote Proxy**](https://github.com/makerdao/vote-proxy/blob/master/src/VoteProxy.sol)\*\*\*\*
  * \*\*\*\*[**Proxy Actions**](https://github.com/makerdao/dss-proxy-actions/blob/master/src/DssProxyActions.sol)

## 1. Introduction \(Summary\)

The Proxy module was created in order to make it more convenient for users/developers to interact with the Maker Protocol. It contains contract interfaces, proxies, and aliases to functions necessary for both DSR and Vault management and Maker governance.

![](/images/documentation/proxymodulenew.png)

## 2. Module Details

### Proxy Module Components Documentation

1. \*\*\*\*[**DSR Manager - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/proxy-module/dsr-manager-detailed-documentation)\*\*\*\*
2. [**CDP Manager - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/proxy-module/cdp-manager-detailed-documentation)
3. [**Vote Proxy - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/proxy-module/vote-proxy-detailed-documentation)
4. [**Proxy Actions - Detailed Documentation**](https://docs.makerdao.com/smart-contract-modules/proxy-module/proxy-actions-detailed-documentation)

## 3. Key Mechanism and Concepts

#### Why are these components important to the Multi-Collateral Dai \(MCD\) System?

#### **DSR Manager**

The `DsrManager` provides an easy to use smart contract that allows service providers to deposit/withdraw `dai` into the contract [pot](https://docs.makerdao.com/smart-contract-modules/rates-module/pot-detailed-documentation), to start earning the Dai Saving Rate on a pool of dai in a single function call without the need of a `ds-proxy` contract. This is useful for smart contracts integrating DSR functionality. 

#### **CDP Manager**

The `DssCdpManager` \(aka `manager`\) was created to enable a formalized process for Vaults to be transferred between owners. In short, the `manager` works by having a `dss` wrapper that allows users to interact with their Vaults in an easy way, treating them as non-fungible tokens \(NFTs\).

#### **Vote Proxy**

The VoteProxy **facilitates online voting with offline MKR storage**. By having a VoteProxy, this allows users to have a linked hot wallet that can pull and push MKR from the proxy’s corresponding cold wallet and to DS-Chief, where voting can take place with the online hot wallet.

**There are two main reasons to have/use this contract:**

1. To support two different voting mechanisms
2. To minimize the time that MKR owners need to have their wallet online.

#### **Proxy Actions**

The `dss-proxy-actions` was designed to be used by the Ds-Proxy, which is owned individually by users to interact more easily with the Maker Protocol. Note that it is not intended to be used directly \(this will be covered later\). The dss-proxy-actions contract was developed to serve as a library for user's ds-proxies.

**In general, the ds proxy receives two parameters:**

* **Proxy library address**
  * In this case, the dss proxy actions library.
* **Call data**
  * Functions and parameters you want to execute.

## 4. Gotchas \(Potential sources of user error\)

* **DSR Manager**
  * For developers who want to integrate with `DsrManager`, it is important to realize that user balances in the `pot` will be owned by the `DsrManager`, which has an internal mapping to determine user balances. Consequently the deposited Dai in DSR might not show up in solutions that are based on `ds-proxy` \(such as [oasis.app/save](https://oasis.app/save)\)
  * Read more [here](https://docs.makerdao.com/smart-contract-modules/proxy-module/dsr-manager-detailed-documentation).
* **CDP Manager**
  * For the developers who want to integrate with the `manager`, they will need to understand that the Vault actions are still in the `urn` environment. Regardless of this, the `manager` tries to abstract the `urn` usage by a `CDPId`. This means that developers will need to get the `urn` \(`urn = manager.urns(cdpId)`\) to allow the `join`ing of collateral to that Vault.
  * Read more [here](https://docs.makerdao.com/smart-contract-modules/proxy-module/cdp-manager-detailed-documentation).
* **Vote Proxy**
  * **One-time proxy setup cost:** As a new proxy contract user, you will need to set it up before you can use it for future voting. The price of the setup will depend on the current Ethereum gas price but will ultimately make voting easier and safer for users.
  * Read more [here](https://docs.makerdao.com/smart-contract-modules/proxy-module/vote-proxy-detailed-documentation).
* **Proxy Actions**
  * **Using dss-proxy-actions directly can result in the loss of control over your Vault:** If you open a new Vault via the dss proxy actions \(centralized\) without a ds proxy you would be creating a Vault that is owned by the dss proxy actions that anyone could call publicly. It would be owned by the dss proxy actions contact and anyone could execute actions on your Vault. Therefore, if you use the dss proxy actions directly it can be quite risky.
  * Read more [here](https://docs.makerdao.com/smart-contract-modules/proxy-module/proxy-actions-detailed-documentation).

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

* **CDP Manager**
  * **Potential Issues around Chain Reorganization**
    * When `open` is executed, a new `urn` is created and a `cdpId` is assigned to it for a specific `owner`. If the user uses `join` to add collateral to the `urn` immediately after the transaction is mined, there is a chance that a reorganization of the chain occurs. This would result in the user losing the ownership of that `cdpId`/`urn` pair, therefore losing their collateral. However, this issue can only arise when avoiding the use of the [proxy functions](https://github.com/makerdao/dss-proxy-actions) via a [profile proxy](https://github.com/dapphub/ds-proxy) as the user will `open` the `cdp` and `join` collateral in the same transaction.
  * Read more [here](https://docs.makerdao.com/smart-contract-modules/proxy-module/cdp-manager-detailed-documentation#5-failure-modes-bounds-on-operating-conditions-and-external-risk-factors).
* **Vote Proxy**
  * The loss of private keys for both the hot and cold wallet will prevent you from voting.
* **Proxy Actions**
  * **Ds proxy is a general purpose proxy / there is always a risk when using a proxy**
    * In terms of failure modes, this means you can execute a malicious proxy action as well as a direct action that could potentially send your ETH to a random address. To be extra cautious, you should check your wallets call data and/or audit what your wallet does as they could potentially present users with some unwanted random call data and execute unwanted actions.
  * **Read more here \(link\)**

