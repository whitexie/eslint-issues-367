<script setup>
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { WIDGETS } from '@/constants/widget'

const widgetList = ref([])
const activeId = ref('')

const canvas = ref(null)

const activeWidget = ref('')

function handleDragDrop(e) {
  console.log('handleDragDrop target', e)
  const { clientX, clientY } = e
  const widget = {
    id: nanoid(),
    ...activeWidget.value,
  }
  const { top, left } = getCanvasRect()
  // const { width, height } = widget.style
  activeId.value = widget.id
  widget.style.top = clientY - top // - height / 2
  widget.style.left = clientX - left // - width / 2
  widgetList.value.push(activeWidget.value)
}

/**
 * @param {DragEvent} e
 */
function handleDragEnter(e) {
  if (activeId.value) {
    return
  }
  console.log('handleDragEnter', e)
}

function hadnleDrop(e) {
  console.log('hadnleDrop target', e)

  activeWidget.value = null
  activeId.value = ''
}

function handleDragStart(item, e) {
  console.log('handleDragStart', e.target)
  activeWidget.value = item
}

function handleDrag(e, item) {
  // console.log('handleDrag', e)
}

/**
 * @param {Event} e
 */
function handleDragOver(e) {
  e.preventDefault()
}

function handleDragLeave(e) {
  console.log('handleDragLeave', e)
  widgetList.value = widgetList.value.filter(item => item.id !== activeId.value)
  activeId.value = ''
}

function getRenderWidgetStyle(item) {
  const { style } = item
  const result = {}
  Object.keys(style).forEach((key) => {
    result[key] = `${style[key]}px`
  })
  return result
}

function getCanvasRect() {
  return canvas.value && canvas.value.getBoundingClientRect()
}

function getWidgetPreviewStyle(item) {
  if (item.wid === activeWidget.value?.wid) {
    const { style: { width, height } } = item

    return {
      width: `${width}px`,
      height: `${height}px`,
      border: '1px solid #409eff',
    }
  }

  return {}
}
</script>

<template>
  <div class="container">
    <div class="widget-list">
      <div
        v-for="item in WIDGETS" :key="item.wid" class="widget-item" :draggable="true"
        @dragstart="handleDragStart(item, $event)" @drag="handleDrag($event, item)"
      >
        <i class="widget-icon el-icon-platform-eleme" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <main>
      <div
        ref="canvas" class="canvas" @dragenter="handleDragEnter" @dragleave="handleDragLeave"
        @dragover="handleDragOver" @drop="handleDragDrop"
      >
        <div v-for="item in widgetList" :key="item.id" class="render-widget-item" :style="getRenderWidgetStyle(item)">
          {{ item.name }}
        </div>
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
      position: relative;
      width: 1920px;
      height: 1080px;

      .render-widget-item {
        position: absolute;
        border: 1px solid #409eff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: large;
      }
    }
  }
}
</style>
