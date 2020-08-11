---
description: A generalized wrapper for the Maker Protocol
---

# Proxy Actions - Detailed Documentation

* **Contract Name:** DssProxyActions.sol
* **Type/Category:** Proxy Module
* [**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki#system-architecture)
* [**Contract Source**](https://github.com/makerdao/dss-proxy-actions/blob/master/src/DssProxyActions.sol)
* **Etherscan**
  * \*\*\*\*[**Proxy Actions** ](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
  * \*\*\*\*[**Proxy Actions End** ](https://etherscan.io/address/0x069b2fb501b6f16d1f5fe245b16f6993808f1008)
  * \*\*\*\*[**Proxy Actions DSR**](https://etherscan.io/address/0x07ee93aeea0a36fff2a9b95dd22bd6049ee54f26)

## 1. Introduction \(Summary\)

The Proxy Actions contract is a generalized wrapper for the Maker Protocol. It's basically a set of proxy functions for MCD \(using dss-cdp-manager\). The contract’s purpose is to be used via a personal ds-proxy and can be compared to the original Sag-Proxy as it offers the ability to execute a sequence of actions atomically.

## 2. Contract Details

### Glossary \(Proxy Actions\)

`manager` - enables a formalized process for CDPs to be transferred between owners.

`ilk` - a collateral type.

`usr` - user address.

`cdp` - Collateralized Debt Position \(now, known as `Vault`\).

`dst` - refers to the destination address.

`wad` - quantity of tokens, usually as a fixed point integer with 10^18 decimal places.

`rad` - a fixed point integer, with 10^45 decimal places.

`dink` - change in collateral.

`dart` - change in debt.

`ethJoin` - allows native Ether to be used with the system.

`gemJoin` - allows standard ERC20 tokens to be deposited for use with the system.

`daiJoin` - allows users to withdraw their Dai from the system into a standard ERC20 token.

### Key Functionalities \(as defined in the smart contract\)

### DssProxyActions

* `open()`: creates an `UrnHandler` \(`cdp`\) for the address `usr` \(for a specific `ilk`\) and allows the user to manage it via the internal registry of the `manager`.
* `give()`: transfers the ownership of the `cdp` to the `usr` address in the `manager` registry.
* `giveToProxy()`: transfers the ownership of `cdp` to the proxy of `usr` address \(via `proxyRegistry`\) in the `manager` registry.
* `cdpAllow()`: allows/denies `usr` address to manage the `cdp`.
* `urnAllow()`: allows/denies `usr` address to manage the `msg.sender` address as `dst` for `quit`.
* `flux()`: moves `wad` amount of collateral from `cdp` address to `dst` address.
* `move()`: moves `rad` amount of DAI from `cdp` address to `dst` address.
* `frob()`: executes `frob` to `cdp` address assigning the collateral freed and/or DAI drawn to the same address.
* `quit()`: moves `cdp` collateral balance and debt to `dst` address.
* `enter()`: moves `src` collateral balance and debt to `cdp`.
* `shift()`: moves `cdpSrc` collateral balance and debt to `cdpDst`.
* `lockETH()`: deposits `msg.value` amount of ETH in `ethJoin` adapter and executes `frob` to `cdp` increasing the locked value.
* `safeLockETH()`: same than `lockETH` but requiring `owner == cdp owner`.
* `lockGem()`: deposits `wad` amount of collateral in `gemJoin` adapter and executes `frob` to `cdp` increasing the locked value. Gets funds from `msg.sender` if `transferFrom == true`.
* `safeLockGem()`: same than `lockGem` but requiring `owner == cdp owner`.
* `freeETH()`: executes `frob` to `cdp` decreasing locked collateral and withdraws `wad` amount of ETH from `ethJoin` adapter.
* `freeGem()`: executes `frob` to `cdp` decreasing locked collateral and withdraws `wad` amount of collateral from `gemJoin` adapter.
* `draw()`: updates collateral fee rate, executes `frob` to `cdp` increasing debt and exits `wad` amount of DAI token \(minting it\) from `daiJoin` adapter.
* `wipe()`: joins `wad` amount of DAI token to `daiJoin` adapter \(burning it\) and executes `frob` to `cdp` for decreasing debt.
* `safeWipe()`: same as `wipe` but requiring `owner == cdp owner`.
* `wipeAll()`: joins all the necessary amount of DAI token to `daiJoin` adapter \(burning it\) and executes `frob` to `cdp` setting the debt to zero.
* `safeWipeAll()`: same as `wipeAll` but requiring `owner == cdp owner`.
* `lockETHAndDraw()`: combines `lockETH` and `draw`.
* `openLockETHAndDraw()`: combines `open`, `lockETH` and `draw`.
* `lockGemAndDraw()`: combines `lockGem` and `draw`.
* `openLockGemAndDraw()`: combines `open`, `lockGem` and `draw`.
* `wipeAndFreeETH()`: combines `wipe` and `freeETH`.
* `wipeAllAndFreeETH()`: combines `wipeAll` and `freeETH`.
* `wipeAndFreeGem()`: combines `wipe` and `freeGem`.
* `wipeAllAndFreeGem()`: combines `wipeAll` and `freeGem`.

### **DssProxyActionsFlip**

* `exitETH()`: exits `wad` amount of ETH from `ethJoin` adapter. This is received in the `cdp` urn after the liquidation auction is over.
* `exitGem()`: exits `wad` amount of collateral from `gemJoin` adapter. This is received in the `cdp` urn after the liquidation auction is over.

### **DssProxyActionsEnd**

* `freeETH()`: once the system is caged, this recovers the remaining ETH from `cdp` \(pays the remaining debt if exists\).
* `freeGem()`: once the system is caged, this recovers the remaining token from `cdp` \(pays remaining debt if exists\).
* `pack()`: once the system is caged, this packs `wad` amount of DAI to be ready for cashing.
* `cashETH()`: once the system is caged, this cashes `wad` amount of previously packed DAI and returns the equivalent in ETH.
* `cashGem()`: once the system is caged, this cashes `wad` amount of previously packed DAI and returns the equivalent in gem token.

### **DssProxyActionsDsr**

* `join()`: joins `wad` amount of DAI token to `daiJoin` adapter \(burning it\) and moves the balance to `pot` for DAI Saving Rates.
* `exit()`: retrieves `wad` amount of DAI from `pot` and exits DAI token from `daiJoin` adapter \(minting it\).
* `exitAll()`: performs the same actions as `exit` but for all of the available amount.

## 3. Key Mechanisms & Concepts

The `dss-proxy-actions` was designed to be used by the Ds-Proxy, which is owned individually by users to interact more easily with the Maker Protocol. Note that it is not intended to be used directly \(this will be covered later\). The `dss-proxy-actions` contract was developed to serve as a library for user's ds proxies. In general, the ds proxy receives two parameters:

* **Proxy library address**
  * In this case, the dss proxy actions library
* **Call data**
  * Functions and parameters you want to execute

**Reference the ds-proxy for more information** [**here.**](https://github.com/dapphub/ds-proxy)

#### **DSProxy Summary \(as it relates to the dss-proxy-actions contract\)**

The ds-proxy contact's purpose is to execute transactions and sequences of transactions by proxy. The contract allows code execution using a persistent identity. This can be very useful to execute a sequence of atomic actions. Since the owner of the proxy can be changed, this allows for dynamic ownership models, e.g. a multisig.

* In the later example, we will see how the **execute function** works by using the proxy to execute calldata \_data on contract \_code.
* **The functions parameters are:**
  * address \_target
  * bytes memory \_data
* For the address-target you pass in, that will be the library you want to use, in this case the proxy actions library.
* For the Memory data you pass in, that will be the call data of what exactly you want to execute.
  * **Ex:** Want to open a Vault; then the bytes memory data you will pass in will be an ABI encoder that executes open function with certain parameters.
* **Note:** This is used for both SCD and MCD.

#### **Proxy Action Usage Example \(How a proxy call can look like\)**

```text
proxy.execute(dssProxyActions, abi.encodeWithSignature("open(address,bytes32,address)", address(manager), bytes32("ETH-A"), address(0x123)))
```

* Your ds-proxy is only for you, so we create it for a wallet, so each wallet has its own ds proxy that nobody else should be able to execute with that proxy.
* In MCD, the Vaults will not be owned by your wallet but by your ds proxy, which allows you to execute any function via the ds proxy. Such as performing actions within your Vaults and/or group a lot of actions within one transaction.
* **The execution looks something like this:**
  * Proxy execute \(call to the Ethereum blockchain\) where the first parameter is the contract you are using for the library \(in this case, dss proxy actions\). Not that this is something the frontend will do for you. **Example:** When you want to open a Vault, it will send the transaction to the proxy to execute the execute function, and will then pass in the dss proxy action address and the second parameter that will be passed is the function itself that your ds proxy needs to execute from the dss proxy actions. In this case, we want to execute the open function from dss proxy action - so your proxy will delegate calling the open function from the dss proxy actions library. We need to do it this way because the second parameter is the bytes call data format parameter, so this function we ABI Encode with signature open. So, we pass the signature and then the actual parameters we want to pass to this function. In this case, the manager, the first param of the open function, the Collateral type, and the address you want to create the Vault for \(In this case, the address is 0x123\)
  * **Note:** UI decides which proxy action the user will use.

## 4. **Gotchas**

* **Using dss-proxy-actions directly can result in the loss of control over your Vault**
  * If you open a new Vault via the dss proxy actions \(centralized\) without a ds proxy you would be creating a Vault that is owned by the dss proxy actions that anyone could call publicly. It would be owned by the dss proxy actions contract and anyone could execute actions on your Vault. Therefore, there is significant risk if you directly use the dss proxy actions.
* When interacting with the dss-proxy-actions you need a certain allowance to get Dai or MKR funds from the user's wallet. You need allowance from your wallet to the ds-proxy \(not dss-proxy-actions\). Because, when you execute the dss-proxy actions, you are actually performing that action in the environment of your ds-proxy, which is delegating calls or importing the function from the proxy actions and not executing them directly.

## 5. **Failure Modes**

* **Ds proxy is a general purpose proxy**
  * This means that as a user of the ds-proxy, you can execute whatever you want whether that be the Dss-proxy-actions or any other piece of code. Users are therefore responsible for what they are executing and thus, need to have trust in the UI they are using \(similar to any other transaction you are executing from your wallet\).
  * In terms of failure modes, this means you can execute a malicious proxy action as well as a direct action that could potentially send your ETH to a random address. To be extra cautious, you should check your wallets call data and/or audit what your wallet does as they could potentially present users with some unwanted random call data and execute unwanted actions.
  * **Overall, this point is to say that there is always a risk when using a ds proxy.**

