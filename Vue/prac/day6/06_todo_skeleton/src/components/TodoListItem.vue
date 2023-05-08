<template>
  <div>
    <li>{{ todo.title }}</li>
  </div>
  
</template>

<script>
export default {
  name: 'TodoListItem',
  props: {
    todo: Object,
  }
}
</script>

<style>

</style>
