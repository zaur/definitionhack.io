<template>
  <ul>
    <li v-for='member in members' :key='member.id'>
      <ui-card
        :title='member.name'
        :tagline='member.position'
      >
        <div slot='media' class='photo'>
          <img
            v-if='member.photo'
            :src='member.photo'
            :alt='member.name'
          >
        </div>
        <div class='location'>
          {{ member.location }}
        </div>
        <template #footer>
          <div v-if='member.twitter' class='twitter'>
            <a class='twitter-link' :href='"https://twitter.com/" + member.twitter' target='_blank'>
              <img src='~/assets/icons/twitter_white.svg' alt=''>
              @{{ member.twitter }}
            </a>
          </div>
        </template>
      </ui-card>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Team',

  computed: {
    ...mapState('members', ['members']),
  },
};
</script>

<style lang='scss' scoped>
@import "~@/styles/system.scss";

ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-max);
  max-width: 980px;
  margin: 0 auto;
  text-align: center;

  @include display-less(desktop) {
    gap: var(--gap);
  }

  @include display-less(tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include display-less(smart) {
    grid-template-columns: 1fr;
  }
}

li {
  display: flex;
}

.photo {
  width: 200px;
  height: 200px;
  margin: 0 auto var(--gap-double);
  border-radius: 50%;
  background: clr(accent);
  text-align: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}

.actions {
  margin: 90px 0 0;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  img {
    width: 24px;
    height: 24px;
  }
}

.twitter {
  &-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    //color: #1d9bf0;
    color: inherit;
    text-decoration: none;
  }

  img {
    width: 16px;
    height: 16px;
  }
}
</style>
