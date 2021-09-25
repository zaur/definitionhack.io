<template>
  <div class='ui-progress'>
    <div class='ui-progress__scale'>
      <div class='ui-progress__line' :style='styles'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiProgress',

  props: {
    value: { type: Number, default: 0 },
  },

  computed: {
    styles () {
      return {
        width: !this.value ? undefined : this.value + '%',
      };
    },
  },
}
</script>

<style lang='scss'>
@import "~@/styles/system.scss";
$block: ".ui-progress";

#{$block} {
  &__scale {
    position: relative;
    height: 4px;
    border-radius: 2px;
    background: rgba(#d9d9d9, 0.5);
  }

  &__line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;
    background-image: linear-gradient(67deg, #ff357d 0%, #ff6f33 97%);
  }
}
</style>
