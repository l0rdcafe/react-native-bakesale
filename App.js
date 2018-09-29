import React from "react";
import { StyleSheet, Text, View, Animated, Easing, Dimensions } from "react-native";
import API from "./src/ajax";
import DealList from "./src/components/deal-list";
import DealDetails from "./src/components/deal-details";
import SearchBar from "./src/components/search-bar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 40
  },
  main: {
    marginTop: 30
  }
});

export default class App extends React.Component {
  state = { deals: [], currentDealId: null, dealsFromSearch: [], activeSearchQuery: "" };
  async componentDidMount() {
    this.animateTitle();
    const deals = await API.fetchInitialDeals();
    this.setState({ deals });
  }
  setCurrentDeal = id => {
    this.setState({ currentDealId: id });
  };
  animateTitle = (dir = 1) => {
    const width = Dimensions.get("window").width - 150;
    Animated.timing(this.titleXPos, { toValue: dir * (width / 2), duration: 1000, easing: Easing.ease }).start(
      ({ finished }) => {
        if (finished) {
          this.animateTitle(-1 * dir);
        }
      }
    );
  };
  titleXPos = new Animated.Value(0);
  unsetCurrentDeal = () => {
    this.setState({ currentDealId: null });
  };
  currentDeal = () => this.state.deals.find(deal => deal.key === this.state.currentDealId);
  searchDeals = async query => {
    let dealsFromSearch = [];
    if (query) {
      dealsFromSearch = await API.fetchDealsSearchResults(query);
    }
    this.setState({ dealsFromSearch, activeSearchQuery: query });
  };
  render() {
    const { deals, currentDealId, activeSearchQuery } = this.state;
    const dealsToDisplay = this.state.dealsFromSearch.length > 0 ? this.state.dealsFromSearch : deals;

    if (currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetails initialDealDetails={this.currentDeal()} onBack={this.unsetCurrentDeal} />
        </View>
      );
    }

    if (deals.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} initialSearchQuery={activeSearchQuery} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      );
    }
    return (
      <Animated.View style={[{ left: this.titleXPos }, styles.container]}>
        <Text style={styles.header}>Bakesale</Text>
      </Animated.View>
    );
  }
}
