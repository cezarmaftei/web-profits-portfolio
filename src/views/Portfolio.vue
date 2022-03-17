<template>
  <main class="page overflow-hidden">
    <SectionPortfolio
      class="mb-15 pt-2"
      type="ajax-filter"
      alignment="text-start"
      title="Lorem"
      subtitle="There's more Content Marketing - Digital Ads - Landing Pages - Websites - Videos projects for you to see."
    />

    <SectionClients
      class="pt-15"
      alignment="text-start"
      title="Our <br>Clients"
      subtitle="Some of the businesses we've helped drive rapid growth."
    />
    <SectionCTA />
  </main>
</template>

<script>
import SectionPortfolio from '@/components/SectionPortfolio.vue'
import SectionClients from '@/components/SectionClients.vue'
import SectionCTA from '@/components/SectionCTA.vue'
import { inject } from 'vue'

export default {
  name: 'Portfolio',
  components: {
    SectionPortfolio,
    SectionClients,
    SectionCTA
  },
  setup () {
    const headerClasses = inject('headerClasses')
    headerClasses.value = ''
  }
}
</script>

<style>
</style>