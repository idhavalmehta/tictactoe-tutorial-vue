<template>
  <button class="square" @click="emitClick()">{{ value }}</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: String,
  },
  methods: {
    emitClick() {
      this.$emit('clicked');
    },
  },
});
</script>
