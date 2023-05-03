<template>
  <div>
    <h2>결정세액 : {{finalTax}} 만원</h2>
  </div>
</template>

<script>
export default {
  name: 'FinalTax',
  props:{
    finalTax: Number
  }
}
</script>

<style>

</style>