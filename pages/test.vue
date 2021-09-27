<template>
  <main class='h-section'>
    <div class='h-container'>
      <h1>NFT 2.0: interaction, composition and generative art</h1>
      <div class='actions'>
        <ui-button type='primary' @click='fetchNFTs()'>
          Make Magic
        </ui-button>
      </div>

      <h2 @click='loadInfoComponent'>Demo Art</h2>
      <section class='app'>
        <component :is="dynamic" v-if="dynamic" is-demo />
        <Drawer v-if='!!NFTCount' :quantity='NFTCount' />
      </section>

      <div class='description'>
        <h2>Technical Details</h2>

        <ul>
          <li>Each vector is an NFT</li>
          <li>Each NFT has a Ceramic Stream that proves historical ownership</li>
          <li>User is identified via 3ID</li>
          <li>Each 3ID has a deterministic Ceramic stream with ownership records</li>
          <li>Ownership records in 3ID stream links to NFT-DID streams records of proved ownership</li>
        </ul>

        <img src='~/assets/images/schema.png' alt=''>
      </div>

      <div class='actions'>
        <a href='ceramify.pdf' class='ui-button ui-button--outlined' target='_blank'>
          More Information
        </a>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Drawer from '@/components/shared/Drawer'

export default {
  name: 'HomePage',

  components: {
    Drawer,
  },

  data: () => ({
    pointsTotal: 218,
    dynamic: null,
  }),

  computed: {
    ...mapState('nft', ['nft', 'total']),

    NFTCount () {
      if (!this.nft?.length || !this.pointsTotal) { return 0 }
      return this.nft.length
    },
  },

  mounted () {
    this.loadInfoComponent()
  },

  methods: {
    ...mapActions('nft', ['fetchNFTs']),

    loadInfoComponent () {
      this.dynamic = () => import("@/components/shared/Info");
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~@/styles/system.scss";

h1 {
  margin: 0 0 40px;
  text-align: center;
}

h2 {
  margin: 40px 0 20px;
  text-align: center;
}

.actions {
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

.description {
  max-width: 800px;
  margin: 0 auto;

  ul {
    margin: 20px 30px;
    list-style-type: disc;
  }
}
</style>
