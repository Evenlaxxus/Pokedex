<template>
  <v-container>
    <v-btn dark class="red darken-4 mb-4" router to="/">
      Pokemon List
    </v-btn>
    <v-card class="text-center">
      <img
        v-if="pokemon.image != null"
        :src="pokemon.image"
        alt="Noone has seen this pokemon yet."
        height="200"
        width="200"
      />
      <img v-else src="../assets/question_mark.png" height="200" width="200" />
      <v-card-text class="display-1 pt-0 text-capitalize">
        {{ pokemon.name }}
      </v-card-text>
      <Types :types="pokemon.types" />
      <v-card-text>
        <BasicInfo
          :id="pokemon.id"
          :weight="pokemon.weight"
          :height="pokemon.height"
        />
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-row>
              <span class="text-uppercase font-weight-regular caption pl-1">
                abilities
              </span>
            </v-row>
            <v-row v-for="ability in pokemon.abilities" :key="ability.name">
              <Abilities :ability="ability" />
            </v-row>
            <v-divider></v-divider>
            <v-row class="pt-2">
              <span class="text-uppercase font-weight-regular caption pl-1">
                evolutions
              </span>
            </v-row>
            <v-row>
              <v-col
                v-for="(evolution, index) in pokemon.evolutions"
                :key="index"
                @click="getPokemon(evolution.id)"
              >
                <img
                  v-if="evolution.image != null"
                  :src="evolution.image"
                  alt="Noone has seen this pokemon yet."
                  height="64"
                  width="64"
                />
                <img
                  v-else
                  src="../assets/question_mark.png"
                  height="64"
                  width="64"
                />
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="pt-2">
              <span class="text-uppercase font-weight-regular caption pl-1">
                moves
              </span>
            </v-row>
            <v-row v-for="move in pokemon.moves" :key="move.name">
              <Moves :move="move" />
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import BasicInfo from "../components/BasicInfo";
import Abilities from "../components/Abilities";
import Types from "../components/Types";
import Moves from "../components/Moves";

export default {
  name: "PokemonPage",
  components: {
    Abilities,
    BasicInfo,
    Types,
    Moves
  },
  props: ["id"],
  data: () => ({
    pokemon: []
  }),
  methods: {
    getPokemon(id) {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(res => {
          const pokemon = res.data;
          this.pokemon = {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map(type => type.type.name),
            image: pokemon.sprites.front_default,
            weight: pokemon.weight,
            height: pokemon.height,
            abilities: [],
            evolutions: [],
            moves: []
          };
          pokemon.abilities.map(ability =>
            this.getAbility(ability.ability.url)
          );
          pokemon.moves.map(move => this.getMoves(move.move.url));
          this.getEvolutions(pokemon.species.url);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAbility(path) {
      axios
        .get(path)
        .then(res => {
          const ability_data = res.data;

          this.pokemon.abilities.push({
            name: ability_data.name,
            effect: ability_data.effect_entries[0].effect
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getMoves(path) {
      await axios
        .get(path)
        .then(res => {
          const move_data = res.data;

          this.pokemon.moves.push({
            name: move_data.name,
            type: move_data.type.name,
            effect: move_data.effect_entries[0].effect
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getEvolutions(path) {
      let url = "";
      await axios
        .get(path)
        .then(res => {
          url = res.data.evolution_chain.url;
        })
        .catch(error => {
          console.log(error);
        });

      axios
        .get(url)
        .then(res => {
          let evolution_data = res.data.chain;

          while (evolution_data.evolves_to != null) {
            this.pokemon.evolutions.push({
              name: evolution_data.species.name,
              image: this.getSprite(evolution_data.species.name),
              id: this.getId(evolution_data.species.name)
            });
            if (evolution_data.evolves_to[0] != undefined) {
              evolution_data = evolution_data.evolves_to[0];
            } else {
              break;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSprite(pokemonName) {
      for (let i = 0; i < 964; i++) {
        if (this.$store.getters.pokemons[i].name == pokemonName) {
          return this.$store.getters.pokemons[i].image;
        }
      }
    },
    getId(pokemonName) {
      for (let i = 0; i < 964; i++) {
        if (this.$store.getters.pokemons[i].name == pokemonName) {
          return this.$store.getters.pokemons[i].id;
        }
      }
    }
  },
  mounted() {
    this.getPokemon(this.id);
  }
};
</script>
