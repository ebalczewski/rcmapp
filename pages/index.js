import React from 'react';

import FormContainer from './FormContainer';
import UserInfoDisplay from './UserInfoDisplay'
import MapContainer from './MapContainer';
import Login from './Login';

import Banner from '../components/stateless/Banner';
import MapContainer from '../components/MapContainer';
import AddressInput from '../components/AddressInput';


export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    if (req.cookies.userEmail !== undefined) {
      return req.cookies
    } else {
      res.redirect('/login')
    }
  }

  constructor(props) {
      super(props)

      this.onLoginSucess = this.onLoginSucess.bind(this);

      this.state = {
          isLoggedIn: false,
          userEmail: null,
          showUserInfo: true,
          editUserInfo: true,
          userEmail: props.userEmail,
          firstName: props.firstName,
          lastName: props.lastName,
          userBatches: props.userBatches,
      }
  }

  componentDidMount() {
    //
  }

  onLoginSucess(email) {
    this.setState({
      isLoggedIn: true,
      userEmail: email
    })
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
    } else {
      return(
        <div>
          <Login action={this.onLoginSucess} />
        </div>);
    }

  }
  //Also probs want a footer
  
  render() {
      return(
        <div>
          <Banner name={this.state.firstName}/>
          <MapContainer>
              <AddressInput
                firstName = {this.state.firstName}
                lastName = {this.state.lastName}
                batch = {this.state.userBatches}
                email = {this.state.userEmail}
             />
          </MapContainer>
        </div>
      );
  }
}
