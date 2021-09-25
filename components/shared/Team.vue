<template>
  <ul>
    <li v-for='member in members' :key='member.id'>
      <ui-card
        :title='member.name'
        :tagline='member.position'
      >
        <div slot='media' class='photo'>
          <img
            v-if='member.photo && member.photo.url'
            :src='null'
            :alt='member.name'
          >
        </div>
        <span slot='footer' class='location'>
          {{ member.location }}
        </span>
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
  gap: 50px;
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
}

li {
  display: flex;
}

.photo {
  width: 134px;
  height: 134px;
  margin: 0 auto 30px;
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
</style>
