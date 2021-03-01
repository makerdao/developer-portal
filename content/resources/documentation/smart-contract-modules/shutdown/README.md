---
title: Emergency Shutdown Module
description: Introducing the Shutdown Mechanism of the Maker Protocol
group: smart-contracts
components:
  - esm
tags:
  - emergency shutdown
slug: introduction-to-es-module
contentType: documentation
root: true
---

# Maker Protocol Emergency Shutdown

## Introduction

The Maker Protocol, which powers Multi Collateral Dai, is a smart-contract system that backs and stabilizes the value of Dai through a dynamic combination of Vaults, autonomous system of smart contracts, and appropriately incentivized external actors. The Dai Target Price is 1 US Dollar, translating to a 1:1 US Dollar soft peg. Shutdown is a process that can be used as a last resort to directly enforce the Target Price to holders of Dai and Vaults, and protect the Maker Protocol against attacks on its infrastructure.

> Shutdown stops and gracefully settles the Maker Protocol while ensuring that all users, both Dai holders and Vault holders, receive the net value of assets they are entitled to.

In short, it allows Dai holders to directly redeem Dai for collateral after an Emergency Shutdown processing period. 

## Overview of the Shutdown Process 

* The process of initiating Emergency Shutdown is decentralized ****and controlled by MKR voters, who can trigger it by depositing MKR into the Emergency Shutdown Module.
* Emergency Shutdown is triggered in the case of serious emergencies, such as long-term market irrationality, hacks, or security breaches.
* Emergency Shutdown stops and gracefully settles the Maker Protocol while ensuring that all users, both Dai holders and Vault users, receive the net value of assets they are entitled to.
* Vault owners can retrieve excess collateral from their Vaults immediately after initialization of Emergency Shutdown. They can do this via Vault frontends, such as Oasis Borrow, that have Emergency Shutdown support implemented, as well as via command-line tools.
* Dai holders can, after a waiting period determined by MKR voters, swap their Dai for a relative share of all types of collateral in the system. The Maker Foundation will initially offer a web page for this purpose.
* Dai holders always receive the same relative amount of collateral from the system, whether they are among the first or last people to process their claims.
* Dai holders may also sell their Dai to Keepers (if available) to avoid self-management of the different collateral types in the system.

For more information about the Shutdown of the Maker Protocol, read the below **End** as well as the [**Emergency Shutdown Module Documentation.**](/documentation/esm-proxy-detailed-documentation) 



