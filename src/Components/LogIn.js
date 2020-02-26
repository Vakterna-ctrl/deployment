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
        let CLIENT_ID = 'zq9wux9j3d1a5ow';

        let dbx = new Dropbox({ clientId: CLIENT_ID });
        let LocalHost = 'http://localhost:3000/auth';
        let authUrl = dbx.getAuthenticationUrl(`https://www.dropbox.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${LocalHost}`);

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
