<template>
  <SectionVideoShowreel v-if="$route.name === 'Home Page'" />

  <header class="site-header" id="site-header" :class="headerClasses">
    <nav
      class="
        navbar
        container
        d-flex
        flex-wrap
        align-items-center
        justify-content-center
      "
    >
      <router-link
        :to="{
          path: '/',
        }"
        class="navbar-brand d-block me-lg-auto order-lg-1"
        ><SvgIcons icon="logo-webprofits-portfolio"
      /></router-link>

      <a
        class="btn btn-outline-secondary ms-auto order-lg-3"
        href="https://www.webprofits.com.au/contact.html"
        target="_blank"
        rel="noopener nofollow"
        >Contact Us</a
      >

      <div class="main-menu-collapse order-lg-2" id="main-menu-collapse">
        <div class="main-menu-container overflow-auto">
          <div class="main-menu-inner">
            <div
              class="accordion main-menu d-flex justify-content-center"
              id="mainMenuAccordion"
            >
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
                    <ul class="list-unstyled d-flex flex-wrap py-2 px-4">
                      <li v-for="(value, catName) in menuItems" :key="catName">
                        <button
                          class="filter-menu-link"
                          :class="{
                            active: menuItems[catName],
                          }"
                          :disabled="isDisabled(catName)"
                          @click="handleActive(menuCat, catName, $event)"
                        >
                          {{ catName }}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div id="desktop-menu-filler" class="desktop-menu-filler"></div>

    <div class="filter-menu-items" v-show="filterItems.length > 0">
      <div class="container py-1">
        <div class="row align-items-center">
          <div class="col-auto" v-for="item in filterItems" :key="item">
            <div class="filter-item">
              <span>
                {{ item }}
              </span>
              <button @click="removeFilterItem(item)">
                <SvgIcons icon="shape-x" />
              </button>
            </div>
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
        // if (document.body.clientWidth > '992') {
        const activeAccordion = document.querySelector('.main-menu .show')
        if (activeAccordion) {
          desktopFiller.style.height = `${activeAccordion.clientHeight}px`
        }
        // }
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
      // Add curent cat to filterItems and check if there are any clients that have all the categories
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
      if (!$event.target.getAttribute('disabled')) {
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
  @include padding($site-header-padding-y 0 0);
  position: relative;
}

.navbar {
  position: relative;
  padding-right: $grid-gutter-width * 0.5;
  padding-left: $grid-gutter-width * 0.5;

  .btn {
    @include media-breakpoint-between(xs, md) {
      @include padding(0.6rem 2rem);
      font-size: 1.4rem;
      border-width: 1px;
    }
  }
}

.navbar-brand {
  flex: 0 0 50%;
  max-width: 400px;

  @include media-breakpoint-up(lg) {
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
  width: 100%;
}

.main-menu-inner {
  padding-top: 1.5rem;
  @include padding-bottom($site-header-padding-y);

  @include media-breakpoint-up(sm) {
    @include padding-top($site-header-padding-y);
  }
}

.main-menu {
  width: 100%;

  .accordion-header {
    text-align: center;
  }

  .accordion-button {
    margin: 0 0.5rem;
    @include padding($input-btn-padding-y 0);
    padding: 0;
    background: none;
    border: 0;
    color: $black;
    text-transform: capitalize;
    text-align: left;
    display: inline-block;
    position: relative;
    font-size: 1.4rem;
    line-height: 1.2;

    font-weight: $font-weight-medium;

    &:after {
      content: "";
      display: inline-block;
      margin-left: 0.3rem;
      width: 0.7rem;
      height: 0.7rem;
      background: escape-svg(
          url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 8"><path fill-rule="evenodd"  fill="#{$primary}" d="M12.988,1.135 L6.499,7.987 L0.11,1.135 L1.92,0.6 L6.499,5.703 L11.907,0.6 L12.988,1.135 Z"/></svg>')
        )
        no-repeat center center / 100% auto;
    }

    &[aria-expanded="true"] {
      &:after {
        background-image: escape-svg(
          url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 8"><path fill-rule="evenodd"  fill="#{$secondary}" d="M12.988,1.135 L6.499,7.987 L0.11,1.135 L1.92,0.6 L6.499,5.703 L11.907,0.6 L12.988,1.135 Z"/></svg>')
        );
      }
    }
  }

  ul {
    margin: 0;
    justify-content: center;

    li {
      font-size: 1.4rem;
      font-weight: $font-weight-medium;
      margin: 0.4rem 0.3rem;
    }

    .filter-menu-link {
      position: relative;
      color: $gray-600;
      background: transparent;
      border: 0;
      display: block;
      padding: 0.3rem 1.5rem;
      @include transition($transition-base);

      &:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid $black;
        border-radius: 2rem;
        z-index: -1;
        @include transition($transition-base);
        box-shadow: 0px 0px 0px 1px rgba($black, 0);
      }

      &.active {
        color: $white;

        &:before {
          background: $black;
        }
      }

      &[disabled] {
        color: $gray-400;

        &:before {
          border-color: $gray-400;
        }
      }
    }
  }
}

