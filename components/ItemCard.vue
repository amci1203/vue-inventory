<template lang='pug'>
  div.card( :class="{'low-stock': stock <= low_at || stock === 0}" )
    h1.title {{ title }}
    span.stock( v-if='stock' ) {{ stock }}
    .actions
      i.fas.fa-info-circle( @click='get(type, id)' )
      i.fas.fa-pencil-alt( @click='edit(type, id)' )
      i.fas.fa-trash-alt( @click='' )
    span.last-modified {{ updated_at }}
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    type: String,
    id: Number,
    title: String,
    stock: Number,
    low_at: Number,
    updated_at: String
  },

  data () {
    return {
      error: null
    }
  },

  methods: {
    async get () {
      try {
        const { id } = this
        await this.$store.dispatch('items/getTransactions', id)
        this.$router.push(`/store/items/${id}`)
      } catch (err) {
        this.error = err.toString()
      }
    }
  }
}
</script>
