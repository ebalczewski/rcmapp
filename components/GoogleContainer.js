import React from 'react';

import Router from 'next/router'

import Button from "./stateless/Button"

import MapContainer from './MapContainer';
import AddressInputWrapper from './AddressInputWrapper';

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
    
    return (
        <MapContainer
             mapCenterLat = {this.state.mapCenterLat}
             mapCenterLng = {this.state.mapCenterLng}
             markers = {this.state.markers} >
            <AddressInputWrapper
                isAdd = {this.state.isAdd}
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

            <input type="checkbox" id="Social" name="Social" onClick={()=>{this.setState({social: true})}}/><label htmlFor="Social">Social</label>
            <input type="checkbox" id="Tech" name="Tech" onClick={()=>{this.setState({tech: true})}}/><label htmlFor="Tech">Tech</label>
            <input type="checkbox" id="Stay" name="Stay" onClick={()=>{this.setState({stay: true})}}/><label htmlFor="Stay">Stay</label>
        
            <MapContainer
                markers = {markers}
                mapCenterLat = {this.state.mapCenterLat}
                mapCenterLng = {this.state.mapCenterLng} >
                <AddressInputWrapper
                    isAdd = {this.state.isAdd}
                    updateGoogleContainer = {(latitude, longitude) => {
                    this.previewLocation(latitude, longitude);
                    }}
                />
                {addButton}
            </MapContainer>
       </div>);
    }


    render() {
        return this.state.isAdd ? this.renderPreview() : this.renderSearch();
    }
}

export default GoogleContainer