<template>
  <div>
    <TableControls @clearAll="clear"
    :exportFileName="exportFileName ? exportFileName : ''"
    :exportEndpoint="exportEndpoint ? exportEndpoint : ''"
    :defaultSortOrder="defaultSortOrder"
    :defaultPagination="defaultPagination"
    :naviButton="naviButton ? naviButton : {}" />
    <table class="bo-table">
      <TableHead :clearAll="clearAll"
      :fields="fields"
      :actionButtons="actionButtons.length > 0 ? actionButtons : []"
      :defaultSortOrder="defaultSortOrder" />
      <TableBody :fields="fields"
      :actionButtons="actionButtons.length > 0 ? actionButtons : []"
      :endpoint="endpoint"
      :detailsPagePath="detailsPagePath ? detailsPagePath : ''"
      :defaultSortOrder="defaultSortOrder"
      :defaultPagination="defaultPagination" />
    </table>
    <b-button
    v-if="getAllData.data.length < getAllData.itemsCount"
    class="btn mx-auto d-block mt-2"
    variant="outline-info"
    @click="loadMore">Load more</b-button>
  </div>
</template>

<script>
import TableHead from './includes/TableHead.vue'
import TableControls from './includes/TableControls.vue'
import TableBody from './includes/TableBody.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers('tableBuilder')

export default {
  name: 'TableBuilder',
  props: ['fields', 'exportFileName', 'detailsPagePath', 'endpoint', 'exportEndpoint', 'defaultSortOrder', 'defaultPagination', 'actionButtons', 'naviButton'],
  data () {
    return {
      clearAll: false
    }
  },
  computed: {
    ...mapGetters(['getAllData'])
  },
  components: {
    TableControls,
    TableHead,
    TableBody
  },
  methods: {
    ...mapActions(['setPagingParams']),
    clear () {
      this.clearAll = true
    },
    loadMore () {
      this.setPagingParams(this.getAllData.offsetPaging.skip + this.getAllData.offsetPaging.take)
    }
  }
}
</script>
