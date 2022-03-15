<template>
  <section class="section-portfolio-item pt-6 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-7 order-last order-md-first">
          <transition name="graphic-slide" mode="out-in">
            <div v-if="transitionGraphic">
              <div
                class="embed"
                v-if="clientData.currentClient.asset_type[0] === 'Video'"
              >
                <div class="ratio ratio-16x9">
                  <iframe
                    :src="`https://www.youtube.com/embed/${youTubeId}?rel=0&modestbranding=1&autohide=1&showinfo=0&autoplay=1`"
                    title="YouTube video"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <LoadImage
                :lazy="false"
                v-else
                :src="
                  clientData.currentClient.gallery[0] !== ''
                    ? clientData.currentClient.gallery[0]
                    : clientData.currentClient.thumb[0]
                "
              />
            </div>
          </transition>

          <!-- preload prev image -->
          <LoadImage
            class="d-none"
            :lazy="false"
            v-if="clientData.prevClient.asset_type[0] !== 'Video'"
            :src="
              clientData.prevClient.gallery[0] !== ''
                ? clientData.prevClient.gallery[0]
                : clientData.prevClient.thumb[0]
            "
          />
          <!-- preload next image -->
          <LoadImage
            class="d-none"
            :lazy="false"
            v-if="clientData.nextClient.asset_type[0] !== 'Video'"
            :src="
              clientData.nextClient.gallery[0] !== ''
                ? clientData.nextClient.gallery[0]
                : clientData.nextClient.thumb[0]
            "
          />
        </div>
        <div
          class="
            col-12 col-md-5 col-lg-4
            ms-auto
            order-first order-md-last
            mb-5
          "
        >
          <div class="sticky-md-top">
            <div class="height-transition" id="client-name">
              <h1></h1>
            </div>
            <div class="height-transition" id="client-type">
              <h3></h3>
            </div>

            <div class="row client-meta my-6">
              <div class="col-6 col-lg-5 col-xl-4 col-xxl-3 client-type">
                <p class="mb-1">Business Type:</p>
                <div class="height-transition" id="client-business-type">
                  <h3></h3>
                </div>
              </div>
              <div class="col-6 col-lg-7 col-xl-8 col-xxl-9 client-type">
                <p class="mb-1">Industry:</p>
                <div class="height-transition" id="client-industry">
                  <h3></h3>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-xl-8 col-xxl-6">
                <transition name="button-hide" mode="out-in">
                  <div
                    v-if="
                      clientData.currentClient.url[0] &&
                      clientData.currentClient.asset_type.indexOf('Video') ===
                        -1
                    "
                  >
                    <a
                      :href="clientData.currentClient.url[0]"
                      target="_blank"
                      rel="nofollow noopener"
                      class="btn btn-block btn-secondary btn-arrow-down mb-6"
                      >Visit Project</a
                    >
                  </div>
                </transition>
                <div class="row project-nav">
                  <div class="col-6">
                    <router-link
                      :to="clientData.prevClient.slug[0]"
                      class="btn btn-prev d-flex align-items-center"
                      ><SvgIcons class="me-1" icon="icon-angle-left" /> Prev
                    </router-link>
                  </div>
                  <div class="col-6">
                    <router-link
                      :to="clientData.nextClient.slug[0]"
                      class="
                        btn btn-next
                        d-flex
                        align-items-center
                        flex-row-reverse
                      "
                      ><SvgIcons class="ms-1" icon="icon-angle-right" />
                      Next</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoadImage from '@/components/LoadImage.vue'
import SvgIcons from '@/components/SvgIcons.vue'

import {
  computed,
  inject,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  ref
} from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin.js'
gsap.registerPlugin(TextPlugin)

