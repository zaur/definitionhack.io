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
// const tile = await TileDocument.create(ceramic, {foo: 'NFT888'}, {controllers: ['did:3:kjzl6cwe1jw14b09psi5i38d8scg2yw5lmgpk7eaobbjuzc2nclt1fcjhp6ikfv']})
// tile.content
// window.did

import { mapActions, mapState } from 'vuex'

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
      setTimeout(() => {
        const text = window.did
        if (text) {
          this.login()
          this.askingAuth = false
          this.$router.push({ name: 'app' })
          return
        }
        this.checkAuth()
      }, 300)
    },
  },
}
</script>

<style>
.container {
  text-align: center;
}

.actions {
  margin: 50px 0 0;
}
</style>
