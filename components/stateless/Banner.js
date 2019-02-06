import axios from 'axios';
import React from 'react';

export class Banner extends React.Component {

    render() {
        return (
            <div>
                <a href={this.props.authUrl}>{this.props.authText}</a>
                {this.props.name}
            </div>
        )
    }
}

export default Banner;