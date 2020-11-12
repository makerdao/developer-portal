---
title: The Emergency Shutdown Process for Multi-Collateral Dai (MCD)
description: To be be triggered as a last resort to protect the system and its users against a serious threat or to facilitate a Protocol upgrade
component: governance
tags:
  - governance
slug: the-emergency-shutdown-process-for-multi-collateral-dai-mcd
contentType: documentation
---

# The Emergency Shutdown Process for Multi-Collateral Dai (MCD)

## **Introduction to the Emergency Shutdown Process**

The Maker Protocol, which powers Multi-Collateral Dai \(Dai\), backs and stabilizes the value of Dai to a Target Price of 1 US Dollar, translating to a 1:1 US Dollar soft peg. The stabilization mechanism is handled through an autonomous system of smart contracts, a dynamic combination of Vaults, and appropriately incentivized external actors, such as Keepers.

[Keepers](https://docs.makerdao.com/keepers/auction-keepers) play a critical role in maintaining the health of the system and Dai stability. In March 2020, the Maker Foundation [underlined](https://blog.makerdao.com/recent-market-activity-and-next-steps/) the need for a more developed Keeper ecosystem. An increase in Keeper participation would ultimately improve the health and function of the Maker Protocol. For more information on how to get a Keeper up and running, see this[ guide](https://docs.makerdao.com/keepers/auction-keepers/auction-keeper-bot-setup-guide).

The Maker Protocol has an **Emergency Shutdown \(ES\)** procedure that can be triggered as a last resort to protect the system and its users against a serious threat or to facilitate a Protocol upgrade.

## **Overview of the Emergency Shutdown Process**

![](https://lh6.googleusercontent.com/tHGq8IsHybndRILRSF_pkAObTOPrcylSnBdN4DC7LDudq2EeH0K8Q9qEZgrQG-ozBtjwCWZtWPBbp-_tSnlP75nXRWcSMb4FzZsjCZvZBAPavGkJcsaoYDwIehDqE_6tlqp8KH3Y)

### **Summary**

Emergency Shutdown is intended to be triggered in the case of a system upgrade or serious emergencies, such as long-term market irrationality, a hack, or a security breach. When triggered, ES stops and shuts down the Maker Protocol while ensuring that all users, both Dai holders, and Vault users, receive the net value of assets they are entitled to under the Protocol’s smart contract logic. However, the value of Collateral that Dai holders can redeem may vary, depending on the system surplus or deficit at the time of ES. It is, therefore, possible that Dai holders will receive less or more than 1 USD worth of Collateral for 1 Dai.

The process of initiating ES is decentralized and controlled by MKR voters, who can trigger it by depositing MKR into the[ Emergency Shutdown Module \(ESM\)](https://docs.makerdao.com/smart-contract-modules/emergency-shutdown-module), a contract with the ability to call [**End.cage**](https://github.com/makerdao/dss/blob/44330065999621834b08de1edf3b962f6bbd74c6/src/end.sol#L264) or by an Executive Vote. In the case of the ESM method, 50,000 MKR must be deposited into the ESM to trigger ES. Additionally, once users deposit MKR into the ESM, it is immediately burned. Whether through the ESM or Executive Vote method, when Cage is called, it must alter the behavior of almost every component of the system, as well as perform under a variety of possible undercollateralization scenarios.

### **The Implementation Properties of Emergency Shutdown**

- **Dai no-race condition**: Every Dai holder will be able to redeem the same relative quantity of collateral proportional to their Dai holdings, regardless of when they interact with the contract.
- **Vault Parity**: Vault Owners are prioritized, allowing them to withdraw their excess Collateral before Dai holders are able to access Collateral.
  - At the time of ES, individual Vaults, entire collateral types, or the Maker Protocol can be undercollateralized, which is when the value of debt exceeds the value of the Collateral \("negative equity"\). Thus, the value of Collateral that Dai holders can redeem may vary, depending on the system surplus or deficit at the time of ES. It is, therefore, possible that Dai holders will receive less or more than 1 USD worth of Collateral for 1 Dai.
- **Immediate Vault redemption**: After ES is initiated, Vault owners are allowed to free their Collateral immediately, provided that they execute all contract calls atomically.
- **No off-chain calculations**: The system does not require the cage authority to supply any off-chain calculated values \(i.e., it can rely entirely on the last OSM feed prices\).
- **Vow Buffer Assistance**: After ES is initiated, any surplus or bad debt in the buffer acts as a reward or penalty distributed pro-rata to all Dai holders. For example, if 10% of total system debt is in the form of net surplus in the Vow, then Dai holders receive 10% more Collateral.

## **Dai and Collateral Redemption During Emergency Shutdown**

### **Emergency Shutdown Process for Vault Owners**

Vault owners can retrieve excess Collateral from their Vaults immediately after the initialization of ES. They can do this via Vault frontends, such as [Oasis Borrow](https://oasis.app/borrow), that have ES support implemented, or via command-line tools.

### **Emergency Shutdown Process for Dai Holders**

Dai holders can, after a waiting period \(for processing\) determined by MKR voters, barter their Dai for a relative pro-rata share of all types of Collateral in the system. The amount of Collateral that can be claimed during this period is determined by the Maker Oracles at the time ES is triggered. It's important to note that Dai holders will always receive the same relative pro-rata amount of Collateral from the system, whether their claims are among the first or last to be processed. The Maker Foundation will initially offer a web page for this purpose to make the process easier for Dai holders.

### **Why Emergency Shutdown Prioritizes Vault Owners Over Dai Holders**

_The prioritization of Vault Owners over Dai Holders during ES can be broken down into three main points:_

1. Overcollateralized Vaults do not subsidize the Maker Protocol for undercollateralized Vaults during the current operation of the system, so it's consistent for ES to have the same behavior. The main difference is that a potential haircut is transferred from MKR holders to DAI holders, as no assumptions can be made about the value of MKR after a shutdown.
2. Giving priority to Vault owners to recover their excess Collateral \(if their Vault is not undercollateralized\) incentivizes them to maintain overcollateralization. This is important because the incentive remains even if an ES seems likely, which ultimately makes the Protocol more resilient.
3. Stability fees accrued pre-ES are not waived by ES. Vault owners may accept higher fees if they know they are protected from the collateralization levels of others, potentially resulting in a higher surplus during ES scenarios as well as allowing for a higher DSR during normal operation.

## **Auction Settlement During Emergency Shutdown**

There is a time delay in the Emergency Shutdown that is determined by governance. The delay must expire before any exchange of Dai for Collateral can take place. The general guidance is that the delay should be long enough to ensure all auctions either finish or get skipped; but, there is no guarantee of this in the code. Importantly, anyone can cancel a collateral \(Flip\) auction at any time, whereas Surplus \(Flap\) and Debt \(Flop\) auctions are frozen by the initial calling of **Cage**. Both Flap and Flop auctions can be called to return the bids to the last bidder.

Note also that auction cancellation is not an immediate process, as ecosystem participants must cancel all ongoing collateral auctions to appropriate the Collateral and return it to the collateral pool. This allows for faster processing of the auctions at the expense of more processing calls. As for the surplus and debt auctions, they must also be called. If no one calls these functions, the auctions will not be canceled.

## **Emergency Shutdown Intentions**

**Emergency Shutdown may take two** main forms. For one, ES may be triggered, and the system is terminated without a future plan for redeployment. This allows users to claim excess Collateral or claim Collateral from their Dai.

**On the other hand, Emergency Shutdown may be initiated with a Redeployment Scenario.** This \*\*\*\*situation may arise when the system has been triggered into a shutdown event. Still, MKR token holders, or a third party, have decided to redeploy the system with necessary changes to rerun the system. This will allow users to open new Vaults and have a new Dai token while claiming Collateral from the old system.

## **How Emergency Shutdown Affects Users**

During an Emergency Shutdown, each of the various Maker Ecosystem Stakeholders should act accordingly:

### **Dai Holders**

If your wallet has the viable interface to claim Collateral or migrate your Dai, or it has a Dapp browser built into it, you may use the [migration portal](https://migrate.makerdao.com/) to claim Collateral and/or migrate. If your wallet does **not** support the above functionality, you must transfer your Dai to a new wallet that enables the functionality before proceeding to use the [migration portal](https://migrate.makerdao.com/).

### **Vault Owners**

If you use [Oasis.app/borrow](https://oasis.app/borrow) to manage your Vault, proceed to the [migration portal](https://migrate.makerdao.com/) and follow the outlined emergency redemption process.

If you are a user of a third-party interface, such as [DefiSaver](http://defisaver.com/) or [InstaDapp](https://instadapp.io/), verify that they have Emergency Shutdown Interfaces built-in before proceeding. If so, use their interface to claim the excess Collateral or migrate to a newly deployed system. If the third-party provider does not have the redemption process built-in, transfer to the [migration portal](https://migrate.makerdao.com/) if possible.

### **MKR Holders**

MKR holders may vote on polls and executive votes as it relates to the Emergency Shutdown triggering process. This is done in the Emergency Shutdown Module \(ESM\) frontend or directly through the [ES CLI](https://docs.makerdao.com/clis/emergency-shutdown-es-cli). Additionally, MKR holders may also vote as it relates to a future redeployment of the Maker Protocol on the [Governance Portal](http://vote.makerdao.com/).

### **Centralized Exchange or Custodial Wallet**

In the case of Emergency Shutdown, service providers may follow the actions recommended below.

**Recommended Procedure**

- Alert users to the current situation and provide guidance on the right action\(s\) to take. Depending on the ES scenario, Shutdown, or redeployment, advise them to act accordingly.
- Give users options to withdraw their Dai/MKR from the exchange, or inform them that the exchange/wallet will handle the Emergency Shutdown process on their behalf.

**Scenario: Shutdown**

- Choose one of the following options:
  - **Option 1:** Let users withdraw Dai and MKR from the platform, and then guide them to the [migration portal](https://migrate.makerdao.com/) for the redemption process.
  - **Option 2:** Claim Dai equivalent in Collateral on behalf of users using the [migration portal](https://migrate.makerdao.com/).
  - Choose one of the following:
    - Distribute Collateral to users.
    - Get withdrawal address from users for collateral types not supported on the exchange.
    - Keep the Collateral \(to sell off, for example\) and update user internal fiat balances to reflect their entitled amount.

**Scenario: Redeployment**

- Migrate Dai holdings to new Dai token on behalf of users using the [migration portal](https://migrate.makerdao.com/).
- Alternatively, carry out-migration by interacting directly with the migration contracts using CLI tools. See [this guide](https://github.com/makerdao/developerguides/blob/master/governance/Collateral%20Redemption%20during%20Emergency%20Shutdown.md).
- If applicable, migrate MKR token holdings on behalf of users using the [migration portal](https://migrate.makerdao.com/)
- Update token address\(es\) in your system.

### **Non-Custodial Wallet**

In case of Emergency Shutdown, non-custodial wallet providers should alert your user base about ES and provide public links for more information. You may follow the recommended procedures listed below in the case of Emergency Shutdown.

#### **Recommended Procedure**

- **Scenario: Shutdown**
  - Redirect users to the [migration portal](https://migrate.makerdao.com/) to claim their Dai equivalent in Collateral, or create an interface to handle the process locally.
- **Scenario: Redeployment**
  - Inform users to migrate their Dai on the [migration portal](https://migrate.makerdao.com/), or create an internal interface to handle the process locally.
  - Add featured support for new token\(s\).

### **Decentralized Exchanges \(DEXs\)**

As a decentralized exchange, you can inform users with a banner about the current status of the Maker Protocol and direct them toward relevant communication channels to find out more. **You may choose one of the two following options to allow your users to carry out the ES redemption process:**

- Direct them to the [migration portal](https://migrate.makerdao.com/), where they can start the claiming process for their Dai.
- Build an interface to handle the ES process on your platform, inform your users, and have them act accordingly.

#### **Recommended Procedure:**

- **Scenario: Shutdown**
  - Inform users to claim equivalent value of Dai in Collateral on the [migration portal](https://migrate.makerdao.com/) or create an interface to handle the process locally.
- **Scenario: Redeployment**
  - Inform users to migrate their Dai to the new Dai \(and MKR if applicable\) on the [migration portal](https://migrate.makerdao.com/), or create an interface to handle the process on your platform.
  - Add new token\(s\) to the exchange.

### **Dapp Browsers**

As a dapp browser, please make sure to alert your user base about ES and provide links to more information \(e.g.,[ blog.makerdao.com](http://blog.makerdao.com) or[ makerdao.com](http://makerdao.com)\). In case of either an emergency system shutdown or system redeployment after ES is triggered, redirect your users to the [migration portal](https://migrate.makerdao.com/) to claim their Collateral.

### **Vault Integrators**

As a Vault integrator, it is very important that you integrate with Maker Protocol contracts \(more specifically, end.sol\). This crucial integration will allow you to quickly create a reactive logic that will handle the post-ES process for your users. If you are a custodial service, such as a centralized exchange, please inform your users in advance about your plan on handling the Emergency Shutdown event. You may follow the recommended procedures listed below in the case of Emergency Shutdown.

**Recommended Procedure**

- **Scenario: Shutdown**
  - Claim users’ funds through the [migration portal](https://migrate.makerdao.com/) or by direct interaction with the migration contracts, and make them available in their accounts.
- **Scenario: Redeployment**
  - Migrate users’ funds to a new redeployed system using the [migration portal](https://migrate.makerdao.com/) or by interacting directly with the migration contracts.

As a **non-custodial Vault integrator**, please make sure to integrate with the Maker Protocol contracts \(end.sol\). This allows you to be notified at the exact moment the Shutdown has been triggered. Otherwise, it is suggested that you inform your users on how they can free Collateral in Vaults. This can either be done in the non-custodial Vault integrator’s UI or you can direct them to [Oasis.app/borrow](https://oasis.app/borrow) if the users need to migrate their Vault. If you do decide to use your own services, you will need a UI that allows users to withdraw their Vaults from a proxy contract so it shows up on the [migration portal](https://migrate.makerdao.com/). Direct your users there. Alternatively, you may create an interface that will help users migrate their Dai in case of a new redeployment, or allow users to claim their Collateral in case of an only shutdown scenario.

### **Decentralized Applications \(Dapps\)**

Dapps are suggested to integrate with Maker Protocol contracts \(end.sol\), which effectively provides a notification system that shows if Emergency Shutdown has been triggered. In terms of preparation, when ES has been triggered, have the following ready for your users:

- A UI interface that alerts and informs users about the event.
- If your Dapp uses a proxy, you will need to enable users to exit from the proxy in order to use the migration app/portal.
- Provide official communication channels for more information as well as a link to the [migration portal](https://migrate.makerdao.com/) for Dai and Vault redemption.

#### **Custodial Services**

If you control access to the smart contracts backing your Dapp, it is suggested to allow your users to retrieve Dai or access their Vaults from their personal wallet as well as direct them to the [migration portal](https://migrate.makerdao.com/) for the ES redemption process. Alternatively, you may claim Dai collateral or claim excess Collateral from Vaults on behalf of your users at the[ migration portal](https://migrate.makerdao.com/), and proceed to distribute it to your users, ensuring that they successfully retrieve it.

#### **Non-Custodial Services**

If you don’t control the smart contracts backing your Dapp directly, then you may direct your users to the [migration portal](https://migrate.makerdao.com/) for Dai and Vault redemption. Alternatively, you may create an interface that allows your users to claim a Dai equivalent in Collateral, or claim excess Collateral from Vaults in case of a system shutdown. Additionally, if there's a redeployment of the system, migrate Dai to the new redeployed system and/or claim excess Collateral from Vaults.

### **Market Makers**

As a market maker during ES, you may provide liquidity in the market so that Dai holders can exchange their Dai for other assets. After there is no market to cover, you can act as a Dai holder and start migrating Dai to new Dai in case of system redeployment or claim equivalent Dai collateral in case of a system-wide shutdown.

## **Detailed Description of the Emergency Shutdown Mechanism for MCD**

_This is an involved and stateful process that involves the following 9 steps._

### **1. Locking the System and Initiating Shutdown of the Maker Protocol \(aka Caging the System\)**

Locking the prices down for each collateral type is done by freezing the following user entry points:

- Vault creation
- Surplus/Debt Auctions
- Dai Savings Rate \(DSR\)
- Governance entry points

Next, the system will stop all of the current debt/surplus auctions, allowing individual auctions to be canceled by calling a function that moves the first phase of a collateral auction to the **End.** This process is completed by retrieving the Collateral and repaying Dai to the highest bidder of the respective auction contract. One reason these auctions are frozen and canceled is that the Emergency Shutdown process is designed to pass along the system surplus or system debt to Dai holders. In general, there are no guarantees regarding the value of MKR during a Shutdown and the mechanisms that typically rely on MKR's market value cannot be relied upon, ultimately resulting in there being no reason to keep running the auctions that impact MKR supply. More specifically, the reasons debt and surplus auctions get canceled are as follows:

- Surplus auctions no longer serve their purpose. This is because, after a shutdown, the surplus is designed to be allocated to Dai holders. Thus, canceling surplus auctions during Shutdown allows the system to return the surplus Dai back to the Settlement engines balance and ultimately back to Dai holders.
- Debt auctions also stop serving their purpose. This is because the bad debt is passed as a haircut \(lower-than-market-value placed on an asset being used as Collateral in a Vault\) back to Dai holders if there is no other system surplus available.

As for collateral auctions, they are not immediately canceled \(but can be canceled by any user\) because they are still tied to the valuable Collateral in the system. Collateral auctions continue to run, and Keepers can continue to bid on them. If there are no bidders, the live auctions can also be canceled.

Despite the fact that auctions can continue to run, this does not guarantee that all of the remaining Vaults are overcollateralized. There is also nothing to prevent the undercollateralized and unbitten Vaults from existing at the moment **cage** is called.

During this time, the function that adds the debt \(total Dai wanted from the auction\) cannot be called, as the function requires the system to be running normally, disabling liquidations after Shutdown. Additionally, after the **End** begins, all Vaults must be settled at the tagged price, and then the remaining Collateral from a settled Vault must be removed.

Overall, this results in collateral auctions being able to continue during Shutdown or by having them reversed by a user by canceling live auctions \(similar logic to the surplus auctions\). If an auction is canceled, the bids are returned to bidders, and Collateral is returned to the original Vault \(with the liquidation penalty applied in the form of increased debt\).

**Notes regarding collateral auctions:**

- End moves the first phase of collateral auctions to the End by retrieving the Collateral and repaying Dai to the highest bidder.
- The second phase of auctions allows bids to be made, while decreasing the quantity up for auction. During this phase, completed auctions are settled as they have already raised the necessary Dai and are already in the process of returning the Collateral to the original Vault holder.

**Other Notes:**

- MKR could still have value if the current MKR token is tied to another deployment of the system. Note that the system makes no assumptions about the economic value of MKR post-Shutdown.
- It is important to note that on-auction debt and surplus are canceled, and balances are transferred to the End contract. The last step in this process is to begin the cooldown period.

### **2. Setting the Final Prices for the Collateral Types in the Maker Protocol**

This process is completed by setting the system shutdown price for each collateral type. The final prices are determined by reading the price feeds from the Maker Oracles. This is required, as the system must first process the system state before it is possible to calculate the final Dai/collateral price. In particular, we need to determine two things:

\(a\) The shortfall per collateral type considering undercollateralized Vaults.

\(b\) The total quantity of Dai issued \(total debt\), which is the outstanding Dai supply after including the system surplus/deficit.

Firstly, this is determined \(a\) by processing all Vaults with a function that cancels owed Dai from the Vault \(described below\). Next, \(b\) unfolds as described below.

### **3. Settling Vaults at the Final Price by Canceling Owed Dai**

Next, the system will allow for the canceling of all the owed Dai from the Vault\(s\) in the system. Any excess collateral remains within the Vault\(s\) for the owner\(s\) to claim. Then, the backing collateral is taken.

Next, the debt is determined **\(b\)** by processing the ongoing Dai generation operations of the auctions. Processing the ongoing Dai generation ensures that the auctions will not generate any further Dai income. This guarantees that ongoing auctions will not change the total debt of the system, which also includes the two-way auction \(collateral auction\) model not allowing for any more Dai to be generated. Due to this, the Dai generation comes from the first phase of collateral auctions. Thus, if everything is in the second phase of an auction \(bidding on the decreasing quantity up for auction\), we know the generation is over. Generation is over when all auctions are in the reverse/second phase. In addition to ensuring that the auctions will not generate any further Dai, the Dai Savings Rate \(DSR\) must also be shut off during the End so that the total debt does not change.

**Example:**

In terms of user scenarios, the process begins with users bidding more and more Dai until the debt is covered. Next, they start offering less and less Collateral.

The auctions that are in the second phase \(reverse auctions\) no longer affect any more of the total debt, as the Dai was already recovered. Lastly, for the auctions in the first phase, they can be canceled, and the Collateral and debt returned to the Vault.

**One of two methods can ensure that Collateral and debt are returned to the Vault:**

1. The processing cooldown duration \(length of the debt queue\); or
2. By canceling live auctions.

### **4. Using the Cooldown Period or Canceling Live Auctions**

1. **Set the cooldown period.** The duration of the cooldown period only needs to be long enough to cancel owed Dai from the undercollateralized Vaults, and cancel the live first phase auctions. This means that it can, in fact, be quite short \(i.e., 5 minutes\). However, due to the possibility of scenarios such as network congestion occurring, it may be set longer.
2. **Canceling a live auction** will cancel all ongoing auctions and seize the Collateral. This allows for faster processing of the auctions at the expense of more processing calls. This option allows Dai holders to retrieve their Collateral much faster. The next procedure is to cancel each of the individual Collateral \(Flip\) auctions in the forward first phase auctions and retrieve all of the Collateral and return Dai to the bidder. After this occurs, the second phase—reverse auctions—can continue as they usually would, by setting the cooldown period or canceling the live auctions.

Note that both of these options are available in this implementation, with the canceling of the live auctions being enabled on a per-auction basis. When a Vault has been processed and has no debt remaining, the remaining Collateral can be removed.

### **5. Removing the Remaining Collateral from a Settled Vault \(Only After There is no Debt in the Vault\)**

Next, the system will remove the Collateral from the Vault. After the Vaults have been settled at the set final price and the owed Dai from the Vault has been canceled, the Vault owner can call this process as needed. It will remove all of the Collateral remaining after step **3**—basically, all of the Collateral that was not backing the debt. If the user did not have debt in a Vault at the time of the End, he can bypass steps **3 and 4** and can proceed directly to this step to free his Collateral.

### **6. Stabilizing the Total Outstanding Supply of Dai**

After the processing period has elapsed, the calculation of the final price for each collateral type is possible using the thaw function. The assumption is that all under-collateralized Vaults are processed, and all auctions have unwound. The purpose of this function is to stabilize the total outstanding supply of Dai. Note that it may also require extra Vault processing to cover the system's surplus. Checking that the amount of Dai surplus in the core Vault engine is 0 is a requirement during this phase. This requirement is what guarantees that the system surplus has been taken into account. Furthermore, this means that before you can stabilize the total outstanding supply of Dai, you must cancel the owed Dai from as many Vaults as needed to cancel any Dai surplus in the Vow. Canceling Dai surplus is done by canceling out the surplus and debt in the system's balance sheet before you can stabilize the total outstanding supply of Dai.

### **7. Calculating the Fixed Price for a Collateral Type, Possibly Adjusting the Final Collateral Price with Surplus/Deficit**

In this step, the calculation of the exchange price for a given collateral type is determined, as well as the potential adjustment of that final exchange price in the case of deficit/surplus. At this point in the mechanism, the final price for each collateral type has been computed; Dai holders can now turn their Dai into Collateral. Each unit of Dai can claim a fixed basket of Collateral. Dai holders must first lock their Dai so that they can be ready to exchange it for Collateral. Once the Dai is locked, it cannot be unlocked and is not transferable. More Dai can be locked later, as well.

### **8. Locking Dai and Exchanging it for Collateral**

This step is when Collateral is dispensed to the Dai holders who have already locked their Dai in to be exchanged. The larger the amount of Dai locked in, the more Collateral can be released to the Dai holders.

### **9. Exchanging the Locked Dai for Collateral \(Proportional to the Amount Locked\)**

Lastly, the system will allow the exchange of some of the Dai that has been locked for specific collateral types. Note that the number of collateral tokens will be limited by how much locked Dai users have.

## **Getting Support**

### **Rocket Chat Channels**

- [Chat.makerdao.com](http://chat.makerdao.com/). Support channels include but are not limited to:
  - **\#general**
  - **\#dev**
  - **\#governance-and-risk**
  - **\#help**

[**Forum.Makerdao.com** ](https://forum.makerdao.com/) \*\*\*\*

- [Governance](https://forum.makerdao.com/c/governance/5)
- [Risk](https://forum.makerdao.com/c/risk/6)

### **Other Resources and Documentation**

- [Introduction to Emergency Shutdown Blog post](https://blog.makerdao.com/introduction-to-emergency-shutdown-in-multi-collateral-dai/)
- [End Documentation ](https://docs.makerdao.com/smart-contract-modules/shutdown/end-detailed-documentation)
- [Emergency Shutdown Module Documentation ](https://docs.makerdao.com/smart-contract-modules/emergency-shutdown-module)
- [Emergency Shutdown Guide - MCD](https://github.com/makerdao/developerguides/blob/master/mcd/emergency-shutdown/emergency-shutdown-guide.md)
- [Emergency Shutdown CLI ](https://docs.makerdao.com/clis/emergency-shutdown-es-cli)
- [Dai and Collateral Redemption during Emergency Shutdown CLI](https://docs.makerdao.com/clis/dai-and-collateral-redemption-during-emergency-shutdown)
- [Cage Keeper](https://docs.makerdao.com/keepers/cage-keeper#introduction)
- [Emergency Shutdown FAQ](https://github.com/makerdao/community/blob/master/faqs/emergency-shutdown.md)
