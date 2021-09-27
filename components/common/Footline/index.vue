<template>
  <footer>
    <div class="h-container wrapper">
      <Contact />
      <a href='https://definitionhack.io/' target='_blank' class='hackathon'>
        <span>🏆🥇</span>
        <img src='~/assets/images/definitionhack-logo.svg' alt=''>
      </a>
    </div>
  </footer>
</template>

<script>
import Contact from '@/components/common/Footline/Contact'
// import Navigation from '@/components/common/Footline/Navigation'

export default {
  name: 'Footline',

  components: {
    // Navigation,
    Contact,
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/system.scss";

footer {
  flex: 0 0 auto;
  padding: var(--gap-double) 0;
  background: clr(accent);
  color: clr(text);
  font-size: var(--font-size-tiny);

  @include display-less(desktop) {
    margin-top: var(--gap-max);
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 94px;
}

.hackathon {
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;

  span {
    margin: 0 8px 0 0;
    color: clr(primary);
    font-size: 46px;
    line-height: 1;
  }

  img {
    width: 200px;
    vertical-align: bottom;
  }
}
</style>
