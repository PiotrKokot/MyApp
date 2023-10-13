<script setup>

</script>

<template>
  <div>
    <h1>Welcome in super simple register app</h1><br/>
    <button @click="registerView">START</button>
  </div>
</template>

<script>
   export default {
    data() {
      return {
      }
    },
    methods: {
      registerView() {
        window.location.href="/register"
      }
    }

  }
</script>
