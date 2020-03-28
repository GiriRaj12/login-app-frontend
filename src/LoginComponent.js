import React from 'react';
import styles from './styles';

class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.doneLogin = this.doneLogin.bind(this);
    }
    state = {
        login: true,
        infoText: ''
    }
    doneLogin(){
        this.props.doneLogin(true);
    }

    loginHandler = () =>{
        if (this.email.value && this.password.value) {
            fetch("http://localhost:8080/user/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  },
                body:JSON.stringify({'userName':this.email.value,'passoword':this.password.value})
            })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    if(response == true){
                        this.doneLogin();
                    }
                    else{
                        this.setState({infoText:"Worng credentials please login again ! "});
                    }
                })
                .catch(err => console.log(err));
        }
        else {
            console.log("Came into else");
            this.setState({ infoText: 'Email or Passoword cannot be empty' });
        }
    }

    registerHandler = () => {
        if (this.email.value && this.password.value) {
            fetch("http://localhost:8080/user/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  },
                body:JSON.stringify({'userName':this.email.value,'passoword':this.password.value})
            })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    if(response == true){
                        this.doneLogin();
                    }
                    else{
                        this.setState({infoText:"User Aldready exists please user other credentials"});
                    }
                });
        }
        else {
            console.log("Came into else");
            this.setState({ infoText: 'Email or Passoword cannot be empty' });
        }
    }

    render() {
        if (this.state.login) {
            return (
                <div className="Container" style={styles.containerStyle}>
                    <input type="email" id="email" placeholder="Enter Email" style={styles.inputStyle} onKeyPress={this.disappearText} ref={(input) => this.email = input}></input>
                    <input type="password" id="password" placeholder="Password" style={styles.inputStyle} ref={(input) => this.password = input}></input>
                    <button onClick={this.loginHandler} style={styles.buttonStyle}>Login</button>
                    <p style={styles.text}>Not have an account then Register here !</p>
                    <a style={{ color: 'blue', cursor: 'pointer', fontSize: 15 }} onClick={() => this.setState({ login: false })}>Register</a>
                    <a style={{ color: 'red', fontSize: 15 , display:'block', marginLeft:'25%'}}>{this.state.infoText}</a>
                </div>
            );
        }
        else {
            return (
                <div className="Container" style={styles.containerStyle}>
                    <input type="text" id="name" placeholder="Enter Name" style={styles.inputStyle}></input>
                    <input type="email" id="email" placeholder="Enter Email" style={styles.inputStyle} ref={(input) => this.email = input} onKeyPress={this.disappearText}></input>
                    <input type="password" id="password" placeholder="Password" style={styles.inputStyle} ref={(input) => this.password = input}></input>
                    <button onClick={this.registerHandler} style={styles.buttonStyle}>Register</button>
                    <p style={styles.registerText}>Aldready have an account ?</p>
                    <a style={{ color: 'blue', cursor: 'pointer', fontSize: 15 }} onClick={() => this.setState({ login: true })}>Login</a>
                    <a style={{ color: 'red', fontSize: 15, display:'block',marginLeft:'25%'}}>{this.state.infoText}</a>
                </div>
            )
        }
    }

    disappearText = () => {
        if(this.state.infoText){
            this.setState({ infoText:''});
            console.log("Came into set null");
        }
    }
}
export default LoginComponent;
