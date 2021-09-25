import { mapGetters } from 'vuex'
import getMeta from '@/libs/meta'

export default {
  head () {
    return getMeta(
      this.content?.title,
      this.content?.description,
      this.content?.poster,
    )
  },

  computed: {
    ...mapGetters('pages', ['getPageBySlug']),

    content () {
      return this.getPageBySlug(this.$route.name || 'index')
    },
  },

}
