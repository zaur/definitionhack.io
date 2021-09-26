import data from '@/data/nft.json'
import { findRandom } from '@/libs/utils'

const namespaced = true;

const updateNFTList = (data) => {
  const number = findRandom(218)
  const list = []
  for (let i = 0; i <= number; i++) {
    const item = data.list[findRandom(data.list.length - 1)]
    list.push({...item, nft_token_id: i + 1, number: findRandom(218) + 1})
  }
  return {
    ...data,
    list,
  }
}

const state = () => ({
  nft: [],
  total: 0,
});

const getters = {};

const actions = {
  fetchNFTs ({ commit }, list) {
    if (!list?.length) {
      const newList = updateNFTList(data)
      commit('setNftList', newList)
      return
    }
    const ids = list.map(item => item.nft_token_id).filter(Boolean)
    const set = new Set(ids)
    const result = []
    set.forEach(id => {
      result.push(list.find(token => token.nft_token_id === id))
    })
    commit('setNftList', {
      list: result,
      total: list.length,
    })
  },
};

const mutations = {
  setNftList (state, payload) {
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
