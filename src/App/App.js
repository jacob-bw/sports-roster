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

  render() {
    const { authed } = this.state;
    return (
    <div className="App">
        <button className='btn btn-warning'>GO SPORTS</button>
        <MyNavbar authed={authed}/>
    </div>
    );
  }
}

export default App;
