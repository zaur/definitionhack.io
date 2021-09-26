<template>
  <footer>
    <div class="h-container wrapper">
      <Contact />
      <Navigation />
    </div>
  </footer>
</template>

<script>
import Contact from '@/components/common/Footline/Contact'
import Navigation from '@/components/common/Footline/Navigation'

export default {
  name: 'Footline',

  components: {
    Navigation,
    Contact,
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/system.scss";

footer {
  flex: 0 0 auto;
  padding: var(--gap-max) 0;
  background: clr(accent);
  color: clr(text);
  font-size: var(--font-size-tiny);

  @include display-less(desktop) {
    margin-top: var(--gap-max);
  }
}

.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 94px;
}
</style>
