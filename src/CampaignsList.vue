<template>
  <div>
    <TableBuilder :fields="tableSettings.fields"
    :actionButtons="tableSettings.actionButtons"
    :exportFileName="tableSettings.exportFileName"
    :detailsPagePath="tableSettings.detailsPagePath"
    :endpoint="tableSettings.endpoint"
    :exportEndpoint="tableSettings.exportEndpoint"
    :defaultSortOrder="tableSettings.defaultSortOrder"
    :defaultPagination="tableSettings.defaultPagination"
    :naviButton="tableSettings.naviButton" />
  </div>
</template>

<script>
import TableBuilder from '../../mixins/table-builder/TableBuilder.vue'

export default {
  name: 'CampaignsList',
  data () {
    return {
      tableSettings: {
        // in case no details page on click is required the param should not be included
        detailsPagePath: '/marketing/campaign',
        endpoint: '/api/campaign-management/campaigns',
        // In case no export is needed the export params should not be included
        exportFileName: 'campaigns',
        exportEndpoint: '/api/campaign-management/campaigns/export/csv',
        // In case no navi button is needed the object should not be included
        naviButton: { name: 'Create New Campaign', path: '/marketing/campaign/create' },
        defaultSortOrder: { field: 'CreatedOn', type: 'desc' },
        defaultPagination: 15, // this is the number of results per page
        // field types are text/date/select
        // For all types additionally sorting and filtering can be deactivated by adding the param with false
        // date type requires the defaultValue to be an object with startDate: '' and endDate: ''
        // select type requires options Array with objects containing value and label strings
        fields: [
          { name: 'ID', value: 'indexedId', operator: 'Equal', type: 'text', defaultValue: '', stringParam: '' },
          { name: 'Name', value: 'Name', operator: 'Equal', type: 'text', defaultValue: '', stringParam: '' },
          { name: 'Created On', value: 'createdOn', type: 'date', defaultValue: { startDate: '', endDate: '' }, stringParam: '' },
          { name: 'Expires On', value: 'expiresOn', type: 'date', defaultValue: { startDate: '', endDate: '' }, stringParam: '' },
          { name: 'Type', value: 'Type', operator: 'Equal', type: 'select', options: [{ value: 'All', label: 'All' }, { value: 'Referral', label: 'Referral' }], defaultValue: '', stringParam: '' },
          { name: 'Status', value: 'Status', operator: 'Equal', type: 'select', options: [{ value: 'All', label: 'All' }, { value: 'Active', label: 'Active' }, { value: 'Disabled', label: 'Disabled' }, { value: 'Initial', label: 'Initial' }, { value: 'Completed', label: 'Completed' }], defaultValue: '', stringParam: '' }
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
          name: o.name,
          createdOn: o.createdOn,
          expiresOn: o.expiresOn,
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
