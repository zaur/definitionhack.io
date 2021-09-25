<template>
  <nav>
    <div class='nav' :class='{ "nav--light": color === "light" }'>
      <ul v-if='menu' ref='list'>
        <li
          v-for='(link, index) in menu'
          :key="index"
          @mouseover='handleHover'
          @mouseleave='handleHover()'
        >
          <NuxtLink
            v-if='link.to'
            :to="link.to"
            :class="{ active: link.active }"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-if='link.href'
            :href="link.href"
            target='_blank'
            rel='noopener'
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
      <div v-if='underline' class='underline' :style='underline' />
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeadlineNavigation',

  props: {
    color: { type: String, default: 'text' }
  },

  data: () => ({
    links: [
      {
        label: 'Home',
        to: { name: 'index' }
      },
      {
        label: 'App',
        to: { name: 'app' }
      },
      {
        label: 'Team',
        to: { name: 'team' }
      },
    ],
    underline: true,
  }),

  computed: {
    menu () {
      return this.links.map(link => {
        if (link.href) { return link }
        return {
          ...link,
          label: link.label,
          active: this.$route.name?.startsWith(link.to.name)
        }
      }).filter(Boolean)
    },
  },

  mounted () {
    this.handleHover()
  },

  methods: {
    handleHover(event) {
      if (!this.menu) { return }
      if (!event) {
        const nodes = Array.from(this.$refs.list?.childNodes)
        if (!nodes?.length) { return }
        const activeItem = nodes.find(li => {
          const classes = Array.from(li.firstChild?.classList)
          if (!classes?.length) { return false }
          return classes?.includes('active')
        })
        this.underline = {
          left: !activeItem?.offsetLeft ? 0 : activeItem?.offsetLeft + 'px',
          width: !activeItem?.offsetWidth ? 0 : activeItem?.offsetWidth + 'px',
        }
        return
      }
      this.underline = {
        left: event?.target?.offsetLeft + 'px',
        width: event?.target?.offsetWidth + 'px',
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/system.scss";

nav {
  flex: 0 0 auto;
  font-size: var(--font-size-small);
  font-weight: 400;

  @include display-less(desktop) {
    overflow: hidden;
    position: fixed;
    z-index: 90;
    top: 0;
    right: 0;
    left: 0;
    height: 0;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: clr(secondary);
      opacity: 0.95;
      transform: translateY(-50%) scaleY(0);
      transition: transform 0.25s ease-in-out;
    }

    .page-nav-open & {
      height: 100vh;

      &::before {
        transform: translateY(0) scaleY(1);
      }
    }
  }
}

.nav {
  position: relative;
}

ul {
  display: flex;
  align-items: center;

  @include display-less(desktop) {
    display: block;
    position: relative;
    padding: 80px 0 0;
    text-align: center;
    opacity: 0;
    transition: opacity 0.25s 0.25s;

    .page-nav-open & {
      opacity: 1;
    }
  }
}

a {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 56px;
  margin: 0;
  padding: 0 var(--gap);
  border-radius: 12px;
  color: clr(text);
  text-decoration: none;
  transition: background-color .25s;

  .nav--light & {
    color: clr(light);
  }

  &.active,
  &.nuxt-link-exact-active {
    color: clr(primary);

    .nav--light & {
      color: clr(light);
    }
  }

  @include display-less(desktop) {
    padding: 0 var(--gap);
    border-radius: 12px;
  }
}

$moving: cubic-bezier(0.6, 0.6, 0.4, 1.4);

.underline {
  position: absolute;
  bottom: 0;
  height: 4px;
  border-radius: 2px;
  background: clr(primary);
  pointer-events: none;
  transition:
    left 0.25s $moving,
    width 0.25s $moving;
  will-change: left, width;

  .nav--light & {
    background: clr(light);
  }

  @include display-less(desktop) {
    display: none;
  }
}
</style>
