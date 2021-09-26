const namespaced = true;

const state = () => ({
  scrollPosition: 0,
  windowWidth: null,
  windowHeight: null,
  fixedHeader: true,
  hiddenHeader: true,
  invertedHeader: false,
  isLoggedIn: false,
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

  checkLogin ({ commit }) {
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') {
      commit('setLogin', true)
    }
  },

  login ({ commit }) {
    commit('setLogin', true)
    // const localStorage = window.localStorage
    // localStorage.setItem('isLoggedIn', 'true');
  },

  logout ({ commit }) {
    commit('setLogin', false)
    const localStorage = window.localStorage
    localStorage.removeItem('isLoggedIn');
  }
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

  setLogin (state, playground) {
    state.isLoggedIn = playground
  },
};

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
