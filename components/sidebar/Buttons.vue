<template lang="pug">
  aside#sidebar-buttons
    .icon( @click='toggleSidebar' )
      i.fas( :class="`fa-chevron-${open ? 'left' : 'right'}`" )
      span.medium {{ open ? 'Collapse' : 'Expand' }} Sidebar
    nuxt-link.icon( to='/' )
      i.fas.fa-bars
      span Change Store
    br
    nuxt-link.icon( to='/store/items' )
      i.fas.fa-th-large
      span View Items
    .icon( @click="$store.commit('forms/open', 'item')" )
      i.fas.fa-plus
      span New Item
    //- .icon
      i.fas.fa-plus
      i.fas.fa-times.small
      span.medium Add Multiple Items
    //- .icon
      i.far.fa-file-alt
      span.long Post Multiple Records
    br
    nuxt-link.icon( to='/store/customers' )
      i.fas.fa-users
      span.medium View Customers
    .icon( v-if='true' @click="$store.commit('forms/open', 'customer')" )
      i.fas.fa-user-plus
      span.medium New Customer
</template>

<script>
export default {
  name: 'SidebarButtons',

  props: {
    open: Boolean
  },

  methods: {
    returnToStoresList () {
      this.$router.push('/')
    },
    toggleSidebar () {
      this.$store.commit('sidebars/toggle', 'main')
    }
  }
}
</script>
