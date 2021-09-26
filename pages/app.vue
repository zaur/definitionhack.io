<template>
  <main v-if='content' class='h-section'>
    <div v-if='!isLoggedIn' class='h-container login'>
      <ui-button :to='{ name: "login" }' outlined>Login</ui-button>
    </div>
    <div v-else class='h-container'>
      <h1>Your NFT</h1>
      <div v-html='content.content' />
      <section class='app'>
        <div class='info'>
          <div class='info__stat'>
            <h3 @click='fetchNFTs()'>Completed by {{ percent }}%</h3>
            <div>({{ NFTCount }} from {{ total }})</div>
            <UiPieChart class='chart' :percent='percent' />
          </div>

          <div class='history'>
            <div class='history-header'>
              <h3>NFT's:</h3>
              <input v-model='NFTNumber' type='number' />
              <ui-button :disabled='!NFTNumber' type='primary' :outlined='!!NFTNumber' @click='addSector'>
                Add
              </ui-button>
            </div>
            <div class='history-list'>
              <ul>
                <li v-for='item in nft' :key='item.id'>
                  <b>#{{ item.number }}</b>
                  <time>{{ $luxon.fromMillis(item.timestamp).toFormat('D tt') }}</time>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Drawer :quantity='NFTCount' />
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import Ceramic from '@ceramicnetwork/http-client'
// import { findRandom } from '@/libs/utils'
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
    NFTNumber: null,
  }),

  computed: {
    ...mapState('nft', ['nft', 'total']),
    ...mapState('app', ['isLoggedIn']),

    percent () {
      if (!this.nft?.length || !this.total) { return 0 }
      // return ((this.NFTCount / this.total) * 100).toFixed(2)
      return ((this.nft.length / this.total) * 100).toFixed(2)
    },

    NFTCount () {
      if (!this.nft?.length || !this.total) { return 0 }
      return this.nft.length
    }
  },

  mounted () {
    this.fetchNFTs()
  },

  methods: {
    ...mapActions('nft', ['fetchNFTs']),

    async addSector () {
      console.log('addSector', this.NFTNumber)
      const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')
      ceramic.did = window.did

      const didNFT =
        "did:nft:eip155:4_erc721:0xd132f6597e2b16e43f1a5ccd4956568a14e36cc5_" + this.NFTNumber;

      try {
        const tile = await TileDocument.create(ceramic, null, {controllers: [didNFT], deterministic: true})
        console.log('STREAM_ID', tile.id.toString())
        console.log('USER_STREAM_ID', window.userStreamDoc.id.toString())
        console.log('USER_DID', window.did._id)
        console.log('NFT_DID', didNFT)
        await tile.update({
          "user": window.did._id,
          "timestamp": Date.now()
        }, {controllers: [didNFT]})
        console.log('UPDATED', 'updated tile')

        const commits = await ceramic.loadStreamCommits(tile.id)
        console.log('NFT_COMMITS', commits)
        const lastCommitId = commits[commits.length - 1].cid
        console.log('LAST_COMMIT', lastCommitId)

        let userStreamContent
        if (!window.userStreamDoc?.content?.nftRecords) {
          userStreamContent = {nftRecords: []}
        } else {
          userStreamContent = window.userStreamDoc.content
        }
        const newNftRecord = {
          "nft_token_id": this.NFTNumber,
          "nft_stream_id": tile.id.toString(),
          "commit_id": lastCommitId,
          "timestamp": Date.now()
        }
        userStreamContent.nftRecords.push(newNftRecord)
        await window.userStreamDoc.update(
          userStreamContent,
          {controllers: [window.did._id]}
        )
        const userStreamCommits = await ceramic.loadStreamCommits(window.userStreamDoc.id)
        console.log('USER_STREAM_COMMITS', userStreamCommits)

        window.userStreamDoc = await ceramic.loadStream(window.userStreamDoc.id)
        console.log('USER_STREAM_DOC', window.userStreamDoc.content.nftRecords)
        this.NFTNumber = null
        this.fetchNFTs()
        // todo update drawing state by window.userStreamDoc.content.nftRecords
      } catch (error) {
        console.error('ERROR', error)
      }
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
  margin: 0;
  font-weight: 500;
}

.history {
  margin: 40px 0 0;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 0 0 4px;

    input {
      flex: 1;
      height: 44px;
      padding: 0 8px;
      border: 2px solid clr(border);
      border-radius: 8px;
    }
  }

  &-list {
    overflow-y: auto;
    max-height: 300px;
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
