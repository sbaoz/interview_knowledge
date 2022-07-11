<template>
  <div>
    <p v-show="GLOBAL.logined">{{ message }}</p>
  </div>
</template>

<script>
  export default {
    inject: ['GLOBAL'],
    data() {
      return {
        message: 'a test component',
      }
    }
  }
</script>
