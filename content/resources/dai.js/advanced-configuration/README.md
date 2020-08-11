# Advanced

To override the address of one of the contracts used by Dai.js or a plugin, you can pass the `smartContract.addressOverrides` option. You need to know the key of the contract in the addresses file to override it.

[List of mainnet addresses](https://github.com/makerdao/dai.js/blob/dev/packages/dai/contracts/addresses/mainnet.json)

```javascript
const service = Maker.create('test' {
  smartContract: {
    addressOverrides: {
      PROXY_REGISTRY: '0xYourAddress'
    }
  } 
});
```



