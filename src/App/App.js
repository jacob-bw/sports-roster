import React from 'react';
import firebase from 'firebase/app';
import './App.scss';

import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/Navbar/Navbar';

firebaseConnection.firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  renderView = () => {
    const { authed } = this.state;
    if (!authed) {
      return (<Auth />);
    }
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNavbar authed={authed} />
        { this.renderView() }
        <button className='btn btn-warning'>GO SPORTS</button>
    </div>
    );
  }
}

export default App;
