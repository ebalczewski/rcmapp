/*
This example is based on a tutorial for the Google Maps component I found for
React:

https://reactjsexample.com/a-react-component-that-uses-the-google-maps-api/

For basic mapping functionality on rcmapp we would mostly need to change the fetchData
method on MapContainer so that it retrieves data from our database.
*/
import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {InfoWindow} from "./stateless/CustomInfoWindow"

const API_KEY = process.env.GOOGLE_MAPS_PLACES_API_KEY

export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state = {
            selectedPlace: null,
            showingInfoWindow: false,
            activeMarker: false,
            markers: null,
            mapCenterLat: props.mapCenterLat,
            mapCenterLng: props.mapCenterLng
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            mapCenterLat: nextProps.mapCenterLat,
            mapCenterLng: nextProps.mapCenterLng
        })
        this.fetchMarkers()
    }
    
    async fetchMarkers(){
        const markers = await this.fetchData()
        this.setState({markers})
    }

    componentDidMount() {
        this.fetchMarkers()
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

        return new Promise((resolve, reject) => {
          fetch("http://localhost:4000/api/addresses/markers")
		     .then(async resp => {
           const data = await resp.json()
           resolve(data)
           // data.forEach(item => console.log(item))
             // console.log("in resp", resp.json())
             // Object.entries(resp.json()).forEach (
             //   ([
             // )


      /*resp.map(this.setState({
                markers: [
                    <Marker onClick={this.onMarkerClick}
                            name={users[0].firstName}
                            user={users[0]}
                            position={{lat: 37.759703, lng: -122.428093}} />
                ]
            }, () => {console.log('just set state')}) */

        })
        .catch((err) => { console.log(err); reject(err) })
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
        //const {selectedPlace} = this.state;
        if (this.state.markers === null) {
          return (<div></div>);
        }

        return (
            <div>
            {this.props.children}
            <div style = {{height:"100vh"}}>
                <Map
                    google={this.props.google} zoom={14}
                    center={{
                        lat: this.state.mapCenterLat,
                        lng: this.state.mapCenterLng
                    }}
                    initialCenter={{
                        lat: this.state.mapCenterLat,
                        lng: this.state.mapCenterLng
                    }}
                >
                    {this.state.markers.map((item, key) =>
                        <Marker
                            key={key}
                            title={item.user.firstName + " " + item.user.lastName}
                            name={item.user.firstName + " " + item.user.lastName}
                            user={item.user}
                            position={{lat: item.latitude, lng: item.longitude}}
                            onClick={this.onMarkerClick}
                        />
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
