<template>
  <main v-if='content' class='h-section'>
    <div class='h-container'>
      <h1>{{ content.title }}</h1>
      <div v-html='content.content' />
    </div>
  </main>
</template>

<script>
import pages from '@/mixins/pages'

export default {
  name: 'AboutPage',

  mixins: [pages],
}
</script>
