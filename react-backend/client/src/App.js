import React, {Component} from 'react';
import {Container, Grid, Row, Column} from 'semantic-ui-react'

import QrReader from './components/QrReader'
import InfoButton from './components/InfoButton'
import Transfer from './components/Transfer'
import AddToken from './components/AddToken'
import DeleteToken from './components/DeleteToken'
import ShowTransaction from './components/ShowTransaction'
let amount = 0

const setAmount = (amt) => {
  amount = amt
}

class App extends Component {
  state = {
    users: []
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
                <QrReader setAmount={setAmount}/>
                <Transfer amount={amount}/>
                <AddToken amount={amount}/>
                <DeleteToken amount={amount}/>
                <ShowTransaction />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
