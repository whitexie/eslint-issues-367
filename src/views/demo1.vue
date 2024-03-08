<script setup>
import { ref } from 'vue'

const widgetList = ref([])
const activeId = ref('')

function handleDragend(e) {
  const { target } = e
  console.log('target', target)
}

function hadnleDrop(e) {
  const { target } = e
  console.log('target', target)
}
</script>

<template>
  <div class="container">
    <div class="widget-list">
      <div v-for="item in '1234567890'" :key="item" class="widget-item" :draggable="true" @drop="hadnleDrop">
        <i class="widget-icon el-icon-platform-eleme" />
        <span>组件{{ item }}</span>
      </div>
    </div>
    <main>
      <div class="canvas" @drop="handleDragend">
        <div v-for="item in widgetList" :key="item" class="widget-item" />
      </div>
    </main>
    <div class="widget-pane" />
  </div>
</template>

<style lang="less" scoped>
.container {
  display: grid;
  grid-template-columns: 220px 1fr 300px;
  height: 100%;
  width: 100%;

  .widget-list {
    display: flex;
    gap: 10px;
    padding: 5px;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    border-right: 1px solid #ddd;

    .widget-item {
      display: flex;
      align-items: center;
      padding: 5px 14px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin: 0;
      cursor: move;

      .widget-icon {
        margin-right: 5px;
        font-size: 1.2em;
        color: #409eff;
      }
    }
  }

  .widget-pane {
    border-left: 1px solid #ddd;
  }

  main {
    padding: 30px;
    background-color: #eee;
    overflow: auto;

    .canvas {
      background-color: white;
      width: 1920px;
      height: 1080px;
    }
  }
}
</style>
