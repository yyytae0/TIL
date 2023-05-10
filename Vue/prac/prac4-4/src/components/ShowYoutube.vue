<template>
  <div v-html="videoHtml">
  </div>
</template>

<script>
export default {
  name: 'ShowYoutube',
  props: {
    videoHtml: String
  },
  created(){
    console.log(this.videoHtml)
  }
  
}
</script>

<style>

</style>