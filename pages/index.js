/*
This example is based on a tutorial for the Google Maps component I found for
React:

https://reactjsexample.com/a-react-component-that-uses-the-google-maps-api/

For basic mapping functionality on rcmapp we would mostly need to change the fetchData
method on MapContainer so that it retrieves data from our database.
*/
import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state = {
            selectedPlace: {},
            showingInfoWindow: false,
            activeMarker: null,
            markers: this.fetchData(),
        }
    }

    onMarkerClick(props, marker) {
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true,
        })
    }

    fetchData() {
        /* Here we fetch markers from our database instead of declaring an
        arbitrary array. */
        let markers = []
        markers.push(
            <Marker onClick={this.onMarkerClick}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 37.778519, lng: -122.405640}}
            />
        )
        markers.push(
            <Marker onClick={this.onMarkerClick}
                    name={'Dolores park'}
                    position={{lat: 37.759703, lng: -122.428093}} />
        )
        return markers
    }

    render() {
        return (
            <Map google={this.props.google} zoom={14}>
                {this.state.markers}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDDtzN0uMoVslVooC3lUYvjJp5G8sj73Fw',
})(MapContainer)
