import axios from 'axios';

export default class Login extends React.Component {
  static async getInitialProps({ req }) {
    return await axios.get('http://localhost:4000/api/login')
      .then((response) => { 
        return { authUrl : response.data.authUrl };
      })
      .catch((err) => {
        console.log(err);
        return {}
      })
  }

  render() {
    return (<a href={this.props.authUrl}>Login</a>)
  }
}
