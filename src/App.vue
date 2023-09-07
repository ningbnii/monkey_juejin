<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
// Add a custom menu item
GM_registerMenuCommand('脚本官网', function () {
  // Code to run when the menu item is clicked
  location.href = 'https://www.wxbuluo.com'
})
</script>

<template>
  <div class="monkey-box">
    <HelloWorld />
  </div>
</template>

<style scoped>
.monkey-box {
  /* background: red; */
  box-shadow: 2px 2px 4px #000;
  background: #fff;
  position: fixed;
  bottom: 0px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  padding: 10px;
}
</style>
