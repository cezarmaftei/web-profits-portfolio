<template>
  <section class="section-showreel">
    <video poster="@/assets/images/img-placeholder-reel.jpg">
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
      Your browser does not support the video tag.
    </video>
    <button class="btn btn-showreel">
      <SvgIcons icon="icon-play-text" />
    </button>
  </section>
</template>

<script>
import SvgIcons from '@/components/SvgIcons.vue'
export default {
  name: 'SectionVideoShowreel',
  components: {
    SvgIcons
  }
}
</script>

<style scoped lang="scss">
  .section-showreel {
    position: relative;
    height: 100vh;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .btn-showreel {
      margin: auto;
      padding: 0;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      fill: $white;
      width: 216px;
      height: 216px;
    }
  }
</style>