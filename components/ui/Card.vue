<template>
  <div class='ui-card'>
    <div v-if='$slots.media' class='ui-card__media'>
      <slot name='media' />
    </div>

    <h4 v-if='title' class='ui-card__title'>{{ title }}</h4>

    <div v-if='tagline' class='ui-card__tagline'>{{ tagline }}</div>

    <div class='ui-card__content'>
      <slot name='default' />
    </div>

    <footer v-if='$slots.footer' class='ui-card__footer'>
      <slot name='footer' />
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: null },
    tagline: { type: String, default: null },
  },
};
</script>

<style lang='scss'>
@import "~@/styles/system.scss";
$block: ".ui-card";

#{$block} {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: var(--gap);
  border: 1px solid clr(border);
  border-radius: var(--radius);
  background: clr(light);
  color: clr(text-secondary);
  font-size: var(--font-size-small);
  font-weight: 500;
  text-align: center;

  &__media {
    flex: 0 0 auto;
  }

  &__title {
    @include title(big, 600, 1.27);

    margin: 0 0 10px;
    color: clr(text);
  }

  &__content {
    flex: 1;
    margin: var(--gap) 0;
  }
}
</style>
