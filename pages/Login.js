import React, {Component} from 'react';

import Button from "../components/Button"

//require('dotenv').config();


/* Takes on login clock */
class Login extends Component {
    constructor(props) {
        super(props);

        this.onLoginClick = this.onLoginClick.bind(this);
    } 

    onLoginClick(event) {

        var hackerschool = require('hackerschool-api');
        var client = hackerschool.client();

        var auth = hackerschool.auth({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI
        });

        var authUrl = auth.createAuthUrl();
        fetch(authUrl)
        .then(data => {
            this.props.action(data);
        })
    }

    render() {
        return (
            <div>
              <Button title="Login" type="button" action={this.onLoginClick} />
            </div>);
    }
}

export default Login;