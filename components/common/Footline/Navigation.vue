<template>
  <nav>
    <section v-for='(set, menuIndex) in navs' :key='menuIndex'>
      <h3>{{ set.legend }}</h3>
      <ul>
        <li v-for='(link, linkIndex) in set' :key='linkIndex'>
          <NuxtLink v-if='link.to' :to="link.to" :class="{ active: link.active }">
            {{ link.label }}
          </NuxtLink>
          <a v-if='link.href' :href="link.href" target='_blank' rel='noopener'>
            {{ link.label }}
          </a>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script>
export default {
  name: 'FootlineNavigation',

  props: {
    content: { type: Object, default: null }
  },

  data: () => ({
    nav: [
      {
        legend: 'Company',
        links: [
          {
            label: 'About Us',
            to: { name: 'about' }
          },
          {
            label: 'Team',
            to: { name: 'team' }
          },
        ],
      },
      {
        legend: 'Links',
        links: [
          {
            label: 'Privacy Policy',
            to: { name: 'about' }
          },
          {
            label: 'Terms of Service',
            to: { name: 'about' }
          },
        ],
      },
      {
        legend: 'Social',
        links: [
          {
            label: 'Twitter',
            href: 'https://twitter.com/'
          },
          {
            label: 'Facebook',
            href: 'https://facebook.com/'
          },
        ],
      },
    ],
  }),

  computed: {
    navs () {
      return this.nav.map(menu => {
        return {
          ...menu.links.map(link => {
            if (link.href) { return link }
            return {
              ...link,
              label: link.label,
              active: this.$route.name?.startsWith(link.to.name)
            }
          }).filter(Boolean),
          legend: menu.legend,
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/system.scss";

nav {
  flex: 0 1 480px;
  display: flex;
  align-items: self-start;
  justify-content: space-between;
  gap: var(--gap-triple);
  font-size: var(--font-size-small);
  line-height: 1.4;
}

h3 {
  @include title(base, 500, base);

  margin: 0 0 var(--gap-double);
}

ul {
  margin: 0;
  color: clr(text-secondary);
}

li {
  margin: 24px 0 0;
}

a {
  color: inherit;
  text-decoration: none;

  &:hover {
    color: clr(primary);
    text-decoration: underline;
  }
}
</style>
