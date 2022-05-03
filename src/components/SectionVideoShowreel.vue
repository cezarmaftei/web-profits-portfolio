<template>
  <section class="section-showreel">
    <video
      ref="portfolioShowreel"
      preload
      poster="@/assets/images/img-placeholder-reel.jpg"
    >
      <source
        src="@/assets/videos/Webprofits_Portfolio_Showreel_1920x1080_220503.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
    <button @click="handleVideo($event)" class="btn btn-showreel">
      <SvgIcons icon="icon-play-text" />
    </button>
  </section>
</template>

<script>
import SvgIcons from '@/components/SvgIcons.vue'
import { ref } from '@vue/reactivity'
export default {
  name: 'SectionVideoShowreel',
  components: {
    SvgIcons
  },
  setup () {
    const portfolioShowreel = ref(null)
    // let isPlay = false

    const handleVideo = (event) => {
      // console.log(event.target)
      event.target.closest('.btn').classList.add('d-none')
      portfolioShowreel.value.classList.add('initialized')
      portfolioShowreel.value.setAttribute('controls', 'true')
      portfolioShowreel.value.play()
      /*
      if (isPlay) {
        portfolioShowreel.value.pause()
        isPlay = false
      } else {
        portfolioShowreel.value.classList.add('initialized')
        portfolioShowreel.value.play()
        isPlay = true
      }
      */
    }

    return {
      handleVideo,
      portfolioShowreel
    }
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

  video.initialized {
    object-fit: contain;
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