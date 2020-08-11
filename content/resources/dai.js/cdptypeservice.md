# Collateral types

Use the `'mcd:cdpType'` service to look up parameters for different collateral types in the system. In the code, this is called [CdpTypeService](https://github.com/makerdao/dai.js/tree/dev/packages/dai-plugin-mcd/src/CdpTypeService.js).

```javascript
const service = maker.service('mcd:cdpType');
```

## Properties

### cdpTypes

This is a list of [collateral type instances](cdptypeservice.md#collateral-type-instances), initialized during `Maker.create`.

```javascript
service.cdpTypes.forEach(type => console.log(type.ilk));
// ETH-A
// BAT-A
// USDC-A
```

## Instance methods

### getCdpType\(\)

Return the [collateral type instance](cdptypeservice.md#collateral-type-instances) for the specified currency and/or [ilk](cdptypeservice.md#ilk).

```javascript
// this will error if more than one type is defined for ETH
const type = service.getCdpType(ETH);

// disambiguate using the ilk name string:
const ethA = service.getCdpType(null, 'ETH-A');
```

## Collateral type instances

### Properties

#### ilk

The name of the collateral type as a string, e.g. "ETH-A".

#### totalCollateral

The total amount of collateral locked in all vaults of this collateral type.

#### totalDebt

The total Dai debt drawn against all vaults of this collateral type.

#### debtCeiling

The debt ceiling for this collateral type.

#### liquidationRatio

Vaults of this type become unsafe \(subject to liquidation\) when their ratio between USD value of collateral and Dai drawn is less than or equal to this amount. 

#### price

The USD price of this collateral type's token, using recent price feed data, as a [currency ratio](currency-units.md). \(See "A note on caching" above\).

```javascript
console.log(type.price.toString()); // "9000.01 ETH/USD"
```

#### liquidationPenalty

The penalty added to the Dai amount to be raised at auction when a vault is liquidated, as a percentage. e.g. if the penalty is 13%, this value will be `BigNumber(0.13)`.

#### annualStabilityFee

The annual stability fee \(risk premium\) of the collateral type, not including the [base rate](systemdataservice.md#getannualbaserate), as a BigNumber. e.g. if the rate is 5%, this value will be `BigNumber(0.05)`.

### Caching

When a vault instance is created, its data is pre-fetched from the blockchain, allowing the properties below to be read synchronously. This data is cached in the instance. To refresh this data, do the following:

```javascript
vault.reset();
await vault.prefetch();
```

To refresh the data for all collateral type instances at once:

```javascript
service.resetAllCdpTypes();
await service.prefetchAllCdpTypes();
```

