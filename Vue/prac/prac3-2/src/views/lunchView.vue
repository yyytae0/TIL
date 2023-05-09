<template>
  <div class="home">
    <div>
      <h1>점심메뉴</h1>
      <button @click="randomLunch">Pick Lunch</button>
      <p>{{lunch}}</p>
    </div>
    <div>
      <h2>로또를 뽑아보자</h2>
      <button @click="goToLotto">Pick Lotto</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'lunchView',
  data(){
    return {
      lunch: '',
      lunchList: ["콩나물국밥", "순대국밥", "육개장", "소고기국밥", "돼지국밥"]
    }
  },
  methods:{
    randomLunch(){
      function random(){
        return Math.floor(Math.random() * 5)
      }
      let newLunch = this.lunchList[random()]
      this.lunch = newLunch
    },
    goToLotto(){
      this.$router.push({name: 'lotto'})
    }
  }
}
</script>