.accordion-collapse {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  display: block !important;
  opacity: 0;
  z-index: -1;

  &.show,
  &.collapsing {
    transition: opacity 0.25s linear;
    opacity: 1;
    z-index: 20;
  }
}

.filter-menu-items {
  position: relative;
  z-index: 2010;
  background: $gray-100;
  border-top: 1px solid $gray-400;
  border-bottom: 1px solid $gray-400;

  .row {
    justify-content: center;
  }
}

.filter-item {
  font-size: 1.2rem;
  font-weight: $font-weight-medium;
  background: $white;
  margin: 0.8rem 0.5rem;
  padding: 0 0.5rem 0 1.5rem;
  border-radius: 2rem;
  border: 1px solid $primary;
  @include transition($transition-base);

  button {
    margin: 0;
    padding: 0;
    background: none;
    border: 0;
    display: inline-block;
    vertical-align: baseline;
    width: 2rem;
    height: 2rem;
    padding: 0.6rem;

    :deep svg {
      @include transition($transition-base);
    }

    &:hover {
      :deep svg {
        fill: $primary;
      }
    }
  }
}

.desktop-menu-filler {
  height: 0;
  @include transition($transition-collapse);
  background: linear-gradient(to bottom, $gray-100 0%, $white 100%);
}

.bg-light {
  .desktop-menu-filler {
    background: linear-gradient(to bottom, $white 0%, $gray-100 100%);
  }

  .filter-menu-items {
    background: $white;
  }

  .filter-item {
    background: $gray-100;
  }
}

@include media-breakpoint-up(md) {
  .main-menu {
    .accordion-button {
      font-size: 1.6rem;
      @include margin(0 2rem);
    }
  }
}

@include media-breakpoint-up(lg) {
  .main-menu-collapse {
    width: auto;
  }

  .main-menu-container {
    width: auto;
    height: auto;
  }

  .navbar {
    padding-bottom: 2rem;

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
    ul {
      justify-content: flex-start;

      li {
        @include font-size(1.6rem);
        font-weight: $font-weight-medium;
        margin: 0.8rem 0.5rem;
      }

      .filter-menu-link {
        padding: 0 1.5rem;

        &:before {
          top: 0.5px;
        }

        &:hover:not(.active):not([disabled]) {
          color: $primary;

          &::before {
            border-color: $primary;
            box-shadow: 0px 0px 0px 1px rgba($primary, 1);
          }
        }
      }
    }

    .accordion-header {
      margin: 0;
    }

    .accordion-button {
      font-size: 1.8rem;

      &:after {
        margin-left: 1rem;
        width: 1.3rem;
        height: 1.3rem;
      }
    }
  }

  .filter-item {
    @include font-size(1.6rem);

    button {
      transform: translateY(-2.5px);
    }

    span {
      display: inline-block;
      transform: translateY(-1.5px);
    }
  }

  .filter-menu-items {
    .container {
      @include padding-left(4rem);
      @include padding-right(4rem);
    }

    .row {
      justify-content: flex-start;
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