import React, {Component} from 'react';

import QrReader from 'react-qr-reader';
import {submitTransaction} from './Transfer';

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 300,
      result: 'No result'
    }
    this.handleScan = this.handleScan.bind(this);
    this.setAmount = props.setAmount;
  }

  handleScan(data) {
    if (data) {
      this.setState({result: data})
      submitTransaction(data);
    }
  }

  handleError(err) {
    console.error(err)
  }

  render() {
    return (
      <div>
        <QrReader delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{width: '20%'}}/>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default Test;
