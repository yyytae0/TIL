<template>
  <div id="app">
    <h2>App</h2>
    <input v-model.number="appData" type="number">
    <div>parentData : {{parentData}}</div>
    <div>childData : {{childData}}</div>
    <AppParent :app-data="appData" @child="child" @parent="parent"/>
  </div>
</template>

<script>
import AppParent from './components/AppParent.vue'

export default {
  name: 'App',
  components: {
    AppParent
  },
  data(){
    return {
      appData: 0,
      parentData: 0,
      childData: 0
    }
  },
  methods:{
    child(input){
      this.childData = input
    },
    parent(input){
      this.parentData = input
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
