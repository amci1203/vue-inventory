<template lang='pug'>
  .form-field.input
    input(
      required
      v-bind='$attrs'
      @input="$emit('input', $event.target.value)"
      :class='{ light }'
    )
    .bar
    label( :class='{ light }' ) {{ label }}
</template>

<script>
export default {
  name: 'InputField',
  props: ['label', 'value', 'light'],

  data () {
    return {
      content: this.value
    }
  }
}
</script>
