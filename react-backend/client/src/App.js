import React, {Component} from 'react';
import {Container, Grid, Row, Column} from 'semantic-ui-react'
import './App.css';
import QrReader from './components/QrReader'
import InfoButton from './components/InfoButton'
import Transfer from './components/Transfer'
import AddToken from './components/AddToken'
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
