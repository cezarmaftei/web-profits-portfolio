<template>
  <main class="page">
    <SectionPortfolio
      spacing="mb-15"
      type="ajax-filter"
      alignment="text-start"
      title="Lorem"
      subtitle="There's more Content Marketing - Digital Ads - Landing Pages - Websites - Videos projects for you to see."
    />

    <SectionClients
      spacing="pt-15"
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

export default {
  name: 'Portfolio',
  components: {
    SectionPortfolio,
    SectionClients,
    SectionCTA
  }
}
</script>

<style>
</style>