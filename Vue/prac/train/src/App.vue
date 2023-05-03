<template>
  <div id="app">
    <h1>버튼 박스 제작</h1>
    <MainBox />
    <TrainOne @event-name="something"/>
  </div>
</template>

<script>
import MainBox from '@/components/MainBox.vue'
import TrainOne from '@/components/TrainOne.vue'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    MainBox,
    TrainOne
  },
  methods: {
    something(a){
      console.log(a)
    }
  },
  created(){
    console.log('created app')
  }
}
</script>

<style>
#app {
  font-family: Noto-Sans-korean;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
