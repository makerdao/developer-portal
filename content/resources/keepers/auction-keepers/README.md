# Auction Keepers

## Introduction 

The Maker Protocol, which powers Multi Collateral Dai \(MCD\), is a smart contract based system that backs and stabilizes the value of Dai through a dynamic combination of Vaults \(formerly known as CDPs\), autonomous feedback mechanisms, and incentivized external actors. To keep the system in a stable financial state, it is important to prevent both debt and surplus from building up beyond certain limits. This is where Auctions and Auction Keepers come in. The system has been designed so that there are three types of Auctions in the system: Surplus Auctions, Debt Auctions, and Collateral Auctions. Each auction is triggered as a result of specific circumstances.

Auction Keepers are external actors that are incentivized by profit opportunities to contribute to decentralized systems. In the context of the Maker Protocol, these external agents are incentivized to automate certain operations around the Ethereum blockchain. This includes:

* Seeking out opportunities and starting new auctions
* Detect auctions started by other participants
* Bid on auctions by converting token prices into bids

More specifically, Keepers participate as bidders in the Debt and Collateral Auctions when Vaults are liquidated and auction-keeper enables the automatic interaction with these MCD auctions. This process is automated by specifying bidding models that define the decision making process, such as what situations to bid in, how often to bid, how high to bid etc. Note that bidding models are created based on individually determined strategies.

For all interested in setting up their own Auction Keeper Bot, please visit the guide below. 

