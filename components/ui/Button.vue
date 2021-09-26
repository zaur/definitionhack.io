<template>
  <component
    :is="tag"
    :to="!disabled && to ? to : undefined"
    :href="href ? href : undefined"
    :target="href ? '_blank' : false"
    :rel="href ? 'noopener' : false"
    :class="buttonClass"
    :disabled="disabled"
    :style="width === null ? undefined : 'width: ' + width + 'px'"
    @click.prevent="handleClick"
    @keyup.enter="handleClick"
  >
    <span v-if='$slots.before' class='ui-button__before'>
      <slot name='before' />
    </span>
    <span class="ui-button__text">
      <slot v-if="$slots.default && !text" />
      <template v-else-if="text">{{ text }}</template>
    </span>
    <span v-if='$slots.after' class='ui-button__after'>
      <slot name='after' />
    </span>
    <span v-if="loading" class="ui-button__loader">
      <Spinner :size="24" />
    </span>
  </component>
</template>

<script>
import Spinner from '@/components/ui/Spinner';

export default {
  components: {
    Spinner,
  },

  props: {
    text: { type: String, default: null },
    to: { type: [String, Object], default: null },
    href: { type: String, default: null },
    type: { type: String, default: 'default' },
    size: { type: String, default: 'medium' },
    width: { type: Number, default: null },
    rounded: Boolean,
    inverted: Boolean,
    outlined: Boolean,
    expanded: Boolean,
    disabled: Boolean,
    loading: Boolean,
  },

  computed: {
    tag () {
      if (this.to) { return 'nuxt-link' }

      if (this.href) { return 'a' }

      return 'button';
    },

    buttonClass () {
      return {
        'ui-button': true,
        ['ui-button--' + this.type]: true,
        ['ui-button--' + this.size]: true,
        'ui-button--rounded': this.rounded,
        'ui-button--inverted': this.inverted,
        'ui-button--outlined': this.outlined,
        'ui-button--expanded': this.expanded,
        'ui-button--disabled': this.disabled || this.loading,
      };
    },
  },

  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('click');
      }
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/system.scss";
$block: ".ui-button";

#{$block} {
  @extend %resetButton;

  --button-size: 44px;
  --button-size-big: 70px;

  @include display-less(smart) {
    --button-size: 32px;
    --button-size-big: 40px;
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  height: var(--button-size);
  padding: 0 22px;
  border-radius: 6px;
  background: clr(primary);
  color: clr(light);
  font-size: var(--font-size-small);
  font-weight: 500;
  text-align: center;
  transition: background-color 0.25s;

  &--success {
    background: clr(success);
    color: clr(light);
  }

  &--inverted {
    background: clr(light);
    color: clr(primary);
  }

  &--outlined {
    background: transparent;
    box-shadow: inset 0 0 0 2px clr(primary);
    color: clr(primary);

    &:hover {
      background: clr(primary);
      color: clr(light);
    }

    &#{$block}--success {
      box-shadow: inset 0 0 0 2px clr(success);
      color: clr(success);

      &:hover {
        background: clr(success);
        color: clr(light);
      }
    }
  }

  &--big {
    height: var(--button-size-big);
    padding: 0 var(--gap-max);
  }

  &--reversed {
    flex-direction: row-reverse;
  }

  &--rounded {
    border-radius: var(--button-size);
  }

  &--disabled {
    background: clr(secondary);
    color: clr(light, 0.3);
    cursor: default;
  }

  @include display-less(smart) {
    gap: var(--gap-half);
    padding: 0 var(--gap);
  }
}
</style>
