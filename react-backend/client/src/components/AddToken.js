import React, {Component} from 'react'
// require('dot-env')
import QrReader from './QrReader'
import { Button } from 'semantic-ui-react'
const nem2Sdk = require("nem2-sdk");
// require('dotenv').config()

const Account = nem2Sdk.Account,
  Deadline = nem2Sdk.Deadline,
  NetworkType = nem2Sdk.NetworkType,
  MosaicSupplyChangeTransaction = nem2Sdk.MosaicSupplyChangeTransaction,
  MosaicId = nem2Sdk.MosaicId,
  MosaicSupplyType = nem2Sdk.MosaicSupplyType,
  TransactionHttp = nem2Sdk.TransactionHttp,
  UInt64 = nem2Sdk.UInt64;


  const privateKey = "5114FEC8E12668D7CF90196688FB79979FB555E91533FE3CBD573561F892E6B5"

  const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

  const mosaicID = new MosaicId('choice:nzdc');

  const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(Deadline.create(),
  mosaicID,
  MosaicSupplyType.Increase,
  UInt64.fromUint(2000000),
  NetworkType.MIJIN_TEST,);

  const signedTransaction = account.sign(mosaicSupplyChangeTransaction);

  const transactionHttp = new TransactionHttp('http://api.beta.catapult.mijin.io:3000');


class AddToken extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async () => {
    transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.error(err));
  };

  render() {
    return (
      <div>
        <Button
          className='increase'
          onClick={ () => this.onSubmit() }
          >
          AddToken
        </Button>
      </div>
    );
  }
}
export default AddToken;
