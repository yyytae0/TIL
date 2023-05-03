<template>
  <div>
    <h3>시간 선택</h3>
    <div>
      <SingleTime v-for="time in times"
       :key="time"
       :single-time="time"
       :cnt="cnt"
       @select="select"
       @cancel="cancel"/>
    </div>
    <div>
      <span>선택 시간 : </span>
      <span v-for="item in selected" :key="item">{{item}} </span>
    </div>
  </div>
</template>

<script>
import SingleTime from "@/components/SingleTime.vue"

export default {
  name: 'TimeSelect',
  data() {
    return {
      times: [
        "09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30",
        "14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30",
        "19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30",
        ],
      cnt: 0,
      selected: [],
      }
  },
  components: {
    SingleTime,
  },
  methods: {
    select(time){
      this.cnt += 1
      this.selected.push(time)
      this.selected.sort()
    },
    cancel(time){
      this.cnt -= 1
      this.selected.splice(this.selected.indexOf(time),1)
    }
  },
  created(){
    console.log('created time')
  }
}
</script>

<style>

</style>