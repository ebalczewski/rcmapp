import React from 'react';

import Button from "./stateless/Button"

import MapContainer from './MapContainer';
import AddressSearcher from './AddressSearcher';
import AddressAdder from './AddressAdder';


class GoogleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isAdd: false,
            isPreviewing: false,
            mapCenterLat: 40.691332,
            mapCenterLng: -73.985059,
        };
    }

    updateGoogleContainer = (latitude, longitude) => {
        this.setState({
            mapCenterLat: latitude,
            mapCenterLng: longitude
        })
    }

    addAddress = async () => {
        try {
            await fetch("http://localhost:4000/api/createAddress",{
                method: "POST",
                body: JSON.stringify({
                current: true, 
                latitude: this.state.mapCenterLat, 
                longitude: this.state.mapCenterLng,
                email: this.props.email,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                batch: this.props.batch
            }),
                headers: {
                    'Accept': "application",
                    'Content-Type' : "application/json"
                }
            })
        } catch(err) {
            console.log(err)
        }
    }

    renderSearch = () => {            
    return (
        <MapContainer
             mapCenterLat = {this.state.mapCenterLat}
             mapCenterLng = {this.state.mapCenterLng} >
            <AddressSearcher
                updateGoogleContainer = {this.updateGoogleContainer.bind(this)}
            />
        </MapContainer>);
    }

    renderPreview = () => {
        let previewMarker;
        if (this.state.isPreviewing) {
            previewMarker = {
                latitude: this.state.mapCenterLat, 
                longitude: this.state.mapCenterLng,
                firstName: this.props.firstName,
                lastName: this.props.lastName
            };
        }
        return (
        <div>
        <MapContainer
            previewMarker = {previewMarker}
            mapCenterLat = {this.state.mapCenterLat}
            mapCenterLng = {this.state.mapCenterLng} >
           <AddressAdder
               updateGoogleContainer = {(latitude, longitude) => {
                   this.updateGoogleContainer(latitude, longitude);
                   this.setState({ isPreviewing : true });
                }}
           />
       </MapContainer>
       <Button type = "submit" onClick = {this.addAddress.bind(this)} title = "Add Address"/>
       </div>);
    }


    render() {
        return this.state.isAdd ? this.renderPreview() : this.renderSearch();
    }
}

export default GoogleContainer