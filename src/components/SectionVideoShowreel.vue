<template>
  <section class="section-showreel">
    <div class="showreel-video" id="showreel-video"></div>
    <button
      @click="playVideo"
      :class="{ 'd-none': hidePoster }"
      class="btn btn-showreel"
    >
      <SvgIcons icon="icon-play-text" />
    </button>
    <LoadImage
      class="video-thumb"
      :class="{ 'd-none': hidePoster }"
      :lazy="false"
      src="img-placeholder-reel.jpg"
    />
  </section>
</template>

<script>
import SvgIcons from '@/components/SvgIcons.vue'
import LoadImage from '@/components/LoadImage.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'SectionVideoShowreel',
  components: {
    SvgIcons,
    LoadImage
  },
  setup () {
    const hidePoster = ref(false)
    var tag = document.createElement('script')

    tag.src = 'https://www.youtube.com/iframe_api'
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    let player
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('showreel-video', {
        height: '100vh',
        width: '100%',
        videoId: 'I8L84c-24X8',
        playerVars: {
          playsinline: 1,
          rel: 0
        },
        events: {
          onStateChange: onPlayerStateChange
        }
      })
    }

    const onPlayerStateChange = (event) => {
      if (event.data === YT.PlayerState.PAUSED) {
        window.scroll({
          top: 200,
          behavior: 'smooth'
        })
      }

      if (event.data === YT.PlayerState.ENDED) {
        document
          .getElementById('site-header')
          .scrollIntoView({ behavior: 'smooth' })
      }
    }

    const playVideo = () => {
      hidePoster.value = true
      player.playVideo()
    }

    return {
      player,
      hidePoster,
      playVideo
    }
  }
}
</script>

<style scoped lang="scss">
.section-showreel {
  position: relative;
  height: 100vh;

  video,
  ::v-deep iframe,
  ::v-deep .showreel-video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
  }

  video.initialized {
    object-fit: contain;
  }

  ::v-deep .video-thumb img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 20;
    object-fit: cover;
  }

  .btn-showreel {
    margin: auto;
    padding: 0;
    position: absolute;
    z-index: 30;
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