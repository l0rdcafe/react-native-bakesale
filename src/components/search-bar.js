import React from "react";
import { TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12
  }
});

class SearchBar extends React.Component {
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
      <TextInput
        ref={node => {
          this.input = node;
        }}
        style={styles.input}
        placeholder="Search All Deals"
        onChangeText={this.handleChange}
        value={searchQuery}
      />
    );
  }
}

export default SearchBar;
