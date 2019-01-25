import React from 'react';

import Banner from '../components/stateless/Banner';
import MapContainer from '../components/MapContainer';
import AddressInput from '../components/AddressInput';


export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    if (req.cookies.user !== undefined) {
      return req.cookies
    } else {
      res.redirect('/login')
    }
  }

  constructor(props) {
      super(props)
      this.state = {
          user: props.user
      }
  }

  componentDidMount() {

  }
  //Also probs want a footer
  
  render() {
      return(
        <div>
          <Banner name={this.state.user.firstName}/>
          <AddressInput 
            firstName = {this.state.user.firstName} 
            lastName = {this.state.user.lastName}
            batches = {this.state.user.batches}
          />
          <MapContainer />
        </div>
      );
  }
}
