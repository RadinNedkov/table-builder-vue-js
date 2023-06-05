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
import {
  ConsentStatuses,
  ConsentTypes,
  ConsentSource,
  AcceptanceTypes,
  AcceptanceLinks,
  ConsentCategory
} from '@/interfaces/consents'

export default {
  name: 'ConsentsList',
  components: {
    TableBuilder
  },
  data () {
    return {
      tableSettings: {
        // in case no details page on click is required the param should not be included
        detailsPagePath: '/consent',
        endpoint: '/api/consent-management/usersconsents',
        // In case no export is needed the export params should not be included
        exportFileName: 'consents',
        exportEndpoint: '/api/consent-management/usersconsents/export/csv',
        defaultSortOrder: { field: 'acceptedOn', type: 'desc' },
        defaultPagination: 15, // this is the number of results per page
        // field types are text/date/select
        // For all types additionally sorting and filtering can be deactivated by adding the param with false
        // date type requires the defaultValue to be an object with startDate: '' and endDate: ''
        // select type requires options Array with objects containing value and label strings
        fields: [
          { name: 'ID', value: 'indexedId', operator: 'Equal', type: 'text', defaultValue: '', stringParam: '', filtering: false, sorting: false },
          { name: 'Registration ID', value: 'referenceNumber', operator: 'Equal', type: 'text', defaultValue: '', stringParam: '' },
          { name: 'Client Number', value: 'clientNumber', operator: 'Equal', type: 'text', defaultValue: '', stringParam: '' },
          { name: 'Email', value: 'Email', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '' },
          { name: 'Phone Number', value: 'phoneNumber', operator: 'Contains', type: 'text', defaultValue: '', stringParam: '' },
          { name: 'Type', value: 'Type', operator: 'Equal', type: 'select', options: ConsentTypes, defaultValue: '', stringParam: '' },
          { name: 'Created On', value: 'acceptedOn', type: 'date', defaultValue: { startDate: '', endDate: '' }, stringParam: '' },
          { name: 'Expires On', value: 'expiresOn', type: 'date', defaultValue: { startDate: '', endDate: '' }, stringParam: '' },
          { name: 'Status', value: 'Status', operator: 'Equal', type: 'select', options: ConsentStatuses, defaultValue: '', stringParam: '' },
          { name: 'Acceptance Type', value: 'acceptanceType', operator: 'Equal', type: 'select', options: AcceptanceTypes, defaultValue: '', stringParam: '' },
          { name: 'Acceptance Link', value: 'acceptanceLink', operator: 'Equal', type: 'select', options: AcceptanceLinks, defaultValue: '', stringParam: '' },
          { name: 'Consent Type', value: 'Category', operator: 'Equal', type: 'select', options: ConsentCategory, defaultValue: '', stringParam: '' },
          { name: 'Source', value: 'Source', operator: 'Equal', type: 'select', options: ConsentSource, defaultValue: '', stringParam: '' }
        ],
        // Buttons should be included in separate objects in the below array and require the following params:
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
          id: o.id,
          indexedId: o.indexedId,
          type: o.type,
          status: o.status,
          acceptedOn: o.createdOn,
          expiresOn: o.expiredOn,
          category: o.category,
          source: o.source,
          acceptanceType: o.acceptanceType,
          acceptanceLink: o.acceptanceLink,
          referenceNumber: o.user.referenceNumber,
          clientNumber: o.user.clientNumber,
          email: o.user.email,
          phoneNumber: o.user.phoneNumber
        }
      ))
      mappedData.totalCount = array.totalCount
      return mappedData
    }
  }
}
</script>
