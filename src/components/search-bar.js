import React from "react";
import { SearchBar } from "react-native-elements";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

class SearchBarComp extends React.Component {
  static propTypes = { searchDeals: PropTypes.func.isRequired, initialSearchQuery: PropTypes.string.isRequired };
  state = { searchQuery: this.props.initialSearchQuery };
  searchDeals = query => {
    this.props.searchDeals(query);
    this.input.blur();
  };
  debouncedSearchDeals = debounce(this.searchDeals, 300);
  handleChange = searchQuery => {
    this.setState({ searchQuery }, () => {
      this.debouncedSearchDeals(this.state.searchQuery);
    });
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <SearchBar
        ref={node => {
          this.input = node;
        }}
        icon={{ type: "font-awesome", name: "search" }}
        placeholder="Search All Deals"
        onChangeText={this.handleChange}
        value={searchQuery}
      />
    );
  }
}

export default SearchBarComp;
