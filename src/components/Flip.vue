<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ direction: { type: String, default: 'down' }, value: { type: Number, default: 0 } })

const changed = ref(false)
const count = ref(props.value)

const classList = computed(() => {
  return [props.direction, changed.value ? 'go' : '']
})

const frontNumber = computed(() => {
  return count.value % 10
})

const backNumber = computed(() => {
  const r = count.value % 10 + 1
  return r < 10 ? r : 0
})

watch(
  () => props.value,
  () => {
    handleChanged()
  },
)

function handleChanged() {
  changed.value = true
  setTimeout(() => {
    count.value = props.value
    changed.value = false
  }, 500)
}
</script>

<template>
  <div class="flip" :class="classList">
    <div class="digital front" :number="frontNumber" />
    <div class="digital back" :number="backNumber" />
  </div>
</template>

<style lang="less" scoped>
.flip {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px #000;
  border-radius: 10px;
  background: #fff;
  font-size: 66px;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;

  &.down {
    .front::before {
      z-index: 3;
    }

    .back::after {
      z-index: 2;
      transform-origin: 50% 0%;
      transform: perspective(160px) rotateX(180deg);
    }

    .front::after,
    .back::before {
      z-index: 1;
    }
  }

  &.up {
    .front::after {
      z-index: 3;
    }

    .back::before {
      z-index: 2;
      transform-origin: 50% 100%;
      transform: perspective(160px) rotateX(-180deg);
    }

    .front::before,
    .back::after {
      z-index: 1;
    }
  }

  &.go {
    &.down {
      .front::before {
        transform-origin: 50% 100%;
        animation: frontFlipDown 0.6s ease-in-out both;
        box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
        backface-visibility: hidden;
      }

      .back::after {
        animation: backFlipDown 0.6s ease-in-out both;
      }
    }

    &.up {
      .front::after {
        transform-origin: 50% 0%;
        animation: frontFlipUp 0.6s ease-in-out both;
        box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
        backface-visibility: hidden;
      }

      .back::before {
        animation: backFlipUp 0.6s ease-in-out both;
      }
    }
  }

  .digital::before,
  .digital::after {
    content: attr(number);
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    overflow: hidden;
  }

  .digital::before {
    top: 0;
    bottom: 50%;
    border-radius: 10px 10px 0 0;
    border-bottom: solid 1px #666;
  }

  .digital::after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    line-height: 0;
  }
}
</style>

<style>
@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
</style>
