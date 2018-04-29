import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

const nem2Sdk = require("nem2-sdk");
// require('dot-env'
// require('dotenv').config()

const Account = nem2Sdk.Account,
  Deadline = nem2Sdk.Deadline,
  NetworkType = nem2Sdk.NetworkType,
  MosaicSupplyChangeTransaction = nem2Sdk.MosaicSupplyChangeTransaction,
  MosaicId = nem2Sdk.MosaicId,
  MosaicSupplyType = nem2Sdk.MosaicSupplyType,
  TransactionHttp = nem2Sdk.TransactionHttp,
  // PlainMessage = nem2Sdk.PlainMessage,
  UInt64 = nem2Sdk.UInt64;

const privateKey = "5114FEC8E12668D7CF90196688FB79979FB555E91533FE3CBD573561F892E6B5"
// const privateKey = process.env.PRIVATE_KEY;

const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST)
const mosaicID = new MosaicId('choice:nzdc');

const transactionHttp = new TransactionHttp('http://api.beta.catapult.mijin.io:3000');

class AddToken extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async () => {
    const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
      Deadline.create(),
      mosaicID,
      MosaicSupplyType.Increase,
      UInt64.fromUint(this.props.amount),
      // PlainMessage.create('please sir I want some more !'),
      NetworkType.MIJIN_TEST
    );
    
    const signedTransaction = account.sign(mosaicSupplyChangeTransaction);

    transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.error(err));
  };

  render() {
    return (
      <div>
        <Button className='increase' onClick={() => this.onSubmit()}>
          AddToken of { this.props.amount }
        </Button>
      </div>
    );
  }
}
export default AddToken;
