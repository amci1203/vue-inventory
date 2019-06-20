<template lang='pug'>
  Form(
    id='customer'
    :title='(id ? "Edit" : "New") + " Customer"'
    :ready='ready'
    :busy='busy'
    :error='error'
    :onsubmit='save'
  )
    fieldset( :disabled='busy' )
      InputField(
        v-model='name'
        label='Name'
        @change="check('name')"
      )
      InputSwitch(
        v-model='custom_limit'
        label='Custom Limit?'
      )
      InputField(
        v-model='warn_at'
        v-show='custom_limit'
        type='number'
        label='Warn @ (In $)'
        @change="check('warn_at')"
      )
</template>

<script>
import Form from '@/components/Form'
import InputField from '@/components/fields/Input'
import InputSwitch from '@/components/fields/Switch'

export default {
  components: {
    Form,
    InputField,
    InputSwitch
  },

  data () {
    const model = this.$store.state.forms.model
    const store = this.$store.state.stores.current

    return {
      busy        : false,
      message     : '',
      error       : '',

      id           : model.id || null,
      name         : model.name || '',
      custom_limit : model.custom_limit,
      warn_at      : model.warn_at || (store ? store.customer_balance_warning : 0),

      original: {
        name: model.id,
        has_customers: model.has_customers,
        warn_at: model.warn_at
      },

      changed: {
        name: false,
        warn_at: false
      }
    }
  },

  computed: {
    ready () {
      const { id, busy, name, changed, custom_limit, warn_at } = this
      if (busy || !name) return false
      if (custom_limit && !warn_at) return false
      if (id && !changed.name && !changed.warn_at) return false
      return true
    }
  },

  methods: {
    async save () {
      this.busy = true
      const { name, id, custom_limit, warn_at } = this
      const data = { name }

      if (id) data.id = id
      if (custom_limit && warn_at) {
        data.warn_at = Math.round(this.warn_at * 100)
      }

      await this.$store.dispatch(
        `customers/${id ? 'edit' : 'create'}`,
        data
      )
      this.$destroy()
    },
    check (prop) {
      if (!this.id) return
      this.changed[prop] = this[prop] !== this.original[prop]
    }
  }
}
</script>
