---
title: Flapper
description: The Maker Protocol's Surplus Auction House
group: smart-contracts
components:
  - auctions
  - system stabilizer
  - flapper
tags:
  - auctions
slug: flapper-detailed-documentation
contentType: documentation
parent: introduction-to-system-stabilizer-module
---

# Flapper

- **Contract Name:** flap.sol
- **Type/Category:** DSS —&gt; System Stabilizer Module
- \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
- \*\*\*\*[**Contract Source**](https://github.com/makerdao/dss/blob/master/src/flap.sol)
- \*\*\*\*[**Etherscan**](https://etherscan.io/address/0xc4269cc7acdedc3794b221aa4d9205f564e27f0d#code)

## 1. Introduction (Summary)

**Summary:** Flapper is a Surplus Auction. These auctions are used to auction off a fixed amount of the surplus Dai in the system for MKR. This surplus Dai will come from the **Stability Fees** that are accumulated from Vaults. In this auction type, bidders compete with increasing amounts of MKR. Once the auction has ended, the Dai auctioned off is sent to the winning bidder. The system then burns the MKR received from the winning bid.

![Flap Interactions with the Maker Protocol](/images/documentation/screen-shot-2019-11-17-at-2.14.34-pm.png)

## 2. Contract Details

### Flapper (Glossary)

- `Flap` - surplus auction (selling stablecoins for MKR) \[contract\]
- `wards [usr: address]` - `rely`/`deny`/`auth` Auth Mechanisms \[uint\]
- `Bid` - State of a specific Auction\[Bid\]
  - `bid` - quantity being offered for the `lot` (MKR) \[uint\]
  - `lot` - lot amount (DAI) \[uint\]
  - `guy` - high bidder \[address\]
  - `tic` - Bid expiry \[uint48\]
  - `end` - when the auction will finish \[uint48\]
- `bids (id: uint)` - storage of all `Bid`s by `id` \[mapping\]
- `vat` - storage of the Vat's address \[address\]
- `ttl` - bid lifetime / max bid duration (default: 3 hours) \[uint48\]
- `lot` - lot amount (DAI) \[uint\]
- `beg` - minimum bid increase (default: 5%) \[uint\]
- `tau` - maximum auction duration (default: 2 days) \[uint48\]
- `kick` - start an auction / put up a new DAI `lot` for auction \[function\]
- `tend` - make a bid, thus increasing the bid size / submit an MKR bid (increasing `bid`) \[function\]
- `deal` - claim a winning bid / settling a completed auction \[function\]
- `gem` - MKR Token \[address\]
- `kicks` - total auction count \[uint\]
- `live` - cage flag \[uint\]
- `file` - used by governance to set `beg`, `ttl`, and `tau` \[function\]
- `yank` - is used during Global Settlement to move `tend` phase auctions to the `End` by retrieving the collateral and repaying DAI to the highest bidder. \[function\]
- `tick()` **-** resets the `end` value if there has been 0 bids and the original `end` has passed.

### **Parameters Set By Governance**

The Maker Governance voters determine the surplus limit. The surplus auction is triggered when the system has an amount of Dai above that set limit.

- **Parameters Set through `file`:**
  - `beg`
  - `ttl`
  - `tau`

**Note:** MKR governance also determines the `Vow.bump` which sets the `Bid.lot` for each Flap auction and the `Vow.hump` which determines the surplus buffer.

### Authorizations

`auth` - check whether an address can call this method \[modifier function\]

- `rely` - allow an address to call auth'ed methods \[function\]
- `deny` - disallow an address from calling auth'ed methods \[function\]

## 3. Key Mechanisms & Concepts

The mechanism begins with the MKR holders (Maker Governance Voters) of the system. MKR holders will specify the amount of surplus allowed in the system through the voting system. Once they come to an agreement on what it should be set to, surplus auctions are triggered when the system has a surplus of DAI above the amount decided during the vote. System surplus is determined in the `Vow` when the `Vow` has [no system debt](https://github.com/makerdao/dss/blob/master/src/vow.sol#L128) and has accumulated enough DAI to [exceed the Surplus auction size (`bump`) plus the buffer (`hump`)](https://github.com/makerdao/dss/blob/master/src/vow.sol#L127)

In order to determine whether the system has a net surplus, both the income and debt in the system must be reconciled. In short, any user can do this by sending the [heal transaction](https://docs.makerdao.com/smart-contract-modules/system-stabilizer-module/vow-detailed-documentation#liquidations-manager) to the system contract named the "Vow". Provided there is a net surplus in the system, the surplus auction will begin when any user sends the **flap** transaction to the [Vow contract](https://docs.makerdao.com/smart-contract-modules/system-stabilizer-module/vow-detailed-documentation).

Once the auction has begun, a fixed amount (`lot`) of DAI is put up for sale. Bidders then complete for a fixed `lot` amount of DAI with increasing `bid` amounts of MKR. In other words, this means that bidders will keep placing MKR bid amounts in increments greater than the minimum bid increase amount that has been set (this is the `beg` in action).

The surplus auction officially ends when the bid duration ends (`ttl`) without another bid getting placed **OR** when auction duration (`tau`) has been reached. At auction end, the MKR received for the surplus DAI is then sent to be burnt thereby contracting the overall MKR supply.

![A diagram detailing the interactions a user has with Flapper and the Vow.](/images/documentation/flap_auction_interaction_.png)

## 4. Gotchas (Potential source of user error)

#### **Keepers**

In the context of running a keeper (more info [here](https://github.com/makerdao/developerguides/tree/master/keepers)) in order to perform bids within an auction, a primary failure mode could occur when a keeper specifies an unprofitable price for MKR.

- This failure mode is due to the fact that there is nothing the system can do to stop a user from paying significantly more than the fair market value for the token in an auction (this goes for all auction types, `flip`, `flop`, and `flap`).
- Keepers that are performing badly in a `flap` auction run the risk of overpaying MKR for the DAI as there is no upper limit to the `bid` size other than their MKR balance.

#### **Bid Increments During an Auction**

During `tend`, `bid` amounts will increase by a `beg` percentage with each new `tend`. The bidder must know the auction's `id`, specify the right amount of `lot` for the auction, bid at least `beg` % more than the last bid and must have a sufficient MKR balance.

One risk is "front-running" or malicious miners. In this scenario, an honest keeper's bid of \[Past-bid + `beg`%\] would get committed after the dishonest keeper's bid for the same, thereby preventing the honest keeper's bid from being accepted and forcing them to rebid with a higher price ((Past-bid + beg) + beg)). The dishonest keeper would need to pay higher gas fees to try to get a miner to put their transaction in first or collude with a miner to ensure their transaction is first. This could become especially important as the bid reaches the current market rate for MKR&lt;&gt;DAI.

**Quick** **Example**:

The `beg` could be set to 3%, meaning if the current bidder has placed a bid of 1 MKR, then the next bid must be at least 1.03 MKR. Overall, the purpose of the bid increment system is to incentivize early bidding and make the auction process move quickly.

#### Placing Bids Incorrectly

Bidders send MKR tokens from their addresses to the system/specific auction. If one bid is beat by another, the losing bid is refunded back to that bidder’s address. It’s important to note, however, that once a bid is submitted, there is no way to cancel it. The only possible way to have that bid returned is if it is outbid (or if the system goes into Global Settlement).

### **Illustration of the bidding flow:**

1. Vow `kick`'s a new Flap Auction.
2. Bidder 1 sends a bid (MKR) that increases the `bid` above the initial 0 value set during the `kick`. Bidder 1's MKR balance is decreased and the Flap's balance is increased by the bid size. `bid.guy` is reset from the Vow address to Bidder 1's and `bid.tic` is reset to `now + ttl`.
3. Next, Bidder 2 makes a bid that increases Bidder 1's bid by at least `beg`. Bidder 2's MKR balance is decreased and Bidder 1's balance is increased by Bidder 1's `bid`. The difference between Bidder 2's and Bidder 1's `bid` is sent from Bidder 2 to the Flap.
4. Bidder 1 then makes a bid that increases Bidder 2's `bid` by at least `beg`. Bidder 1's MKR balance is decreased and Bidder 2's MKR balance is increased by Bidder 2's `bid`. The amount Bidder 1 increased the bid is then sent from Bidder 1 to the Flap.
5. Bidder 2, as well as all the other bidders participating within the auction, decide it is no longer worth it to continue to bid higher `bid`s, so they stop making bids. Once the `Bid.tic` expires, Bidder 1 calls `deal` and the surplus DAI tokens are sent to the winning bidder's address (Bidder 1) in the `Vat` and the system then burns the MKR received from the winning bidder. `gem.burn(address(this), bids[id].bid)`.

## 5. Failure Modes (Bounds on Operating Conditions & External Risk Factors)

#### 1. See [System Stabilizer Module Documentation](https://docs.makerdao.com/smart-contract-modules/system-stabilizer-module)

#### 2. Other Failure Modes

- **Resulting from when MKR is burned**
  - There is the possibility where a situation arises where the MKR token makes the transaction revert (e.g. gets stopped or the Vow's permission to call burn() is revoked). In a case like this, deal can't succeed until someone fixes the issue with the MKR token. In the case of stoppage, this could include the deploying of a new MKR token. This new deployment could be completed by any individual using the MCD System but governance would need to add it to the system. Next, it would need to replace the old surplus and debt auctions with the new ones using the new MKR token. Lastly, it is crucial to enable the possibility to vote with the new version as well.
- **When there is massive surplus**
  - This would result in many Flap auctions occurring as the surplus over `bump` + `hump` is always auctioned off in `bump` increments. However, auctions run concurrently, so this would "flood the keeper market" and possibly result in too few bids being placed on any auction. This could happen through keepers not bidding on multiple auctions at once, which would result in network congestion because all keepers are trying to bid on all of the auctions. This could also lead to possible keeper collusion (if the capital pool is large enough, they may be more willing to work together to split it evenly at the system's expense).
