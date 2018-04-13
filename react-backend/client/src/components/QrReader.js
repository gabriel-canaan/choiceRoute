import React, { Component } from 'react'
// import { Form, TextArea, Input  } from 'semantic-ui-react'
import QrReader from 'react-qr-reader'
import {submitTransaction} from './Transfer'


class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
    this.setAmount = props.setAmount
  }

  handleScan(data){
    if(data){
      this.setState({
        result: data,
      })
      submitTransaction(data);

    }
  }

  handleError(err){
    console.error(err)
  }

  render(){
    return(
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '20%' }}
          />
        <p>{this.state.result}</p>
        {/* <TextArea
          className='input'
          readOnly={this.state.result}
         /> */}
      </div>
    );
  }
}

export default Test;
