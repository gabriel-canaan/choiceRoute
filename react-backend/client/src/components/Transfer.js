import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Input  } from 'semantic-ui-react'
// import QrReader from './QrReader'
// require('dotenv').config()
// require('dot-env')
const nem2Sdk = require("nem2-sdk");

const Address = nem2Sdk.Address,
  Deadline = nem2Sdk.Deadline,
  Account = nem2Sdk.Account,
  UInt64 = nem2Sdk.UInt64,
  NetworkType = nem2Sdk.NetworkType,
  PlainMessage = nem2Sdk.PlainMessage,
  TransferTransaction = nem2Sdk.TransferTransaction,
  Mosaic = nem2Sdk.Mosaic,
  MosaicId = nem2Sdk.MosaicId,
  TransactionHttp = nem2Sdk.TransactionHttp;

 export const transferTransaction = (amount) => {
  return TransferTransaction.create(Deadline.create(),
  Address.createFromRawAddress('SBG2AR-6VPSMZ-7JTJOF-OZ5NYY-FJ4UVW-C5EIHV-N5WA'), [new Mosaic(new MosaicId('choice:nzdc'),
  UInt64.fromUint(amount))],
  NetworkType.MIJIN_TEST,);
}
// const privateKey = process.env.PRIVATE_KEY;
const privateKey = "5114FEC8E12668D7CF90196688FB79979FB555E91533FE3CBD573561F892E6B5"

const account = Account.createFromPrivateKey(privateKey,              NetworkType.MIJIN_TEST);

const signedTransaction = (amount) => {
return account.sign(transferTransaction(amount));
}

const transactionHttp = new       TransactionHttp('http://api.beta.catapult.mijin.io:3000');

export const submitTransaction = (amount) => {
  const transaction = TransferTransaction.create(Deadline.create(),
  Address.createFromRawAddress('SBG2AR-6VPSMZ-7JTJOF-OZ5NYY-FJ4UVW-C5EIHV-N5WA'), [new Mosaic(new MosaicId('choice:nzdc'),
  UInt64.fromUint(amount))],
  PlainMessage.create('my first transfer transaction!'),
  NetworkType.MIJIN_TEST,);

  const signed = account.sign(transaction);

  transactionHttp.announce(signed)
  .subscribe(x => console.log(x), err => console.log(err));
}

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      amount: props.amount,
      address: ''
    }
  }

  onSubmit = async () => {
    transactionHttp.announce(signedTransaction(this.state.amount))
    .subscribe(x => console.log(x), err => console.log(err));
  };

  render () {
    return (
      <div>
        <Input
          className='amount'
          placeholder='amount'
          value={this.state.amount}
          onChange={ () => this.onSubmit() }
        />
        <Input
          className='address'
          placeholder='address'
          value={this.state.address}
          onChange={ () => this.onSubmit() }
        />
      </div>
    );
  }
}
export default Transfer;
