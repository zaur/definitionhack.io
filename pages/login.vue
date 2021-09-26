<template>
  <main class='h-section'>
    <div class='h-container'>
      <div class="container">
        <header>
          <div class="row">
            <div id="alerts" class="col-xs-12 alert hide" role="alert"></div>
            <div class="col-xs-offset-10 col-xs-2">
              <span id="userDID" class="badge rounded-pill bg-secondary">Not Connected</span>
            </div>
          </div>
        </header>
        <main class="container center">
          <div class="row">
            <div class="col-xs-12 col-lg-6">
              <iframe
                id="ceramic_docs"
                class="documentation"
                src="https://developers.ceramic.network/build/javascript/quick-start/"
              >
              </iframe>
            </div>
            <div class="col-xs-12 col-lg-6 text-right">
              <iframe
                id="idx_docs"
                class="documentation"
                src="https://developers.idx.xyz/build/quick-start/"
              ></iframe>
            </div>
          </div>
        </main>

        <div class='actions'>
          <ui-button id="bauth" :disabled='askingAuth' @click='askAuth'>
            <UiSpinner v-if='askingAuth' slot='before' :size='24' />
            Connect wallet
          </ui-button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { TileDocument } from '@ceramicnetwork/stream-tile'

export default {
  name: 'LoginPage',

  data: () => ({
    askingAuth: false,
  }),

  head: {
    script: [
      { src: '/ceramic/app.js', body: true },
    ],
  },

  computed: {
    ...mapState('app', ['isLoggedIn']),
  },

  methods: {
    ...mapActions('app', ['login']),

    askAuth () {
      this.askingAuth = true
      this.checkAuth()
    },

    checkAuth () {
      if (this.isLoggedIn) {
        return
      }
      setTimeout(async () => {
        const text = window.did
        if (text) {
          this.login()
          this.askingAuth = false
          await this.getStreamDoc()
          await this.$router.push({ name: 'app' })
          return
        }
        this.checkAuth()
      }, 300)
    },

    async getStreamDoc () {
      const tileDocument = await TileDocument.create(window.ceramic, null, {
        controllers: [window.did._id],
        family: 'ceramify-nft-1',
        tags: ['ceramify-nft-1'],
        deterministic: true,
      });
      window.userStreamDoc = tileDocument;
      return tileDocument.stream
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  text-align: center;
}

.actions {
  margin: var(--gap-max) 0 0;
}

.hide {
  display: none;
  padding: 0;
  margin: 0;
}
.center {
  margin: 0 auto;
}
.loader {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.alert {
  margin-top: 15px;
}
.space-around {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.ceramic-btn.active {
  background-color: #f87237 !important;
  color: white !important;
}
.idx-btn.active {
  background-color: #6535ff !important;
  color: white !important;
}
.documentation {
  resize: both;
  overflow: auto;
  height: 200px;
  width: 100%;
  border: 1px solid transparent;
  display: none;
}
</style>
