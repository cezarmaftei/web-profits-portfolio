<template>
  <main class="page">
    <SectionPortfolioItem />
    <SectionClients
      spacing="pt-15"
      alignment="text-start"
      title="Our <br>Clients"
      subtitle="Some of the businesses we've helped drive rapid growth."
    />
    <SectionPortfolio
      spacing="my-15"
      type="ajax-load"
      alignment="text-start"
      title="More..."
      subtitle="There's more Content Marketing - Digital Ads - Landing Pages - Websites - Videos projects for you to see."
    />
    <SectionCTA />
  </main>
</template>

<script>
import SectionPortfolioItem from '@/components/SectionPortfolioItem.vue'
import SectionClients from '@/components/SectionClients.vue'
import SectionPortfolio from '@/components/SectionPortfolio.vue'
import SectionCTA from '@/components/SectionCTA.vue'

export default {
  name: 'PortfolioItem',
  components: {
    SectionPortfolioItem,
    SectionClients,
    SectionPortfolio,
    SectionCTA
  }
}
</script>