<template>
  <div class="fe-switch" :class="{'active-class': isChecked, 'inactive-class': !isChecked, 'is_disabled': disabled}">
    <input
      class="fe-switch__input"
      :true-value="activeValue"
      :false-value="inactiveValue"
      type="checkbox"
     />
      <span v-if="activeText" class="active-text">{{activeText}}</span>
      <span @click="onChange"  class="fe-switch__core" style="width: 40px;" ></span>
      <span v-if="inactiveText" class="inactive-text" >{{inactiveText}}</span>
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
  disabled: boolean,
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
      default: '#409eff',
    },
    inactiveColor: {
      type: String,
      default: '#dcdfe6',
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
      if(props.disabled){
        return
      }
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

<style lang="scss"  scoped>
$activeColor: v-bind('activeColor');
$inactiveColor: v-bind('inactiveColor');
.fe-switch{
  cursor: pointer;
  line-height: 20px;
  &.is_disabled{
    cursor: not-allowed;
  }
  .fe-switch__input{
    width: 0;
    height: 0;
  }
  & > *{
    vertical-align: middle;
  }
  .fe-switch__core {
    position: relative;
    display: inline-block;
    margin: 0;
    background: $inactiveColor;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    vertical-align: middle;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    user-select: none;
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
      border-color: $activeColor;
      background-color: $activeColor;
      &:after{
        left: 100%;
        margin-left: -17px;
      }
    }
    .active-text{
      color: $activeColor;
    }
    .inactive-text{
      color: $inactiveColor;
    }
  }
  .active-text{
    color: $inactiveColor;
    margin-right: 5px;
  }
  .inactive-text{
    color: $activeColor;
    margin-left: 5px;
  }
}
</style>
