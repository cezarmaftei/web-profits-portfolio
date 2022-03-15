<template>
  <section class="section-cta overflow-hidden">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8 bg-black text-center py-15 px-0">
          <div class="px-5">
            <h2>Book a Strategy Call</h2>
            <p>
              Many companies we work with choode to use our channel specialists
              as a 'bolt on' to their existing marketing team in place of hiring
              somebody internally.
            </p>
          </div>
        </div>
        <div class="col-12 col-lg-4 px-0 d-flex flex-column">
          <div class="bg-gray order-last order-lg-first">
            <SvgIcons icon="logo-webprofits-w" />
          </div>
          <div
            class="
              cta-wrapper
              order-first order-lg-last
              d-flex
              align-items-center
            "
          >
            <router-link class="btn btn-arrow" to="/contact"
              >Get in touch</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SvgIcons from '@/components/SvgIcons.vue'
export default {
  name: 'SectionCTA',
  components: {
    SvgIcons
  }
}
</script>

<style scoped lang="scss">
.section-cta {
  @include media-breakpoint-between(lg, xxxl) {
    h2 {
      @include font-size(20rem);
    }
  }

  .bg-black {
    color: $white;
    @include font-size(4.2rem);
    line-height: 1.23;
    position: relative;

    &:before {
      content: "";
      display: block;
      position: absolute;
      z-index: -1;
      right: -50%;
      top: 0;
      width: 400%;
      height: 100%;
      background: #000;
    }

    @include media-breakpoint-up(lg) {
      &:before {
        right: 0;
      }

      .px-5 {
        padding-left: 0 !important;
        @include padding-right(20rem !important);
      }
    }
  }

  .bg-gray {
    height: 65%;
    position: relative;
    @include padding(15rem 0);

    &:before {
      content: "";
      display: block;
      position: absolute;
      z-index: -1;
      left: -50%;
      top: 0;
      width: 400%;
      height: 100%;
      background: $gray-100;
    }

    :deep .svg-icon {
      height: 100%;

      svg {
        fill: $primary;
        height: 100%;
        width: auto;
        max-width: none;
        margin: auto;
      }
    }

    @include media-breakpoint-up(lg) {
      padding-bottom: 0;

      &:before {
        left: 0;
      }

      :deep .svg-icon {
        transform: translate(-35%, 5px);
      }
    }
  }

  .cta-wrapper {
    height: 35%;
    position: relative;
    justify-content: center;

    &:before {
      content: "";
      display: block;
      position: absolute;
      z-index: -1;
      left: -50%;
      top: 0;
      width: 400%;
      height: 100%;
      background: $primary;
    }

    @include media-breakpoint-up(lg) {
      &:before {
        left: 0;
      }
    }
  }
}
</style>