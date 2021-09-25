import data from '@/data/pages.json'

const namespaced = true;

const state = () => ({
  pages: [],
});

const getters = {
  getPageBySlug: state => (slug) => {
    return state.pages.find(item => item.slug === slug);
  },
};

const actions = {
  fetchPages ({ commit }) {
    commit('setPages', data)
  },
};

const mutations = {
  setPages (state, payload) {
    state.pages = payload;
  },
};

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
