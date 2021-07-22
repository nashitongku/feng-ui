<template>
  <div class="fe-switch">
    <input
      class="fe-switch__input"
      :class="{'active-class': isChecked, 'inactive-class': !isChecked}"
      :true-value="activeValue"
      :false-value="inactiveValue"
      type="checkbox"
     />

     <div class="fe-switch__action"></div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed, onMounted, ref, inject, nextTick, watch } from 'vue'


type ValueType = boolean | string | number;

interface ISwitchProps {
  value: ValueType,
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
      return props.value === props.activeValue;
    })

    return {
      isChecked
    }
  },

})
</script>

<style lang="scss" scoped>
.fe-switch{
  .fe-switch__input{
    &.active-class {

    }
    &.inactive-class {

      
    }
  }


}
</style>
