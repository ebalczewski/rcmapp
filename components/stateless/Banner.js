import React from 'react';

import Link from 'next/link';

import Cog from '../../images/cog.svg';
import Logo from '../../images/recurseLogo.svg';

export class Banner extends React.Component {

    render() {
        return (
            <div>
                <Link href="/">
                    <Logo />
                </Link>

                <p>Hello, {this.props.name}!</p>

                <Link href="/settings">
                    <Cog />
                </Link>

                
                <a href={this.props.authUrl}>{this.props.authText}</a>
            </div>
        )
    }
}

export default Banner;
