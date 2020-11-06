# Token Conversion

Get the token conversion service with maker.service\('conversion'\).

```javascript
const conversionService = maker.service('conversion');
```

The token conversion service offers functions to convert between Eth, Weth and Peth, handling allowances when necessary.

## convertEthToWeth

```javascript
return await conversionService.convertEthToWeth(ETH(10));
```

* Params: amount of Eth to convert
* Returns: promise \(resolves to transactionObject once mined\)

**Note:** this is the same as weth.deposit

`convertEthToWeth` deposits ETH into the WETH contract

## convertWethToPeth

```javascript
return await conversionService.convertWethToPeth(WETH(10));
```

* Params: amount of Weth to convert
* Returns: promise \(resolves to transactionObject once mined\)

`convertWethToPeth` joins WETH into PETH, first giving token allowance if necessary.

**Note:** this process is not atomic if a token allowance needs to be set, so it's possible for one of the transactions to succeed but not both. See [DsProxy](../advanced-configuration/using-ds-proxy.md) for executing multiple transactions atomically. Also, [peth.join](tokens.md#join-peth-only) can be called instead if you do not want the allowance to be set first automatically.

## convertEthToPeth

```javascript
return await conversionService.convertEthToPeth(ETH(10));
```

* Params: amount of Eth to convert
* Returns: promise \(resolves to transactionObject once mined\)

`convertEthToPeth` awaits convertEthToWeth, then calls convertWethToPeth

**Note:** this process is not atomic, so it's possible for some of the transactions to succeed but not all. See Using DsProxy for executing multiple transactions atomically.

## convertWethToEth

```javascript
return await conversionService.convertconvertWethToEth(WETH(10));
```

* Params: amount of Weth to convert
* Returns: promise \(resolves to transactionObject once mined\)

`convertWethToEth` withdraws Eth from Weth contract

**Note:** this is the same as weth.withdraw

## convertPethToWeth

```javascript
return await conversionService.convertPethToWeth(PETH(10));
```

* Params: amount of Peth to convert
* Returns: promise \(resolves to transactionObject once mined\)

`convertPethToWeth` exits PETH into WETH, first giving token allowance if necessary

**Note:** this process is not atomic if a token allowance needs to be set, so it's possible for one of the transactions to succeed but not both. See Using DsProxy for executing multiple transactions atomically. Also, peth.exit can be called instead if you do not want the allowance to be set first automatically.

## convertPethToEth

```javascript
return await conversionService.convertPethToEth(PETH(10));
```

* Params: amount of Peth to convert
* Returns: promise \(resolves to transactionObject once mined\)

`convertPethToEth` awaits convertPethToWeth, then calls convertWethToEth

**Note:** this process is not atomic, so it's possible for some of the transactions to succeed but not all. See Using DsProxy for executing multiple transactions atomically.

