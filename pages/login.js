import React, {Component} from 'react';

import axios from 'axios';

class Login extends Component {
    static async getInitialProps() {
        return await axios.get('http://localhost:4000/auth/login')
        .then((response) => {
          return {
            authUrl: response.data.authUrl,
            authText: 'Login'
          };
        })
        .catch((err) => {
          console.log(err);
          return {}
        })
    }

    render() {
        return (
            <div>
                <a href={this.props.authUrl}>{this.props.authText}</a>
            </div>);
    }
}

export default Login;