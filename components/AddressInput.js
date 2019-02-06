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
      this.props.handleSubmit(coords.lat, coords.lng);
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

export default AddressInput;
