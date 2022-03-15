<template>
  <SectionVideoShowreel v-if="$route.name === 'Home Page'" />

  <header class="site-header" id="site-header" :class="headerClasses">
    <nav
      class="navbar container d-flex align-items-center justify-content-center"
    >
      <router-link to="/" class="navbar-brand d-block me-lg-auto"
        ><SvgIcons icon="logo-webprofits-portfolio"
      /></router-link>

      <button
        class="navbar-toggler d-lg-none ms-auto"
        type="button"
        @click="toggleMobileMenu"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>

      <div
        class="collapse main-menu-collapse d-lg-block"
        id="main-menu-collapse"
      >
        <div class="main-menu-container overflow-auto">
          <div
            class="
              main-menu-inner
              d-flex
              flex-column flex-lg-row
              align-items-center
              justify-content-center
            "
          >
            <div class="mobile-header container d-flex d-lg-none mb-auto">
              <router-link to="/" class="navbar-brand d-block"
                ><SvgIcons icon="logo-webprofits-portfolio"
              /></router-link>

              <button
                class="navbar-toggler open ms-auto"
                type="button"
                @click="toggleMobileMenu"
              >
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
              </button>
            </div>

            <div class="accordion main-menu" id="mainMenuAccordion">
              <div
                v-for="(menuItems, menuCat) in menu"
                :key="menuCat"
                class="accordion-item"
              >
                <div class="accordion-header" :id="`heading_${menuCat}`">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapse_${menuCat}`"
                    aria-expanded="false"
                    :aria-controls="`#collapse_${menuCat}`"
                  >
                    {{ menuCat.replaceAll("_", " ") }}
                  </button>
                </div>
                <div
                  :id="`collapse_${menuCat}`"
                  class="accordion-collapse collapse"
                  :aria-labelledby="`heading_${menuCat}`"
                  data-bs-parent="#mainMenuAccordion"
                >
                  <div class="accordion-body">
                    <ul
                      class="
                        list-unstyled
                        d-flex
                        flex-wrap
                        justify-content-center
                      "
                    >
                      <li v-for="(value, catName) in menuItems" :key="catName">
                        <router-link
                          class="filter-menu-link"
                          :to="{ path: '/portfolio' }"
                          :class="{
                            active: menuItems[catName],
                          }"
                          :disabled="isDisabled(catName)"
                          @click="handleActive(menuCat, catName, $event)"
                          >{{ catName }}</router-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="btn btn-primary d-lg-none"
              type="button"
              @click="toggleMobileMenu"
              :v-show="filterItems.length > 0"
            >
              View Results
            </button>

            <router-link
              :to="{ path: '/contact' }"
              class="btn btn-outline-secondary d-lg-none mt-10"
              @click="closeMobileCollapse"
              >Contact Us</router-link
            >

            <ul
              class="
                list-unstyled
                row
                gx-1
                mt-3
                align-items-center
                d-lg-none
                mt-auto
              "
            >
              <li v-for="social in socialMedia" :key="social" class="col-auto">
                <a
                  target="_blank"
                  rel="nofollow noopener"
                  :href="social.link"
                  class="social-link d-block p-1"
                  :title="social.name"
                >
                  <SvgIcons :icon="social.icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <router-link
        :to="{ path: '/contact' }"
        class="btn btn-outline-secondary d-none d-lg-block ms-lg-auto"
        @click="closeMobileCollapse"
        >Contact Us</router-link
      >
    </nav>

    <div id="desktop-menu-filler"></div>

    <div v-if="filterItems.length > 0" class="container filter-menu-items">
      <div class="row align-items-center justify-content-center">
        <div class="col-auto" v-for="item in filterItems" :key="item">
          <div class="filter-item">
            {{ item }}
            <button @click="removeFilterItem(item)">x</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SectionVideoShowreel from '@/components/SectionVideoShowreel.vue'
import SvgIcons from '@/components/SvgIcons.vue'
import { inject, onMounted, ref } from 'vue'
import { Collapse } from 'bootstrap'

