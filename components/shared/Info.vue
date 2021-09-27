<template>
  <div class='info'>
    <client-only>
      <div class='info__stat'>
        <h3>Completed by {{ percent }}%</h3>
        <div>({{ NFTCount }} from {{ pointsTotal }})</div>
        <UiPieChart class='chart' :percent='percent' />
      </div>

      <div class='history'>
        <div v-if='!isDemo' class='history-header'>
          <h3>NFT's:</h3>
          <input v-model='NFTNumber' type='number' />
          <ui-button
            :disabled='!NFTNumber || isDataLoading'
            :outlined='!!NFTNumber || isDataLoading'
            type='primary'
            @click='addSector'
          >
            <UiSpinner v-if='isDataLoading' slot='before' :size='24' />
            Add
          </ui-button>
        </div>
        <div class='history-list'>
          <ul>
            <li v-for='(item, index) in nft' :key='index'>
              <b>#{{ item.nft_token_id }}</b>
              <time>{{ $luxon.fromMillis(item.timestamp).toFormat('D tt') }}</time>
            </li>
          </ul>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import Ceramic from '@ceramicnetwork/http-client'

const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')

export default {
  props: {
    isDemo: { type: Boolean, default: false },
    pointsTotal: { type: Number, default: 218 },
  },

  data: () => ({
    history: [],
    NFTNumber: null,
    isDataLoading: false,
  }),

  computed: {
    ...mapState('nft', ['nft', 'total']),

    percent () {
      if (!this.nft?.length || !this.pointsTotal) { return 0 }
      return ((this.nft.length / this.pointsTotal) * 100).toFixed(2)
    },

    NFTCount () {
      if (!this.nft?.length || !this.pointsTotal) { return 0 }
      return this.nft.length
    },
  },

  // mounted () {
  //   if (process.client) {
  //     this.updateList()
  //   }
  // },

  methods: {
    ...mapActions('nft', ['fetchNFTs']),

    async addSector () {
      this.isDataLoading = true
      ceramic.did = window.did

      const didNFT =
        `did:nft:eip155:4_erc721:0xd132f6597e2b16e43f1a5ccd4956568a14e36cc5_${this.NFTNumber}`;

      try {
        const tile = await TileDocument.create(
          ceramic,
          null,
          {controllers: [didNFT], deterministic: true}
        )
        await tile.update({
          "user": window.did._id,
          "timestamp": Date.now()
        }, {controllers: [didNFT]})

        const commits = await ceramic.loadStreamCommits(tile.id)
        const lastCommitId = commits[commits.length - 1].cid

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
        await this.updateList()
        this.isDataLoading = false
        // todo update drawing state by window.userStreamDoc.content.nftRecords
      } catch (error) {
        console.error('ERROR', error)
      }
    },

    async updateList () {
      if (!this.isDemo) {
        try {
          if (window.userStreamDoc) {
            const userStreamDoc = await ceramic.loadStream(window.userStreamDoc.id)
            this.NFTNumber = null
            this.fetchNFTs(userStreamDoc.content.nftRecords)
          }
        } catch (error) {
          console.error(error)
        }
        return
      }
      this.fetchNFTs()
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/styles/system.scss";

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
</style>
