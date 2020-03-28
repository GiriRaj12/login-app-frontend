import React from 'react';
import LoginComponent from './LoginComponent.js'
import WelcomPage from './WelcomPage.js'

class App extends React.Component {
  state = {
    session: false
  }
  componentDidMount(){
    this.checkSession();
  }
  
  render() {
    if (this.state.session) {
      return (<WelcomPage logout={this.logout.bind(this)} />);
    }
    else {
      return (<LoginComponent doneLogin={this.doneLogin.bind(this)} />);
    }
  }
  doneLogin() {
    this.setState({ session: true });
  }

  logout() {
    this.setState({ session: false });
  }

  checkSession() {
      fetch("http://localhost:8080/user/session")
        .then(res => res.json())
        .then(response => {
          console.log(response);
          this.setState({ session: response.isSession });
        })
    return this.state.session;
  }
}
export default App;
