# System data

Use the `mcd:systemData` service to look up system-wide parameters. In the code, this is called [SystemDataService](https://github.com/makerdao/dai.js/blob/dev/packages/dai-plugin-mcd/src/SystemDataService.js).

```javascript
const service = maker.service('mcd:systemData');
```

## Instance methods

### getAnnualBaseRate\(\)

Returns the base rate applied to all collateral types, in addition to their individual risk premiums.

```javascript
const base = await service.getAnnualBaseRate();
```

### getSystemWideDebtCeiling\(\)

Returns the debt ceiling for the entire system.

```javascript
const line = await service.getSystemWideDebtCeiling();
```

### isGlobalSettlementInvoked\(\)

Returns a boolean that is true if emergency shutdown has been triggered.

```javascript
const dead = await service.isGlobalSettlementInvoked();
```

