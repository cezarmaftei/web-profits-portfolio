<template>
  <div class="bg-light">
    <section class="section section-clients">
      <div class="container container-heading" :class="alignment">
        <div class="row">
          <div class="col-12">
            <h2 v-html="title"></h2>
            <p v-html="subtitle"></p>
          </div>
        </div>
      </div>
    </section>
    <div class="container-fluid overflow-hidden p-0 mt-10" id="logo-scroll">
      <div class="logo-wrapper">
        <div class="logo-inner">
          <div
            class="row flex-nowrap justify-content-center"
            v-for="(clientsGroup, index) in clientsGroups"
            :key="index"
            :style="{
              transform:
                index % 2 === 0
                  ? `translateX(${transformValue}px)`
                  : `translateX(${-transformValue}px)`,
            }"
          >
            <div
              class="col-2 client-logo"
              v-for="clientLogo in clientsGroup"
              :key="clientLogo"
            >
              <SvgIcons :icon="clientLogo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcons from '@/components/SvgIcons.vue'
import { computed, onMounted, ref } from 'vue'

export default {
  name: 'SectionClients',
  components: {
    SvgIcons
  },
  props: {
    alignment: String,
    title: String,
    subtitle: String
  },
  setup () {
    // Clients array
    // The value(eg: logo-logitech) is a SVG icon name
    // See SvgIcons.vue
    const clientsLogos = [
      '',
      '',
      '',
      'logo-australian-ethical',
      'logo-aussie-broadband',
      'logo-aif',
      '',
      'logo-airtasker',
      'logo-bellamys-organic',
      'logo-brighten',
      'logo-canon',
      'logo-canterbury',
      'logo-click-energy',
      'logo-cua',
      'logo-hip-kids',
      'logo-logitech',
      'logo-hr-connect',
      'logo-lj-hooker',
      'logo-nexon',
      'logo-outforce',
      'logo-rose-mary',
      'logo-spintel',
      'logo-super-obvious',
      '',
      'logo-westfield',
      'logo-sealand',
      'logo-rackspace',
      '',
      '',
      ''
    ]

    const scrollDistance = 0.5
    const transformValue = ref(0)
    const lastScrollTop = ref(0)

    const updateParallaxValues = () => {
      // or window.addEventListener("scroll"....
      var st = window.pageYOffset || document.documentElement.scrollTop
      if (st > lastScrollTop.value) {
        // downscroll code
        requestAnimationFrame(() => (transformValue.value -= scrollDistance))
      } else {
        // upscroll code
        requestAnimationFrame(() => (transformValue.value += scrollDistance))
      }
      lastScrollTop.value = st <= 0 ? 0 : st // For Mobile or negative scrolling
    }

    const parallaxHorizontal = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.addEventListener('scroll', updateParallaxValues, false)
        } else {
          // transformValue.value = 0
          // lastScrollTop.value = 0
          document.removeEventListener('scroll', updateParallaxValues)
        }
      })
    }

    onMounted(() => {
      // Observer options
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
      const observer = new IntersectionObserver(
        parallaxHorizontal,
        observerOptions
      )

      observer.observe(document.getElementById('logo-scroll'))
    })

    // Convert clients in 2-level array with pairs of 4
    const clientsGroups = computed(() => {
      const result = []
      let i = 0
      const n = clientsLogos.length

      while (i < n) {
        result.push(clientsLogos.slice(i, (i += 6)))
      }

      return result
    })

    return { clientsGroups, transformValue }
  }
}
</script>

<style scoped lang="scss">
$logos-padding: 0.5rem;

.logo-wrapper {
  position: relative;
  height: 200px;
  background: $black;

  .logo-inner {
    width: 120%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(22.5deg);
  }

  .row {
    transition: transform 0.25s linear;
    background: $black;
  }
}

.client-logo {
  flex: 0 0 20%;
  position: relative;
  padding: $logos-padding;

  &:before {
    content: "";
    display: block;
    padding-top: 75%; // 4x3 aspect ratio
  }

  :deep .svg-icon {
    background: $white;
    position: absolute;
    top: $logos-padding;
    left: $logos-padding;
    width: calc(100% - $logos-padding * 2);
    height: calc(100% - $logos-padding * 2);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      max-width: 60%;
      max-height: 40%;
    }
  }
}

@include media-breakpoint-up(sm) {
  .logo-wrapper {
    height: 300px;
  }
}

@include media-breakpoint-up(md) {
  .logo-wrapper {
    height: 400px;
  }

  $logos-padding: 1rem;
  .client-logo {
    padding: $logos-padding;

    :deep .svg-icon {
      top: $logos-padding;
      left: $logos-padding;
      width: calc(100% - $logos-padding * 2);
      height: calc(100% - $logos-padding * 2);
    }
  }
}

@include media-breakpoint-up(lg) {
  .logo-wrapper {
    height: 550px;
  }
}

@include media-breakpoint-up(xl) {
  .logo-wrapper {
    height: 700px;
  }

  $logos-padding: 1.5rem;
  .client-logo {
    padding: $logos-padding;

    :deep .svg-icon {
      top: $logos-padding;
      left: $logos-padding;
      width: calc(100% - $logos-padding * 2);
      height: calc(100% - $logos-padding * 2);
    }
  }
}

@include media-breakpoint-up(xxl) {
  .logo-wrapper {
    height: 1100px;
  }
}
</style>