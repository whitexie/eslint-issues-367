<script setup>
import { computed, ref } from 'vue'
import Flip from '@/components/Flip.vue'

const count = ref(8)

const numberList = computed(() => {
  return Array.from(String(count.value)).map(str => Number(str))
})

function handleDown() {
  count.value--
}

function handleUp() {
  count.value++
}
</script>

<template>
  <div class="container">
    <div id="app1">
      <Flip v-for="(item, index) in numberList" :key="index" type="down" :value="item" />
    </div>
    <button @click="handleDown">
      Go Down
    </button>
    <button style="margin-left: 10px;" @click="handleUp">
      Go Up
    </button>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

button {
  padding: 0 10px;
}

#app1 {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
