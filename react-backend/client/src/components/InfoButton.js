import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Input  } from 'semantic-ui-react'
const nem2Sdk = require("nem2-sdk");

const AccountHttp = nem2Sdk.AccountHttp,
  MosaicHttp = nem2Sdk.MosaicHttp,
  NamespaceHttp = nem2Sdk.NamespaceHttp,
  MosaicService = nem2Sdk.MosaicService,
  Address = nem2Sdk.Address;

const url = "http://api.beta.catapult.mijin.io:3000";

const accountHttp = new AccountHttp(url);
const mosaicHttp = new MosaicHttp(url);
const namespaceHttp = new NamespaceHttp(url);

const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);

const address = "SCNV6D-ZMYA7P-CFSMSC-ZXLWPC-ML4Z2N-ZXYDEB-7XA2";

class InfoButton extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      amount: ""
    };
  }

  onSubmit = async () => {
    mosaicService
      .mosaicsAmountViewFromAddress(Address.createFromRawAddress(address))
      .flatMap(_ => _)
      .subscribe(
        mosaic => console.log('You have', mosaic.relativeAmount(), mosaic.fullName()),
        mosaic => this.setState({ amount: mosaic.relativeAmount() }),
        err => console.error(err)
      );
  };

  render() {
    return (
      <div>

        <Button
          className='info'
          onClick={ () => this.onSubmit()}
          >Info</Button>
        <Input
          className='input'
          readOnly={`${this.state.amount}` || "amount"}
         />
        <p>{this.state.amount}</p>
      </div>
    );
  }
}

export default InfoButton;
