import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Button from './stateless/Button.js'

const API_KEY = process.env.GOOGLE_MAPS_PLACES_API_KEY

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { 
      address: "",
      firstName: props.firstName,
      lastName: props.lastName,
      batch: props.batch,
      email: props.email
    };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if(!this.state.address) return
    try {

      const geocode = await geocodeByAddress(this.state.address)

      if(!geocode[0]) return
      const coords = await getLatLng(geocode[0])
      let fuzzy_coords = fuzz_coordinates(coords.lat, coords.lng, 500);
      await fetch("http://localhost:4000/api/createAddress",{
        method: "POST",
        body: JSON.stringify({
          current: true, 
          latitude: fuzzy_coords[0], 
          longitude: fuzzy_coords[1],
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          batch: this.state.batch
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

  handleSelect = (address) => {
    this.setState({ address })
  };

  render() {
    return (
        <div>
        <script type="text/javascript" src={"https://maps.googleapis.com/maps/api/js?key=" +  API_KEY + "&libraries=places"}></script>
        
      <form onSubmit={this.handleSubmit}>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          highlightFirstSuggestion={true}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          )}
        </PlacesAutocomplete>
        <Button 
          title = "Submit"
          type = "submit"
          onClick = {this.handleSubmit} />
      </form>
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

export default AddressInput;