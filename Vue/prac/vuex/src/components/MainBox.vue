<template>
  <div>
    <div>Counter : {{counter}}</div>
    <div>Counter x2 : {{double}}</div>
    <button @click="increase">increase</button>
    <button @click="decrease">decrease</button>
  </div>
</template>

<script>
export default {
  name: 'MainBox',
  methods: {
    increase(){
      this.$store.dispatch('increase')
    },
    decrease(){
      this.$store.dispatch('decrease')
    }
  },
  computed: {
    counter(){
      return this.$store.state.counter
    },
    double(){
      return this.$store.getters.double
    }
  }

}
</script>

<style>

</style>