export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('pages/fetchPages')
    await dispatch('members/fetchMembers')
  }
}
