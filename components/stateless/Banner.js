import React from 'react';

import Link from 'next/link';

import Logo from '../../images/recurseLogo.svg';

export class Banner extends React.Component {

    render() {
        return (
            <div className="d-flex justifty-content-between w-100" style={{backgroundColor: 'lightgreen'}}>
                <div className="p-2">
                    <Link href="/" >
                        <Logo width="50px" height="50px" />
                    </Link>
                </div>
                <div className="p-2">
                    <p>Hello, {this.props.name}!</p>
                </div>

                <div className="p-2 ml-auto">
                    <a href="/settings">Add Address</a>
                </div>

                <div className="p-2">
                    <a href={this.props.authUrl}>{this.props.authText}</a>
                </div> 
            </div>
        )
    }
}

export default Banner;
