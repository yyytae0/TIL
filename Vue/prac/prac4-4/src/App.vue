<template>
  <div id="app">
    <h1>SSAFY TUBE</h1>
    <ShowYoutube :video-html="videoHtml"/>

    <!-- <iframe :src="id" frameborder="0"></iframe> -->
  </div>
</template>

<script>
import ShowYoutube from '@/components/ShowYoutube.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    ShowYoutube
  },
  data(){
    return {
      VUE_APP_YOUTUBE_API_KEY: 'AIzaSyBRM5oHn_oYiNPrTt2G8481Vl4X6gNEEQg',
      query: '코딩노래',
      videoHtml: '',
      id: ''
    }
  },
  created(){
    axios({
      method: 'get',
      url: `https://www.googleapis.com/youtube/v3/search?q=${this.query}&key=${this.VUE_APP_YOUTUBE_API_KEY}&type=video&part=snippet`
    }).then(res => {
      console.log(res)
      const url = res.data.items[0].id.videoId
      // this.id = 'https://www.youtube.com/embed/' + url
      axios({
        method: 'get',
        url: `https://www.googleapis.com/youtube/v3/videos?id=${url}&key=${this.VUE_APP_YOUTUBE_API_KEY}&type=video&part=player`
      }).then(res => {
        console.log(res)
        this.videoHtml = res.data.items[0].player.embedHtml
      })
    })

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
