<template>
  <div v-if="visible" class="fe-image-viewer" @click="onClick">
    <img ref="img" class="fe-image" :src="src" :style="{maxHeight: maxHeight,width: imageWidth+'px', height: imageHeight+'px'}"/>
    <span style="vertical-align: middle"></span>
    <i @click="onClose" class="iconfont icon-ic_searchclosed"></i>

    <div class="image-action">
      <i @click="onZoomOut" class="iconfont icon-suoxiao"></i>
      <i @click="onZoomIn" class="iconfont icon-fangdajing"></i>
      <i @click="onRotateR" class="iconfont icon-xuanzhuan"></i>
      <i @click="onRotateL" class="iconfont icon-xuanzhuan1"></i>
      <i @click="onFullScreen" class="iconfont icon-fullScreen"></i>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref, watchEffect} from "vue";

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

    let imageWidth:any = ref(null);
    let imageHeight:any = ref(null);
    let maxHeight:any = ref('100%')
    let changeR = 0.2;
    const objectFit = ref('contain')
    const onZoomOut = function () {
      let {width, height} = img.value.getBoundingClientRect();
      let r = height / width;
      width = width * (1 - changeR);
      height = r * width;
      if (width < 120 || height < 120) {
        return
      }
      imageHeight.value = height;
      imageWidth.value = width;
    }

    const onZoomIn = function () {
      let {width, height} = img.value.getBoundingClientRect();
      let r = height / width;
      width = width * (1 + changeR);
      height = r * width;

      maxHeight.value = null;
      imageHeight.value = height;
      imageWidth.value = width;
    }

    let rotation = 0;
    const onRotateR = function () {
      rotation = (rotation + 90) ;
      img.value.style.transform = 'rotate('+rotation+'deg)';
    }
    const onRotateL = function () {
      rotation = (rotation - 90) ;
      img.value.style.transform = 'rotate('+rotation+'deg)';

    }

    const onFullScreen = function () {
      objectFit.value = 'cover'
      imageHeight.value = '100%';
      imageWidth.value = '100%'
      console.log(22)
    }

    const onClose = function () {
      ctx.emit("update:visible", false)
    }


    return {
      img,
      imageWidth,
      imageHeight,
      maxHeight,
      objectFit,
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