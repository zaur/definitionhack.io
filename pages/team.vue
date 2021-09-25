<template>
  <main class='h-section'>
    <div v-if='content' class='h-container'>
      <h1>{{ content.title }}</h1>
      <div v-html='content.content' />
      <Team />
    </div>
  </main>
</template>

<script>
import Team from '@/components/shared/Team'
import pages from '@/mixins/pages'

export default {
  name: 'TeamPage',

  components: {
    Team,
  },

  mixins: [pages],
}
</script>

<style lang='scss' scoped>
h1 {
  margin: 0 0 50px;
  text-align: center;
}
</style>
