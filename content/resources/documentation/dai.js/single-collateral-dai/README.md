# Single-Collateral Sai

## Installation

Single-Collateral Dai support in Dai.js is implemented as a [plugin](../maker/plugins.md). The SCD plugin is also available as an [npm](https://www.npmjs.com/package/@makerdao/dai-plugin-scd) package and its source code can be found on [Github](https://github.com/makerdao/dai.js/tree/dev/packages/dai-plugin-scd).

`npm install @makerdao/dai-plugin-scd`

```javascript
import { ScdPlugin } from '@makerdao/dai-plugin-scd';
// or
const { ScdPlugin } = require('@makerdao/dai-plugin-scd');
```

## Quick example

The code below creates a CDP, locks ETH into it, and draws out Sai.

```javascript
import Maker from '@makerdao/dai';
import { ScdPlugin } from '@makerdao/dai-plugin-scd';

async function openLockDraw() {
  const maker = await Maker.create("http", {
    plugins: [ScdPlugin],
    privateKey: YOUR_PRIVATE_KEY,
    url: 'https://kovan.infura.io/v3/YOUR_INFURA_PROJECT_ID'
  });

  await maker.authenticate();
  const cdpService = await maker.service('cdp');
  const cdp = await cdpService.openCdp();

  await cdp.lockEth(0.25);
  await cdp.drawSai(50);

  const debt = await cdp.getDebtValue();
  console.log(debt.toString); // '50.00 SAI'
}

openLockDraw();
```

The services and objects below are used to work with Single-Collateral Sai.

* [CDP Service](eth-cdp-service.md)
* [Collateralized Debt Position](collateralized-debt-position.md)
* [System Status](system-status.md)
* [Token Conversion](token-conversion.md)

## openCdp\(\)

* **Returns:** promise \(resolves to new CDP object once mined\)

`openCdp()` will create a new CDP, and then return the CDP object, which can be used to access other CDP functionality. The promise will resolve when the transaction is mined.

```javascript
const cdpService = await maker.service('cdp');
const newCdp = await cdpService.openCdp();
```

## getCdp\(int id\)

* **Returns:** promise \(resolves to CDP object\)

`getCdp(id)` creates a CDP object for an existing CDP. The CDP object can then be used to interact with your CDP.

```javascript
const cdpService = await maker.service('cdp');
const cdp = await cdpService.getCdp(614);
```

Once you have an instance of a CDP, you can use [CDP instance methods](collateralized-debt-position.md) to read its state and perform actions.

