<template>
  <div class="spinner" :style="styles">
    <svg
      v-for="item in 4"
      :key="item"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        fill="none"
        stroke-width="8"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="28"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 66
    },
  },

  computed: {
    styles () {
      return {
        top: `calc(50% - ${this.size / 2}px)`,
        left: `calc(50% - ${this.size / 2}px)`,
        width: this.size + 'px',
        height: this.size + 'px',
      };
    },
  },
}
</script>

<style lang="scss">
@use "sass:math";

$colors: #5932D6, #e1475e, #00b2a4, #fec44b;
$d: 175.6449737548828;

.spinner {
  position: absolute;
  animation: common-frame 2s linear infinite;

  svg {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);

    @for $i from 1 through 4 {
      &:nth-child(#{$i}) circle {
        stroke: nth($colors, $i);
        stroke-dasharray: 1, 300;
        stroke-dashoffset: 0;
        animation: stroke-frame 3s calc(.2s * (#{$i})) ease infinite;
        transform-origin: center center;
      }
    }
  }
}

@keyframes stroke-frame {
  0% {
    stroke-dasharray: 1, 300;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 120, 300;
    stroke-dashoffset: math.div(-$d, 3);
  }
  100% {
    stroke-dasharray: 120, 300;
    stroke-dashoffset: -$d;
  }
}

@keyframes common-frame {
  100% {
    transform: rotate(360deg)
  }
}
</style>
