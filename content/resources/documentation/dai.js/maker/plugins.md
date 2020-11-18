---
title: Plugins
description: Plugins allow a developer to add functionality for specific needs without increasing the size of the core library.
group: sdks
components:
  - dai-js
tags:
  - javascript
slug: dai-js-plugins
contentType: documentation
parent: maker-object-introduction
---

# Plugins

Dai.js supports plugins, which allow a developer to add functionality hardware wallet support, exchange support, etc. for specific needs without increasing the size and dependency list of the core library.

### Available Plugins

1. [Trezor Plugin](https://github.com/makerdao/dai-plugin-trezor-web) for using Trezor with dai.js in a browser environment.
2. [Ledger Plugin](https://github.com/makerdao/dai-plugin-ledger-web) for using Ledger in a browser environment.
3. [Governance Plugin](https://github.com/makerdao/dai-plugin-governance) for working with the governance contracts.
4. [eth2dai Instant Plugin](dai-plugin-eth2dai-instant) for atomic trading on maker OTC Oasis.
5. [Maker OTC Plugin](https://github.com/makerdao/dai-plugin-maker-otc) for interacting with the maker OTC contract Oasis.
6. [MCD Plugin](../the-mcd-plugin.md) for interacting with the multi-collateral dai contracts.
7. [SCD Plugin](../single-collateral-dai/) for interacting with the single-collateral dai contracts.

### Building your own plugin

Check out the [Dai Plugin Template](https://github.com/makerdao/dai-plugin-template).
