<template lang='pug'>
  .form-field.switch
    span.label {{ label }}
    label
      input(
        type='checkbox'
        :checked='checked'
        @input="$emit('change', $event.target.checked)"
      )
      span.circle
</template>

<script>
export default {
  name: 'SwitchField',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      required: true
    },
    checked: Boolean
  },

  data () {
    return {
      content: this.value
    }
  }
}
</script>
