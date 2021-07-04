<template>
  <fe-switch v-model="value1" :loading="loading1" :beforeChange="beforeChange1" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FeSwitch from './components/switch/index';
import { ref } from '@vue/reactivity';
export default {
  components: {
    FeSwitch
  },
  setup() {
    const value1 = ref(false);
    const loading1 = ref(false);
    const beforeChange1 = () => false
    console.log(111)
    return {
      value1,
      loading1,
      beforeChange1
    }
    
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
