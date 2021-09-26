<template>
  <div class='pie-chart' :style='styles' />
</template>

<script>
export default {
  name: 'UiPieChart',

  props: {
    percent: { type: [Number, String], required: true },
  },

  computed: {
    styles () {
      if (!this.percent) { return }
      return {
        background: `conic-gradient(brown 0.00%, rgba(var(--color-primary), 1) 0.00% ${this.percent}%, rgba(var(--color-secondary), 1) ${this.percent}%)`,
      }
    }
  }
}
</script>

<style lang='scss'>
@import "~@/styles/system.scss";
$block: ".pie-chart";

#{$block} {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
