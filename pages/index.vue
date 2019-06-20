<template lang='pug'>
  main#select-store: .wrapper
    h1 {{ action }} A Store
    .container
      p.active.text-center( v-if='loading' ): i.fas.fa-spinner.fa-pulse.fa-2x
      .list( v-if='!loading' :class="{active: this.activePane == 'list'}" )
        .new.text-center( @click='initNew' )
          span New Store
          i.fas.fa-plus
        .item( v-if='stores' v-for='store in stores' )
          span( @click='getStore(store.id, store.has_customers)' ) {{ store.name }}
          i.fas.fa-pencil-alt( @click='initEdit(store)' )
          i.fas.fa-times( @click='initDelete(store)' )

      .store-form( :class="{active: this.activePane == 'form'}" )
        .form-errors( v-if='error' ): p {{ error }}

        InputField(
          label='Name'
          light='true'
          v-model='current.name'
          @input.native='nameIsValid'
          style='margin-top:2.5rem'
        )
        InputSwitch(
          label='Has Customers?'
          v-model='current.has_customers'
        )
        InputField(
          label='Balance Warning ($)'
          light='true'
          type='number'
          v-if='current.has_customers'
          v-model='current.customer_balance_warning'
        )

        .form-buttons
          button.cancel( @click='returnToList' )
            i.fas.fa-chevron-left
            | CANCEL
          button.submit( @click='submit' :disabled='!!error' )
            i.far.fa-save
            | SUBMIT

      .confirm-delete.text-center( :class="{active: this.activePane == 'delete'}" )
        p Are You Sure You Want To Delete The "{{ current.name }}"
        p.warning (THIS IS IRREVERSIBLE)
        .form-buttons
          button.cancel( @click='returnToList' )
            i.fas.fa-chevron-left
            | NEVER MIND
          button.delete( @click='deleteStore' )
            i.fas.fa-trash-alt
            | DELETE
</template>

<script>
import InputField from '@/components/fields/Input'
import InputSwitch from '@/components/fields/Switch'

export default {
  name: 'SelectStore',
  components: {
    InputField,
    InputSwitch
  },

  data () {
    return {
      loading: false,
      action: 'Select',
      activePane: 'list',
      current: {
        id: null,
        name: '',
        has_customers: false,
        customer_balance_warning: 20
      },
      error: ''
    }
  },

  computed: {
    stores () {
      return this.$store.state.stores.all
    },

    storeNames () {
      const { id } = this.current
      const stores = id
        ? this.stores.filter(s => s.id !== id)
        : this.stores
      return stores.map(s => s.name.toLowerCase())
    }
  },

  async fetch ({ store }) {
    await store.dispatch('stores/getList')
  },

  methods: {

    async getStore (id, customers) {
      this.loading = true
      try {
        await this.$store.dispatch('stores/getStore', id)
        this.$router.push(`/store/${customers ? 'customers' : 'items'}`)
      } catch (err) {
        this.loading = false
      }
    },

    async deleteStore () {
      this.loading = true
      try {
        await this.$store.dispatch('stores/delete', this.current.id)
        this.loading = false
        this.returnToList()
      } catch (err) {
        this.loading = false
      }
    },

    async submit () {
      this.loading = true
      const { id, ...data } = this.current

      try {
        if (id) {
          await this.$store.dispatch('stores/edit', { id, data })
        } else {
          await this.$store.dispatch('stores/create', data)
        }
        this.returnToList()
        this.loading = false
      } catch (err) {

      }
    },
    returnToList () {
      this.action = 'Select'
      this.activePane = 'list'
    },

    initNew () {
      this.action = 'Create'
      this.current.id = null
      this.current.name = ''
      this.current.has_customers = false
      this.current.customer_balance_warning = 20
      this.activePane = 'form'
    },

    initEdit (store) {
      this.action = 'Edit'
      this.current.id = store.id
      this.current.name = store.name
      this.current.has_customers = store.has_customers
      this.current.customer_balance_warning = store.customer_balance_warning
      this.activePane = 'form'
    },

    initDelete (store) {
      this.action = 'Delete'
      this.current.id = store.id
      this.current.name = store.name
      this.activePane = 'delete'
    },

    nameIsValid (e) {
      window.console.log(e.target)
      const rawValue = e.target.value

      if (!rawValue) {
        this.error = 'A name is required'
        return
      }

      const v = rawValue.toLowerCase()
      const inUse = this.storeNames.includes(v)
      if (inUse) {
        this.error = `The name "${rawValue}" is already in use`
      } else {
        this.error = ''
      }
    }
  }
}
</script>
