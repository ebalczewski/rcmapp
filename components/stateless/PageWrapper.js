import cookies from 'next-cookies';
import React from 'react';

import Banner from './Banner';
import GoogleContainer from '../GoogleContainer';
import BootstrapLink from 
'./BootstrapLink';

const PageWrapper = WrappedComponent => {
    return class extends React.Component {

        static async getInitialProps(ctx) {
            console.log(ctx);
            const { firstName } = cookies(ctx);
            console.log(firstName)
            if (firstName !== undefined) {
              return {
                ...cookies(ctx),
                authUrl: 'http://localhost:4000/auth/logout',
                authText: 'Logout'
              }
            } else {
                ctx.res.redirect('/login');
            }
        }

        renderPage = (isAdd) => {
            return(
                <div>
                    <BootstrapLink/>
                    <Banner name={this.props.firstName} authUrl={this.props.authUrl} authText={this.props.authText} />
                    <GoogleContainer
                        firstName = {this.props.firstName}
                        lastName = {this.props.lastName}
                        batch = {this.props.userBatches}
                        email = {this.props.userEmail}
                        isAdd = {isAdd}
                    />
                </div>
              );
        }

        render() {
            return <WrappedComponent renderPage = {this.renderPage}{...this.props}/>
        }
    }
}

export default PageWrapper;