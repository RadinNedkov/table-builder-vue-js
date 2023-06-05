<template>
  <div>

    <input v-if="tableField.type === 'text' && tableField.filtering !== false"
    type="text"
    v-model.lazy="tableField.defaultValue"
    @change="changeValue">

    <Datepicker v-if="tableField.type === 'date'"
    placeholder="From Date..."
    :format="dateToDisplay"
    v-model="tableField.defaultValue.startDate"
    @selected="changeValue" />

    <Datepicker v-if="tableField.type === 'date'"
    placeholder="To Date..."
    :format="dateToDisplay"
    v-model="tableField.defaultValue.endDate"
    @selected="changeValue" />

    <div class="input" v-if="tableField.type === 'select'">
      <select v-model="tableField.defaultValue"
      :name="tableField.value"
      @change="changeValue">
        <option v-for="(option, index) of tableField.options"
        :value="option.value"
        :key="index">{{ option.label }}</option>
      </select>
    </div>

  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  name: 'InputField',
  props: ['field', 'index'],
  data () {
    return {
      tableField: {}
    }
  },
  mounted () {
    this.tableField = this.field
  },
  methods: {
    dateToDisplay (date) {
      return moment(date).format('DD.MM.YYYY')
    },
    dateForQuery (date) {
      return moment(date).format('YYYY-MM-DD.00:00:00')
    },
    changeValue () {
      if (this.tableField.type === 'date') {
        this.$parent.tableFields[this.index].defaultValue.startDate = this.tableField.defaultValue.startDate
        this.$parent.tableFields[this.index].defaultValue.endDate = this.tableField.defaultValue.endDate
      } else {
        this.$parent.tableFields[this.index].defaultValue = this.tableField.defaultValue
      }
    }
  },
  computed: {
    stringParam () {
      return (this.tableField.type === 'date' &&
      moment.isDate(this.tableField.defaultValue.startDate) &&
      moment.isDate(this.tableField.defaultValue.endDate)
        ? `&filters.${this.tableField.value}.startDate=${this.dateForQuery(this.tableField.defaultValue.startDate)}&filters.${this.tableField.value}.endDate=${this.dateForQuery(this.tableField.defaultValue.endDate)}` : '') +
      (this.tableField.type !== 'date' &&
      this.tableField.value !== 'backofficeLockType' &&
      this.tableField.defaultValue !== '' &&
      this.tableField.defaultValue !== 'All'
        ? `&filters.${this.tableField.value}.value=${this.tableField.defaultValue}&filters.${this.tableField.value}.operation=${this.tableField.operator}` : '') +
      (this.tableField.type === 'select' &&
      this.tableField.value === 'backofficeLockType' &&
      this.tableField.defaultValue !== '' &&
      this.tableField.defaultValue !== 'All'
        ? `&filters.${this.tableField.value}=${this.tableField.defaultValue}` : '')
    }
  },
  watch: {
    stringParam (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.tableField.stringParam = this.stringParam
        this.$parent.tableFields[this.index].stringParam = this.stringParam
        this.$emit('refreshParams')
      }
    }
  },
  components: {
    Datepicker
  }
}
</script>
