<template>
  <button 
    @click="select"
    :class="{green: isSelected, gray: !isSelected}"
  >{{singleTime}}</button>
</template>

<script>
export default {
  name: 'SingleTime',
  props: {
    singleTime: String,
    cnt: Number
  },
  methods: {
    select(){
      if (!this.isSelected){
        if(this.cnt < 5){
          this.isSelected = !this.isSelected
          this.$emit('select', this.singleTime)
        }
      }else{
        this.isSelected = !this.isSelected
        this.$emit('cancel', this.singleTime)
      }
    }
  },
  data(){
    return {
      isSelected: false,
    }
  }
}
</script>

<style>
.gray{
  background-color: #e7e7e7;
}
.green{
  background-color: #4CAF50;
}
</style>