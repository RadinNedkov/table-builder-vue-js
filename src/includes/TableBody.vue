<template>
  <tbody v-if="loaded">
    <tr v-for="(object, index) in getAllData.data" :key="index">
      <td v-for="(field, index) in fields"
      @click="goToDetails(object)"
      :key="index">
        {{ checkDate(object[lowerCase(field.value)]) ? formatDate(object[lowerCase(field.value)]) : object[lowerCase(field.value)] }}
      </td>
      <b-button-group vertical
      v-if="actionButtons.length > 0"
      class="d-flex justify-content-center px-1 py-1">
        <span v-for="(button, index) in actionButtons" :key="index">
          <button
          class="btn btn-danger my-1"
          @click="buttonAction(button, object)">
            {{ button.name }}
          </button>
        </span>
      </b-button-group>
    </tr>
    <div class="text-center py-2" v-if="getAllData.data.length === 0">No results found.</div>
    <ActionBtnModal v-if="buttonClicked" :modal="buttonClicked.modal" :selectedId="selectedId" />
  </tbody>
</template>
<script>
import moment from 'moment'
import ActionBtnModal from '../modals/ActionBtnModal.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('tableBuilder')

export default {
  name: 'TableBody',
  props: ['fields', 'detailsPagePath', 'endpoint', 'defaultSortOrder', 'defaultPagination', 'actionButtons'],
  data () {
    return {
      loaded: false,
      modalFormData: {},
      buttonClicked: '',
      selectedId: ''
    }
  },
  components: {
    ActionBtnModal
  },
  methods: {
    ...mapActions(['fetchData', 'buttonFunction']),
    ...mapMutations(['SET_DEFAULT_PAGING_TAKE', 'SET_DATA']),
    formatDate (input) {
      if (input) {
        return moment(String(input)).format('DD-MM-YYYY hh:mm')
      }
    },
    checkDate (input) {
      return moment(input, 'YYYY-MM-DDTHH:mm:ss.sss', true).isValid() || moment(input, 'YYYY-MM-DDTHH:mm:ss.sssssss', true).isValid()
    },
    goToDetails (result) {
      if (this.detailsPagePath !== '') {
        this.$router.push({
          path: `${this.detailsPagePath}/${result.id}`
        })
      }
    },
    async buttonAction (button, result) {
      if (button.modal) {
        this.buttonClicked = button
        this.selectedId = result.id
        await this.buttonClicked
        await this.$bvModal.show(button.modal.name)
      } else {
        this.buttonFunction({ button: button, data: result })
      }
    },
    lowerCase (name) {
      return `${name[0].toLowerCase()}${name.slice(1)}`
    },
    showModal () {
      this.$bvModal.show('otpModal')
    }
  },
  computed: {
    ...mapGetters(['getAllData'])
  },
  beforeMount () {
    this.SET_DEFAULT_PAGING_TAKE(this.defaultPagination)
    this.fetchData({
      endpoint: this.endpoint,
      params: this.getAllData.pagingParams +
      `&Order.${this.defaultSortOrder.field}.Type=${this.defaultSortOrder.type}`
    }).then((res) => {
      this.SET_DATA(this.$parent.$parent.mapData(res))
    })
    this.loaded = true
  },
  watch: {
    'getAllData.filters': {
      handler: function (newVal, oldVal) {
        if (newVal !== undefined) {
          this.loaded = false
          this.fetchData({
            endpoint: this.endpoint,
            params: newVal
          }).then((res) => {
            this.SET_DATA(this.$parent.$parent.mapData(res))
          })
          this.loaded = true
          this.$parent.clearAll = false
        }
      },
      deep: true,
      immediate: false
    },
    modalFormData: {
      handler: function (newVal, oldVal) {
        if (newVal !== {}) {
          this.buttonFunction({ button: this.buttonClicked, data: newVal })
        }
      },
      deep: true,
      immediate: false
    }
  }
}
</script>
