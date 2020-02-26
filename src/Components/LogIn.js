import React, { Component, createRef } from 'react'
import { Dropbox } from "dropbox";

class LogIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            LoginDropBox: '',
            accessToken: false
        }
    }

    LogIn = () => {
        let CLIENT_ID = 't99ul8j5gzu9ufc';

        let dbx = new Dropbox({ clientId: CLIENT_ID });
        let LocalHost = 'http://localhost:3000/auth';
        let authUrl = dbx.getAuthenticationUrl(LocalHost);

        console.log(authUrl);

        this.setState({ LoginDropBox: authUrl});
    }

    render() {
        const { LoginDropBox} = this.state;

        return (
            <div>
                <a onClick={this.LogIn} href={LoginDropBox}>Logga in</a>
            </div>
        )
    }
}

export default LogIn
