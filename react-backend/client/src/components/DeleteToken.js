import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';

const nem2Sdk = require("nem2-sdk");
// require('dot-env')
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
// const privateKey = process.env.PRIVATE_KEY;

const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

const mosaicID = new MosaicId('choice:nzdc');
const mosaicSupplyChangeTransaction =  MosaicSupplyChangeTransaction.create(Deadline.create(),
  mosaicID,
  MosaicSupplyType.Decrease,
  UInt64.fromUint(1700000),
  NetworkType.MIJIN_TEST,);

const signedTransaction = account.sign(mosaicSupplyChangeTransaction);

const transactionHttp = new TransactionHttp('http://api.beta.catapult.mijin.io:3000');


class DeleteToken extends Component {
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
          className='decrease'
          onClick={ () => this.onSubmit() }
          >
          DeleteToken
        </Button>
      </div>
    );
  }
}
export default DeleteToken;