export default {
  name: 'SectionPortfolioItem',
  components: {
    LoadImage,
    SvgIcons
  },
  setup () {
    const route = useRoute()
    const clients = inject('clients')
    const filterItems = inject('filterItems')
    const oldSlug = ref(route.params.slug)
    const newSlug = ref(null)

    const clientData = computed(() => {
      const activeClients = []
      let activeClientIndex = 0
      let activeClientsCounter = 0

      // Get current list of clients base on selected filters
      clients.forEach((client, clientIndex) => {
        if (filterItems.value.length > 0) {
          const clientCats = client.asset_type.concat(
            client.asset_industry,
            client.asset_business_type
          )

          if (client.slug[0] === route.params.slug) {
            activeClientIndex = activeClientsCounter
          }

          // Check if clientCats contains filterItems.value
          if (filterItems.value.every((elem) => clientCats.includes(elem))) {
            activeClients.push(client)
            activeClientsCounter++
          }
        } else {
          // the "ELSE" condition
          if (client.slug[0] === route.params.slug) {
            activeClientIndex = clientIndex
          }
          activeClientsCounter = clientIndex
          activeClients.push(client)
        }
      })

      // Drop activeClientsCounter by 1 to align its value with the one from the "ELSE" condition
      if (filterItems.value.length > 0) {
        activeClientsCounter--
      }

      const prevClientIndex =
        activeClientIndex > 0 ? activeClientIndex - 1 : activeClientsCounter
      const nextClientIndex =
        activeClientIndex < activeClientsCounter ? activeClientIndex + 1 : 0

      return {
        currentClient: activeClients[activeClientIndex],
        prevClient: activeClients[prevClientIndex],
        nextClient: activeClients[nextClientIndex]
      }
    })

    const getYoutubeId = (url) => {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[7].length === 11 ? match[7] : false
    }

    const youTubeId = ref(getYoutubeId(clientData.value.currentClient.url[0]))

    const updateTextValue = (text, elementId) => {
      const element = document.getElementById(elementId)
      element.style.height = `${element.clientHeight}px`
      const textElement = document.querySelector(`#${elementId} > *`)
      gsap.to(`#${elementId} > *`, {
        duration: text.length * 0.05,
        text: text,
        ease: 'linear',
        onUpdate: () => {
          const elementHeight = element.clientHeight
          const textElementHeight = textElement.clientHeight
          if (elementHeight !== textElementHeight) {
            element.style.height = `${textElementHeight + 10}px`
          }
        }
      })
    }

    const textElements = {
      'client-name': 'client_name',
      'client-type': 'type',
      'client-business-type': 'asset_business_type',
      'client-industry': 'asset_industry'
    }

    const updateDynamicText = (elements = textElements) => {
      for (const elementId in elements) {
        updateTextValue(
          clientData.value.currentClient[elements[elementId]][0],
          elementId
        )
      }
    }

    const transitionGraphic = ref(false)

    onBeforeUpdate(() => {
      newSlug.value = clientData.value.currentClient.slug[0]
      if (oldSlug.value === newSlug.value) {
        transitionGraphic.value = true
      } else {
        transitionGraphic.value = false
      }
    })

    onUpdated(() => {
      // Reset video ID
      if (
        clientData.value.currentClient.url[0].indexOf(youTubeId.value) === -1
      ) {
        youTubeId.value = getYoutubeId(clientData.value.currentClient.url[0])
      }

      if (oldSlug.value !== newSlug.value) oldSlug.value = newSlug.value

      transitionGraphic.value = true
      updateDynamicText()
    })

    onMounted(() => {
      updateDynamicText()
      transitionGraphic.value = true
    })

    return {
      oldSlug,
      clientData,
      youTubeId,
      transitionGraphic
    }
  }
}
</script>

<style scoped lang="scss">
.graphic-slide-enter-to,
.graphic-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.graphic-slide-enter-from,
.graphic-slide-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.graphic-slide-enter-active,
.graphic-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.75, 0.25, 0.13, 0.92);
}

.button-hide-enter-to,
.button-hide-leave-from {
  opacity: 1;
  max-height: 100px;
}

.button-hide-enter-from,
.button-hide-leave-to {
  opacity: 0;
  max-height: 0;
}

.button-hide-enter-active,
.button-hide-leave-active {
  overflow: hidden;
  transition: all 0.25s linear;
}

.section-portfolio-item {
  h1 {
    @include font-size(6.4rem);
    line-height: 1.4;
  }

  h3,
  .h3 {
    @include font-size(3.2rem);
  }

  .client-meta {
    @include font-size(1.6rem);
    font-weight: $font-weight-medium;
    color: $gray-600;
  }

  .lazy-loading-image {
    ::v-deep img {
      width: 100%;
      height: auto;
    }
  }

  .embed {
    background: $black;
  }

  .height-transition {
    transition: height 0.25s linear;
    overflow: hidden;
  }
}
</style>