<template>
  <div>
    <h2>AppChild</h2>
    <input v-model.number="childData" type="number">
    <div>appData : {{appData}}</div>
    <div>parentData : {{parentData}}</div>
    <div>childData : {{childData}}</div>
  </div>
</template>

<script>
export default {
  name: 'AppChild',
  props:{
    appData: Number,
    parentData: Number
  },
  data(){
    return {
      childData: 0
    }
  },
  watch:{
    childData: function(){
      this.$emit('child', this.childData)
    }
  }
}
</script>

<style>

</style>