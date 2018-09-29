import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Button,
  Linking,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import { priceDisplay } from "../utils";
import API from "../ajax";

const styles = StyleSheet.create({
  deal: {
    marginBottom: 20
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#ccc"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(237, 149, 45, 0.4)",
    padding: 10
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15
  },
  cause: {
    marginVertical: 10
  },
  price: {
    fontWeight: "bold"
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  info: { alignItems: "center" },
  user: { alignItems: "center" },
  description: { borderColor: "#ddd", borderWidth: 1, borderStyle: "dotted", margin: 10, padding: 10 },
  backLink: {
    marginBottom: 5,
    color: "#22f",
    marginLeft: 10
  }
});

class DealDetails extends React.Component {
  static propTypes = { initialDealDetails: PropTypes.object.isRequired, onBack: PropTypes.func.isRequired };
  state = { deal: this.props.initialDealDetails, imageIndex: 0 };
  async componentDidMount() {
    const deal = await API.fetchDealDetails(this.state.deal.key);
    this.setState({ deal });
  }
  handleSwipe = dir => {
    const { deal, imageIndex } = this.state;
    if (!deal.media[imageIndex + dir]) {
      Animated.spring(this.imageXPos, { toValue: 0 }).start();
      return;
    }
    this.setState(
      prevState => ({ imageIndex: prevState.imageIndex + dir }),
      () => {
        this.imageXPos.setValue(dir * this.width);
        Animated.spring(this.imageXPos, { toValue: 0 }).start();
      }
    );
  };
  width = Dimensions.get("window").width;
  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (e, gs) => {
      if (Math.abs(gs.dx) > this.width * 0.4) {
        const dir = Math.sign(gs.dx);
        Animated.timing(this.imageXPos, { toValue: dir * this.width, duration: 250 }).start(() =>
          this.handleSwipe(dir * -1)
        );
      } else {
        Animated.spring(this.imageXPos, { toValue: 0 }).start();
      }
    }
  });
  openDealUrl = () => {
    const { deal } = this.state;
    Linking.openURL(deal.url);
  };
  render() {
    const { deal, imageIndex } = this.state;
    const { onBack } = this.props;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{ uri: deal.media[imageIndex] }}
          style={[{ left: this.imageXPos }, styles.image]}
        />
        <View>
          <Text style={styles.title}>{deal.title}</Text>
        </View>
        <ScrollView style={styles.detail}>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            {deal.user && (
              <View style={styles.user}>
                <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          <View style={styles.description}>
            <Text>{deal.description}</Text>
          </View>
          <Button title="Buy this deal!" onPress={this.openDealUrl} />
        </ScrollView>
      </View>
    );
  }
}

export default DealDetails;
