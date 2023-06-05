<template>
  <thead>
    <tr>
      <th v-for="(field, index) in tableFields" :key="index">
        <div class="thead">
          <TitleAndSorting :title="{name: field.name, value: field.value, sortValue: field.sortValue}" :sorting="field.sorting" />
          <InputField :field="field" :index="index" @refreshParams="refreshParams" />
        </div>
      </th>
      <th v-if="actionButtons.length > 0">
        <div class="thead">
          <TitleAndSorting :title="{name: 'Actions', value: 'Actions'}" :sorting="false" />
        </div>
      </th>
    </tr>
  </thead>
</template>

<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
import TitleAndSorting from '../../../common/TitleAndSorting.vue'
import InputField from './InputField.vue'

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('tableBuilder')

export default {
  name: 'TableHead',
  props: ['clearAll', 'fields', 'defaultSortOrder', 'actionButtons'],
  data () {
    return {
      sortOrder: '',
      tableFields: [],
      filters: ''
    }
  },
  mounted () {
    this.tableFields = this.fields
  },
  methods: {
    ...mapActions(['setFilters', 'setPagingParams']),
    ...mapMutations(['CLEAR_DATA']),

    clearParams () {
      this.tableFields.forEach((field) => {
        if (field.type === 'date') {
          field.defaultValue.startDate = ''
          field.defaultValue.endDate = ''
        } else {
          field.defaultValue = ''
        }
        field.stringParam = ''
      })
      this.filters = ''
      this.sortOrder = ''
      this.setPagingParams(0)
      this.CLEAR_DATA([])
      this.setFilters(this.getAllData.pagingParams + `&Order.${this.defaultSortOrder.field}.Type=${this.defaultSortOrder.type}`)
    },
    customFormatter (date) {
      return moment(date).format('YYYY-MM-DD.hh:mm:ss')
    },
    refreshParams () {
      this.filters = ''
      this.tableFields.forEach((field) => {
        this.filters += field.stringParam
      })
    }
  },
  computed: {
    ...mapGetters(['getAllData']),

    queryParams () {
      return this.filters + (this.sortOrder ? this.sortOrder : `&Order.${this.defaultSortOrder.field}.Type=${this.defaultSortOrder.type}`)
    }
  },
  components: {
    InputField,
    TitleAndSorting
  },
  watch: {
    queryParams (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.CLEAR_DATA([])
        this.setPagingParams(0)
        this.setFilters(this.getAllData.pagingParams + newVal)
      }
    },
    'getAllData.offsetPaging.skip': {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.setFilters(this.getAllData.pagingParams + this.queryParams)
        }
      },
      deep: true,
      immediate: false
    },
    clearAll (change) {
      this.clearParams()
    }
  },
  beforeDestroy () {
    this.CLEAR_DATA([])
  }
}
</script>
