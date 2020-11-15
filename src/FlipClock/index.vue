<template>
  <div class="clock">
    <template v-if="time">
      <div
        v-for="(number, index) in time"
        :key="index"
        class="number">
        <flip-number :number="number[0]" />
        <flip-number :number="number[1]" />
        <span v-if="index !== time.length - 1" class="divider">:</span>
      </div>
    </template>
  </div>
</template>
<script>

import FlipNumber from './FlipNumber'
import dayjs from 'dayjs'

export default {
  name: 'FlipClock',
  components: {
    FlipNumber
  },
  data () {
    return {
      time: null
    }
  },
  mounted () {
    this._timer = setInterval(() => {
      this.updateTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this._timer)
  },
  methods: {
    updateTime () {
      const date = dayjs()
      const parseNumber = number => {
        return [ parseInt(number / 10), number % 10 ]
      }
      this.time = [ parseNumber(date.hour()), parseNumber(date.minute()), parseNumber(date.second()) ]
    }
  }
}
</script>

<style scoped>
.clock {
  display: flex;
  align-items: center;
  justify-content: center;
}
.number {
  display: flex;
  align-items: center;
}
.divider {
  font-size: 66px;
}
</style>
