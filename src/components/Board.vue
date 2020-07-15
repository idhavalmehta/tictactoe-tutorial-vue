<template>
  <div>
    <div class="board-row">
      <Square :value="renderSquare(0)" @clicked="forwardClick(0)" />
      <Square :value="renderSquare(1)" @clicked="forwardClick(1)" />
      <Square :value="renderSquare(2)" @clicked="forwardClick(2)" />
    </div>
    <div class="board-row">
      <Square :value="renderSquare(3)" @clicked="forwardClick(3)" />
      <Square :value="renderSquare(4)" @clicked="forwardClick(4)" />
      <Square :value="renderSquare(5)" @clicked="forwardClick(5)" />
    </div>
    <div class="board-row">
      <Square :value="renderSquare(6)" @clicked="forwardClick(6)" />
      <Square :value="renderSquare(7)" @clicked="forwardClick(7)" />
      <Square :value="renderSquare(8)" @clicked="forwardClick(8)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Square from '@/components/Square.vue';

export default Vue.extend({
  props: {
    squares: Array,
  },
  components: {
    Square,
  },
  methods: {
    renderSquare(i: number) {
      return this.squares[i];
    },
    forwardClick(i: number) {
      this.$emit('clicked', i);
    },
  },
});
</script>
