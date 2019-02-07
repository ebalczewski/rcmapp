import React from 'react';

import Router from 'next/router'

import Button from "./stateless/Button"

import MapContainer from './MapContainer';
import AddressSearcher from './AddressSearcher';
import AddressAdder from './AddressAdder';

class GoogleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isAdd: this.props.isAdd,
            isPreviewing: false,
            mapCenterLat: 40.691332,
            mapCenterLng: -73.985059,
            markers: [],
            social: false,
            tech: false,
            stay: false
        };
    }

    updateGoogleContainer = (latitude, longitude) => {
        this.setState({
            mapCenterLat: latitude,
            mapCenterLng: longitude
        })
    }

    previewLocation = (latitude, longitude) => {
        this.setState({
            mapCenterLat: latitude,
            mapCenterLng: longitude,
            isPreviewing: true
        })
    }

    addAddress = async () => {
        try {
            console.log('addAddress')
            const result = await fetch("http://localhost:4000/api/createAddress",{
                method: "POST",
                body: JSON.stringify({
                current: true, 
                latitude: this.state.mapCenterLat, 
                longitude: this.state.mapCenterLng,
                email: this.props.email,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                batch: this.props.batch,
                social: this.state.social,
                tech: this.state.tech,
                stay: this.state.stay
            }),
                headers: {
                    'Accept': "application",
                    'Content-Type' : "application/json"
                }
            })
            console.log(result)
            console.log('after post')
            Router.push('/')

        } catch(err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        const markers = await this.fetchData()
        this.setState({
            markers: markers
        })
    }

    fetchData = () => {
        /* Here we fetch markers from our database instead of declaring an
        arbitrary array. */
        return new Promise((resolve, reject) => {
          fetch("http://localhost:4000/api/addresses/markers")
		     .then(async resp => {
           const data = await resp.json()
           resolve(data)
        })
        .catch((err) => { console.log(err); reject(err) })
      })
    }

    renderSearch = () => { 
    console.log(this.state)
    return (
        <MapContainer
             mapCenterLat = {this.state.mapCenterLat}
             mapCenterLng = {this.state.mapCenterLng}
             markers = {this.state.markers} >
            <AddressSearcher
                updateGoogleContainer = {this.updateGoogleContainer.bind(this)}
            />
        </MapContainer>);
    }

    renderPreview = () => {
        let markers;
        if (this.state.isPreviewing) {
            markers = [{
                latitude : this.state.mapCenterLat,
                longitude : this.state.mapCenterLng,
                user : {
                    firstName : this.props.firstName,
                    lastName : this.props.lastName
                }
            }];
        } else {
            markers = [];
        }

        const addButton =
            markers.length === 1 ?
            <Button type = "submit" onClick = {this.addAddress.bind(this)} title = "Add Address"/> :
            <div></div>

        return (
        <div>
            <p>How may other Recursers contact you?</p>
            <input type="checkbox" id="Social" name="Social" onClick={()=>{this.setState({social: true})}}/><label for="Social">Social</label>
            <input type="checkbox" id="Tech" name="Tech" onClick={()=>{this.setState({tech: true})}}/><label for="Tech">Tech</label>
            <input type="checkbox" id="Stay" name="Stay" onClick={()=>{this.setState({stay: true})}}/><label for="Stay">Stay</label>
        
        <MapContainer
            markers = {markers}
            mapCenterLat = {this.state.mapCenterLat}
            mapCenterLng = {this.state.mapCenterLng} >
           <AddressAdder
               updateGoogleContainer = {(latitude, longitude) => {
                   this.previewLocation(latitude, longitude);
                }}
           />
       </MapContainer>
       {addButton}
       </div>);
    }


    render() {
        return this.state.isAdd ? this.renderPreview() : this.renderSearch();
    }
}

export default GoogleContainer