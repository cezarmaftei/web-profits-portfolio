<template>
  <section class="section section-portfolio">
    <div class="container container-heading" :class="alignment">
      <div class="row">
        <div class="col-12">
          <h2 v-html="title"></h2>
          <p v-html="subtitle"></p>
        </div>
      </div>
    </div>
    <div class="container overflow-hidden mt-8">
      <div class="row gx-3 gy-6">
        <TransitionGroup name="bounce">
          <div
            v-for="client in componentClients"
            :key="client"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            v-show="showClient(client)"
          >
            <CardPortfolio :client="client" />
          </div>
        </TransitionGroup>
        <div v-if="type === 'ajax-load'" class="col-12 text-center">
          <button
            v-show="!allLoaded"
            class="btn btn-outline-secondary"
            @click="loadMore"
          >
            Load more...
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { inject, ref } from 'vue'
import CardPortfolio from '@/components/CardPortfolio.vue'

export default {
  name: 'SectionPortfolio',
  components: {
    CardPortfolio
  },
  props: {
    type: String,
    alignment: String,
    title: String,
    subtitle: String
  },
  setup (props) {
    const clients = inject('clients')

    // Returns the actual list of clients that need to be displayed
    const componentClients = ref(null)

    // Number of items per load/page
    const clientsPerPage = 12

    // When all are loaded hide 'Load more...' button
    const allLoaded = ref(false)

    if (props.type === 'featured') {
      componentClients.value = clients.filter((client) => client.featured)
    } else if (props.type === 'ajax-load') {
      componentClients.value = clients.filter(
        (client, index) => index < clientsPerPage
      )
    } else if (props.type === 'ajax-filter') {
      componentClients.value = clients
    }

    const loadMore = () => {
      const newClients = clients.filter(
        (client, index) =>
          index > componentClients.value.length - 1 &&
          index < componentClients.value.length + clientsPerPage
      )

      newClients.forEach((element) => {
        componentClients.value.push(element)
      })

      if (componentClients.value.length === clients.length) {
        allLoaded.value = true
      }
    }

    const filterItems = inject('filterItems')
    // Show/hide the client based on menu filters
    const showClient = (client) => {
      let show = true
      if (props.type === 'ajax-filter' && filterItems.value.length > 0) {
        show = false
        const clientCats = client.asset_type.concat(
          client.asset_industry,
          client.asset_business_type
        )
        // Check if clientCats contains filterItems.value
        if (filterItems.value.every((elem) => clientCats.includes(elem))) {
          show = true
        }
      }

      return show
    }

    return {
      loadMore,
      showClient,
      allLoaded,
      componentClients
    }
  }
}
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>