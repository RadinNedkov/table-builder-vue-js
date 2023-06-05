<template>
  <b-modal size="lg"
    :id="modal.name"
    :title="modal.title"
    hide-footer
    @hidden="resetModal">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group>
        <b-form class>
          <div v-for="(field, index) in formFields" :key="index">
            <label v-if="field.value !== 'userId'" :for="field.value">{{ field.name + ':' }}</label>

            <b-form-input
            v-if="field.type === 'text' && field.value === 'userId'"
            class="sr-only"
            v-model="field.defaultValue"
            :id="field.value">
            </b-form-input>

            <b-form-input
            v-if="field.type === 'text' && field.value !== 'userId'"
            class="mb-2"
            :id="field.value"
            v-model="field.defaultValue">
            </b-form-input>

            <b-form-select
            v-if="field.type === 'select'"
            class="mb-2"
            v-model="field.defaultValue"
            :id="field.value"
            :options="field.options">
            </b-form-select>

            <b-form-datepicker
            v-if="field.type === 'date'"
            class="mb-2"
            :id="field.value"
            v-model="field.defaultValue">
            </b-form-datepicker>
          </div>
          <b-button variant="danger" @click="onSubmit" class="mt-4 float-right">Submit</b-button>
          <b-button variant="danger" class="mt-4 float-left" @click="$bvModal.hide(modal.name)">{{ 'Cancel' }}</b-button>
        </b-form>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: 'ActionBtnModal',
  props: ['modal', 'selectedId'],
  data () {
    return {
      formFields: []
    }
  },
  mounted () {
    this.formFields = this.modal.fields
    this.formFields.forEach(o => {
      if (o.value === 'userId') {
        o.defaultValue = this.selectedId
      }
    })
  },
  methods: {
    resetModal () {
      this.formFields.forEach(o => {
        o.defaultValue = ''
      })
    },
    onSubmit () {
      this.formFields.forEach(o => {
        this.$set(this.$parent.modalFormData, o.value, o.defaultValue)
      })
      this.$bvModal.hide(this.modal.name)
    }
  }
}
</script>
