<template>
  <div class='ui-nft' :style='styles'>
    <img class='ui-nft__image' :src='imageUrl' alt=''>
  </div>
</template>

<script>
export default {
  name: 'UiNft',

  props: {
    imageUrl: { type: String, required: true },
    bg: { type: String, default: null },
  },

  computed: {
    styles () {
      if (!this.bg) { return }
      return {
        background: this.bg
      }
    }
  }
}
</script>

<style lang='scss'>
@import "~@/styles/system.scss";
$block: ".ui-nft";

#{$block} {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 228px;
  height: 276px;
  border-radius: var(--radius);
  background: clr(light);
  color: clr(text);

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include display-less(phablet) {
    width: 130px;
    height: 150px;
  }
}
</style>
