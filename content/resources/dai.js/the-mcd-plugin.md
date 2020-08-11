# Vault manager

The vault manager works with vaults that are owned by the [CdpManager](https://github.com/makerdao/dss-cdp-manager/) contract, which is also used by Oasis Borrow. This intermediary contract allows the use of incrementing integer IDs for vaults, familiar to users of Single-Collateral Sai, as well as other conveniences.

In the code, this is called [CdpManager](https://github.com/makerdao/dai.js/blob/dev/packages/dai-plugin-mcd/src/CdpManager.js).

```javascript
const mgr = maker.service('mcd:cdpManager');
```

## Instance methods

The methods below are all asynchronous.

### getCdpIds\(\)

Return an array describing the vaults owned by the specified address. Note that if the vaults were created in Oasis Borrow, the address of the proxy contract should be used.

```javascript
const proxyAddress = await maker.service('proxy').currentProxy();
const data = await mgr.getCdpIds(proxyAddress);
const { id, ilk } = data[0];
// e.g. id = 5, ilk = 'ETH-A'
```

### getCdp\(\)

Get an existing vault by its numerical ID. Returns a [Vault instance](the-mcd-plugin.md#vault-instances).

```javascript
const vault = await mgr.getCdp(111);
```

### open\(\)

Open a new vault with the specified [collateral type](cdptypeservice.md). Will create a [proxy](advanced-configuration/using-ds-proxy.md) if one does not already exist. Returns a [Vault instance](the-mcd-plugin.md#vault-instances). Works with the [transaction manager](advanced-configuration/transactions.md).

```javascript
const txMgr = maker.service('transactionManager');
const open = await mgr.open('ETH-A');
txMgr.listen(open, {
  pending: tx => console.log('tx pending: ' + tx.hash)
});
const vault = await open;
```

### openLockAndDraw\(\)

Open a new vault, then lock and/or draw in a single transaction. Will create a [proxy](advanced-configuration/using-ds-proxy.md) if one does not already exist. Returns a [Vault instance](the-mcd-plugin.md#vault-instances).

```javascript
const vault = await mgr.openLockAndDraw(
  'BAT-A', 
  BAT(1000),
  DAI(100)
);
```

## Vault instances

In the code, these are called [ManagedCdp](https://github.com/makerdao/dai.js/blob/dev/packages/dai-plugin-mcd/src/ManagedCdp.js).

### Properties

**A note on caching:** When a vault instance is created, its data is pre-fetched from the blockchain, allowing the properties below to be read synchronously. This data is cached in the instance. To refresh this data, do the following:

```javascript
vault.reset();
await vault.prefetch();
```

#### collateralAmount

The amount of collateral tokens locked, as a [currency unit](currency-units.md). 

#### collateralValue

The USD value of collateral locked, given the current price according to the price feed, as a [currency unit](currency-units.md).

#### debtValue

The amount of Dai drawn, as a [currency unit](currency-units.md).

#### liquidationPrice

The USD price of collateral at which the Vault becomes unsafe.

#### isSafe

Whether the Vault is currently safe or not.

### Instance methods

All of the methods below are asynchronous and work with the [transaction manager](advanced-configuration/transactions.md). Amount arguments should be [currency units](currency-units.md), e.g.:

```javascript
import { ETH, DAI } from '@makerdao/dai-plugin-mcd';

await vault.lockAndDraw(ETH(2), DAI(20));
```

#### lockCollateral\(amount\)

Deposit the specified amount of collateral.

#### drawDai\(amount\)

Generate the specified amount of Dai.

#### lockAndDraw\(lockAmount, drawAmount\)

Deposit some collateral and generate some Dai in a single transaction.

#### wipeDai\(amount\)

Pay back the specified amount of Dai.

#### wipeAll\(\)

Pay back all debt. This method ensures that dust amounts do not remain.

#### freeCollateral\(amount\)

Withdraw the specified amount of collateral.

#### wipeAndFree\(wipeAmount, freeAmount\)

Pay back some debt and withdraw some collateral in a single transaction.

#### wipeAllAndFree\(freeAmount\)

Pay back all debt, ensuring dust amounts do not remain, and withdraw a specified amount of collateral in a single transaction.

#### give\(address\)

Transfer ownership of this vault to `address`. Note that if the new owner plans to use this vault with Oasis Borrow, it should be transferred to their proxy with [giveToProxy](the-mcd-plugin.md#givetoproxy-address) instead.

#### giveToProxy\(address\)

Look up the proxy contract owned by `address` and transfer ownership of this vault to that proxy.





