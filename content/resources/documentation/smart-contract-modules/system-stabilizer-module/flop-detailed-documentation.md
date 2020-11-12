---
title: Flopper - Detailed Documentation
description: The Maker Protocol's Debt Auction House
component: auctions
tags:
  - auctions
slug: flopper-detailed-documentation
contentType: documentation
---

# Flopper - Detailed Documentation

- **Contract Name:** flop.sol
- **Type/Category:** DSS —&gt; System Stabilizer Module
- \*\*\*\*[**Associated MCD System Diagram**](https://github.com/makerdao/dss/wiki)
- \*\*\*\*[**Contract Source**](https://github.com/makerdao/dss/blob/master/src/flop.sol)
- \*\*\*\*[**Etherscan**](https://etherscan.io/address/0xa41b6ef151e06da0e34b009b86e828308986736d#code)\*\*\*\*

## 1. Introduction \(Summary\)

**Summary:** Debt Auctions are used to recapitalize the system by auctioning off MKR for a fixed amount of DAI. In this process, bidders compete by offering to accept decreasing amounts of MKR for the DAI they will end up paying.

![Flop Interactions with the Maker Protocol](/images/documentation/screen-shot-2019-11-17-at-2.15.41-pm.png)

## 2. Contract Details

#### Flopper \(Glossary\)

- `flop`: debt auction \(covering debt by inflating MKR and selling for stablecoins\)
- `lot`: quantity up for auction / gems for sale \(MKR\)
- `guy`: high bidder \(address\)
- `gal`: recipient of auction income / receives dai income \(this is the Vow contract\)
- `ttl`: bid lifetime \(Max bid duration / single bid lifetime\)
- `beg`: minimum bid decrease
- `pad`: Increase for `lot` size during `tick` \(default to 50%\)
- `tau`: maximum auction duration
- `end`: when the auction will finish / max auction duration
- `kick`: start an auction / Put up a new MKR `bid` for auction
- `dent`: make a bid, decreasing the lot size \(Submit a fixed DAI `bid` with decreasing `lot` size\)
- `deal`: claim a winning bid / settles a completed auction
- `vat` - the Vat's address
- `gem`- MKR Token \(address\)
- `kicks` - Total auction count, used to track auction `id`s
- `live` - Cage flag
- `wards [usr: address]`, `rely`/`deny`/`auth` - Auth mechanisms
- `Bid` - State of a specific Auction {`bid`, `lot`, `guy`, `tic`, `end`}
- `bid` - Bid amount inDAI / DAI paid
- `tic` - Bid expiry
- `tick` - restarts an auction

#### **Parameters Set By Governance**

- The Maker Governance voters determine the debt limit. The Debt auction is triggered when the system has DAI debt above that limit.
- Maker Governance sets the `Vow.dump` which determines the starting `lot` for an auction as well as the `pad` which determines how much that `lot` can increase during `tick`.
- The contracts that are `auth`'ed to call `kick()` \(should only be `Vow`\) and `file()` to change `beg`, `ttl`, `tau` \(should only be governance contracts\).

**Informational Note:** The `cage` sets the Flop to not be live anymore and the `yank` is used during Global Settlement in order to return a bid to the bidder since the `dent` and `deal` can no longer be called.

## 3. Key Mechanisms & Concepts

The Flop Auction process begins with Maker Governance voters determining the system debt limit \([`Vow.sump`](https://docs.makerdao.com/smart-contract-modules/system-stabilizer-module/vow-detailed-documentation#auctions)\). Debt Auctions are then triggered when the system has Dai debt that has passed that specified debt limit.

In order to determine whether the system has net debt, the surplus, accrued stability fees, and debt must be reconciled. Any user can do this by sending the `heal` transaction to the system contract named [Vow.sol](https://github.com/makerdao/dss/blob/master/src/vow.sol). Provided there is sufficient debt \(i.e. debt after healing &gt; `Vow.sump`\), any user can send a `Vow.flop` transaction to trigger a debt auction.

The `Flop` is a reverse auction, where keepers bid on how little MKR they are willing to accept for the fixed Dai amount they have to pay at auction settlement. The bidders will basically compete with decreasing `lot` amounts of MKR for a fixed `bid` amount of Dai. Once `kick`ed, the `bid` is set to the flop auction bid size \(`Vow.sump`\) and `lot` is set to a sufficiently large number \(`Vow.dump`\). The auction will end when the latest bid duration \(`ttl`\) has passed **OR** when the auction duration \(`tau`\) has been reached. The payback process begins when the first bid is placed. The first bid will pay back the system debt and each subsequent bid will pay back the previous \(no longer winning\) bidder. When the auction is over, the process ends by cleaning up the bid and minting MKR for the winning bidder.

If the auction expires without receiving any bids, anyone can restart the auction by calling `tick(uint auction_id)`. This will do two things:

1. It resets `bids[id].end` to `now + tau`
2. It resets `bids[id].lot` to `bids[id].lot * pad / ONE`

![A diagram detailing the interactions a user has with Flopper and the Vow](/images/documentation/flop_auction_interaction_diagram.png)

#### **Bidding Requirements during an auction**

During an auction, `lot` amounts will decrease by a percentage with each new `dent` decreasing the `lot` by the `beg` for the same `bid` of Dai. For example, the `beg` could be set to 5%, meaning if the current bidder has a `lot` of 10 \(MKR\) for a `bid` of 100 \(Dai\), then the next bid must pass at most a `lot` of 9.5 \(MKR\) for a `bid` of 100 \(Dai\).

#### **Placing Bids**

When a bid is beaten out by another bidder, the new winner's internal DAI balance is used to refund the previous winning bidder. Once placed, bids **cannot** be canceled.

#### Example **bidding flow:**

1. Vow `kick`s a new Flop Auction.
2. Bidder 1 makes a bid that decreases the `lot` size by `beg` from the initial amount. Bidder 1's DAI balance in the Vat is decreased by `bid` and the Vow's DAI balance in the Vat is increased by `bid`.
3. Bidder 2 makes a bid that decreases Bidder 1's `lot` by `beg`. Bidder 2's DAI balance in the Vat is decreased by `bid` and Bidder 1's DAI balance in the Vat is increased by `bid` \(thereby refunding Bidder 1 for their now-losing bid\).
4. Bidder 1 makes a bid that decreases Bidder 2's `lot` by `beg`. Bidder 1's DAI = `Vat.dai[bidder1]` - `bid`; Bidder 2's DAI = `Vat.dai[bidder2]` + `bid`.
5. Bidder 2 \(and all the other bidders within the auction\) decide it is no longer worth it to continue to accept lower `lot`s, so they stop bidding. Once the `Bid.tic` expires, Bidder 1 calls `deal` and new MKR tokens are minted to their address \(`MKR token contract.balances(Bidder1)` = `MKR.balances(Bidder1)` + `lot`\).

**Note:** During a Flop auction, the `beg` is actually the minimum decrease amount. In `dent` the new bid has to have a `lot` \* `beg` that is less than or equal to the current `lot` size. Since the theory of the Flop auction is that a bidder’s offer is to take fewer and fewer MKR tokens \(`lot`\) for the same amount of dai \(`bid`\) then the `beg` is the amount each bid's offer should decrease by.

## 4. Gotchas \(Potential Source of User Error\)

#### **Keepers**

In the context of running a keeper \(more info [here](https://github.com/makerdao/developerguides/tree/master/keepers)\) to perform bids within an auction, a primary failure mode would occur when a keeper specifies an unprofitable price for MKR.

- This failure mode is due to the fact that there is nothing the system can do stop a user from paying significantly more than the fair market value for the token in an auction \(this goes for all auction types, `flip`, `flop`, and `flap`\).
- This means, in the case of Flop, that since the Dai amount is fixed for the entire auction, the risk to the keeper is that they would make a "winning" bid that pays the bid amount in Dai but does not receive any MKR \(`lot` == 0\). Subsequent executions of this bad strategy would be limited by the amount of Dai \(not MKR\) in their vat balance.

## 5. Failure Modes \(Bounds on Operating Conditions & External Risk Factors\)

1. `Flopper` has the potential to issue an excessively huge amount of MKR and despite the mitigation efforts \(the addition of the `dump` and `pad` parameters\), if `dump` is not set correctly by governance, the huge issuance of MKR could still occur.
2. See [System Stabilizer Module Documentation](https://docs.makerdao.com/smart-contract-modules/system-stabilizer-module).
