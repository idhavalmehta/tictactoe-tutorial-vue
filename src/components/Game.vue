<template>
  <div class="game">
    <div class="game-board">
      <Board :squares="current.squares" @clicked="handleClick($event)" />
    </div>
    <div class="game-info">
      <div>{{ status }}</div>
      <ol>
        <!-- {{ moves }} -->
        <li v-for="stepNumber in moves" :key="stepNumber.index">
          <button @click="jumpTo(stepNumber.index)">{{stepNumber.desc}}</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Board from '@/components/Board.vue';
import store, { FillSquarePayload, JumpStepPayload } from '@/store';

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Vue.extend({
  components: {
    Board,
  },
  computed: {
    current() {
      // eslint-disable-next-line prefer-destructuring
      const history = store.state.history;
      return history[store.state.stepNumber];
    },
    moves() {
      return store.state.history.map((board, stepNumber) => {
        const desc = stepNumber
          ? `Go to stepNumber #${stepNumber}`
          : 'Go to game start';
        return { index: stepNumber, desc };
      });
    },
    status() {
      // eslint-disable-next-line prefer-destructuring
      const current = this.current;
      const winner = calculateWinner(current.squares);

      let status;
      if (winner) {
        status = `Winner: ${winner}`;
      } else {
        const nextPlayer = store.state.xIsNext ? 'X' : 'O';
        status = `Next player:  ${nextPlayer}`;
      }

      return status;
    },
  },
  methods: {
    handleClick(i: number) {
      const history = store.state.history.slice(0, store.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = store.state.xIsNext ? 'X' : 'O';
      store.commit('fillSquare', {
        history: history.concat([
          {
            squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !store.state.xIsNext,
      } as FillSquarePayload);
    },
    jumpTo(step: number) {
      store.commit('jumpStep', {
        stepNumber: step,
        xIsNext: step % 2 === 0,
      } as JumpStepPayload);
    },
  },
});
</script>
