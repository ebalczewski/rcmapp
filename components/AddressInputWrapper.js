import React from 'react';
import AddressInput from './AddressInput';

class AddressInputWrapper extends React.Component {

    handleSubmit = (latitude, longitude) => {
        if (this.props.isAdd) {
            const fuzzy_coords = fuzz_coordinates(latitude, longitude, 500);
            latitude = fuzzy_coords[0];
            longitude = fuzzy_coords[1];
        }
        this.props.updateGoogleContainer(latitude, longitude);
    }

    render() {
        return (
            <div>
                <AddressInput handleSubmit = {this.handleSubmit}
                />
                
            </div>
        );
  }
}

function fuzz_coordinates(lat, lng, fuzz_meters) {
    //111111 is an approzimation for meters/degree that is accurate far from the poles and over small distances
    let fuzzy_lat = getRandomArbitrary(-1,1) * fuzz_meters / 111111 + lat
    let fuzzy_lng = getRandomArbitrary(-1,1) * fuzz_meters / (111111 * Math.cos(lat)) + lng 
  
    return([fuzzy_lat, fuzzy_lng]);
  }
  
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

export default AddressInputWrapper;
