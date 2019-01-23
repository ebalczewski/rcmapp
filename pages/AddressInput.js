import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Button from '../components/Button.js'


const API_KEY = process.env.GOOGLE_MAPS_JAVASCRIPT_API_KEY

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSubmit = (event) => {
    (event).preventDefault();
    console.log("submit")
    // geocodeByAddress(address)
    // .then(results => getLatLng(results[0]))
    // .then(latLng => console.log('Success', latLng))
    // .catch(error => console.error('Error', error));
  }

  handleSelect = address => {
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

export default AddressInput;