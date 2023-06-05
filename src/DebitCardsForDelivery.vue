<template>
  <div>
    <TableBuilder :fields="tableSettings.fields"
    :actionButtons="tableSettings.actionButtons"
    :exportFileName="tableSettings.exportFileName"
    :detailsPagePath="tableSettings.detailsPagePath"
    :endpoint="tableSettings.endpoint"
    :exportEndpoint="tableSettings.exportEndpoint"
    :defaultSortOrder="tableSettings.defaultSortOrder"
    :defaultPagination="tableSettings.defaultPagination" />
  </div>
</template>

<script>
import TableBuilder from '../mixins/table-builder/TableBuilder.vue'

export default {
  name: 'DebitCardsForDelivery',
  data () {
    return {
      tableSettings: {
        // in case no details page on click is required the param should be included as empty string, else only router path '/path' (id is added dynamically)
        detailsPagePath: '',
        endpoint: '/api/card-management/debit-cards',
        // In case no export is needed the export params should be included as empty strings
        exportFileName: 'debit_cards_for_delivery',
        exportEndpoint: '/api/card-management/debit-cards/export/csv',
        defaultSortOrder: { field: 'issuedOn', type: 'desc' },
        defaultPagination: 15, // this is the number of results per page
        // field types are text/date/select
        // For all types additionally sorting and filtering can be deactivated by adding the param with false
        // date type requires the defaultValue to be an object with startDate: '' and endDate: ''
        // select type requires options Array with objects containing value and label strings
        fields: [
          { name: 'First Name', value: 'FirstName', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '', sorting: false, filtering: false },
          { name: 'Middle Name', value: 'MiddleName', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '', sorting: false, filtering: false },
          { name: 'Last Name', value: 'LastName', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '', sorting: false, filtering: false },
          { name: 'Address Line', value: 'AddressLine', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '', sorting: false, filtering: false },
          { name: 'City', value: 'City', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '', sorting: false, filtering: false },
          { name: 'Postcode', value: 'Postcode', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '', sorting: false, filtering: false },
          { name: 'Country Code', value: 'CountryCode', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '', sorting: false, filtering: false },
          { name: 'Type', value: 'Type', operator: 'Equal', type: 'select', options: [{ value: 'Plastic', label: 'Plastic' }], defaultValue: '', stringParam: '', sorting: false, filtering: false },
          { name: 'Status', value: 'Status', operator: 'Equal', type: 'select', options: [{ value: 'Requested', label: 'Requested' }], defaultValue: '', stringParam: '', sorting: false, filtering: false }
        ],
        // Buttons should be included in a new object in the below array and require the following params:
        // name: 'Example name', endpoint: '/api', action: '/action', perId: true/false, includeData: true/false
        actionButtons: []
      }
    }
  },
  methods: {
    // this mapping function is required to be defined, even if keys remain the same
    mapData (array) {
      const mappedData = array.data.map(o => (
        {
          firstName: o.personName ? o.personName.first : '',
          middleName: o.personName ? o.personName.middle : '',
          lastName: o.personName ? o.personName.last : '',
          addressLine: o.deliveryAddress ? o.deliveryAddress.addressLine : '',
          city: o.deliveryAddress ? o.deliveryAddress.city : '',
          postcode: o.deliveryAddress ? o.deliveryAddress.postcode : '',
          countryCode: o.deliveryAddress ? o.deliveryAddress.countryCode : '',
          type: o.type,
          status: o.status
        }
      ))
      mappedData.totalCount = array.totalCount
      return mappedData
    }
  },
  components: {
    TableBuilder
  }
}
</script>
