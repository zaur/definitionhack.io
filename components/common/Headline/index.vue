<template>
  <header :class='classes'>
    <div class='h-container wrapper'>
      <Logo :brand-color='logoColor' :text-color='logoColor' />
      <Navigation :color='logoColor' />
      <ui-button v-if='!isLoggedIn' :to='{ name: "login" }' outlined>Login</ui-button>
      <Burger />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '@/components/shared/Logo'
import Navigation from '@/components/common/Headline/Navigation'
import Burger from '@/components/common/Headline/Burger'

export default {
  name: 'Headline',

  components: {
    Logo,
    Navigation,
    Burger,
  },

  computed: {
    ...mapState('app', ['fixedHeader', 'invertedHeader', 'hiddenHeader', 'isLoggedIn']),

    logoColor () {
      if (!this.invertedHeader) { return undefined }
      return 'light'
    },

    classes () {
      return {
        fixed: this.fixedHeader,
        // hidden: this.hiddenHeader,
      }
    },
  },
}
</script>

<style lang='scss' scoped>
@import '~@/styles/system.scss';

header {
  position: absolute;
  z-index: 900;
  top: 0;
  right: 0;
  left: 0;
  transition: transform 0.25s;

  @include display-less(desktop) {
    margin: 0;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-double);
    height: var(--header-size);
  }

  &.fixed {
    position: fixed;
    background: clr(light, 0.9);
    box-shadow: 0 0 8px rgba(#000, .1);

    .wrapper {
      height: var(--header-size-collapsed);
    }
  }

  &.hidden {
    transform: translateY(-100%);
  }

  .logo {
    flex: 0 0 auto;
    margin: 0 var(--gap-double) 0 0;

    img {
      width: 160px;
      height: 35px;
      vertical-align: bottom;
    }
  }

  .ui-button {
    @include display-less(desktop) {
      margin-right: 80px;
    }

    @include display-less(smart) {
      display: none;
    }
  }
}
</style>
