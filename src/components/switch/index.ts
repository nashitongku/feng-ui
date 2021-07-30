import { App } from 'vue'
import type { SFCWithInstall } from '../../utils/types'
import Switch from './src/index.vue'

Switch.install = (app: App): void => {
  app.component(Switch.name, Switch)
}


export default Switch
