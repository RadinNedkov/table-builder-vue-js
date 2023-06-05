import {
  getAllData,
  getCsv,
  buttonAction
} from '../api/tableBuilder.api'
import { EventBus } from '@/event-bus'

export default {
  namespaced: true,
  state: {
    results: {
      data: [],
      filters: [],
      offsetPaging: {
        skip: 0,
        take: 15
      },
      pagingParams: '',
      itemsCount: 0,
      sortOrder: ''
    }
  },
  actions: {
    async fetchData ({ commit }, payload) {
      EventBus.$emit('loading', true)
      try {
        const queryResults = await getAllData({ endpoint: payload.endpoint, filters: payload.params })

        EventBus.$emit('loading', false)
        return queryResults
      } catch (error) { console.error(error) }
    },
    setPagingParams ({ commit }, payload) {
      commit('SET_PAGING_PARAMS', payload)
    },
    setFilters ({ commit }, payload) {
      commit('SET_FILTERS', payload)
    },
    async fetchCsvFile ({ commit }, payload) {
      try {
        return await getCsv({ endpoint: payload.endpoint, filters: payload.params })
      } catch (error) { console.error(error) }
    },
    async buttonFunction ({ commit }, payload) {
      try {
        const response = await buttonAction(payload)

        return response
      } catch (error) { console.error(error) }
    }
  },
  mutations: {
    SET_DATA: (state, payload) => {
      state.results.data = state.results.data.concat(payload)
      state.results.itemsCount = payload.totalCount
    },
    CLEAR_DATA: (state, payload) => {
      state.results.data = payload
    },
    SET_PAGING_PARAMS: (state, payload) => {
      state.results.offsetPaging.skip = payload
      state.results.pagingParams = `offsetPaging.skip=${payload}&offsetPaging.take=${state.results.offsetPaging.take}`
    },
    SET_DEFAULT_PAGING_TAKE: (state, payload) => {
      state.results.offsetPaging.take = payload
      state.results.pagingParams = `offsetPaging.skip=${state.results.offsetPaging.skip}&offsetPaging.take=${payload}`
    },
    SET_FILTERS: (state, payload) => {
      state.results.filters = payload
    }
  },
  getters: {
    getAllData: (state) => state.results
  }
}
