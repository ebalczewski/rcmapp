
import React from 'react';

import FormContainer from './FormContainer';
import UserInfoDisplay from './UserInfoDisplay'
import MapContainer from './MapContainer';

export class App extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
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
  

  render() {
      return(
        <div>
          {this.renderBanner()}
          {this.renderAuthentication()}
          {this.renderUserInfo()}
          {this.renderMap()}
        </div>
        //{renderForm()}
      );
  }
}

export default App;