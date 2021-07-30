import { Vue } from "vue-class-component";

declare module '*.vue' {
  import { defineComponent } from 'vue'
  export default any
}

declare var jQuerys: (selector: string) => any;
declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T

declare type Indexable<T> = {
  [key: string]: T
}

declare type Hash<T> = Indexable<T>

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>

declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'