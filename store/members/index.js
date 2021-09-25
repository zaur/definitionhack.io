import data from '@/data/members.json'

const namespaced = true;

const state = () => ({
  members: [],
});

const getters = {};

const actions = {
  fetchMembers ({ commit }) {
    commit('setMembers', data)
  },
};

const mutations = {
  setMembers (state, payload) {
    state.members = payload;
  },
};

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
