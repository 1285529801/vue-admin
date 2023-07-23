import { defineStore } from "pinia";
import { layoutState } from './types/types'

const useLayoutStore = defineStore('layout', {
  state: (): layoutState => {
    return {
      isCollapse: false,
      refresh: false,
      drawer: false,
    }
  }
})

export default useLayoutStore