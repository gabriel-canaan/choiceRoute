import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
const nem2Sdk = require("nem2-sdk");
const Listener = nem2Sdk.Listener,
    Address = nem2Sdk.Address;

const listener = new Listener('http://api.beta.catapult.mijin.io:3000');


class ShowTransaction extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async () => {
    listener.open().then(() => {
      const address =  Address.createFromRawAddress('SCNV6D-ZMYA7P-CFSMSC-ZXLWPC-ML4Z2N-ZXYDEB-7XA2');
      listener.confirmed(address).subscribe(
        transaction => console.log(transaction),
        err => console.error(err)
      );
    });
  }

  render() {
    return (
      <div>
        <Button
          className='listener'
          onClick={ () => this.onSubmit()}
          >ShowTransaction</Button>
      </div>
    );
  }
}
export default ShowTransaction;
