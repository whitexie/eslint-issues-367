<script setup>
import { nextTick, onBeforeUpdate, ref } from 'vue'

import 'codemirror/lib/codemirror.css'
import { Option, Select } from 'element-ui'
import VirtualList from './components/VirtualList.vue'
import mappingList from './assets/jsons/mappingList.json'
import optionList from './assets/jsons/locationOptions.json'

// const listData = ref(Array.from({ length: 300 }).map((_, index) => ({ id: index + 1 })))
const listData = ref(mappingList)
const locationOptions = ref(optionList)

function onClick() {
  const old = listData.value
  listData.value = []
  nextTick(() => {
    listData.value = old
  })
}
</script>

<template>
  <div id="app">
    <VirtualList :list-data="listData" :item-height="40" container-tag="table" item-tag="tr">
      <template #default="{ row }">
        <td>
          {{ row.id }}
        </td>
        <td>
          <Select v-model="row.value" size="mini">
            <!-- <Option v-for="item in optionList" :key="item.id" v-bind="item" /> -->
          </Select>
        </td>
      </template>
    </VirtualList>
    <el-button @click="onClick">
      Click Me
    </el-button>
  </div>
</template>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  border: 1px solid #ddd;
  width: 600px;
  height: 300px;
}

div {
  box-sizing: border-box;
}

.row {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ddd;
}

table {
  width: 100%;
}

td {
  width: 50%;
  text-align: center;
}
</style>
