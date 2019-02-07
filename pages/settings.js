import React from 'react';

import Banner from '../components/stateless/Banner';
import GoogleContainer from '../components/GoogleContainer';

import cookies from 'next-cookies';

export default class extends React.Component {
  static async getInitialProps(ctx) {
    const { userEmail } = cookies(ctx);
    if (userEmail !== undefined) {
      return {
        ...cookies(ctx),
        authUrl: 'http://localhost:4000/auth/logout',
        authText: 'Logout'
      }
    } else {
      ctx.res.redirect('/login');
    }
  }

  render() {
      return(
        <div>
          <Banner name={this.props.firstName} authUrl={this.props.authUrl} authText={this.props.authText} />
          <GoogleContainer
            firstName = {this.props.firstName}
            lastName = {this.props.lastName}
            batch = {this.props.userBatches}
            email = {this.props.userEmail}
            isAdd = {true}
          />
        </div>
      );
  }
}