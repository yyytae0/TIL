<template>
  <div>
    <button @click="emitEvent">fsdafdsa</button>
  </div>
</template>

<script>
export default {
  name: 'TrainOne',
  methods:{
    emitEvent(){
      this.$emit('event-name', this.a)
    }
  },
  data(){
    return {
      a: 1,
      b: 2
    }
  }
}
</script>

<style>

</style>