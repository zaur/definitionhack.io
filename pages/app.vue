<template>
  <main v-if='content' class='h-section'>
    <div v-if='!isLoggedIn' class='h-container login'>
      <ui-button :to='{ name: "login" }' outlined>Login</ui-button>
    </div>
    <div v-else class='h-container'>
      <h1>Your NFT</h1>
      <div v-html='content.content' />
      <section class='app'>
        <Info />
        <Drawer v-if='!!NFTCount' :quantity='NFTCount' />
      </section>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import Info from '@/components/shared/Info'
import Drawer from '@/components/shared/Drawer'
import pages from '@/mixins/pages'


export default {
  name: 'AppPage',

  components: {
    Info,
    Drawer,
  },

  mixins: [pages],

  data: () => ({
    pointsTotal: 218,
  }),

  computed: {
    ...mapState('nft', ['nft', 'total']),
    ...mapState('app', ['isLoggedIn']),

    NFTCount () {
      if (!this.nft?.length || !this.pointsTotal) { return 0 }
      return this.nft.length
    },
  },
}
</script>

<style lang='scss' scoped>
@import "~@/styles/system.scss";

.login {
  text-align: center;
}

h1 {
  margin: 0 0 40px;
  text-align: center;
}

.app {
  display: grid;
  grid-template-columns: 1fr 600px;
  gap: var(--gap-max);

  @include display-less(desktop) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
