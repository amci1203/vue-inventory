export const state = () => ({
  active : null,
  model  : {}
})

export const mutations = {
  open (state, id) {
    state.active = id
  },

  close (state) {
    state.active = null
    state.model = {}
  },

  setModel (state, model) {
    state.model = model
  }
}
