<template>
  <div class="actions-wrapper">
    <b-button-group>
      <div class="btn-group">
        <b-button class="btn"
        variant="outline-info">Search</b-button>
        <b-button class="btn"
        @click="clearFilters">Clear Filters</b-button>
        <b-button class="btn"
        v-if="exportFileName"
        variant="outline-info"
        @click="getCsvFile">
          <b-icon-download /> Export
        </b-button>
        <span>{{ 'Total results: ' + getAllData.itemsCount }}</span>
      </div>
    </b-button-group>
    <b-button-group v-if="Object.keys(naviButton).length > 0">
        <div class="btn-group">
          <router-link
          :to="naviButton.path"
          tag="b-button"
          class="nav-link w-auto">
            {{ naviButton.name }}
          </router-link>
        </div>
      </b-button-group>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers('tableBuilder')

export default {
  name: 'TableControls',
  props: ['exportFileName', 'exportEndpoint', 'defaultSortOrder', 'defaultPagination', 'naviButton'],
  computed: {
    ...mapGetters(['getAllData'])
  },
  methods: {
    ...mapActions(['fetchCsvFile']),
    clearFilters () {
      if (this.getAllData.filters !== `offsetPaging.skip=0&offsetPaging.take=${this.defaultPagination}` +
      `&Order.${this.defaultSortOrder.field}.Type=${this.defaultSortOrder.type}` &&
      this.getAllData.filters.length > 0) {
        this.$emit('clearAll')
      }
    },
    getCsvFile () {
      this.fetchCsvFile({ endpoint: this.exportEndpoint, params: this.getAllData.filters }).then(res => {
        const fileURL = `data:text/csv;base64,${res.content}`
        const fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', `${this.exportFileName}.csv`)
        document.body.appendChild(fileLink)

        fileLink.click()
      })
    }
  }
}
</script>
