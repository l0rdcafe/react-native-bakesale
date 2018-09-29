const API_HOST = "https://bakesaleforgood.com";

const API = {
  async fetchInitialDeals() {
    try {
      let resp = await fetch(`${API_HOST}/api/deals`);
      resp = await resp.json();
      return resp;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  async fetchDealDetails(id) {
    try {
      let resp = await fetch(`${API_HOST}/api/deals/${id}`);
      resp = await resp.json();
      return resp;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  async fetchDealsSearchResults(query) {
    try {
      let resp = await fetch(`${API_HOST}/api/deals?searchTerm=${query}`);
      resp = await resp.json();
      return resp;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
};

export default API;
