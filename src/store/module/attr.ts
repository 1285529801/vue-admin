import { defineStore } from "pinia";
import { SortResponseData } from '@/api/product/attr/types'
import { attrStore } from './types/types'
import { reqFirstSort, reqSecondSort, reqThreeSort, reqAttrList } from '@/api/product/attr/index'

const useAttrStore = defineStore('attr', {
  state: (): attrStore => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: '',
      attrList: [],
      newAttrName: '',
      newAttrValue: '',
      newAttrList: []
    }
  },
  getters: {

  },
  actions: {
    async getC1() {
      let result: SortResponseData = await reqFirstSort()
      if (result.code == 200) {
        this.c1Arr = result.data
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getC2() {
      // 先将二、三级清空
      this.c2Arr = []
      this.c2Id = ''
      this.c3Arr = []
      this.c3Id = ''
      let result: SortResponseData = await reqSecondSort(this.c1Id as number)
      if (result.code == 200) {
        this.c2Arr = result.data
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getC3() {
      // 先将三级清空
      this.c3Arr = []
      this.c3Id = ''
      let result: SortResponseData = await reqThreeSort(this.c2Id as number)
      if (result.code == 200) {
        this.c3Arr = result.data
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getAttrList() {
      let result = await reqAttrList(this.c1Id as number, this.c2Id as number, this.c3Id as number)
      if (result.code == 200) {
        this.attrList = result.data
      } else {
        this.attrList = []
        return Promise.reject(new Error(result.message))
      }
    }
  }
})

export default useAttrStore