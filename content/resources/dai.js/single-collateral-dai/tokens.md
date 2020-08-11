# Tokens

Get a token object through the `getToken(tokenSymbol)` function on the tokenService.

The list of tokens that can be passed into `getToken()` are: SAI, MKR, WETH, PETH, ETH.

This list can also be obtained with `tokenService.getTokens()`. This function returns a string representation of the token symbol, e.g. 'SAI', which can also be passed into `getToken`.

When the Multi-Collateral Dai plugin is in use, `getToken('DAI')` will return a token object for Dai.

```javascript
const tokenService = maker.service('token');
const sai = tokenService.getToken('SAI');
const weth = tokenService.getToken('WETH');
const peth = tokenService.getToken('PETH');
```

Most of the methods below can be called on any token object. `deposit` and `withdraw` are for WETH only, and `join` and `exit` are for PETH only.

## allowance

```javascript
const allowance = await dai.allowance('0x...owner', '0x...spender');
```

* Params:
* `tokenOwner` - address of token owner
* `spender` - address of token spender
* Returns: promise \(resolves to token allowance\)

`allowance` returns a [currency unit](https://makerdao.com/documentation/#units) representing the token allowance.

## balance

```javascript
const balance = await dai.balance();
```

* Params: none
* Returns: promise \(resolves balance of current account\)

`balance` returns a [currency unit](https://makerdao.com/documentation/#units) representing the token balance of the current account

## balanceOf

```javascript
const balanceOf = await dai.balanceOf('0x...f00');
```

* Params: address to check
* Returns: promise \(resolves balance of address\)

`balanceOf` returns a [currency unit](https://makerdao.com/documentation/#units) representing the token balance of the supplied account.

## totalSupply

```javascript
const totalSupply = await dai.totalSupply();
```

* Params: none
* Returns: promise \(resolves total supply of token\)

`totalSupply` returns a [currency unit](https://makerdao.com/documentation/#units) representing the total token supply

## approve

```javascript
return await dai.approve('0x...f00', DAI(10));
```

* Params:
* spender - address of token spender
* amount - amount of token to allow
* Returns: promise \(resolves to [transactionObject](https://makerdao.com/documentation/#transactions) once mined\)

`approve` approves the spending address to spend up to `amount` of `msg.sender`'s tokens.

## approveUnlimited

```javascript
return await dai.approveUnlimited('0x...f00');
```

* Params: address of token spender
* Returns: promise \(resolves to [transactionObject](https://makerdao.com/documentation/#transactions) once mined\)

`approveUnlimited` approves the spending address to spend the maximum amount of `msg.sender`'s tokens.

## transfer

```javascript
return await dai.transfer('0x...f00', DAI(10));
```

* Params:
* to - address to send to
* amount - amount of token to send
* Returns: promise \(resolves to [transactionObject](https://makerdao.com/documentation/#transactions) once mined\)

`transfer` transfers `amount` of token to `to` address.

## transferFrom

```javascript
return await dai.transferFrom('0x...fr0m', '0x...t0', DAI(10));
```

* Params:
* from - address to send tokens from
* to - address to send to
* amount - amount of token to send
* Returns: promise \(resolves to [transactionObject](https://makerdao.com/documentation/#transactions) once mined\)

`transferFrom()` transfers `amount` of token from `from` address to `to` address. Transaction will fail if `msg.sender` does not have allowance to transfer the amount of tokens `from` the from address.

## deposit \(WETH only\)

```javascript
return await weth.deposit(ETH(10));
```

* Params: amount of Eth to deposit
* Returns: promise \(resolves to [transactionObject](https://makerdao.com/documentation/#transactions) once mined\)

`deposit` converts `amount` of Eth to `amount` of Weth.

## withdraw \(WETH only\)

```javascript
return await weth.withdraw(WETH(10));
```

* Params: amount of Weth to withdraw
* Returns: promise \(resolves to [transactionObject](https://makerdao.com/documentation/#transactions) once mined\)

`withdraw` converts `amount` of Weth to `amount` of Eth.

## join \(PETH only\)

```javascript
return await peth.join(WETH(10));
```

* Params: amount of Weth to join
* Returns: promise \(resolves to [transactionObject](https://makerdao.com/documentation/#transactions) once mined\)

`join` converts `amount` of Weth to Peth, at the [Weth to Peth Ratio](https://makerdao.com/documentation/#getwethtopethratio).

## exit \(PETH only\)

```javascript
return await peth.exit(PETH(10));
```

* Params: amount of Peth to exit
* Returns: promise \(resolves to [transactionObject](https://makerdao.com/documentation/#transactions) once mined\)

`withdraw` converts `amount` of Peth to Weth, at the [Weth to Peth Ratio](https://makerdao.com/documentation/#getwethtopethratio).

