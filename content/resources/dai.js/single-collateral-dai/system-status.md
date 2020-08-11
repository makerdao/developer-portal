# System Status

## Summary

To access system status information, retrieve the ETH CDP Service through Maker.service\('cdp'\).

```javascript
const service = maker.service('cdp');
```

## getSystemCollateralization

* **Params:** none
* **Returns:** promise \(resolves to system collateralization ratio\)

`getSystemCollateralization()` returns the collateralization ratio for the entire system, e.g. 2.75

```javascript
const systemRatio = await service.getSystemCollateralization();
```

## getTargetPrice

* **Params:** none
* **Returns:** promise \(resolves to target price\)

`getTargetPrice()` returns the target price of Sai in USD, that is, the value to which Sai is soft-pegged, which historically has been 1. It returns a `USD_SAI` [price unit](system-status.md#units).

```javascript
const targetPrice = await service.getTargetPrice();
```

