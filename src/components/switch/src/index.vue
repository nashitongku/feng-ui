<template>
  <div class="fe-switch" :class="{'active-class': isChecked, 'inactive-class': !isChecked}">
    <input
      class="fe-switch__input"
      :true-value="activeValue"
      :false-value="inactiveValue"
      type="checkbox"
     />
      <span @click="onChange"  class="fe-switch__core" style="width: 40px;"></span>
     <div class="fe-switch__action"></div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed, onMounted, ref, inject, nextTick, watch } from 'vue'


type ValueType = boolean | string | number;

interface ISwitchProps {
  value: ValueType,
  modelValue: ValueType,
  activeIconClass: string
  inactiveIconClass: string
  activeText: string
  inactiveText: string
  activeColor: string
  inactiveColor: string

  activeValue: ValueType
  inactiveValue: ValueType
}

export default defineComponent({
  name: 'FeSwitch',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 40,
    },
    activeIconClass: {
      type: String,
      default: '',
    },
    inactiveIconClass: {
      type: String,
      default: '',
    },
    activeText: {
      type: String,
      default: '',
    },
    inactiveText: {
      type: String,
      default: '',
    },
    activeColor: {
      type: String,
      default: '',
    },
    inactiveColor: {
      type: String,
      default: '',
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    }
  },
  emits: ['update:modelValue', 'change', 'input'],
  setup(props: ISwitchProps, ctx) {

    let isChecked = computed(() => {
      return props.modelValue === props.activeValue;
    })

    let onChange = function (){
      console.log(props.modelValue, 'mol')
      let val = isChecked.value ? props.inactiveValue : props.activeValue;
      ctx.emit("update:modelValue", val)
    }


    return {
      isChecked,
      onChange
    }
  },

})
</script>

<style lang="scss" scoped>
@import '../../theme/css/global.fe.scss';
.fe-switch{
  cursor: pointer;
  .fe-switch__input{
    width: 0;
    height: 0;

    &.active-class {

    }
    &.inactive-class {

      
    }
  }
  .fe-switch__core {
    position: relative;
    display: inline-block;
    border-radius: 10px;
    height: 20px;
    border-color: $blue;
    background-color: $blue;
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    transition: border-color .3s,background-color .3s;
    &:after {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all .3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }

  &.active-class{
    .fe-switch__core{
      &:after{
        left: 100%;
        margin-left: -17px;
      }
    }
  }
}
</style>
