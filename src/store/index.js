import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: []
  },
  getters: {
    pokemons: state => {
      return state.pokemons;
    }
  },
  mutations: {
    addPokemon: (state, pokemon) => state.pokemons.push(pokemon)
  },
  actions: {},
  modules: {}
});
