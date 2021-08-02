<template>
  <div v-if="visible" class="fe-image-viewer" @click="onClick">
    <img ref="img" class="fe-image" :class="{'full-screen': isFull}" :src="src" />
    <span style="vertical-align: middle"></span>
    <i @click="onClose" class="iconfont icon-ic_searchclosed"></i>

    <div class="image-action">
      <i @click="onZoomOut" class="iconfont icon-suoxiao"></i>
      <i @click="onZoomIn" class="iconfont icon-fangdajing"></i>
      <i @click="onRotateR" class="iconfont icon-xuanzhuan"></i>
      <i @click="onRotateL" class="iconfont icon-xuanzhuan1"></i>
      <i @click="onFullScreen" class="iconfont" :class="{'icon-fullscreen-exit': isFull, 'icon-fullScreen': !isFull}"></i>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, ref, watchEffect} from "vue";

export default defineComponent({
  name: "image-viewer",
  props: {
    src: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['update:visible'],
  setup(props, ctx) {
    const img: Ref = ref(null)
    const touchHide = () => {
      ctx.emit('update:visible', false)
    }

    const onClick = function (event: any) {
      event.preventDefault()
      return
      const clickImg = event.target === img.value;
      touchHide()
    }

    const forbScroll = function (e: any) {
      e.preventDefault();
      e.stopPropagation();
    }
    watchEffect(() => {
      if (props.visible) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', forbScroll, false);
      } else {
        document.removeEventListener('touchmove', forbScroll)
      }
    })

    let rotation = ref(0);
    let scale = ref(1);
    let transform: any = computed(() => {
      return `scale(${scale.value}) rotate(${rotation.value}deg)`;
    });
    let zoomStep = 0.2;
    let isFull = ref(false)
    const objectFit =  computed(() => {
      return isFull.value ? 'cover' : 'contain'
    })
    const onZoomOut = function () {
      scale.value = scale.value - zoomStep;
    }

    const onZoomIn = function () {
      scale.value = scale.value + zoomStep;
    }

    const onRotateR = function () {
      rotation.value = (rotation.value + 90) ;
    }
    const onRotateL = function () {
      rotation.value = (rotation.value - 90) ;

    }

    const onFullScreen = function () {
      scale.value = 1;
      rotation.value = 0;
      isFull.value = !isFull.value
    }

    const onClose = function () {
      ctx.emit("update:visible", false)
    }

    return {
      img,
      transform,
      objectFit,
      isFull,
      onClick,
      onZoomOut,
      onZoomIn,
      onRotateR,
      onRotateL,
      onFullScreen,
      onClose,
    }

  }
})
</script>

<style lang="scss" scoped>
.fe-image-viewer {
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 100%;
  background: rgba(0, 0, 0, .9);
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.fe-image {
  display: inline-block;
  object-fit: v-bind(objectFit);
  vertical-align: middle;
  transform: v-bind(transform);
  transition: all 0.2s ease;

}

.iconfont {
  font-size: 25px;
  color: #fff;
  cursor: pointer;
}

.icon-ic_searchclosed {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 30px;
}
.full-screen{
  width: 100%;
  height: 100%;
}
.image-action {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 40px;
  line-height: 40px;
  background: #606266;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

}
</style>