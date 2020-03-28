import React from 'react'
import styles from './styles';

class WelcomPage extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        fetch("http://localhost:8080/user/logout")
        .then(res => res.json)
        .then(response =>{
            if(response){
                this.props.logout();
            }
        })
        .catch(err => console.log(err));
    }

    render(){
        return(
        <div>
        <a>WelcomPage</a>
        <button style={styles.buttonStyle} onClick={this.logout}>Logout</button>
        </div>
        );
    }
}
export default WelcomPage;