<template lang="pug">
  aside#sidebar
    h1.title.no-text-overflow {{ storeName }}
    input( placeholder='Search...' v-model='searchbar' )
    label.filter
      i.fas.fa-filter
      select( v-model='filter' )
        option( :value='null' ) Select A Filter...
        option( :value="'LOW'" ) Low Stock
    h3.text-center {{ list.heading }}
    .list
      a( v-for='item in list.items' :key='item.href' :href='item.href' ) {{ item.text }}
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    open: Boolean
  },

  data () {
    return {
      filter : null,
      list   : {
        heading : 'Categories',
        items   : [
          {
            'text': 'Test 1',
            'href': '#test1'
          },
          {
            'text': 'Test 2',
            'href': '#test2'
          }
        ]
      }
    }
  },

  computed: {
    storeName () {
      const store = this.$store.state.stores.current
      if (store) return store.name
      else return null
    },

    searchbar: {
      get () {
        return this.$store.state.fff
      },
      set (v) {}
    }
  }
}
</script>
