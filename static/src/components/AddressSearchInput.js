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
        this.setState({
          addressPredictions: autocompletePrediction.map(element => element.description),
        });
      }
    );
  }

  render() {
    const { fetchIssues } = this.props;

    const style = {
      autocomplete: {
      },
      textField: {
        fontSize: '14px',
      }
    }

    return (
      <div>
        <AutoComplete
          floatingLabelText="Your street address"
          anchorOrigin={{vertical: 'top', horizontal: 'left'}}
          targetOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.addressPredictions}
          onUpdateInput={(value) => this.handleUpdateInput(value)}
          onNewRequest={(value) => fetchIssues(value)}
          style={style.autocomplete}
          textFieldStyle={style.textField}
        />
      </div>
    );
  }
}

export default AddressSearchInput;
