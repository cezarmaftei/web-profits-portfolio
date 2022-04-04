<template>
  <div
    v-if="!loggedIn"
    class="
      wrapper-log-in
      d-flex
      flex-column
      justify-content-center
      align-items-center
    "
  >
    <SvgIcons icon="logo-webprofits-portfolio" class="login-icon-logo mb-5" />
    <form>
      <input
        type="password"
        name="login-password"
        placeholder="Enter password"
        autocomplete="off"
        @keyup="handleLogin"
      />
    </form>
  </div>

  <div v-else class="page-outer">
    <PageHeader />

    <div :class="wrapperOverflow">
      <!-- page content via router -->
      <router-view v-slot="{ Component, route }">
        <transition
          :name="route.meta.transition || 'route-fade'"
          :mode="route.meta.mode || 'out-in'"
        >
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { provide, reactive, ref, watch } from 'vue'

// @ is an alias to /src
import PageHeader from '@/components/PageHeader.vue'
import SvgIcons from '@/components/SvgIcons.vue'

export default {
  name: 'App',
  setup () {
    // Header extra classes - used for cusotm styling, like colors
    const headerClasses = ref(null)
    provide('headerClasses', headerClasses)

    // Portfolio data
    const portfolioData = require('./data/portfolioData.json')
    const portfolioClients = reactive(portfolioData.clients)
    const portfolioMenu = reactive(portfolioData.menu)
    const wrapperOverflow = ref('overflow-hidden')
    const filterMenuSpacing = ref('mb-5')
    provide('clients', portfolioClients)
    provide('menu', portfolioMenu)
    provide('wrapperOverflow', wrapperOverflow)
    provide('filterMenuSpacing', filterMenuSpacing)

    // Social media data
    const socialMedia = {
      0: {
        name: 'Facebook',
        icon: 'logo-facebook',
        link: 'https://www.facebook.com/Webprofits/'
      },
      1: {
        name: 'Twitter',
        icon: 'logo-twitter',
        link: 'https://twitter.com/webprofits'
      },
      2: {
        name: 'LinkedIn',
        icon: 'logo-linkedin',
        link: 'https://www.linkedin.com/company/webprofits/'
      },
      3: {
        name: 'Instagram',
        icon: 'logo-instagram',
        link: 'https://www.instagram.com/webprofits/'
      },
      4: {
        name: 'YouTube',
        icon: 'logo-youtube',
        link: 'https://www.youtube.com/webprofitsau'
      }
    }
    provide('socialMedia', socialMedia)

    // Filter data
    const filterItems = ref([])
    provide('filterItems', filterItems)

    // Watch for changes in the menu items
    watch(portfolioMenu, (newValue) => {
      for (const parentCat in newValue) {
        for (const childCat in newValue[parentCat]) {
          // Get the new toggled cat
          if (
            newValue[parentCat][childCat] &&
            !filterItems.value.includes(childCat)
          ) {
            filterItems.value.push(childCat)
          } else if (
            !newValue[parentCat][childCat] &&
            filterItems.value.includes(childCat)
          ) {
            const index = filterItems.value.indexOf(childCat)
            if (index !== -1) {
              filterItems.value.splice(index, 1)
            }
          }
        }
      }
    })

    //
    // Set a cookie
    const setCookie = (cname, cvalue, exdays) => {
      const d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      const expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    }

    //
    // Get a cookie
    const getCookie = (cname) => {
      const name = cname + '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    }

    const loggedIn = ref(false)
    if (getCookie('loggedIn') === '7bqx3d5qxbfqit') {
      loggedIn.value = true
    }

    const handleLogin = (event) => {
      if (event.target.value === 'webprofits') {
        setCookie('loggedIn', '7bqx3d5qxbfqit', 10)
        loggedIn.value = true
      }
    }

    return {
      wrapperOverflow,
      handleLogin,
      loggedIn
    }
  },
  components: {
    PageHeader,
    SvgIcons
  }
}
</script>

<style scoped lang="scss">
.wrapper-log-in {
  background: $gray-100;
  width: 100%;
  min-height: 100vh;

  input {
    border: 2px solid $black;
    background: $white;
    width: 100%;
    max-width: 300px;
    padding: 10px 30px;
  }
}

.login-icon-logo {
  display: block;
  max-width: 250px;
}

.route-slide-enter-from {
  opacity: 1;
  transform: translateX(200px);
}

.route-slide-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.route-slide-enter-active,
.route-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.75, 0.25, 0.13, 0.92);
  overflow: hidden;
}

.route-fade-enter-from {
  opacity: 1;
}

.route-slide-leave-to {
  opacity: 0;
}

.route-fade-enter-active,
.route-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.75, 0.25, 0.13, 0.92);
}
</style>