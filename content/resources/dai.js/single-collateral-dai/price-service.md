# Price Service

## Summary

Retrieve the PriceService through `Maker.service('price')`. The PriceService exposes the collateral and governance tokens' price information that is reported by the oracles in the Maker system.

```javascript
const price = maker.service('price');
```

## getEthPrice

Get the current USD price of ETH, as a `USD_ETH` [price unit](https://makerdao.com/documentation/#units).

```javascript
const ethPrice = await price.getEthPrice();
```

## getMkrPrice

Get the current USD price of the governance token MKR, as a `USD_MKR` [price unit](https://makerdao.com/documentation/#units).

```javascript
const mkrPrice = await price.getMkrPrice();
```

## getPethPrice

Get the current USD price of PETH \(pooled ethereum\), as a `USD_PETH` [price unit](https://makerdao.com/documentation/#units).

```javascript
await pethPrice = price.getPethPrice();
```

## setEthPrice

Set the current USD price of ETH. This requires the necessary permissions and will only be useful in a testing environment.

```javascript
await price.setEthPrice(475);
```

## setMkrPrice

Set the current USD price of the governance token MKR. This requires the necessary permissions and will only be useful in a testing environment.

```javascript
await price.setMkrPrice(950.00);
```

## getWethToPethRatio

Returns the current WETH to PETH ratio.

```javascript
await price.getWethToPethRatio();
```

