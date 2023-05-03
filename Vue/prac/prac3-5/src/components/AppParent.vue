<template>
  <div>
    <h2>AppParent</h2>
    <input v-model.number="parentData" type="number">
    <div>appData : {{appData}}</div>
    <div>childData : {{childData}}</div>
    <AppChild :app-data="appData" :parent-data="parentData" @child="child"/>
  </div>
</template>

<script>
import AppChild from '@/components/AppChild.vue'
export default {
  name: 'AppParent',
  components:{
    AppChild
  },
  data(){
    return {
      parentData: 0,
      childData: 0
    }
  },
  props:{
    appData: Number,
  },
  methods:{
    child(input){
      this.childData = input
      this.$emit('child', input)
    }
  },
  watch:{
    parentData: function(){
      this.$emit('parent', this.parentData)
    }
  }

}
</script>

<style>

</style>