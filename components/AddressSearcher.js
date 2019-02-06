import React from 'react';
import AddressInput from './AddressInput';

class AddressSearcher extends React.Component {

    handleSubmit = (latitude, longitude) => {
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

export default AddressSearcher;
