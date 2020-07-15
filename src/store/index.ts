import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface Board {
  squares: string[];
}

export interface State {
  xIsNext: boolean;
  stepNumber: number;
  history: Board[];
}

export interface FillSquarePayload {
  history: Board[];
  stepNumber: number;
  xIsNext: boolean;
}

export interface JumpStepPayload {
  stepNumber: number;
  xIsNext: boolean;
}

export default new Vuex.Store({
  state: {
    xIsNext: true,
    stepNumber: 0,
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
  } as State,
  mutations: {
    fillSquare(state: State, payload: FillSquarePayload) {
      state.history = payload.history;
      state.stepNumber = payload.stepNumber;
      state.xIsNext = payload.xIsNext;
    },
    jumpStep(state: State, payload: JumpStepPayload) {
      state.stepNumber = payload.stepNumber;
      state.xIsNext = payload.xIsNext;
    },
  },
  actions: {},
  modules: {},
});
