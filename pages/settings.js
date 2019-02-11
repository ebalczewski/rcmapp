import React from 'react';

import PageWrapper from '../components/stateless/PageWrapper';

class Settings extends React.Component {
    render() {
        return(this.props.renderPage(true));
    }
}

export default PageWrapper(Settings);