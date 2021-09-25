<template>
  <main v-if='content' class='h-section'>
    <div class='h-container'>
      <h1>{{ content.title }}</h1>
      <div v-html='content.content' />
      <Drawer />
    </div>
  </main>
</template>

<script>
import Drawer from '@/components/shared/Drawer'
import pages from '@/mixins/pages'

export default {
  name: 'AppPage',

  components: {
    Drawer,
  },

  mixins: [pages],
}
</script>
