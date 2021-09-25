<template>
  <div class='layout'>
    <Headline />

    <main>
      <Nuxt />
    </main>

    <Footline />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Headline from '@/components/common/Headline';
import Footline from '@/components/common/Footline';

export default {
  name: 'DefaultLayout',

  components: {
    Headline,
    Footline,
  },

  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
      this.handleScroll()
      this.handleResize()
    }
  },

  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    }
  },

  methods: {
    ...mapActions('app', ['changeScrollPosition', 'changeWindowSize']),

    handleScroll () {
      this.changeScrollPosition(window.scrollY)
    },

    handleResize () {
      this.changeWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~@/styles/system.scss";

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
