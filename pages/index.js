import React from 'react';

import Banner from '../components/stateless/Banner';
import GoogleContainer from '../components/GoogleContainer';

import axios from 'axios';

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    if (req.cookies.userEmail !== undefined) {
      req.cookies.authUrl = 'http://localhost:4000/auth/logout'
      req.cookies.authText = 'Logout'
      return req.cookies
    } else {
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
  }

  constructor(props) {
      super(props)

      this.state = {
          userEmail: props.userEmail,
          firstName: props.firstName,
          lastName: props.lastName,
          userBatches: props.userBatches,
          authUrl: props.authUrl,
          authText: props.authText,
      }
  }

  componentDidMount() {

  }
  //Also probs want a footer

  renderMapContainer = () => {
    if (this.state.userEmail !== undefined) {
      return (
          <GoogleContainer
            firstName = {this.state.firstName}
            lastName = {this.state.lastName}
            batch = {this.state.userBatches}
            email = {this.state.userEmail}
          />
      );
    } else {
      return (
        <h3>YOU ARE NOT A LEET HAXOR!!</h3>
      );
    }
  }
  
  render() {
      return(
        <div>
          <Banner name={this.state.firstName} authUrl={this.state.authUrl} authText={this.state.authText} />
          {this.renderMapContainer()}
        </div>
      );
  }
}