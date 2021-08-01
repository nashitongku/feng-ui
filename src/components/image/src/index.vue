<template>
  <div ref="container">
    <div v-if="loading" class="fe-image__placeholder"></div>
    <div v-else-if="error"></div>
    <img
        v-else
        v-bind="$attrs"
        @click="onclick"
        :src="src"/>

    <image-viewer v-model:visible="showViewer" :src="src" />
  </div>
  <!--  <img :src="src" :width="width" :height="height" />-->
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, ref, inject, nextTick, watch, Ref, onUnmounted} from 'vue'
import utils from '../../utils/helper'
import ImageViewer from "@/components/image-viewer/index.ts";

type ValueType = string | number;

interface IProps {
  src: string,
  zIndex: ValueType,
  lazyLoad: boolean,
  defaultSrc: string,
  objectFit: string,
}

export default defineComponent({
  name: "fe-image",
  components: {ImageViewer},
  props: {
    src: {
      type: String,
      default: '',
    },
    zIndex: {
      type: [String, Number],
      default: '',
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
    defaultSrc: {
      type: String,
      default: 'data:image/jpeg;base64,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'
    }
  },

  setup(props: IProps, ctx) {
    let objectFit = props.objectFit;
    let showViewer = ref<boolean>(false);
    const onclick = function (){
      showViewer.value = true
    }

    const ifInViewPort = (removeListener: Function) => {
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;
      if (container.value != null) {
        let clientRect = container.value.getBoundingClientRect();
        const isViewReport = utils.inViewReport(windowWidth, windowHeight, clientRect)
        if (isViewReport) {
          loadImage()
          removeListener()
        }
      }
    }


    let container: Ref = ref(null);

    const loading = ref(true);
    const error = ref(false);

    const onError = () => {
      error.value = true;
      loading.value = false;
    }

    const handleLoad = () => {
      loading.value = false;
    }

    const loadImage = function () {
      let img = new Image();
      img.onerror = onError;
      img.onload = handleLoad
      img.src = props.src
    }


    const onScroll = utils.debounce(function () {
      ifInViewPort(removeOnScroll);
    }, 200)
    const init = () => {

      ifInViewPort(removeOnScroll)
    }

    const removeOnScroll = () => window.removeEventListener("scroll", onScroll)
    const addOnScroll = () => window.addEventListener("scroll", onScroll);
    onMounted(() => {
      init();
      addOnScroll()
    })
    onUnmounted(() => {
      removeOnScroll()
    })
    return {
      objectFit,
      showViewer,
      container,
      loading,
      error,
      onclick
    }
  }
})
</script>

<style lang="scss" scoped>
.fe-image__placeholder {
  width: 100%;
  height: 100%;
  background: #f5f7fa;

}
img{
  cursor: zoom-in;
  object-fit: v-bind(objectFit);
}
</style>