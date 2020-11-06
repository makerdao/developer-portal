# CDP Service

## Summary

This page applies only to Single-Collateral Dai.

Retrieve the ETH CDP Service through Maker.service\('cdp'\). The ETH CDP Service exposes risk parameter information for the Ether CDP type \(in single-collateral Dai, this is the only CDP Type\).

```javascript
const service = maker.service('cdp');
```

## getLiquidationRatio

* **Params:** none
* **Returns:** promise \(resolves to liquidation ratio\)

`getLiquidationRatio()` returns a decimal representation of the liquidation ratio, e.g. 1.5

```javascript
const ratio = await service.getLiquidationRatio();
```

## getLiquidationPenalty

* **Params:** none
* **Returns:** promise \(resolves to liquidation penalty\)

`getLiquidationPenalty()` returns a decimal representation of the liquidation penalty, e.g. 0.13

```javascript
const penalty = await service.getLiquidationPenalty();
```

## getAnnualGovernanceFee

* **Params:** none
* **Returns:** promise \(resolves to yearly governance fee\)

`getAnnualGovernanceFee()` returns a decimal representation of the annual governance fee, e.g. 0.005.

```javascript
const fee = await service.getAnnualGovernanceFee();
```

**Note:** This is often referred to as the `Stability Fee`, even though technically the `Stability Fee` is the fee that is paid in Sai, and the `Governance Fee` is the fee that is paid in MKR. But since fees are only paid in MKR in Single-Collateral Dai, and only paid in Dai in Multi-Collateral Dai, the fee in Single-Collateral Sai is often referred to as the `Stability Fee` to be consistent with the term that will be used in Multi-Collateral Dai and to avoid unduly confusing regular users.

