<template lang='pug'>
  div.card( :class="{'high-balance': balance >= warn_at}" )
    h1.title {{ title }}
    span.stock( v-if='stock' ) {{ balance }}
    .actions
      i.fas.fa-info-circle( @click='get(type, id)' )
      i.fas.fa-pencil-alt( @click='edit(type, id)' )
      i.fas.fa-trash-alt( @click='' )
    span.last-modified {{ updated_at }}
</template>

<script>
export default {
  name: 'CustomerCard',
  props: {
    type: String,
    id: Number,
    name: String,
    balance: Number,
    warn_at: Number,
    updated_at: String
  },

  methods: {

  }
}
</script>
