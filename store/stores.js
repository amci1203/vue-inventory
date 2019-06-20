import axios from 'axios'

const endpoint = '/api/stores/'

export const state = () => ({
  all: [],
  current: null
})

export const mutations = {
  add (state, one) {
    state.all.push(one)
  },

  edit (state, { id, ...one }) {
    const i = state.all.findIndex(el => el.id === id)
    state.all[i] = { ...state.all[i], ...one }
  },

  delete (state, id) {
    const index = state.all.findIndex(one => one.id === id)
    state.all.splice(index, 1)
  },

  setAll (state, all) {
    state.all = all
  },

  setCurrent (state, current) {
    state.current = current
  },

  closeCurrent (state) {
    state.current = null
  }
}

export const actions = {
  async create ({ commit }, data) {
    const { data: store } = await axios.post(endpoint, data)
    commit('add', store)
  },

  async edit ({ commit }, data) {},

  async delete ({ commit }, id) {
    try {
      await axios.delete(endpoint + id)
      commit('delete', id)
    } catch (err) {}
  },

  async getList ({ commit }) {
    try {
      const { data } = await axios.get(endpoint)
      return commit('setAll', data)
    } catch (err) {}
  },

  async getStore ({ commit }, id) {
    const root = { root: true }
    const { data: { store, customers, items } } = await axios.get(endpoint + id)
    commit('customers/setAll', customers, root)
    commit('items/setAll', items, root)
    commit('setCurrent', store)
  }
}
