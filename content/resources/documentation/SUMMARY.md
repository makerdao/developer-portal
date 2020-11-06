# Table of contents

* [Introduction to the Maker Protocol](README.md)

## Getting Started

---

* [Maker Protocol 101](maker-protocol-101.md)

## Maker Developer Guides <a id="mcd-developer-guides"></a>

* [Developer Guides and Tutorials](mcd-developer-guides/developer-guides-and-tutorials.md)

## Smart Contract Modules

* [Core Module](smart-contract-modules/core-module/README.md)
  * [Spot - Detailed Documentation](smart-contract-modules/core-module/spot-detailed-documentation.md)
  * [Cat - Detailed Documentation](smart-contract-modules/core-module/cat-detailed-documentation.md)
  * [Vat - Detailed Documentation](smart-contract-modules/core-module/vat-detailed-documentation.md)
* [Collateral Module](smart-contract-modules/collateral-module/README.md)
  * [Flipper - Detailed Documentation](smart-contract-modules/collateral-module/flipper-detailed-documentation.md)
  * [Join - Detailed Documentation](smart-contract-modules/collateral-module/join-detailed-documentation.md)
* [Dai Module](smart-contract-modules/dai-module/README.md)
  * [Dai - Detailed Documentation](smart-contract-modules/dai-module/dai-detailed-documentation.md)
* [System Stabilizer Module](smart-contract-modules/system-stabilizer-module/README.md)
  * [Flapper - Detailed Documentation](smart-contract-modules/system-stabilizer-module/flap-detailed-documentation.md)
  * [Flopper - Detailed Documentation](smart-contract-modules/system-stabilizer-module/flop-detailed-documentation.md)
  * [Vow - Detailed Documentation](smart-contract-modules/system-stabilizer-module/vow-detailed-documentation.md)
* [Oracle Module](smart-contract-modules/oracle-module/README.md)
  * [Oracle Security Module \(OSM\) - Detailed Documentation](smart-contract-modules/oracle-module/oracle-security-module-osm-detailed-documentation.md)
  * [Median - Detailed Documentation](smart-contract-modules/oracle-module/median-detailed-documentation.md)
* [MKR Module](smart-contract-modules/mkr-module.md)
* [Governance Module](smart-contract-modules/governance-module/README.md)
  * [Spell - Detailed Documentation](smart-contract-modules/governance-module/spell-detailed-documentation.md)
  * [Pause - Detailed Documentation](smart-contract-modules/governance-module/pause-detailed-documentation.md)
  * [Chief - Detailed Documentation](smart-contract-modules/governance-module/chief-detailed-documentation.md)
* [Rates Module](smart-contract-modules/rates-module/README.md)
  * [Pot - Detailed Documentation](smart-contract-modules/rates-module/pot-detailed-documentation.md)
  * [Jug - Detailed Documentation](smart-contract-modules/rates-module/jug-detailed-documentation.md)
* [Proxy Module](smart-contract-modules/proxy-module/README.md)
  * [Proxy Actions - Detailed Documentation](smart-contract-modules/proxy-module/proxy-actions-detailed-documentation.md)
  * [Vote Proxy - Detailed Documentation](smart-contract-modules/proxy-module/vote-proxy-detailed-documentation.md)
  * [CDP Manager - Detailed Documentation](smart-contract-modules/proxy-module/cdp-manager-detailed-documentation.md)
  * [DSR Manager - Detailed Documentation](smart-contract-modules/proxy-module/dsr-manager-detailed-documentation.md)
* [Maker Protocol Emergency Shutdown](smart-contract-modules/shutdown/README.md)
  * [Emergency Shutdown for Partners](smart-contract-modules/shutdown/emergency-shutdown-for-partners.md)
  * [The Emergency Shutdown Process for Multi-Collateral Dai \(MCD\)](smart-contract-modules/shutdown/the-emergency-shutdown-process-for-multi-collateral-dai-mcd.md)
  * [End - Detailed Documentation](smart-contract-modules/shutdown/end-detailed-documentation.md)
  * [ESM - Detailed Documentation](smart-contract-modules/shutdown/emergency-shutdown-module.md)

