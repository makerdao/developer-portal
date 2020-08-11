---
description: In-line comments on the Maker Protocol's Core Smart Contracts
---

# Smart Contract Annotations

## Introduction

Understanding the various terms used in our smart contracts can involve a significant time investment for developers looking at the codebase for the first time. Due to this fact, we need resources in various formats to ensure they can get up and running quickly. We believe, in order to complement the technical documentation on docs.makerdao.com, that highlighting sections of the codebase and annotating it with comments can surface relevant information developers need while reading the raw contracts in order to understand the contracts better.

**Examples of how annotations may be useful for developers:**

* Highlight terms to display their definitions 
  * **Ex:** `ink`, `art`
* Explain various input parameters in-depth 
  * **Ex:** Explain the precise role of users defined as `gal` or `guy` within input parameters.
* Link to sections of other smart contracts from where function calls typically originate from
  * **Ex:** `heal` in `Vat` is called from `Vow`
* Additional context to Maker specific design practices that other smart contract developers might not be accustomed to
  * **Ex:** Show the event log signature produced by the `note` modifier on a function.
* Help developers navigate through scenarios that result in calls across multiple smart contracts
  * **Ex:** Keepers participating in collateral auctions kick the process with `bite` on `Cat`, bad debt is settled in `Vat`, accounted for in `Vow`, and a series of transactions on `flip` until they receive collateral they purchased for a discount.
* Superimposing the operational view of the system on all functions will help developers build richer mental models of the Maker Protocol. 
  * **Ex:** Annotating a function's `auth` modifier and mentioning the smart contracts authorized to call it.

Annotations will also serve as an open and collaborative discussion layer that helps developers discuss and evolve their understanding of the smart contracts over time.

## Using Hypothesis

[Hypothesis](https://web.hypothes.is/) is a web-based tool that we use to annotate the codebase hosted on our Github org.

### **Example**

Check out the annotations of the **Vat** smart contract [here. ](https://via.hypothes.is/https://github.com/makerdao/dss/blob/master/src/vat.sol)

### Usage

Hypothesis annotations can be viewed by expanding a sidebar on the top right corner of your browser window.

**There are three options to view annotations on a webpage:** 

* Install the [chrome extension](https://chrome.google.com/webstore/detail/hypothesis-web-pdf-annota/bjfhmglciegochdpefhhlphglcehbmek) from the web store.
* Follow instructions to setup a [bookmarklet](https://web.hypothes.is/start/)
* Append [https://via.hypothes.is](https://via.hypothes.is/) to a URL.

### **Our Hypothesis Groups:**

* `MakerDAO` restricted group- everyone is allowed to read annotations but only approved members can contribute [here](https://hypothes.is/groups/zy1LApRW/makerdao).
* Public MakerDAO group that is open for everyone to both read and contribute.

### Create a Hypothesis account [here](https://hypothes.is/signup) to get started!

