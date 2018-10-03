import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { List } from "react-native-elements";
import PropTypes from "prop-types";
import DealItem from "./deal-item";

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#393e42",
    width: "100%",
    marginTop: 0
  }
});

class DealList extends React.Component {
  static propTypes = { deals: PropTypes.arrayOf(PropTypes.object).isRequired, onItemPress: PropTypes.func.isRequired };
  render() {
    const { deals, onItemPress } = this.props;
    return (
      <List containerStyle={styles.list}>
        <FlatList data={deals} renderItem={({ item }) => <DealItem deal={item} onPress={onItemPress} />} />
      </List>
    );
  }
}

export default DealList;
