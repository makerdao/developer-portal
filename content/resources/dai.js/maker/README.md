# Configuration

## Maker.create

You can configure the behavior of Dai.js by passing different arguments to `Maker.create`. The first argument is the name of a preset, and the second is an options object.

### Presets

* `'browser'`
  * Use this preset when using the library in a browser environment. It will attempt to connect using `window.ethereum` or `window.web3`.
* `'http'`
  * Connect to a JSON-RPC node. Requires `url` to be set in the options.
* `'test'`
  * Use a local node \(e.g. Ganache\) running at `http://127.0.0.1:2000`, and sign transactions using node-managed keys.

```javascript
const makerBrowser = await Maker.create('browser');

const makerHttp = await Maker.create('http', {
  url: 'https://kovan.infura.io/v3/YOUR_INFURA_PROJECT_ID'
});

const makerTest = await Maker.create('test');
```

### Options

* `privateKey`
  * Optional. The private key used to sign transactions. If this is omitted, the first account available from the Ethereum provider will be used. Only used with the `'http'` preset.
  * If this is omitted and the provider does not have an unlocked account, the `maker` object will start in [read-only mode](./#read-only-mode).
* `url`
  * The URL of the node to connect to. Only used with the `'http'` preset.
* `web3.transactionSettings`
  * Object containing transaction options to be applied to all transactions sent through the library.
  * Default value: `{ gasLimit: 4000000 }`
* `web3.confirmedBlockCount`
  * Number of blocks to wait after a transaction has been mined when calling `confirm`. See [Transactions](../advanced-configuration/transactions.md) for further explanation. 
  * Default value: 5
* `web3.inject`
  * For advanced users. You can inject your own custom instance of a Web3 provider with this, instead of using the default HttpProvider.
* `log`
  * Set this to `false` to reduce the verbosity of logging.
* `autoAuthenticate`
  * Set this to `false` to create the Maker instance without connecting yet. If so, you must run `await maker.authenticate()` before using any other methods.

```javascript
// It doesn't necessarily make sense to set all these
// options at the same time (e.g. `url` and `inject`),
// this is just meant to illustrate the shape of the
// options object.
const maker = await Maker.create('http', {
  privateKey: YOUR_PRIVATE_KEY, // '0xabc...'
  url: 'http://some-ethereum-rpc-node.net',
  web3: {
    statusTimerDelay: 2000,
    confirmedBlockCount: 8
    transactionSettings: {
      gasPrice: 12000000000
    },
    inject: someProviderInstance
  },
  log: false,
  autoAuthenticate: false
});
```

## Instance methods

### service\(\)

* **Returns:** service object

Return a service instance that was included in this instance of `maker`.

```javascript
const accountsService = maker.service('accounts');
```

## Services

The MCD plugin defines several services for working with Multi-Collateral Dai. Review [Getting started](../getting-started.md) to see how to add the plugin.

* [`'mcd:cdpManager'`](../the-mcd-plugin.md): for working with Vaults.
* [`'mcd:cdpType'`](../cdptypeservice.md): for reading parameters and live data \(totals and prices\) for collateral types.
* [`'mcd:savings'`](../savingsservice.md): for working with the Dai Savings Rate.
* [`'mcd:systemData'`](../systemdataservice.md): for reading system-wide parameters.

## Read-only mode

As mentioned above, the `Maker` instance can be used in read-only mode, if you just want to read data from the blockchain without signing any transactions. Simply omit the `privateKey` option.

You can start in read-only mode and still [add an account](../advanced-configuration/using-multiple-accounts.md) with the ability to sign transactions later on.

