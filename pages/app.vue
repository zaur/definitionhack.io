<template>
  <main v-if='content' class='h-section'>
    <div class='h-container'>
      <h1>Your NFT</h1>
      <div v-html='content.content' />
      <section class='app'>
        <div class='info'>
          <div class='info__stat'>
            <h3>Completed by {{ percent }}%</h3>
            <div>({{ randomNumber }} from {{ total }})</div>
            <UiPieChart class='chart' :percent='percent' />
          </div>

          <div class='history'>
            <h3>Your NFT's:</h3>
            <div class='history-list'>
              <ul>
                <li v-for='item in nft' :key='item.id'>
                  <b>#{{ item.number }}</b>
                  <time>{{ $luxon.fromMillis(item.timestamp).toFormat('D tt') }}</time>
                </li>
              </ul>
            </div>
            <div class='add'>
              <ui-button type='primary' outlined>
                Add new
              </ui-button>
            </div>
          </div>
        </div>
        <Drawer :quantity='randomNumber' />
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { findRandom } from '@/libs/utils'
import Drawer from '@/components/shared/Drawer'
import pages from '@/mixins/pages'

export default {
  name: 'AppPage',

  components: {
    Drawer,
  },

  mixins: [pages],

  data: () => ({
    history: [],
  }),

  computed: {
    ...mapState('nft', ['nft', 'total']),

    percent () {
      if (!this.nft?.length || !this.total) { return 0 }
      return ((this.randomNumber / this.total) * 100).toFixed(2)
      // return ((this.nft.length / this.total) * 100).toFixed(2)
    },

    randomNumber () {
      if (!this.nft?.length || !this.total) { return 0 }
      return findRandom(this.total)
    }
  },

  mounted () {
    this.fetchNft()
  },

  methods: {
    ...mapActions('nft', ['fetchNft'])
  },
}
</script>

<style lang='scss' scoped>
@import "~@/styles/system.scss";

h1 {
  margin: 0 0 40px;
  text-align: center;
}

.app {
  display: grid;
  grid-template-columns: 1fr 600px;
  gap: 50px;

  @include display-less(desktop) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

.chart {
  margin: var(--gap) auto;
}

h3 {
  margin: 0 0 4px;
  font-weight: 500;
}

.history {
  margin: 40px 0 0;

  &-list {
    overflow-y: auto;
    max-height: 100px;
    background: clr(accent);
  }

  ul {
    margin: 0;
    font-size: var(--font-size-small);
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap);
    padding: 0 8px;

    &:nth-child(odd) {
      background: clr(success, 0.1);
    }
  }

  b {
    font-weight: 600;
  }

  .add {
    margin: var(--gap) 0 0;
    text-align: center;
  }
}

.settings {
  margin: 40px 0 0;
}
</style>
