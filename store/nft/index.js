import data from '@/data/nft.json'

const namespaced = true;

const state = () => ({
  nft: [],
  total: 0,
});

const getters = {};

const actions = {
  fetchNft ({ commit }) {
    commit('setNft', data)
  },
};

const mutations = {
  setNft (state, payload) {
    state.nft = payload.list;
    state.total = payload.total;
  },
};

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
