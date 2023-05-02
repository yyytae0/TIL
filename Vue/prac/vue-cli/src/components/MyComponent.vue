<template>
  <div class="border">
    <h1>This is Component</h1>
    <MyChild />
  </div>
</template>

<script>
import MyChild from '@/components/MyChild.vue'

export default {
  name: 'MyComponent',
  components: {
    MyChild
  }
}
</script>

<style>
.border{
  border: solid;
}

</style>