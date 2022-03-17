<template>
  <section class="section-cta overflow-hidden">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-8 bg-black text-center py-15 px-0">
          <div class="section-cta-content">
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
          <a
            class="
              cta-wrapper
              order-first order-lg-last
              d-flex
              align-items-center
            "
            href="https://www.webprofits.com.au/contact.html"
            target="_blank"
            rel="nofollow noopener"
          >
            <span class="btn btn-arrow">Get in touch</span>
          </a>
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

  .section-cta-content {
    color: $white;
    @include font-size(4.2rem);
    line-height: 1.23;
    position: relative;
    @include padding-right(5rem);
    @include padding-left(5rem);

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
      @include padding-right(10rem);
      @include padding-left(10rem);

      &:before {
        right: 0;
      }
    }

    @include media-breakpoint-up(xxl) {
      @include padding-right(20rem);
      @include padding-left(20rem);

      &:before {
        right: 0;
      }
    }

    @include media-breakpoint-up(xxxl) {
      padding: 0;
      max-width: 1200px;
      margin: auto;
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

        @include media-breakpoint-between(xs, md) {
          transform: translateX(-10%);
        }
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
      @include transition($transition-base);
    }

    &:hover {
      &:before {
        background: $black;
      }

      .btn-arrow{
        &:before {
          background: $primary;
        }
      }
    }

    @include media-breakpoint-up(lg) {
      &:before {
        left: 0;
      }
    }
  }
}
</style>