<template lang='pug'>
  main#store( :class="{'sidebar-collapsed': sidebar, 'form-open': form}" )
    sidebar( :open='sidebar' )
    sidebar-buttons( :open='sidebar')
    nuxt-child
    CustomerForm
</template>

<script>
import Sidebar from '@/components/sidebar/Nav'
import SidebarButtons from '@/components/sidebar/Buttons'

import CustomerForm from '@/components/forms/Customer'

export default {
  components: {
    Sidebar,
    SidebarButtons,

    CustomerForm
  },

  computed: {
    sidebar () {
      return this.$store.state.sidebars.main
    },
    form () {
      return this.$store.state.forms.active
    }
  },

  beforeCreate () {
    if (!this.$store.state.stores.current) {
      this.$router.replace('/')
    }
  }
}
</script>
