---
title: Upgrading to Multi-Collateral Dai Guide
description: This guide will focus on the Dai and CDP migration with a high level overview of the upgrade process for different actors in the Maker ecosystem.
components:
  - scd
  - mcd
  - dai-js
tags:
  - migration
  - mcd
  - exchange
slug: upgrading-to-multi-collateral-dai-guide
contentType: guides
---

# Upgrading to Multi-Collateral Dai Guide

### **Summary**

**Level:** Intermediate

**Estimated Time:** 30 minutes

**Audience:** Technical and commercial teams with partners and Dai holders

## Introduction

The upcoming version of the Maker system, Multi-Collateral Dai, brings a lot of new and exciting features, such as support for new Vault collateral types and Dai Savings Rate. In order to support the new functionality, the whole Maker core of smart contracts has been rewritten. The new smart contracts addresses and ABIs can be found here: [https://changelog.makerdao.com/releases/mainnet/1.0.0/](https://changelog.makerdao.com/releases/mainnet/1.0.0/)

Therefore, users and partners interacting with Single-Collateral Dai SCD must migrate their existing Single Collateral Dai tokens Sai to Multi Collateral Dai tokens Dai and CDPs to the new system. Additionally, companies or projects integrated with Sai and CDPs must update their codebases to point to the new smart contracts, and refactor their code to support the updated functions.

This guide will focus on the Dai and CDP migration with a high level overview of the upgrade process for different actors in the Maker ecosystem.

The steps necessary to migrate from Single-Collateral Dai SCD to Multi-Collateral Dai MCD differ depending on your platform and use case for Dai, so the guide is split into sections for different user and partner types.

### Important note on naming conventions

In this guide we refer to the Single Collateral Dai system as **SCD**, and the Multi-Collateral Dai system as **MCD**. We refer to the Single Collateral Dai token the old, currently existing Dai as **Sai**, and the new Multi-Collateral Dai token as **Dai**.

### Learning Objective

- Knowledge on how migration to MCD will work
- Best practices for migration for different users and partners
- Where to find guides on specific migration scenarios

### Pre-requisites

- Basic knowledge of the MakerDAO: Dai and/or Vault system. [See the MCD 101 guide, especially sections 1 and 2.](https://github.com/makerdao/developerguides/tree/master/mcd/mcd-101)

### Sections

- [User and Partner Migration Scenarios](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#user-and-partner-migration-scenarios)
  - [As a Sai Holder](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-sai-holder)
  - [As a SCD CDP Owner](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-scd-cdp-owner)
  - [As a Centralized Exchange or Custodial Wallet](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-centralized-exchange-or-custodial-wallet)
  - [As a Decentralized Exchange](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-decentralized-exchange)
  - [As a Non-Custodial Wallet](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-non-custodial-wallet)
  - [As a Keeper](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-keeper)
  - [As a Market Maker](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-market-maker)
  - [As a CDP Integrator](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-cdp-integrator)
  - [As a Lending Protocol](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-lending-protocol)
  - [As a Dapp](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-a-dapp)
  - [As another partner type not mentioned above](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#as-another-partner-type-not-mentioned-above)
- [Migration App](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#migration-app)
- [Migration Contract](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#migration-contract)
  - [Functionality](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#functionality)
  - [Upgrading Sai to Dai](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#upgrading-dai)
  - [Swapping Dai for Sai](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#swapping-back-to-sai)
  - [Migrating CDPs](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#migration-of-cdp)

## User and Partner Migration Scenarios

The following section will outline a recommended migration process for different actors in the Maker ecosystem.

### As a Sai Holder

**You control your private key**

If you hold your Sai in a wallet where you control your private keys, then head to [migrate.makerdao.com](https://migrate.makerdao.com/) available at MCD launch and follow the instructions to upgrade your Sai to Dai and optionally activate the Dai Savings Rate smart contract, which allows you to earn savings.

**The following figure outlines the migration flow:**

![](https://camo.githubusercontent.com/4f1cca40bea0e24e56013c13f64f3f1f3911e129/68747470733a2f2f6c68362e676f6f676c6575736572636f6e74656e742e636f6d2f4d3430365a5f4d6c71414252325279396d355f67774b3850574e50783973554173334e62617a7748377076765768386753495078687a476c4d587876436b3137766f7842796152422d6351654b5a664a33447644385f4f34626947725a4c376541384c794a42377248315a6b7161756c784a58696a6a4e4f4743744d775673415749786f756a555a)

**You don’t control your private key**

If your Sai is deposited in an exchange or centralized wallet or locked in a dApp smart contract, you can follow the instructions these platforms are providing or withdraw the Sai and complete the upgrade yourself at [migrate.makerdao.com](https://migrate.makerdao.com/)

With MCD you can deposit your Dai into the Dai Savings Rate smart contract which will earn you accrued annual savings. Find more info at makerdao.com at launch.

### As a SCD CDP Owner

As a SCD CDP owner you can move your CDP to the MCD CDP core through the Migration App at [migrate.makerdao.com](https://migrate.makerdao.com/) at launch. The following diagram shows the flow for CDP migration.

![](https://camo.githubusercontent.com/24123aa333aa2f506c72d48345fc478e9a8095bc/68747470733a2f2f6c68342e676f6f676c6575736572636f6e74656e742e636f6d2f556f47593738685f545078654d3868327132616f4a6862774b55324b41394d59486577364c397943324766486b6d664c6d397952556b464e707278774b667876614a41495366514472635549555764724268695251793764334e575670573951734157493843706d684a61685250595030386f4c505865576677526f6e41624364546c3933726f73)

You can also choose to manually close your CDP by paying back your debt and redeeming your Ether, and use your redeemed collateral to open a new MCD CDP.

If you have a large SCD CDP, the migration contract might not have enough Sai liquidity to carry out the migration. In that case, feel free to contact [integrate@makerdao.com](mailto:integrate@makerdao.com) for assistance. You can read more about migration in the [Migration Contract](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#migration-contract) section later in this guide.

**Notes on Instadapp**

If you have created your CDP through the Instadapp service, you need to withdraw ownership of the CDP from the service back to you. To do this, you need to navigate to the [exit page](https://instadapp.io/exit/) and click “Withdraw” on your CDP in the tab “Debt Positions”. This will give you custody of the CDP, which will make it visible at [migrate.makerdao.com](https://migrate.makerdao.com/) where you will be able to carry out CDP migration.

**Notes on MyEtherWallet**

If you have created your CDP on MyEtherWallet then you can migrate your CDP using the Migration App at [migrate.makerdao.com](https://migrate.makerdao.com/). However, if the private key used with MyEtherWallet is stored in a local file or another unsupported format, you must first import your key to a wallet with Web3 support.

Once upgraded, you can start using Dai Savings Rate by locking your Dai into the Dai Savings Rate smart contract and receive accrued savings. Find more info on makerdao.com at launch.

### As a Centralized Exchange or Custodial Wallet

We recommend you take the following steps for upgrading to MCD:

- On November 18: Rename Single-Collateral Dai to “Sai”. This is being coordinated with all Maker partners and serves to avoid users depositing the wrong token into your system.
- On December 2: Perform upgrade of user balances.
- Inform your users as soon as possible about the dates. For users wanting to delay their upgrade, this allows them to opt-out by withdrawing Sai from your exchange before the date.
- Proposed process for the December 2 upgrade:
  - Freeze Sai deposits/withdrawals
  - Use the Migration App/contract to upgrade all user holdings of Sai to Dai. See more details in the [Migration App](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#migration-app)/[contract](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#migration-contract) sections below.
  - Point codebase to new Dai token contract address. The new token is deployed at [0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f) - use the [updated logos found here](https://www.notion.so/makerdao/Maker-Brand-ac517c82ff9a43089d0db5bb2ee045a4) for the new Dai token.
  - Rename listing/token to "Dai"
  - Unfreeze Dai deposits/withdrawals.
- Inform users about [Dai Savings Rate](https://blog.makerdao.com/an-update-on-the-dai-savings-rate-in-multi-collateral-dai/), which allows Dai holders to earn savings.
  - Optional: Choose one of the following:
    - Integrate Dai Savings Rate and distribute revenue to your users.
    - Integrate Dai Savings Rate in your exchange and keep accrued savings in your own balance sheet.

![](https://camo.githubusercontent.com/4bd8e6d1f3408f8f2401b02f1023a875b1765a42/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f725458636d355f42434b4b44565859566336765830356f61744256484c73596a53696d383447666c6847706754595453574b714e704a3042754d44642d4b56364f53736e424335467661366b364c4874644a516f66664b6d34575139326e37705a455030754c792d496a6a44446b68393241697769305558546a726c67642d37766f56684156536b)

This approach will result in the following user journey for the exchange/wallet user:

![](https://camo.githubusercontent.com/db991bc0866a753cc83146217d2fe85b5f8d2154/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f6f6159547a427374565a4f6b74574369536250337163756c774b666c42635a365332643357654a756637324771776d7149496b425a6e7a447444726f6c7a6474647879356568484e47797877596c345a32367038454a7242584c3646594551644f4b4369512d6f496a396f61765863796250516d6c5f623437677258674751496a6371576e6d3067)

### As a Decentralized Exchange

We recommend you take the following steps for upgrading to MCD:

- On November 18: Rename Single-Collateral Dai to “Sai” and ticker "SAI". This is being coordinated with all Maker partners and serves to avoid users attempting to deposit the wrong token into your system.
- Select a date between November 18-25 to list Multi-Collateral Dai. The new token is deployed at [0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f) - use the [updated logos found here](https://www.notion.so/makerdao/Maker-Brand-ac517c82ff9a43089d0db5bb2ee045a4) for the new Dai token. Logo for Sai should remain the yellow diamond.
- On the date of your own Dai listing: Add support for the new Dai token on your platform. The new Dai token should be named Dai and have the ticker "DAI". Deactivate Sai trading in your frontend UI, but allow users to cancel orders and withdraw balances.
- Inform users that they can redeem Sai for Dai at migrate.makerdao.com
  - Optional: Provide a UI in your own interface for token migration through the migration contract.
- Inform users about Dai Savings Rate, which allows Dai holders to earn savings.
  - Optional: Build a UI that facilitates the usage of the Dai Savings Rate service for your users in your exchange, where users will keep the accrued savings themselves.
  - Optional: Link users to [oasis.app](https://oasis.app/) to activate Dai Savings Rate.

### As a Non-Custodial Wallet

If you are a creator of a wallet that allows users to be in control of their private keys we recommend you do the following:

- On November 18: Rename Single-Collateral Dai to “Sai”
- Select a future date between November 18-25 to execute the upgrade to support Multi-Collateral Dai, which should be listed as "Dai". The new token is deployed at [0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f) - use the [updated logos found here](https://www.notion.so/makerdao/Maker-Brand-ac517c82ff9a43089d0db5bb2ee045a4) for the new Dai token. Logo for Sai should remain the yellow diamond.
- Inform your users as soon as possible about the timeline for your own upgrade to MCD.
- Support balances of both Sai and Dai for a period until Sai demand diminishes.
- Inform your users that they will be able to swap Sai for Dai at [migrate.makerdao.com](https://migrate.makerdao.com/).
  - Optional: Provide a UI in your own interface for token migration through the migration contract.
- Inform users about Dai Savings Rate, which allows Dai holders to earn savings.
  - Optional: Create a UI where users can activate Dai Savings Rate.
  - Optional: Link users to [oasis.app](https://oasis.app/) to activate Dai Savings Rate.
- Optional: Implement paying the gas cost of Dai transactions on behalf of your users.

### As a Keeper

- Get acquainted with the updates to Keepers and Auctions in MCD with [this guide](https://github.com/makerdao/developerguides/blob/master/keepers/auctions/auctions-101.md).
- Upgrading
- We expect to release a Python library for working with Auctions before MCD launch. This will be the recommended way to bid in Auctions.

Alternatively, if you’re willing to do some additional work and work with a lower level interface, you can interact with Auction contracts directly [flip](https://github.com/makerdao/dss/blob/master/src/flip.sol), [flap](https://github.com/makerdao/dss/blob/master/src/flap.sol), [flop](https://github.com/makerdao/dss/blob/master/src/flop.sol). Note that future collateral types may come with custom auction formats. More documentation will be available before launch.

### As a Market Maker

- We encourage you to market make on Multi-Collateral Dai as soon as your exchange partners add support for it.
- If your exchange partners keep their Sai listing concurrently with their Dai listing, we encourage you to market make on both tokens for the remaining lifetime of Sai.
- If your exchange partners will use a different ticker for Dai than Sai, you should update your tools accordingly.

### As a CDP Integrator

**Custodial CDP service**

- On November 18: Rename Single-Collateral Dai to “Sai”
- Select a future date between November 18-25 to execute the upgrade to MCD.
- Inform your users as soon as possible about the date.
- On the chosen date:
  - Freeze access to CDP service for your users
  - Launch upgrade to your service that supports the new CDP core. [The smart contract addresses and ABIs can be found here.](https://changelog.makerdao.com/releases/mainnet/1.0.0/)
    - If you are using Dai.js for your CDP integration, see “[Using Dai.js](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#using-dai.js)” below for how to upgrade your implementation to MCD.
    - If you have integrated directly with the CDP smart contracts, see “[Direct integration with smart contracts](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#direct-integration-with-smart-contracts)” below for how to upgrade your implementation to MCD.
  - Migrate all CDPs to MCD. See “Migration App” section below.
  - List the Multi-Collateral Dai token as "Dai"
  - Unfreeze access to CDP service
- Optional: Implement support for added collateral types in MCD
- If it is relevant to your service, inform users about Dai Savings Rate
  - Optional: Implement UI for locking Dai in the Dai Savings Rate smart contract.

**Non-Custodial CDP service**

- On November 18: Rename Single-Collateral Dai to “Sai”
- Select a future date between November 18-25 to execute the upgrade to MCD.
- Inform your users as soon as possible about the timeline for your own upgrade to MCD.
- Inform your users about MCD and the migration process of CDPs.
- On the selected launch date:
  - Launch upgrade to your service that supports the new CDP core.
    - If you are using Dai.js for your CDP integration, see “[Using Dai.js](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#using-dai.js)” below for how to upgrade your implementation to MCD.
    - If you have integrated directly with the CDP smart contracts, see “[Direct integration with smart contracts](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/upgrading-to-multi-collateral-dai.md#direct-integration-with-smart-contracts)” below for how to upgrade your implementation to MCD.
  - List the Multi-Collateral Dai token as "Dai"
- Choose one of the following:
  - Option A: Point your users to [migrate.makerdao.com](https://migrate.makerdao.com/) at MCD launch date for CDP migration on their CDP dashboard. See also the Migration App section below.
  - Option B: Create your own UI for migration, by creating a frontend to interact with the migration contract see section below on Migration Contract.

### **Upgrading your CDP integration implementation**

#### **Using Dai.js**

- If you have integrated CDPs using the [Dai.js library](https://github.com/makerdao/dai.js), ensure you have updated the library to the latest version.
- Update your codebase to support the functionality of the [MCD plugin](https://github.com/makerdao/dai.js/tree/dev/packages/dai-plugin-mcd). At launch this plugin will be bundled into the Dai.js library as default.
- Optional: Help your users migrate their CDP to MCD
  - Option A: Point users to [migrate.makerdao.com](https://migrate.makerdao.com/) if your app is Web3 compatible.
  - Option B: Implement your own migration UI in your app, connecting to the migration contract described in a section below.
  - Option C: If your app is not compatible with migrate.makerdao.com, you can guide your users in how to export their CDP from your app to a compatible wallet.
- Optional: Implement support for new MCD functionality
  - Add support for new collateral types.
  - Add support for Dai Savings Rate.

### **Direct integration with smart contracts**

- If you have integrated directly with the smart contracts, you must add support for the new Maker core smart contracts. Since the smart contracts have been completely rewritten, most function calls have been changed.
- Get acquainted with the [new implementation of MCD](https://github.com/makerdao/dss)
  - [You can find an introduction to the system here](https://github.com/makerdao/developerguides/blob/master/mcd/mcd-101/mcd-101.md)
- Implement support for the MCD smart contracts
  - [Checkout this guide on how to interact with the CDP manager.](https://github.com/makerdao/developerguides/blob/master/mcd/mcd-seth/mcd-seth-01.md)
- Point codebase to the new [MCD smart contracts](https://changelog.makerdao.com/)

### As a Lending Protocol

**Custodial Service**

- On November 18: Rename Single-Collateral Dai to “Sai”
- Select a future date between November 18-25 to execute the upgrade to MCD.
- Inform your users as soon as possible about the date.
- On the chosen date:
  - Stop lending deposits and borrowing withdrawals of Sai
  - List the Multi-Collateral Dai token as "Dai". The new token is deployed at [0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f) - use the [updated logos found here](https://www.notion.so/makerdao/Maker-Brand-ac517c82ff9a43089d0db5bb2ee045a4) for the new Dai token.
  - Open for lending deposits and borrowing withdrawals of Dai
  - For outstanding loans in Sai, choose one of the following:
    - Accept payback of loans in Sai.
    - Continuously migrate paybacks of old positions of Sai to Dai yourself.
    - Inform your users that you can no longer pay back Sai, but that they should migrate their Sai to Dai through migrate.makerdao.com before paying back a loan.

**Non-Custodial Service**

- On November 18: Rename Single-Collateral Dai to “Sai”
- Select a future date between November 18-25 to execute the upgrade to MCD.
- Inform your users as soon as possible about the timeline for your own upgrade to MCD.
- Inform users about potential cutoff dates for shutdown of SCD.
- At launch:
  - List the Multi-Collateral Dai token as "Dai". The new token is deployed at [0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f) - use the [updated logos found here](https://www.notion.so/makerdao/Maker-Brand-ac517c82ff9a43089d0db5bb2ee045a4) for the new Dai token.
  - Launch support for Dai loans.
  - Stop creation of loans in Sai
  - Point users to [migrate.makerdao.com](https://migrate.makerdao.com/) for Sai migration
  - Let existing loans in Sai run until they expire or are paid back
- Optional:
  - Create a UI for users to migrate their balances from Sai to Dai.

### As a Dapp

- On November 18: Rename Single-Collateral Dai to “Sai”
- Select a future date between November 18-25 to execute the upgrade to MCD.
- Inform your users as soon as possible about the timeline for your own upgrade to MCD.
- On the chosen date:
  - List the Multi-Collateral Dai token as "Dai". The new token is deployed at [0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f) - use the [updated logos found here](https://www.notion.so/makerdao/Maker-Brand-ac517c82ff9a43089d0db5bb2ee045a4) for the new Dai token.
  - Update code base to support the use of the new Dai token at launch.
  - Optional: Implement paying gas cost of Dai transactions in Dai.
- If you have a product using Sai:
  - Shutdown functionality of Sai at a cut-off date, communicated well in advance to your users.
- Inform your users about potential confusion regarding Sai and Dai.
- Inform your users that they can migrate Sai to Dai at [migrate.makerdao.com](https://migrate.makerdao.com/)
  - Optional: Create a UI for carrying out the migration from Sai to Dai.

### As another partner type not mentioned above

Please reach out to [integrate@makerdao.com](mailto:integrate@makerdao.com) and we are happy to discuss your migration scenario.

## Migration App

Upon release of MCD, the Migration App at [migrate.makerdao.com](https://migrate.makerdao.com/) will allow you to carry out Dai and CDP migration through an intuitive web UI in just a few clicks. By logging in with your favourite wallet solution, the app will scan your wallet for any recommended migrations and showcase them in the UI seen in picture below. This migration scan feature is planned to be continually supported going forward, ensuring that users are always using an up-to-date version of the Maker platform.

![](https://camo.githubusercontent.com/5b22fab66572ce94685d96c28dfa34ef0c348ed2/68747470733a2f2f6c68342e676f6f676c6575736572636f6e74656e742e636f6d2f346c44634533443439584b746c724c532d614143444b3073307638336d3447347a77705a726d575a4c364c53326b3844726a44705946452d7957316e78342d72643871615878504a684c5a6e636a6d4e6c7a65436b316f6474704a796e4e527a48336579434f316a6d665033563639624c444e6151794d4b344c74786f494d30374266646b323465)

_Landing Page that will show you possible migrations for the connected wallet._

![](https://camo.githubusercontent.com/553d08d5f144a4bd70ed6e23fbcdc7133b525ba1/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f425244646738574232517a7952735f393267473035734b444763716d734b5a5a7657526470514a6d4637786d695366376a79306f5a7138775537786d4c365834396763545646454b6e33746576655f556e72705a796e46633038304e78546c6d43564632534a5673666d666e5931346a376f6a52524f5858726e59646d793458552d744a36754233)

_Wizard for migrating Sai to Dai._

![](https://camo.githubusercontent.com/f26216bad050d8ca4c746bba0ddcd91d8976c5b4/68747470733a2f2f6c68342e676f6f676c6575736572636f6e74656e742e636f6d2f5f5a324c594f45396c7346754267776955504f546b6d72564b7870545536745a624c5356517663702d4c5256393576486f7a5545562d76365a5267434367496a693048584241554e49336f73386568515a416374463135794b467341444c76735a75616c436f6d6938444e32767658584d364e68356a436779636c4475694f70764133586e417071)

_Wizard for migrating an SCD CDP to MCD CDP._

The Migration App uses a proxy contract to carry out the CDP migration. Consequently, the app can also only be used for CDPs that have been created through a Maker proxy contract. This happens automatically if you have opened your CDP at [cdp.makerdao.com](https://cdp.makerdao.com/).

If you have created CDPs using third party services that do not use Maker proxies to interact with the CDP core, the migration contract might not work. Instead, you can perform your own manual migration by simply closing down your SCD CDP and moving the ETH to an MCD CDP.

### Migration Contract

The functionality of the Migration App outlined in the above section is handled by a Migration Contract that will be deployed at MCD launch in order to support a smooth transition from Single Collateral Dai to Multi Collateral Dai. The contract will make the redemption of Single Collateral Dai tokens **Sai** for Multi Collateral Dai tokens **Dai**, and the migration of CDPs to the new CDP engine of MCD, an easy task. This section will outline how the migration contract works in order to help super users and partners prepare for MCD migration.

#### Functionality

The migration smart contracts are open source and can be found here: [https://github.com/makerdao/scd-mcd-migration](https://github.com/makerdao/scd-mcd-migration)

In the `src` folder, the smart contract source code can be found. The main contract is the `ScdMcdMigration.sol` which contains the migration functionality that you will interact with.

It contains three main functions:

- `swapSaiToDai` - a function that upgrades Sai to Dai
- `swapDaiToSai` - a function that allows you to exchange your Dai back to Sai
- `migrate` - a function that allows you to migrate your SCD CDP to MCD.

The following sections will go deeper into these function calls. The Migration App will present this functionality in an easy to use UI, so a regular user will not have to deal with these function calls directly. We will however dive into them in the following sections to dissect how migration works, and outline the process for power users or partners, who want to carry out migration themselves.

### Upgrading Dai

In order to upgrade your Dai to MCD, you must use the [swapSaiToDai](https://github.com/makerdao/scd-mcd-migration/blob/master/src/ScdMcdMigration.sol#L59) function in the migration contract. First you must approve that the migration contract can transfer Sai tokens from your account. Then you are ready to invoke the swap by calling the function specifying the amount of Sai you want to upgrade to Dai. After the function call is mined, the upgraded Dai is sent to the Ethereum address initiating the upgrade. A detailed walk-through using CLI tools to carry out these functions can [be found here](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/cli-mcd-migration.md).

From the user perspective, this function simply upgrades a specified amount of Sai to Dai.

Behind the scenes, deposited Sai tokens are used to create a collective CDP in MCD for all migrating users which Dai is minted from. The migration contract will thus take the Sai tokens from your account, and deposit them into the Sai token adapter, which allows the CDP engine Vat to utilize the tokens for CDP actions. The migration contract will then invoke Vat to lock Sai and issue Dai to the Dai adapter. The migration contract will then exit the Dai tokens from the Dai adapter, which is carried out by invoking a mint function on the Dai token contract which will generate new Dai for the originator’s Ethereum address. The reason Sai to Dai migration is carried out using the CDP core vat of the new system, is that this is the only component that has the authority to mint new Dai. The process and function calls are outlined in the diagram below.

The following diagram outlines what happens when migrating 10 Sai to 10 Dai.

![](https://camo.githubusercontent.com/f175b27976e1dfb08a53b494905b716a32a7e7f0/68747470733a2f2f6c68342e676f6f676c6575736572636f6e74656e742e636f6d2f516c4f47653433525a4d70664a364548323248334c3750534a4e4c424753737a586c4232396b476f5342582d7176685f7141594e374366462d77732d686f69505134636b546f2d70684a766d34574a7347326e73545f744a585f446c6e434361766645577a4464544e5938793079536841464a4331735155654a526b426659674c6369795750476c)

![](https://camo.githubusercontent.com/f70e39df18a538952509d56d92eb67838542d2f2/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f776a435041396e367739335634414f52587546504b3952685258786c673059692d365a337a66386b364967425730535450693645796e4a39532d4150535a37747368537879755a344d4a79564f3461476a344e6e61704155755147506b4f4747675979576f484442543855536168617a5947427452774b796c69432d6866396c457376476b324433)

### Swapping back to Sai

The migration contract also allows users to “go back” by swapping Dai for Sai, using the function [swapDaiToSai](https://github.com/makerdao/scd-mcd-migration/blob/master/src/ScdMcdMigration.sol#L75). In this case, the CDP operation is reversed, as Dai is paid back to the system and Sai is released, just like the repayment of a normal CDP, except with no stability fee cost.

However, this operation requires a surplus of Sai already deposited in the migration contract. Therefore there must be at least an equivalent amount of Sai deposited in the contract, to the amount of Dai you want to redeem.

This function call is very similar to the former, except this time Dai is deposited to the CDP, and Sai collateral released. This requires you to approve that the migration contract can transfer Dai from your wallet, and then you invoke the swapDaiToSai function with the specified amount of Dai you want to redeem. You can check out [this guide](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/cli-mcd-migration.md) for a more detailed look into how you call the functions.

### Migration of CDP

The migration contract also allows users to migrate their CDPs from the SCD core to the MCD core. This is done through the function [migrate](https://github.com/makerdao/scd-mcd-migration/blob/master/src/ScdMcdMigration.sol#L90). The function essentially tries to close your CDP, using excess Sai deposited in the migration contract by other users who have been upgrading Sai to Dai to pay your outstanding CDP debt. In order to do so, you need to transfer the control of the CDP to the migration contract. The migration contract will then pay back the debt using Sai deposited in the contract, redeem the ETH collateral, create a new CDP in the MCD system, lock in the ETH collateral, and payback the debt using the generated Dai, resulting in an equivalent CDP debt in MCD.

However, in order to close down the CDP, a stability fee in MKR must be paid, so you need to grant the migration contract approval to spend MKR from you account to carry out the migration.

The migration contract uses a proxy contract to carry out all the above steps in one go. Consequently, the contract can also only be used for CDPs that have been created through a Maker proxy contract. This happens automatically if you have opened your CDP at [cdp.makerdao.com](https://cdp.makerdao.com/). Therefore, you must utilize the [MigrationProxyActions.sol](https://github.com/makerdao/scd-mcd-migration/blob/master/src/MigrationProxyActions.sol) contract to carry out the [migrate function call](https://github.com/makerdao/scd-mcd-migration/blob/master/src/MigrationProxyActions.sol#L38).

If you have created CDPs using third party services that do not use Maker proxies to interact with the CDP core, the migration contract might not work. Instead, you can perform your own manual migration by simply closing down your SCD CDP and moving the ETH to an MCD CDP.

To migrate your CDP, your are also dependant on excess liquidity of Sai in the migration contract to be used to close your CDP. If you have a 10,000 Sai debt CDP you want to migrate, there must be at least 10,000 Sai deposited in the Sai MCD CDP owned by the migration contract from users upgrading Sai to Dai, to carry out the CDP migration. The migration cannot be carried out partially, why the whole debt of the CDP must be covered by Sai liquidity in the contract to carry out the migration. If you have a large CDP and are concerned about migration, feel free to reach out to the Integrations Team at [integrate@makerdao.com](mailto:integrate@makerdao.com)

[Read more about the function calls for migrating a CDP here](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/cli-mcd-migration.md#migrating-cdps)

### In Summary

In this guide, we introduced you to the steps of how to upgrade to Multi-Collateral Dai. We have provided you with guidelines for different types of platforms using Dai and for regular Dai holders. As we approach the launch of Multi-Collateral Dai, more details will be made available.

#### Troubleshooting

If you encounter any issues with your upgrade process, don’t hesitate to contact us.

- Contact integrations team - [integrate@makerdao.com](mailto:integrate@makerdao.com)
- Rocket chat - \#dev channel

#### Next Steps

After finishing this guide we think you’ll enjoy these next guides:

- Learn about our progress towards the launch of [MCD](https://blog.makerdao.com/multi-collateral-dai-milestones-roadmap/).

#### Resources

**Information:**

- [Blog post: The Road To Mainnet Release](https://blog.makerdao.com/the-road-to-mainnet-release/)

**Other Guides:**

- [Introduction and Overview of Multi-Collateral Dai: MCD101](https://github.com/makerdao/developerguides/blob/master/mcd/mcd-101/mcd-101.md)
- [Using MCD-CLI to create and close a MCD CDP on Kovan](https://github.com/makerdao/developerguides/blob/master/mcd/mcd-cli/mcd-cli-guide-01/mcd-cli-guide-01.md)
- [Using Seth to create and close an MCD CDP on Kovan](https://github.com/makerdao/developerguides/blob/master/mcd/mcd-seth/mcd-seth-01.md)
- [Using Seth for MCD migration](https://github.com/makerdao/developerguides/blob/master/mcd/upgrading-to-multi-collateral-dai/cli-mcd-migration.md)
- [Add a new collateral type to DCS - Kovan](https://github.com/makerdao/developerguides/blob/master/mcd/add-collateral-type-testnet/add-collateral-type-testnet.md)

**Source code/wiki:**

- [Multi Collateral Dai code + wiki](https://github.com/makerdao/dss)
