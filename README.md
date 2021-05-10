# Stax by Fattmerchant Invoicing App

## Setting up the `.env`
This step is crucial as without a `.env`, the application wont be able to communicate with the Fattmerchant API.

1. Rename the file `.env.template` to `.env`
2. Add corresponding environment variables 
3. Save file
4. Proceed to ["How to run"](#how-to-run) or restart build server if already running.

## How to Run:

* With Yarn

`yarn install && yarn start`

* With NPM

`npm install && npm run start`

## Requirements
* Build a SIMPLE frontend app that will allow a user to create a new invoice and add line items to it, then do a POST call to our api to create the invoice record.
*  Have a page with an invoice creation form, fields should include:
   * Memo
   * Line Items: 
     * Details
     * Quantity
     * Price
   * Total
* Display some notice that the invoice was created and allow user to start fresh with a new invoice
* Overall design, UI/UX
