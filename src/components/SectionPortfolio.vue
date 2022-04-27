<template>
  <section class="section section-portfolio">
    <div class="container container-heading" :class="alignment">
      <div class="row">
        <div class="col-12">
          <h2 v-html="title"></h2>
          <p v-if="subtitle" v-html="subtitle"></p>
          <p v-if="thePageSubtitle()" v-html="thePageSubtitle()"></p>
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

    const URLparameters = inject('URLparameters')
    const thePageSubtitle = () => {
      let pageSubtitle = false
      if (props.type === 'ajax-filter') {
        if (Object.keys(URLparameters.value).length !== 0) {
          pageSubtitle = 'A selection of '

          if (
            URLparameters.value.type_of_asset &&
            URLparameters.value.type_of_asset.length !== 0
          ) {
            URLparameters.value.type_of_asset.forEach((asset, assetIndex) => {
              // Add an 's' at the end if it doesn't already have one
              const assetValue = asset.toLowerCase()
              if (asset.slice(-1) !== 's') {
                pageSubtitle += ` ${assetValue}s`
              } else {
                pageSubtitle += ` ${assetValue}`
              }

              // Add ', ' if not the last element
              if (assetIndex < URLparameters.value.type_of_asset.length - 1) {
                pageSubtitle += ', '
              }
            })
          } else {
            pageSubtitle += ' work'
          }

          pageSubtitle += ' we have done for '

          if (
            URLparameters.value.business_type &&
            URLparameters.value.business_type.length !== 0
          ) {
            pageSubtitle += URLparameters.value.business_type.join(' and ')
            pageSubtitle += ' businesses'
          } else {
            pageSubtitle += ' leading Australian businesses'
          }

          if (
            URLparameters.value.industry &&
            URLparameters.value.industry.length !== 0
          ) {
            pageSubtitle += ' in '
            pageSubtitle += URLparameters.value.industry.join(' and ')

            if (URLparameters.value.industry.length > 1) {
              pageSubtitle += ' industries.'
            } else {
              pageSubtitle += ' industry.'
            }
          } else {
            pageSubtitle += '.'
          }
        } else {
          pageSubtitle =
            'A selection of works we have done for leading Australian businesses.'
        }
      }

      return pageSubtitle
    }

    return {
      thePageSubtitle,
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