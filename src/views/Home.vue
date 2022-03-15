<template>
  <main class="page">
    <SectionPortfolio
      spacing="pb-15"
      type="featured"
      alignment="text-center"
      title="Selected Works"
      subtitle="A selection of works we have done for leading <br />Australian businesses."
    />
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
// @ is an alias to /src
import SectionPortfolio from '@/components/SectionPortfolio.vue'
import SectionClients from '@/components/SectionClients.vue'
import SectionCTA from '@/components/SectionCTA.vue'
import { inject } from 'vue'

export default {
  name: 'Home',
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