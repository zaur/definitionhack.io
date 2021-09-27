<template>
  <div v-if='content' class="contact">
    <Logo />

    <div v-if='content.content' class='text' v-html='$md.render(content.content)' />

    <ul>
      <li v-if='email'>
        <a :href='`mailto:${email}`' target='_blank'>{{ email }}</a>
      </li>
      <li v-if='phone'>
        <a :href='`tel:${phone}`'>{{ phone }}</a>
      </li>
      <li v-if='address' v-html='address' />
    </ul>
  </div>
</template>

<script>
import Logo from '@/components/shared/Logo'

export default {
  name: 'FootlineContact',

  components: {
    Logo,
  },

  data: () => ({
    content: {},
  }),

  computed: {
    email () {
      return this.content?.data?.email
    },

    phone () {
      return this.content?.data?.phone
    },

    address () {
      return this.content?.data?.address
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/system.scss";

.contact {
  width: 320px;
  font-size: var(--font-size-tiny);
  line-height: 1.4;
}

//.logo {
//  margin: 0 0 var(--gap-double);
//}

.text {
  color: clr(text-secondary);
}

ul {
  margin: 0;
  color: clr(text-secondary);
}

li {
  margin: var(--gap-half) 0 0;
}

a {
  color: inherit;

  &:hover {
    color: clr(primary);
  }
}
</style>
