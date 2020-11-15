<template>
  <div ref="flip" class="flip">
    <div class="digital front" :data-number="frontNumber" />
    <div class="digital back" :data-number="backNumber" />
  </div>
</template>
<script>

// 参考 http://public.xp.cn/down/texiao/texiao_date306/index.html
export default {
  name: 'FlipNumber',
  props: {
    number: Number
  },
  data () {
    return {
      frontNumber: 0,
      backNumber: 1
    }
  },
  watch: {
    number: {
      immediate: true,
      handler (val, old) {
        if (val - old === 1 || (val === 0 && old === 9)) {
          this.$refs.flip.classList.add('running')
        } else {
          // 直接更新
          this.frontNumber = val
          this.backNumber = (val + 1) % 10
        }
      }
    }
  },
  mounted () {
    this.$refs.flip.addEventListener('animationend', this.handleAnimationend)
  },
  beforeDestroy () {
    this.$refs.flip.removeEventListener('animationend', this.handleAnimationend)
  },
  methods: {
    handleAnimationend () {
      this.frontNumber = this.number
      this.backNumber = (this.number + 1) % 10
      this.$refs.flip.classList.remove('running')
    }
  }
}
</script>

<style scoped>
.flip {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  margin: 2px;
  font-size: 66px;
  line-height: 100px;
  text-align: center;
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, .5);
}
.flip .digital::before,
.flip .digital::after {
  position: absolute;
  content: attr(data-number);
  left: 0;
  right: 0;
  color: white;
  background: black;
  overflow: hidden;
  -webkit-perspective: 160px;
  perspective: 160px;
}
.flip .digital::before {
  top: 0;
  bottom: 50%;
  border-bottom: 1px solid #666;
  border-radius: 10px 10px 0 0;
}
.flip .digital::after {
  top: 50%;
  bottom: 0;
  line-height: 0;
  border-radius: 0 0 10px 10px;
}
.flip .back::before,
.flip .front::after {
  z-index: 1;
}
.flip .back::after {
  z-index: 2;
}
.flip .front::before {
  z-index: 3;
}
.flip .back::after {
  -webkit-transform-origin: center top;
  transform-origin: center top;
  -webkit-transform: rotateX(.5turn);
  transform: rotateX(.5turn);
}
.flip.running .front::before {
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
  -webkit-animation: frontFlipDown .6s ease-in-out;
  animation: frontFlipDown .6s ease-in-out;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, .3);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip.running .back::after {
  -webkit-animation: backFlipDown .6s ease-in-out;
  animation: backFlipDown .6s ease-in-out;
}

@-webkit-keyframes frontFlipDown {
  to {
    -webkit-transform: rotateX(.5turn);
    transform: rotateX(.5turn);
  }
}

@keyframes frontFlipDown {
  to {
    -webkit-transform: rotateX(.5turn);
    transform: rotateX(.5turn);
  }
}
@-webkit-keyframes backFlipDown {
  to {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
  }
}
@keyframes backFlipDown {
  to {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
  }
}
</style>