export default {
  name: 'PageHeader',
  components: {
    SectionVideoShowreel,
    SvgIcons
  },
  setup () {
    // Header classes
    const headerClasses = inject('headerClasses')

    // Social media data
    const socialMedia = inject('socialMedia')

    // Menu
    const menu = inject('menu')

    const siteHeaderCollapsed = ref(null)
    let mobileCollapse = null

    onMounted(() => {
      const mainMenuCollapseElement =
        document.getElementById('main-menu-collapse')

      // Main menu mobile collapse
      mobileCollapse = new Collapse(mainMenuCollapseElement, {
        toggle: false
      })

      mainMenuCollapseElement.addEventListener('show.bs.collapse', function () {
        siteHeaderCollapsed.value = true
      })

      mainMenuCollapseElement.addEventListener('hide.bs.collapse', function () {
        siteHeaderCollapsed.value = false
      })

      // Desktop menu filler on collapse
      const desktopFiller = document.getElementById('desktop-menu-filler')
      const menuCollapses = document.querySelectorAll('.accordion-collapse')
      menuCollapses.forEach((menuCollapse) => {
        menuCollapse.addEventListener('show.bs.collapse', () => {
          desktopFiller.style.height = `${menuCollapse.clientHeight}px`
        })

        // Wait 50ms to be sure that the .collapsing classes are up, then close the filler
        menuCollapse.addEventListener('hide.bs.collapse', () => {
          setTimeout(() => {
            if (
              document.querySelectorAll('.main-menu .collapsing').length === 1
            ) {
              desktopFiller.style.height = '0px'
            }
          }, 50)
        })
      })

      // Also set the filler height on window resize
      window.addEventListener('resize', () => {
        if (document.body.clientWidth > '992') {
          const activeAccordion = document.querySelector('.main-menu .show')
          if (activeAccordion) {
            desktopFiller.style.height = `${activeAccordion.clientHeight}px`
          }
        }
      })
    })

    const closeMobileCollapse = () => {
      if (document.body.clientWidth < '992') mobileCollapse.hide()
    }

    const toggleMobileMenu = () => {
      mobileCollapse.toggle(siteHeaderCollapsed)
    }

    const filterItems = inject('filterItems')
    const clients = inject('clients')

    // Check if current menu filter item is available for further filtering
    const isDisabled = (catName) => {
      // Add cuurent cat to filterItems and check if there are any clients that have all the categories
      const testItems = [...filterItems.value]
      testItems.push(catName)

      let disabled = true
      clients.forEach((client) => {
        const clientCats = client.asset_type.concat(
          client.asset_industry,
          client.asset_business_type
        )
        // Check if clientCats contains testItems
        if (testItems.every((elem) => clientCats.includes(elem))) {
          disabled = false
        }
      })
      return disabled
    }

    // Set menu filter item as active
    // This also adds it to the filterItems
    const handleActive = (menuCat, catName, $event) => {
      if ($event.target.getAttribute('disabled') === 'false') {
        menu[menuCat][catName] = true
      }
    }

    // Set menu filter item as inactive
    // This also removes it to the filterItems
    const removeFilterItem = (item) => {
      for (const parentCat in menu) {
        for (const childCat in menu[parentCat]) {
          if (item === childCat) {
            menu[parentCat][childCat] = false
          }
        }
      }
    }

    return {
      headerClasses,
      socialMedia,
      siteHeaderCollapsed,
      closeMobileCollapse,
      toggleMobileMenu,
      filterItems,
      isDisabled,
      handleActive,
      removeFilterItem,
      menu
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$site-header-padding-y: 5rem;
.site-header {
  @include padding($site-header-padding-y 0);
  position: relative;
}

.mobile-header {
  .navbar-toggler {
    .navbar-toggler-bar {
      background: $white;
    }
  }

  .navbar-brand {
    :deep svg {
      fill: $white;
    }
  }
}

.navbar {
  padding-right: $grid-gutter-width * 0.5;
  padding-left: $grid-gutter-width * 0.5;
}

.navbar-brand {
  flex: 0 0 50%;
  max-width: 400px;

  @include media-breakpoint-up(md) {
    flex: 0 0 25%;
  }

  @include media-breakpoint-up(xl) {
    flex: 0 0 30%;
  }

  :deep svg {
    fill: $black;
  }
}

.navbar-toggler {
  border: 0;
  background: none;
  height: 21px;
  @include rfs(5.8rem, width);
  padding: 15px;
  position: relative;

  .navbar-toggler-bar {
    display: block;
    width: 100%;
    height: 1px;
    background: $black;
    position: absolute;
    left: 0;
    top: 50%;
    transition: margin-top 0.15s 0.15s linear,
      transform 0.15s cubic-bezier(0.55, 0.055, 0.675, 0.19);

    &:first-child {
      margin-top: -6px;
    }

    &:last-child {
      margin-top: 6px;
    }

    @include media-breakpoint-up(sm) {
      &:first-child {
        margin-top: -8px;
      }

      &:last-child {
        margin-top: 8px;
      }
    }
  }

  &.open {
    .navbar-toggler-bar {
      transform: rotate(-45deg);
      transition: margin-top 0.15s linear,
        transform 0.15s 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);

      &:first-child,
      &:last-child {
        margin-top: 0;
        transform: rotate(45deg);
      }
    }
  }
}

.main-menu-collapse {
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  background: $black;
}

.main-menu-container {
  width: 100%;
  height: 100vh;
}

.main-menu-inner {
  @include padding-top($site-header-padding-y);
  @include padding-bottom($site-header-padding-y);
  padding-right: $grid-gutter-width * 0.5;
  padding-left: $grid-gutter-width * 0.5;
  min-height: 100vh;
}

.main-menu {
  width: 100%;

  .accordion-header {
    text-align: center;
  }

  .accordion-button {
    margin: 0;
    padding: 0;
    background: none;
    border: 0;
    color: $white;
    display: inline-block;
    position: relative;
    @include font-size(5rem);
    line-height: 1.2;
    @include padding($input-btn-padding-y 0);
    font-weight: $font-weight-medium;

    &:after {
      content: "";
      display: inline-block;
      margin-left: 1rem;
      width: 1.3rem;
      height: 1.3rem;
      background: escape-svg(
          url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 8"><path fill-rule="evenodd"  fill="#{$white}" d="M12.988,1.135 L6.499,7.987 L0.11,1.135 L1.92,0.6 L6.499,5.703 L11.907,0.6 L12.988,1.135 Z"/></svg>')
        )
        no-repeat center center / 100% auto;
    }
  }

  ul {
    margin: 0;

    li {
      @include font-size(2rem);
      font-weight: $font-weight-normal;
      margin: 1.5rem;
    }

    .filter-menu-link {
      border: 0;
      color: $black;
      background: $gray-100;
      display: block;
      border-radius: 3rem;
      padding: 1rem 2.5rem;

      &.active {
        background: $gray-500;
      }

      &[disabled="true"] {
        background: $gray-700;
      }
    }
  }
}

#desktop-menu-filler {
  height: 0;
  @include transition($transition-collapse);
}

@include media-breakpoint-up(lg) {
  .navbar {
    position: relative;
  }

  .accordion-collapse {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    display: block !important;
    visibility: hidden;
    background: $white;

    &.show,
    &.collapsing {
      visibility: visible;
    }
  }

  .main-menu-collapse {
    position: static;
    background: none;
    width: auto;
  }

  .main-menu-container {
    width: auto;
    height: auto;
  }

  .navbar {
    .btn {
      padding-right: 3.5rem;
      padding-left: 3.5rem;
    }
  }

  .main-menu-inner {
    margin: 0;
    padding: 0;
    min-height: 1px;
  }

  .main-menu {
    display: flex;

    .accordion-header {
      margin: 0;
    }

    .accordion-button {
      font-size: 1.6rem;
      color: $black;
      text-transform: uppercase;
      text-align: left;
      @include margin(0 2rem);

      &:after {
        content: "";
        display: inline-block;
        width: 1.3rem;
        height: 1.3rem;
        background-image: escape-svg(
          url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 8"><path fill-rule="evenodd"  fill="#{$black}" d="M12.988,1.135 L6.499,7.987 L0.11,1.135 L1.92,0.6 L6.499,5.703 L11.907,0.6 L12.988,1.135 Z"/></svg>')
        );
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  .main-menu {
    .accordion-button {
      font-size: 2rem;
    }
  }
}

@include media-breakpoint-up(xxl) {
  .navbar {
    .btn {
      @include padding-right($btn-padding-x);
      @include padding-left($btn-padding-x);
    }
  }
}

.social-link {
  :deep {
    .svg-icon {
      height: 2rem;
      fill: $white;
      @include transition($transition-base);

      svg {
        width: auto;
        height: 100%;
      }
    }
  }

  &:hover {
    :deep {
      .svg-icon {
        transform: scale(1.2);
        fill: $primary;
      }
    }
  }
}
</style>