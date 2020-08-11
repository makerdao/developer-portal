# Currency units

Methods that take numerical values as input can also take instances of token classes that the library provides. These are useful for managing precision, keeping track of units, and passing in wei values. Most methods that return numerical values return them wrapped in one of these classes. There are two types:

* **currency units**, which represent an amount of a type of currency
* **price units**, aka currency ratios, which represent an exchange rate between two currencies.

The classes that begin with `USD` are price units; e.g. `USD_ETH` represents the price of ETH in USD. Useful instance methods:

* **toNumber**: return the raw JavaScript value. This may fail for very large numbers.
* **toBigNumber**: return the raw value as a [BigNumber](https://github.com/MikeMcl/bignumber.js).
* **isEqual**: compare the values and symbols of two different instances.
* **toString**: show the value in human-readable form, e.g. "500 USD/ETH".

```javascript
import Maker from '@makerdao/dai';

// Multi-Collateral Dai

import { ETH, BAT, DAI } from '@makerdao/dai-plugin-mcd';

const maker = await Maker.create(...);
const mgr = maker.service('mcd:cdpManager');

// lock BAT into a new vault and draw Dai
const vault = await mgr.openLockAndDraw(
  'BAT-A',
  BAT(100),
  DAI(100)
);

// Single-Collateral Sai

const {
  MKR,
  SAI,
  ETH,
  WETH,
  PETH,
  USD_ETH,
  USD_MKR,
  USD_SAI
} = Maker;

// These are all identical:

// each method has a default type
cdp.lockEth(0.25);
cdp.lockEth('0.25');

// you can pass in a currency unit instance
cdp.lockEth(ETH(0.25));

// currency units have convenient converter methods
cdp.lockEth(ETH.wei(250000000000000000));

const eth = ETH(5);
eth.toString() == '5.00 ETH';

const price = USD_ETH(500);
price.toString() == '500.00 USD/ETH';

// multiplication handles units
const usd = eth.times(price);
usd.toString() == '2500.00 USD';

// division does too
const eth2 = usd.div(eth);
eth2.isEqual(eth);
```

If you would like to use these helper classes outside of Dai.js, check out [@makerdao/currency](https://github.com/makerdao/currency).

