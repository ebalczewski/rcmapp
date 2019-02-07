import React from 'react';

export class Banner extends React.Component {

    render() {
        return (
            <div>
                <a href={this.props.authUrl}>{this.props.authText}</a>
                <img src={ require('../../images/cog.svg')} />
                {this.props.name}
            </div>
        )
    }
}

export default Banner;