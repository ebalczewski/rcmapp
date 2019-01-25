import React from 'react';

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

      this.state = {
          userEmail: props.userEmail,
          userName: props.firstName,
          userBatches: props.userBatches,
      }
  }

  componentDidMount() {

  }
  //Also probs want a footer
  
  render() {
      return(
        <div>
          <Banner name={this.state.userName}/>
          <AddressInput />
          <MapContainer />
        </div>
      );
  }
}
