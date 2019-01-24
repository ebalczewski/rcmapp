import React from 'react';

import FormContainer from './FormContainer';
import UserInfoDisplay from './UserInfoDisplay'
import MapContainer from './MapContainer';
import AddressInput from './AddressInput';
import Login from './login';

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    if (req.cookies.access_token !== undefined) {
      return req.cookies
    } else {
      res.redirect('/login')
    }
  }

  constructor(props) {
      super(props)

      this.state = {
          token: props.access_token,
          isLoggedIn: true,
          userEmail: null,
          showUserInfo: true,
          editUserInfo: true,
      }
  }

  componentDidMount() {
      //this.fetchData()
  }

  renderBanner = () => {
    return(
      <p>Banner here!</p>
    );
  }

  renderAuthentication = () => {
    if (!this.state.isLoggedIn) {
      return(
        <p>Please authenticate yourself!</p>
      )
    }
  }
  
  renderUserInfo = () => {
    if (this.state.showUserInfo) {
      if (this.state.editUserInfo) {
        return(
          <div>
            <FormContainer />
          </div>
        );
      } else if (!this.state.editUserInfo) {
        return(
          <div>
            <UserInfoDisplay />
          </div>
        )
      }
    }
    return(null);
  }
  //Probably will add 1 more component with filters/searching/preferences
  renderMap = () => {
    if (this.state.isLoggedIn) {
      return(
        <div>
          <MapContainer />
        </div>
      );
    }
    return(null);
  }

  //Also probs want a footer
  
  render() {
      return(
        <div>
          {this.renderBanner()}
          {this.renderAuthentication()}
          {this.renderUserInfo()}
          <AddressInput />
          {this.renderMap()}
        </div>
      );
  }
}
