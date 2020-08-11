# Dai Savings Rate

Use the `'mcd:savings'` service to work with the Dai Savings Rate system. In the code, this is called [SavingsService](https://github.com/makerdao/dai.js/blob/dev/packages/dai-plugin-mcd/src/SavingsService.js).

```javascript
const service = maker.service('mcd:savings');
```

## Instance methods

All the methods below are asynchronous. `join`, `exit`, and `exitAll` use a [proxy contract](advanced-configuration/using-ds-proxy.md).

### join\(amount\)

Deposit the specified amount of Dai into the Dai Savings Rate \(DSR\) contract.

```javascript
await service.join(DAI(1000));
```

### exit\(amount\)

Withdraw the specified amount of Dai from the DSR contract.

### exitAll\(\)

Withdraw all Dai owned by the current account from the DSR contract.

### balance\(\)

Return the amount of Dai in the DSR contract owned by the [current address](advanced-configuration/using-multiple-accounts.md). Strictly speaking, this method returns the amount of Dai owned by the proxy contract for the current address. to work with the methods above.

### balanceOf\(address\)

Return the amount of Dai in the DSR contract owned by the specified address.

### getTotalDai\(\)

Get the total amount of Dai in the DSR contract for all users.

### getYearlyRate\(\)

Get the current annual savings rate.

