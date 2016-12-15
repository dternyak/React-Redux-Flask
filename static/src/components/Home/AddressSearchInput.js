import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export class AddressSearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addressPredictions: [],
    };
  }

  handleUpdateInput(value) {
    // Construct the Google Maps query
    let autocompleteService = new google.maps.places.AutocompleteService();
    let autocompletionRequest = {
      input: value,
      types: ['geocode'],
    };

    // Make the query
    autocompleteService.getPlacePredictions(
      autocompletionRequest,
      autocompletePrediction => {
        // populate the search results
        this.setState({
          addressPredictions: autocompletePrediction.map(element => element.description),
        });
      }
    );
  }

  render() {
    return (
      <div>
        <AutoComplete
          floatingLabelText="Enter your address"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.addressPredictions}
          onUpdateInput={(value) => this.handleUpdateInput(value)}
        />
      </div>
    );
  }
}

export default AddressSearchInput;
