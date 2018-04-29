import React, {Component} from 'react';
import {Container, Grid, Row, Column} from 'semantic-ui-react'
// require('dotenv').config()
import QrReader from './components/QrReader'
import InfoButton from './components/InfoButton'
import Transfer from './components/Transfer'
import AddToken from './components/AddToken'
import DeleteToken from './components/DeleteToken'
// import ShowTransaction from './components/ShowTransaction'

Object.assign(process.env, {
  PRIVATE_KEY:'5114FEC8E12668D7CF90196688FB79979FB555E91533FE3CBD573561F892E6B5',
  HTTP_URL: 'http://api.beta.catapult.mijin.io:3000',
  BLAH: 'blah'
})

let amount = 0

// const setAmount = (amt) => {
//   amount = amt
// }

class App extends Component {
  state = {
    users: [],
    amount: null
  }

  // componentDidMount() {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

  render() {
    return (
      <div>
        <Container className="App">
          <Grid centered columns={1}>
            <Grid.Row>
              <Grid.Column>
                {/* <h1>Users</h1>
                  {this.state.users.map(user =>
                  <div key={user.id}>{user.username}</div>
                )} */
                }
                <InfoButton/>
                <QrReader setAmount={amount =>this.setState({amount})}/>
                <Transfer amount={amount}/>
                { this.state.amount && <AddToken amount={this.state.amount}/> }
                <DeleteToken amount={amount}/>
                {/* <ShowTransaction /> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