## Migration

* [SCD &lt;&gt; MCD Migration](migration/scd-mcd-migration-detailed-documentation.md)
* [Upgrading to Multi-Collateral Dai Guide](migration/upgrading-to-multi-collateral-dai-guide.md)

## Other MCD Documentation <a id="other-documentation"></a>

* [MCD Glossaries](other-documentation/system-glossary.md)
* [Smart Contract Annotations](other-documentation/smart-contract-annotations.md)

## Auctions

* [The Auctions of the Maker Protocol](auctions/the-auctions-of-the-maker-protocol.md)

## Keepers

* [Auction Keepers](keepers/auction-keepers/README.md)
  * [Auction Keeper Bot Setup Guide](keepers/auction-keepers/auction-keeper-bot-setup-guide.md)
* [Market Maker Keepers](keepers/market-maker-keepers/README.md)
  * [Market Maker Keeper Bot Setup Guide](keepers/market-maker-keepers/market-maker-keeper-bot-setup-guide.md)
* [Cage Keeper](keepers/cage-keeper.md)
* [Simple Arbitrage Keeper](keepers/simple-arbitrage-keeper.md)
* [Chief Keeper](keepers/chief-keeper.md)

## Command-line Interfaces <a id="clis"></a>

* [Seth](clis/seth.md)
* [Multi Collateral Dai \(MCD\) CLI](clis/mcd-cli.md)
* [Dai and Collateral Redemption during Emergency Shutdown](clis/dai-and-collateral-redemption-during-emergency-shutdown.md)
* [Emergency Shutdown \(ES\) CLI](clis/emergency-shutdown-es-cli.md)

## Building on top of the Maker Protocol <a id="build"></a>

---

* [Dai.js](dai.js/README.md)
  * [Getting started](dai.js/getting-started.md)
  * [Configuration](dai.js/maker/README.md)
    * [Plugins](dai.js/maker/plugins.md)
  * [Vault manager](dai.js/the-mcd-plugin.md)
  * [Collateral types](dai.js/cdptypeservice.md)
  * [Dai Savings Rate](dai.js/savingsservice.md)
  * [Currency units](dai.js/currency-units.md)
  * [System data](dai.js/systemdataservice.md)
  * [Advanced](dai.js/advanced-configuration/README.md)
    * [Transaction manager](dai.js/advanced-configuration/transactions.md)
    * [DSProxy](dai.js/advanced-configuration/using-ds-proxy.md)
    * [Events](dai.js/advanced-configuration/events.md)
    * [Using multiple accounts](dai.js/advanced-configuration/using-multiple-accounts.md)
    * [Adding a new service](dai.js/advanced-configuration/adding-a-new-service.md)
  * [Single-Collateral Sai](dai.js/single-collateral-dai/README.md)
    * [Collateralized Debt Position](dai.js/single-collateral-dai/collateralized-debt-position.md)
    * [CDP Service](dai.js/single-collateral-dai/eth-cdp-service.md)
    * [Price Service](dai.js/single-collateral-dai/price-service.md)
    * [System Status](dai.js/single-collateral-dai/system-status.md)
    * [Tokens](dai.js/single-collateral-dai/tokens.md)
    * [Token Conversion](dai.js/single-collateral-dai/token-conversion.md)
    * [Exchange Service](dai.js/single-collateral-dai/exchange-service.md)
* [Pymaker](pymaker.md)

## MCD Security

* [Security for the Maker Protocol](mcd-security/security.makerdao.com.md)

## MCD Changelog

* [Multi-Collateral DAI Public Releases](mcd-changelog/multi-collateral-dai-public-releases.md)

