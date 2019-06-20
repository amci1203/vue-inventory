import cache from 'vuex-cache'

export default ({ store }) => {
  window.onNuxtReady(() => {
    cache({
      timeout: 2 * 60 * 60 * 1000
    })(store)
  })
}
