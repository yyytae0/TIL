<template>
  <div class="about">
    <h1>로또</h1>
    <button @click="random">Get lucky Numbers</button>
    <p>{{ randomLotto }}</p>
  </div>
</template>

<script>
export default {
  name: 'lottoView',
  data(){
    return {
      randomLotto: []
    }
  },
  methods: {
    random(){
      this.randomLotto = []
      let d
      let cnt = 0
      function random(){
        return Math.floor(Math.random() * 46)
      }
      while(cnt < 6){
        d = random()
        if (!(this.randomLotto.includes(d))) {
          console.log(d)
          this.randomLotto.push(d)
          cnt++
        }
        if (cnt == 6){
          break
        }
      }
    }
  }

}
</script>

<style>

</style>