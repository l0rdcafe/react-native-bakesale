import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PropTypes from "prop-types";
import DealItem from "./deal-item";

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#eee",
    width: "100%"
  }
});

class DealList extends React.Component {
  static propTypes = { deals: PropTypes.arrayOf(PropTypes.object).isRequired, onItemPress: PropTypes.func.isRequired };
  render() {
    const { deals, onItemPress } = this.props;
    return (
      <View style={styles.list}>
        <FlatList data={deals} renderItem={({ item }) => <DealItem deal={item} onPress={onItemPress} />} />
      </View>
    );
  }
}

export default DealList;
