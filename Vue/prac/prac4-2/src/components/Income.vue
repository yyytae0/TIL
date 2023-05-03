<template>
  <div>
    <label for="income">연봉 입력(만 원) : </label>
    <input v-model.number="income" type="number" name="income"><br>
    <label for="reduce">세액감면액(만 원) : </label>
    <input v-model.number="reduce" type="number" name="reduce">
    <hr>
    <h2>종합소득금액 : {{income}} 만원</h2>
    <h2>종합소득공제 : (-) {{TotalReduce}} 만원</h2>
    <h2>과세표준 : {{generalTax}} 만원</h2>
    <TaxRate :general-tax="generalTax" :reduce="reduce"/>
  </div>
</template>

<script>
import TaxRate from '@/components/Taxrate.vue'

export default {
  name: 'InCome',
  components: {
    TaxRate
  },
  data(){
    return {
      income: 0,
      reduce: 0,
      TotalReduce: 150,
    }
  },
  computed: {
    generalTax: function(){
      const generaltax = this.income-this.TotalReduce
      return generaltax > 0 ? generaltax:0
    }
  }

}
</script>

<style>

</style>