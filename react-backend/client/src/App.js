import React, { Component } from 'react';
import './App.css';
import QrReader from './components/QrReader'
import InfoButton from './components/InfoButton'
import Transfer from './components/Transfer'
let amount = 0

const setAmount = (amt) => {
  amount = amt
}
class App extends Component {
  state = {users: []}

  // componentDidMount() {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

  render() {
    return (
      <div className="App">
        {/* <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )} */}
        <InfoButton />
        <QrReader setAmount={setAmount} />
        <Transfer amount={amount}   />
      </div>
    );
  }
}

export default App;
