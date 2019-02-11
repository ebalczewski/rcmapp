import React from 'react';

import Link from 'next/link';

import Cog from '../../images/cog.svg';
import Logo from '../../images/recurseLogo.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
export class Banner extends React.Component {

    render() {
        return (
            <div class="container-fluid" margin="0px" padding="0px">
                <Row background-color="green" >
                    <Col class="col-md-auto"> 
                        <Link href="/" >
                        <Logo width="50px" height="50px" />
                        </Link>
                    </Col >
                    <Col class="col-md-auto">
                        <p>Hello, {this.props.name}!</p>
                    </Col>
                    <Col />
                    <Col />
                    <Col />
                    <Col />
                    <Col />
                    <Col class="col-md-auto">
                        <Link href="/settings">
                        <Cog />
                        </Link>
                    </Col>
                    <Col class="col-md-auto">
                        <a href={this.props.authUrl}>{this.props.authText}</a>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Banner;
