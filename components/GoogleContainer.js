import React from 'react';
import MapContainer from './MapContainer';
import AddressInput from './AddressInput';

class GoogleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: props.firstName,
            lastName: props.lastName,
            batch: props.batch,
            email: props.email, 
            mapCenterLat: 40.691332,
            mapCenterLng: -73.985059
        };
    }

    updateGoogleContainer = (props) => {
        console.log(props.latitude)
        this.setState({
            mapCenterLat: props.latitude,
            mapCenterLng: props.longitude
        })
    }

    render() {
        return(
            <MapContainer
                mapCenterLat = {this.state.mapCenterLat}
                mapCenterLng = {this.state.mapCenterLng}
            >
                <AddressInput
                    firstName = {this.state.firstName}
                    lastName = {this.state.lastName}
                    batch = {this.state.batch}
                    email = {this.state.email}
                    updateGoogleContainer = {this.updateGoogleContainer.bind(this)}
                />
            </MapContainer>
        )
    }
}

export default GoogleContainer