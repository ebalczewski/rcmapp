/*
Based on a tutorial for the React Google Maps wrapper:

https://reactjsexample.com/a-react-component-that-uses-the-google-maps-api/
*/

import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {InfoWindow} from "./stateless/CustomInfoWindow"

const API_KEY = process.env.GOOGLE_MAPS_PLACES_API_KEY

export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            selectedPlace: null,
            showingInfoWindow: false,
            activeMarker: false,
            markers: null,
        }
    }

    async fetchMarkers(){
        const markers = await this.fetchData()
        this.setState({markers})
    }

    updateMarkers() {
        this.state.previewMarker ? this.makePreview() :  this.fetchMarkers()
    }
    
    makePreview() {
        const previewMarker = this.state.previewMarker;
        
        this.setState({ markers: [
            {
                latitude : previewMarker.latitude,
                longitude : previewMarker.longitude,
                user : {
                    firstName : previewMarker.firstName,
                    lastName : previewMarker.lastName
                }
            }
        ]});
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            selectedPlace: props.name,
            showingInfoWindow: true,
        })
    }

    renderSelectedPlace = () => {
        const {selectedPlace} = this.state;
        if (!selectedPlace) return null
        return (
            <div>
                <h1>{selectedPlace}</h1>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.children}
                <div style = {{height:"100vh"}}>
                    <Map
                        google={this.props.google} zoom={14}
                        center={{
                            lat: this.props.mapCenterLat,
                            lng: this.props.mapCenterLng
                        }}
                        initialCenter={{
                            lat: this.props.mapCenterLat,
                            lng: this.props.mapCenterLng
                        }}
                    >
                        {this.props.markers.map((item, key) => {
                            return <Marker
                                key={key}
                                title={item.user.firstName + " " + item.user.lastName}
                                name={item.user.firstName + " " + item.user.lastName}
                                user={item.user}
                                position={{lat: item.latitude, lng: item.longitude}}
                                onClick={this.onMarkerClick}
                            /> }
                        )}
                        {this.state.activeMarker != false &&
                        
                            <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            {this.renderSelectedPlace()}
                            </InfoWindow>
                        }
                        
                    </Map>
                </div>
            </div>
        );
    }
}



export default GoogleApiWrapper({
    apiKey: API_KEY,
})(MapContainer)
