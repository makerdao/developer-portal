# Getting started

## **Installation**

Install the package with npm in your terminal:

`npm install @makerdao/dai`

Once it's installed, import the module into your project as shown below.

```javascript
import Maker from '@makerdao/dai';
// or
const Maker = require('@makerdao/dai');
```

Multi-Collateral Dai support in Dai.js is implemented as a [plugin](maker/plugins.md). This may change in the future. The MCD Plugin is also available as an [npm](https://www.npmjs.com/package/@makerdao/dai-plugin-mcd) package and its source code can be found on [Github](https://github.com/makerdao/dai.js/tree/dev/packages/dai-plugin-mcd).

`npm install @makerdao/dai-plugin-mcd`

```javascript
import { McdPlugin } from '@makerdao/dai-plugin-mcd';
// or
const { McdPlugin } = require('@makerdao/dai-plugin-mcd');
```

\(Note the `.default` at the end of the line when using `require`.\)

**UMD**

This library is also usable as a [UMD module](https://github.com/umdjs/umd), which you can build with `npm run build:frontend`.

```javascript
<script src="./dai.js" />

<script>
// once the script loads, window.Maker is available
</script>
```

## **Quick Examples**

### Look up information about a vault

This code uses [`getCdpIds`](the-mcd-plugin.md#getcdpids) to look up a vault that was created in the [Oasis Borrow](https://oasis.app/borrow) UI. Since this code is only reading data, not creating any transactions, it is not necessary to provide a private key or connect a wallet.

```javascript
// you provide these values
const infuraKey = 'your-infura-api-key';
const ownerAddress = '0xf00...';

const maker = await Maker.create('http', {
  plugins: [McdPlugin],
  url: `https://mainnet.infura.io/v3/${infuraKey}`
});

const manager = maker.service('mcd:cdpManager');
const proxyAddress = maker.service('proxy').getProxyAddress(ownerAddress);
const data = await manager.getCdpIds(proxyAddress); // returns list of { id, ilk } objects
const vault = await manager.getCdp(data[0].id);

console.log([
  vault.collateralAmount, // amount of collateral tokens
  vault.collateralValue,  // value in USD, using current price feed values
  vault.debtValue,        // amount of Dai debt
  vault.collateralizationRatio, // collateralValue / debt
  vault.liquidationPrice  // vault becomes unsafe at this price
].map(x => x.toString());
```

### Create a vault

The code below opens a Vault, locks ETH into it, and draws out Dai. 

Since this code sends transactions, it requires an account that can sign transactions. The simplest way to do this is to provide a `privateKey` configuration option as shown below, but you can also connect to Metamask or other browser-based providers, or connect to hardware wallets.

```javascript
import Maker from '@makerdao/dai';
import { McdPlugin, ETH, DAI } from '@makerdao/dai-plugin-mcd';

// you provide these values
const infuraKey = 'your-infura-api-key';
const myPrivateKey = 'your-private-key';

const maker = await Maker.create('http', {
  plugins: [McdPlugin],
  url: `https://mainnet.infura.io/v3/${infuraKey}`,
  privateKey: myPrivateKey
});

// verify that the private key was read correctly
console.log(maker.currentAddress());

// make sure the current account owns a proxy contract;
// create it if needed. the proxy contract is used to 
// perform multiple operations in a single transaction
await maker.service('proxy').ensureProxy();

// use the "vault manager" service to work with vaults
const manager = maker.service('mcd:cdpManager');
  
// ETH-A is the name of the collateral type; in the future,
// there could be multiple collateral types for a token with
// different risk parameters
const vault = await manager.openLockAndDraw(
  'ETH-A', 
  ETH(50), 
  DAI(1000)
);

console.log(vault.id);
console.log(vault.debtValue); // '1000.00 DAI'
```

In the next section, learn more about how to configure the Maker instance with `Maker.create`. Or jump to learning more about [accounts](advanced-configuration/using-multiple-accounts.md), [vaults](the-mcd-plugin.md), [proxies](advanced-configuration/using-ds-proxy.md), and [currency units](currency-units.md).

## Integration Examples

For larger examples of integrating this library, check out this [repo](https://github.com/makerdao/integration-examples) and the [Dai react template](https://github.com/ethanbennett/dai-react-template).



