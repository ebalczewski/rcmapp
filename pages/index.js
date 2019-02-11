import React from 'react';

import PageWrapper from '../components/stateless/PageWrapper';

class Index extends React.Component {

  render() {
      return(this.props.renderPage(false));
  }
}


export default PageWrapper(Index);