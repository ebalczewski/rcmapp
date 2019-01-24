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
            selectedPlace: null,
            showingInfoWindow: false,
            activeMarker: null,
            markers: [],
            mapCenterLat:40.691332,
            mapCenterLng:-73.985059
        }
    }

    componentDidMount() {
        this.fetchData()
    }
    
    onMarkerClick(props, marker) {
        this.setState({
            activeMarker: marker,
            selectedPlace: props.name,
            showingInfoWindow: true,
        })
    }
    // §generally don't call this in constructor, better in componentDidMount
    fetchData = () => {
        /* Here we fetch markers from our database instead of declaring an
        arbitrary array. */

        fetch("http://localhost:4000/api/users")
		.then(resp => /*resp.map(this.setState({
                markers: [
                    <Marker onClick={this.onMarkerClick}
                            name={users[0].firstName}
                            user={users[0]}
                            position={{lat: 37.759703, lng: -122.428093}} />
                ]
            }, () => {console.log('just set state')}) */
            {}
        )
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
        //const {selectedPlace} = this.state;
        return (
            <div style = {{height:"100vh"}}>
                <Map 
                    google={this.props.google} zoom={14} 
                    initialCenter={{
                        lat: this.state.mapCenterLat,
                        lng: this.state.mapCenterLng
                    }}
                >
                    {this.state.markers}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        {this.renderSelectedPlace()}
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDDtzN0uMoVslVooC3lUYvjJp5G8sj73Fw',
})(MapContainer)