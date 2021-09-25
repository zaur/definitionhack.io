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
          <div>
            <img id="logo" src="images/web-playground-logo.svg" alt="web playground logo" />
          </div>
          <h1>Ceramic Web Playground</h1>
          <p>
            Test the full stack of
            <a href="https://ceramic.network" target="_blank">Ceramic Network</a> components in a web
            browser.
          </p>
        </header>
        <main class="container center">
          <div class="row">
            <div class="col-xs-12 space-around">
              <div id="activate_ceramic" class="btn btn-default ceramic-btn">Ceramic Docs</div>
              <div id="activate_idx" class="btn btn-default idx-btn">IDX Docs</div>
            </div>
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
          <div id="techologies">
            <h3>Technologies</h3>
            <ul>
              <li>
                <a
                  href="https://developers.ceramic.network/reference/javascript/clients/#http-client"
                  target="_blank"
                >Ceramic HTTP Client</a
                >: Provides access to the Ceramic Network via a remote node running Ceramic (and
                IPFS).
              </li>
              <li>
                <a
                  href="https://developers.ceramic.network/build/authentication/#did-provider-or-wallet"
                  target="_blank"
                >3ID Connect</a
                >: Provides authentication to a DID (used by Ceramic) from a blockchain wallet, and
                stores a link from this blockchain account to your DID in IDX.
              </li>
              <li>
                <a href="https://idx.xyz" target="_blank">IDX</a>: Provides a way to create identity
                records for a DID. Records are stored on Ceramic and can represent links to blockchain
                accounts or other user data.
              </li>
            </ul>
          </div>
          <div id="instructions" class="hide">
            <h3>Usage</h3>
            <ol>
              <li>Open your console by inspecting the page</li>
              <li>Authenticate by clicking "Connect wallet"</li>
              <li>Approve prompts in your Web3 wallet</li>
              <li>Wait to see "Connected with DID" in your console</li>
              <li>
                <a href="https://developers.ceramic.network/build/writes/" target="_blank">Write</a>
                and
                <a href="https://developers.ceramic.network/build/queries/" target="_blank">read</a>
                documents on the Ceramic Network from the console using the referenced API methods
              </li>
              <li>
                <a href="https://developers.idx.xyz/build/writing/" target="_blank">Write</a> and
                <a href="https://developers.idx.xyz/build/reading/" target="_blank">read</a> records
                on IDX from the console using the referenced API methods
              </li>
            </ol>
          </div>
        </main>
        <button
          id="bauth"
          type="button"
          class="btn btn-primary center"
          style="display: inherit; margin: 20px auto"
        >
          <div id="loader" class="loader hide"/>
          Connect wallet
        </button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'LoginPage',

  head: {
    script: [
      { src: '/ceramic/app.js', body: true },
    ],
  },
}
</script>

<style>
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
ul {
  padding-left: 20px;
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
