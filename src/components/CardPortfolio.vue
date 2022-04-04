<template>
  <router-link
    class="card card-portfolio"
    :to="'/portfolio/' + client.slug[0]"
  >
    <div class="card-header overflow-hidden mb-3">
      <LoadImage
        class="card-graphic"
        :src="client.thumb[0]"
        :alt="`Portfolio ${client.client_name[0]}`"
      />
      <div class="card-hover d-flex flex-column bg-light p-4 overflow-hidden">
        <div class="card-hover-top">
          <h6 class="mb-1">Industry</h6>
          <p class="mb-0">
            {{ client.asset_industry.join(", ") }}
          </p>
        </div>
        <div class="card-hover-bot d-flex align-items-center mt-auto">
          <p class="h6 mb-0">{{ client.asset_business_type.join(", ") }}</p>
          <SvgIcons icon="shape-arrow" />
        </div>
      </div>
    </div>

    <div class="card-content">
      <h4 class="mb-2">{{ client.client_name[0] }}</h4>
      <p class="h6 mb-0">{{ client.asset_type.join(", ") }}</p>
    </div>
  </router-link>
</template>

<script>
import LoadImage from '@/components/LoadImage.vue'
import SvgIcons from '@/components/SvgIcons.vue'

export default {
  name: 'CardPortfolio',
  props: {
    client: Object
  },
  components: {
    LoadImage,
    SvgIcons
  },
  setup (props) {}
}
</script>

<style scoped lang="scss">
.card-portfolio {
  color: $black;
  max-width: 425px;
  margin-left: auto;
  margin-right: auto;

  .card-header {
    position: relative;
    width: 100%;

    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
  }

  .card-graphic {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    :deep * {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-hover {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 100%;
    @include font-size(2.6rem);
    color: $gray-600;
    @include transition($transition-base);

    h6 {
      text-transform: none;
    }

    :deep .svg-icon {
      width: 2.4rem;
      height: 2.4rem;
      fill: $black;
      margin-left: auto !important;
    }
  }

  .card-hover-top,
  .card-hover-bot {
    opacity: 0;
    @include transition(
      transform 0.75s cubic-bezier(0.31, 1.21, 0.64, 1.02),
      opacity 0.5s linear
    );
  }

  .card-hover-top {
    transform: translateY(-100px);
  }

  .card-hover-bot {
    transform: translateY(100px);
  }

  &:hover {
    .card-hover {
      top: 0;
    }

    .card-hover-top,
    .card-hover-bot {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>