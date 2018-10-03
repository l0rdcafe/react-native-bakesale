import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import PropTypes from "prop-types";
import { priceDisplay } from "../utils";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    borderColor: "#aaa",
    borderWidth: 2
  },
  deal: {
    marginHorizontal: 12,
    marginTop: 12
  },
  info: {
    padding: 10,
    backgroundColor: "#393e42",
    borderColor: "#aaa",
    borderWidth: 2,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopWidth: 0
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff"
  },
  footer: {
    flexDirection: "row"
  },
  cause: {
    flex: 2,
    color: "#fff"
  },
  price: {
    flex: 1,
    textAlign: "right",
    color: "#fff"
  }
});

class DealItem extends React.Component {
  static propTypes = { deal: PropTypes.object.isRequired, onPress: PropTypes.func.isRequired };
  handlePress = () => {
    const { deal, onPress } = this.props;
    onPress(deal.key);
  };
  render() {
    const { deal } = this.props;
    return (
      <TouchableOpacity style={styles.deal} onPress={this.handlePress}>
        <Card containerStyle={{ backgroundColor: "#303337", borderColor: "#aaa" }}>
          <Image source={{ uri: deal.media[0] }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{deal.title}</Text>
            <View style={styles.footer}>
              <Text style={styles.cause}>{deal.cause.name}</Text>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default DealItem;
