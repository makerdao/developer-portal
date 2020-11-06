# DSProxy

```javascript
const service = maker.service('proxy');
```

## Summary

The `DSProxyService` includes all the functionality necessary for interacting with both types of proxy contracts used in Maker products: **profile proxies** and **forwarding proxies**.

Forwarding proxies are simple contracts that aggregate function calls in the body of a single method. These are used in the [CDP Portal](https://github.com/makerdao/sai-proxy) and [Oasis Direct](https://github.com/makerdao/oasis-direct-proxy) in order to allow users to execute multiple transactions atomically, which is both safer and more user-friendly than implementing several steps as discrete transactions.

```text
// Forwarding proxy

function lockAndDraw(address tub_, bytes32 cup, uint wad) public payable {
  lock(tub_, cup);
  draw(tub_, cup, wad);
}
```

Forwarding proxies are meant to be as simple as possible, so they lack some features that could be important if they are to be used as interfaces for more complex smart contract logic. This problem can be solved by using profile proxies \(i.e. copies of [DSProxy](https://github.com/dapphub/ds-proxy)\) to execute the functionality defined in the forwarding proxies.

The first time an account is used to interact with any Maker application, the user will be prompted to deploy a profile proxy. This copy of DSProxy can be used in any product, including dai.js, by way of a universal [proxy registry](https://github.com/makerdao/proxy-registry/tree/master). Then, the calldata from any function in the forwarding proxy can be passed to DSProxy's `execute()`method, which runs the provided code in the context of the profile proxy.

```javascript
// Calling the forwarding proxy with dai.js

function lockAndDraw(tubContractAddress, cdpId, daiAmount, ethAmount) {
  const saiProxy = maker.service('smartContract').getContractByName('SAI_PROXY');

  return saiProxy.lockAndDraw(
    tubContractAddress,
    cdpId,
    daiAmount,
    {
      value: ethAmount,
      dsProxy: true
    }
  );
}
```

This makes it possible for users' token allowances to persist from one Maker application to another, and it allows users to [recover any funds](https://proxy-recover-funds.surge.sh/) mistakenly sent to the proxy's address. Many of the functions in `DSProxyService` will only be relevant to `power users`. All that is strictly required to automatically generate a function's calldata and find the correct profile proxy is the inclusion of `{ dsProxy: true }` in the options object for any transaction — provided the user has already deployed a profile proxy. If that's not certain, it may also be necessary to query the registry to determine if a user already owns a proxy, and to `build` one if they do not.

## currentProxy\(\)

* **Params:** None
* **Returns:** promise \(resolves to address **or** `null`\)

If the `currentAccount` \(according the `Web3Service`\) has already deployed a DSProxy, `currentProxy()` returns its address. If not, it returns `null`. It will update automatically in the event that the active account is changed. This function should be used to check whether a user has a proxy before attempting to build one.

```javascript
async function getProxy() {
  return maker.service('proxy').currentProxy();
}
```

## build\(\)

* **Params:** None
* **Returns:** `TransactionObject`

`build` will deploy a copy of DSProxy owned by the current account. **This transaction will revert if the current account already owns a profile proxy.** By default, `build()` returns after the transaction is mined.

```javascript
async function buildProxy() {
  const proxyService = maker.service('proxy');
  if (!proxyService.currentProxy()) {
    return proxyService.build();
  }
}
```

## ensureProxy\(\)

This convenience function will either return an existing proxy or create one.

```javascript
const proxyAddress = await maker.service('proxy').ensureProxy();
```

## getProxyAddress\(\)

* **Params:** Address \(optional\)
* **Returns:** promise \(resolves to contract address\)

`getProxyAddress` will query the proxy registry for the profile proxy address associated with a given account. If no address is provided as a parameter, the function will return the address of the proxy owned by the `currentAccount`.

```javascript
const proxy = await maker.service('proxy').getProxyAddress('0x...');
```

## getOwner\(\)

* **Params:** Address
* **Returns:** promise \(resolves to address\)

`getOwner` will query the proxy registry for the owner of a provided instance of DSProxy.

```javascript
const owner = await maker.service('proxy').getOwner('0x...');
```

## setOwner\(\)

* **Params:** Address of new owner, DSProxy address \(optional\)
* **Returns:** `TransactionObject`

`setOwner` can be used to give a profile proxy to a new owner. The address of the recipient account must be specified, but the DSProxy address will default to `currentProxy` if the second parameter is excluded.

```javascript
await maker.service('proxy').setOwner(newOwner, proxyAddress);
```

