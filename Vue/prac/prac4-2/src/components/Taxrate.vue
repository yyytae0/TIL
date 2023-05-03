<template>
  <div>
    <h2>산출세액 : {{computedTax}} 만원</h2>
    <h2>세액감면 : (-) {{reduce}} 만원</h2>
    <hr>
    <FinalTax :final-tax="computedTax-reduce > 0 ? computedTax-reduce:0"/>
  </div>
</template>

<script>
import FinalTax from '@/components/Finaltax.vue'

export default {
  name: 'TaxRate',
  components: {
    FinalTax
  },
  props:{
    reduce: Number,
    generalTax: Number
  },
  watch:{
    generalTax: function(){
      if (this.generalTax <= 1200){
        this.taxRate = 6
        this.over = 0
      }
      else if (this.generalTax <= 4600){
        this.taxRate = 15
        this.over = 108
      }
      else if (this.generalTax <= 8800){
        this.taxRate = 24
        this.over = 522
      }
      else if (this.generalTax <= 15000){
        this.taxRate = 35
        this.over = 1490
      }
      else if (this.generalTax <= 30000){
        this.taxRate = 38
        this.over = 1940
      }
      else if (this.generalTax <= 50000){
        this.taxRate = 40
        this.over = 2540
      }
      else if (this.generalTax <= 100000){
        this.taxRate = 42
        this.over = 3540
      }
      else {
        this.taxRate = 45
        this.over = 6540
      }
      this.computedTax = (this.generalTax * this.taxRate / 100) - this.over
    }
  },
  data(){
    return {
      taxRate: 0,
      over: 0,
      computedTax: 0
    }
  },
}
</script>

<style>

</style>