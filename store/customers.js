import axios from 'axios'

const endpoint = '/api/customers/'

export const state = () => ({
  all: [],
  matched: [],

  filter: null,
  query: null,

  current: null
})

export const mutations = {
  create (state, one) {
    state.all.push(one)
  },

  edit (state, { id, ...one }) {
    const i = state.all.findIndex(el => el.id === id)
    state.all[i] = { ...state.all[i], ...one }
  },

  setAll (state, all) {
    state.all = all
  },

  setFilter (state, filter) {
    const { all, query } = state
    state.filter = filter
    state.matched = findMatches(all, query, filter)
  },

  setSearch (state, query) {
    const { all, filter } = state
    state.query = query
    state.matched = findMatches(all, query, filter)
  },

  setCurrent (state, current) {
    state.current = current
  },

  setTransactions (state, { id, transactions }) {
    const index = state.all.findIndex(el => el.id === id)
    state.all[index].transactions = transactions
    state.current = state.all[index]
  },

  addTransaction (state, transaction) {
    state.current.transactions.push(transaction)
  },

  removeLastTransaction (state) {
    state.current.transactions.splice(-1, 1)
  },

  closeCurrent (state) {
    state.current = null
  }
}

export const actions = {
  async create ({ commit }, body) {
    const { data } = await axios.post(endpoint, {
      customers: [body]
    })
    commit('create', data)
  },

  async edit ({ commit }, { id, name, warn_at }) {
    const body = {}
    if (name) body.name = name
    if (warn_at) body.warn_at = warn_at
    const { data: updated_at } = await axios.put(endpoint + id, body)
    commit('edit', { ...body, updated_at })
  },

  async getTransactions ({ commit }, id) {
    const { data: transactions } = await axios.get(`${endpoint}/${id}`)
    commit('setTransacions', { id, transactions })
  },

  async addTransaction ({ commit }, { id, body }) {
    const { data: transaction } = await axios.post(`${endpoint}/${id}`, body)
    commit('addTransaction', transaction)
  },

  async removeLastTransaction ({ commit }, id) {
    await axios.delete(`${endpoint}/${id}/last`)
    commit('removeLastTransaction')
  }
}

function findMatches (all, query, filter) {
  // let result = all
  // if (filter) {
  //   result = result.filter()
  // }
  // if (query) {
  //   result = result.filter()
  // }
}
