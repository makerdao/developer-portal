---
title: TinaCMS Pull Request Workflow
description: >-
  Describes how contributors can edit content and create a pull request to the
  Developer Portal using TinaCMS.
tags:
  - contributing
  - editing
  - tinacms
components:
  - contributors
contentType: guides
root: true
slug: tinacms-pull-request-workflow
date: 'Mon Mar 29 2021 11:14:05 GMT-0600 (Mountain Daylight Time)'
---
# TinaCMS Pull Request Workflow

_This document describes how contributors can edit content and create a pull request to the Developer Portal using TinaCMS._

## Pull Request Workflow Steps

1. Click the "Edit this Site" button at the bottom of the page.

   1. Click "Continue to Github" to move to authorization.

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.34.19_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.34.19_PM.png)

   2. Enter your username and password

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.34.30_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.34.30_PM.png)

   3. Click "Create Fork" (this may take a minute or two)

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.36.07_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.36.07_PM.png)

   4. Notice your Github profile page will now have a fork of the developer portal

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.37.29_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.37.29_PM.png)

2. Switch branches using the TinaCMS menu bar

   1. You will see the menu bar appear at the top of your screen.

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.41.16_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.41.16_PM.png)

      1. Note the menu items may change based on which page you're on.

   2. Notice the "Fork" section should display your new forked repo.
   3. Click the "Branch" dropdown and click "New Branch"

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.46.41_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.46.41_PM.png)

      1. Give your branch a name and click "Create"

         ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.46.52_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.46.52_PM.png)

3. Make your changes to the site then click "Save" in the upper left corner to commit them.

   1. Notice the status indicator in the upper right will indicate "Unsaved Changes" enabling the "Save" button.

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.59.20_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_5.59.20_PM.png)

4. Make a pull request to the original branch

   1. Click the Pull Request button
   2. You will see the option to create a pull request opened on the main repo. Fill it out and click "Create Pull Request"

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_6.01.00_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_6.01.00_PM.png)

   3. You can now view the pull request on the main repo

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_6.02.10_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_6.02.10_PM.png)

5. Exit the TinaCMS editor

   1. Click the menu button on the upper right and exit

      ![/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_6.03.15_PM.png](/images/guides/tina-pr-workflow/Screen_Shot_2021-03-23_at_6.03.15_PM.png)

## Github Authorizations

Members of the DX team are authorized to commit to `master`.

Members of Makerdao org are authorized to create branches and commit to the branch on the main repo.

All other users must create a fork and a pull request.
