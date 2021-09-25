const namespaced = true;

const state = () => ({
  scrollPosition: 0,
  windowWidth: null,
  windowHeight: null,
  fixedHeader: true,
  hiddenHeader: true,
  invertedHeader: false,
});

const getters = {};

const actions = {
  changeScrollPosition ({ commit }, position) {
    commit('changeScrollPosition', position);
  },

  changeWindowSize ({ commit }, options) {
    commit('changeWindowSize', options);
  },

  changeHeaderPosition ({ commit }, position) {
    commit('changeHeaderPosition', position === 'fixed');
  },

  changeHeaderVisibility ({ commit }, payload) {
    commit('changeHeaderVisibility', payload);
  },

  changeHeaderInversion ({ commit }, inverted) {
    commit('changeHeaderInversion', inverted);
  },
};

const mutations = {
  changeScrollPosition (state, payload) {
    state.scrollPosition = payload;
  },

  changeWindowSize (state, payload) {
    state.windowWidth = payload.width;
    state.windowHeight = payload.height;
  },

  changeHeaderPosition (state, payload) {
    state.fixedHeader = payload;
  },

  changeHeaderVisibility (state, payload) {
    state.hiddenHeader = payload;
  },

  changeHeaderInversion (state, payload) {
    state.invertedHeader = payload;
  },
};

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
