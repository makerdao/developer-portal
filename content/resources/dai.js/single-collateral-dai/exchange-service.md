# Exchange Service

## Summary

Retrieve the OasisExchangeService \(or alternative implementation\) through `maker.service('exchange')`. The exchange service allows to buy and sell DAI, MKR, and other tokens. The default OasisExchangeService implementation uses the OasisDEX OTC market for this.

Requires one of the exchange [plugins](../maker/plugins.md#available-plugins) to be in use.

```javascript
const exchange = maker.service('exchange');
```

## sellDai

Sell a set amount of DAI and receive another token in return.

* **Parameters**
  * `daiAmount` - Amount of DAI to sell.
  * `tokenSymbol` - Token to receive in return.
  * `minFillAmount` - Minimum amount to receive in return.
* **Returns:** promise \(resolves to [OasisOrder](https://makerdao.com/documentation/#oasisorder) once mined\)

```javascript
// Sell 100.00 DAI for 0.30 WETH or more.
const sellOrder = await exchange.sellDai('100.0', 'WETH', '0.30');
```

## **buyDai**

Buy a set amount of DAI and give another token in return.

* **Parameters**
  * `daiAmount` - Amount of DAI to buy.
  * `tokenSymbol` - Token to give in return.
  * `minFillAmount` - Maximum amount to give in return.
* **Returns:** promise \(resolves to [OasisOrder](https://makerdao.com/documentation/#oasisorder) once mined\)

```javascript
// Buy 100.00 DAI for 0.30 WETH or less.
const buyOrder = await exchange.buyDai('100.0', 'WETH', '0.35');
```

## **OasisOrder**

`OasisOrders` have a few methods: `fillAmount`: amount of token received in exchange `fees()`: amount of ether spent on gas `created()`: timestamp of when transaction was mined

```javascript
const buyOrder = await exchange.buyDai('100.0', 'WETH', '0.35');
const fillAmount = buyOrder.fillAmount();
const gasPaid = buyOrder.fees();
const created = buyOrder.created();
```

