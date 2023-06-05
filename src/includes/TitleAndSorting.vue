<template>
  <div class="row justify-content-between" @click="changeSort" style="cursor: pointer; word-wrap: normal;">
    <div class="col-10 pr-0">{{ title.name }}</div>
    <div class="col-2 pl-0 text-right" v-if="sorting !== false">
      <b-icon v-if="$parent.sortOrder !== '' && $parent.sortOrder.includes(title.value) && orderTypes[this.count] === 'asc'"
      class="align-middle"
      icon="arrow-up"
      variant="dark"></b-icon>
      <b-icon v-else-if="$parent.sortOrder !== '' && $parent.sortOrder.includes(title.value) && orderTypes[this.count] === 'desc'"
      class="align-middle"
      icon="arrow-down"
      variant="dark"></b-icon>
      <svg v-else version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12px" x="0px" y="0px"
      viewBox="0 0 489.389 489.389" style="enable-background:new 0 0 489.389 489.389;" xml:space="preserve">
        <path d="M261.294,326.102c-8.3-7.3-21.8-6.2-29.1,2.1l-77,86.8v-346.9c0-11.4-9.4-20.8-20.8-20.8s-20.8,9.4-20.8,20.8v346.9
        l-77-86.8c-8.3-8.3-20.8-9.4-29.1-2.1c-8.3,8.3-9.4,20.8-2.1,29.1l113.4,126.9c8.5,10.5,23.5,8.9,30.2,0l114.4-126.9
        C270.694,347.002,269.694,333.402,261.294,326.102z"/>
        <path d="M483.994,134.702l-112.4-126.9c-10-10.1-22.5-10.7-31.2,0l-114.4,126.9c-7.3,8.3-6.2,21.8,2.1,29.1
        c12.8,10.2,25.7,3.2,29.1-2.1l77-86.8v345.9c0,11.4,9.4,20.8,20.8,20.8s20.8-8.3,20.8-19.8v-346.8l77,86.8
        c8.3,8.3,20.8,9.4,29.1,2.1C490.194,155.502,491.294,143.002,483.994,134.702z"/>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleAndSorting',
  props: ['title', 'sorting'],
  data () {
    return {
      orderTypes: ['asc', 'desc'],
      count: 0
    }
  },
  methods: {
    changeSort () {
      if (this.sorting !== false) {
        this.count++
        if (this.count === this.orderTypes.length) {
          this.count = 0
        }
        this.$parent.sortOrder = `&Order.${this.title.sortValue ? this.title.sortValue : this.title.value}.type=${this.orderTypes[this.count]}`
      }
    }
  }
}
</script>
