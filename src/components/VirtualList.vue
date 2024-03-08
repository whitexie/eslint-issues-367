<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'

const props = defineProps({
  listData: {
    type: Array,
    default: () => [],
  },
  itemHeight: {
    type: Number,
    required: true,
  },
  containerTag: {
    type: String,
    default: 'div',
  },
  itemTag: {
    type: String,
    default: 'div',
  },
  containerProps: {
    type: Object,
    default: () => ({}),
  },
  itemProps: {
    type: Object,
    default: () => ({}),
  },
})

let updating = false
let curPage = 0
const start = ref(0)
const end = ref(0)
const containerRef = ref(null)
const visibleCount = ref(0)
const visibleData = ref([])

const placeholderUpStyle = computed(() => {
  return { height: `${start.value * props.itemHeight}px` }
})

const placeholderDownStyle = computed(() => {
  return { height: `${(props.listData.length - end.value) * props.itemHeight}px` }
})

const itemStyle = computed(() => {
  return {
    height: `${props.itemHeight}px`,
  }
})

function handleScroll() {
  const hiddenCount = Math.floor(containerRef.value.scrollTop / props.itemHeight)

  if (updating) {
    return
  }

  if (hiddenCount > (curPage + 1) * visibleCount.value + visibleCount.value / 2) {
    udpateVisibleData(hiddenCount)
  }
  else if (hiddenCount < curPage * visibleCount.value + visibleCount.value / 2) {
    udpateVisibleData(hiddenCount)
  }
}

function udpateVisibleData(hiddenCount) {
  const { scrollTop } = containerRef.value
  updating = true
  start.value = Math.floor(hiddenCount / visibleCount.value) * visibleCount.value
  curPage = Math.floor(start.value / visibleCount.value)
  end.value = Math.min(start.value + visibleCount.value * 3, props.listData.length)
  visibleData.value = props.listData.slice(start.value, end.value)
  nextTick(() => {
    const _scrollTop = containerRef.value.scrollTop
    containerRef.value.scrollTop = _scrollTop - (_scrollTop - scrollTop)
    updating = false
  })
}

onMounted(() => {
  visibleCount.value = Math.ceil(containerRef.value.clientHeight / props.itemHeight)
  start.value = 0
  end.value = Math.min(start.value + visibleCount.value * 3, props.listData.length)
  visibleData.value = props.listData.slice(start.value, end.value)
})
</script>

<template>
  <div ref="containerRef" class="list-container" @scroll="handleScroll">
    <div class="placeholder up" :style="placeholderUpStyle" />
    <component :is="containerTag" v-bind="containerProps" class="render-list">
      <component
        :is="itemTag"
        v-for="item in visibleData"
        :key="item.id" :style="itemStyle"
        v-bind="itemProps"
        class="render-list__item"
      >
        <slot :row="item" />
      </component>
    </component>
    <div class="placeholder down" :style="placeholderDownStyle" />
  </div>
</template>

<style lang="less" scoped>
.list-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>
