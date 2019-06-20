export const state = () => ({
  main: true,
  sub: false
})

export const mutations = {
  open (state, which = 'main') {
    state[which] = true
  },

  close (state, which = 'main') {
    state[which] = false
  },

  toggle (state, which = 'main') {
    state[which] = !state[which]
  }
}
