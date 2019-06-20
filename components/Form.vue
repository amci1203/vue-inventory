<template lang='pug'>
  aside#side-form( v-if='active || force' )
    .form-errors( v-show='error' ): p {{ error }}
    .overlay( v-show='busy' ): i.fas.fa-spinner.fa-pulse.fa-2x
    i.close.fas.fa-times-circle( v-if='!force' @click='close' )
    h3.text-center( v-if='title' ) {{ displayTitle }}
    slot
    .form-buttons
      button.cancel(@click='oncancel' )
        slot( name='cancel' )
          | CANCEL
      button.submit(
        v-if='onsubmit'
        @click='onsubmit'
        :disabled='!ready'
      )
        slot( name='submit' )
          | SUBMIT

</template>

<script>
const required = obj => ({ ...obj, required: true })
export default {
  name: 'FormContainer',
  props: {
    id: required({ type: String }),
    title: required({ type: String }),
    error: required({ type: String }),
    ready: required({ type: Boolean }),
    busy: required({ type: Boolean }),
    force: Boolean,
    onsubmit: {
      type: Function,
      default () {}
    },
    oncancel: {
      type: Function,
      default () {}
    }
  },

  computed: {
    active () {
      return this.$store.state.forms.active === this.id
    },
    displayTitle () {
      return this.title.toUpperCase()
    }
  },
  methods: {
    close () {
      this.$store.commit('forms/close')
    }
  }
}
</script>

<style lang='scss'>
  #side-form {
    position: relative;
    padding-top: 2rem;
    border-left: 1px solid #ECECEC;

    .close {
      position: absolute;
      top: 0.625rem;
      right: 0.625rem;
      cursor: pointer;
    }

    fieldset {
      border: none;
    }

    & > h3 {
      margin-top: 1rem;
      margin-bottom: 3rem;
    }

    .overlay {
      position: absolute;
      z-index: 10;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(white, 0.75);
      color: #242424;
    }
  }
</style>
