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
      <v-chip
        v-for="(type, index) in pokemon.types"
        :key="index"
        :color="getColor(type)"
        dark
      >
        {{ type }}
      </v-chip>
      <v-card-text>
        <v-row class="headline pt-0">
          <v-col>
            <span class="text-uppercase font-weight-regular caption"> id </span>
            <div v-text="pokemon.id"></div>
          </v-col>
          <v-col>
            <span class="text-uppercase font-weight-regular caption">
              weight
            </span>
            <div v-text="pokemon.weight"></div>
          </v-col>
          <v-col>
            <span class="text-uppercase font-weight-regular caption">
              height
            </span>
            <div v-text="pokemon.height"></div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-row>
              <span class="text-uppercase font-weight-regular caption pl-1">
                abilities
              </span>
            </v-row>
            <v-row v-for="(ability, index) in pokemon.abilities" :key="index">
              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    class="px-1 subtitle-1 text-capitalize"
                  >
                    {{ ability.name }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="px-1">
                    {{ ability.effect }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
                @click="changePokemon(evolution.id)"
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "PokemonPage",
  components: {},
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
            evolutions: []
          };
          pokemon.abilities.map(ability =>
            this.getAbility(ability.ability.url)
          );
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
    },
    getColor(type) {
      switch (type) {
        case "fire":
          return "red";
        case "water":
          return "blue";
        case "grass":
          return "light-green";
        case "poison":
          return "purple";
        case "bug":
          return "lime";
        case "flying":
          return "light-blue lighten-3";
        case "dark":
          return "black";
        case "steel":
          return "grey";
        case "dragon":
          return "deep-purple darken-2";
        case "ground":
          return "brown darken-3";
        case "electric":
          return "amber";
        case "fairy":
          return "pink";
        case "ice":
          return "cyan lighten-3";
        case "ghost":
          return "deep-purple darken-4";
        case "normal":
          return "blue-grey lighten-1";
        case "psychic":
          return "purple darken-2";
        case "rock":
          return "brown lighten-1";
        case "fighting":
          return "pink darken-4";

        default:
          return "grey";
      }
    },
    changePokemon(id) {
      id;
      this.getPokemon(id);
    }
  },
  mounted() {
    this.getPokemon(this.id);
  }
};
</script>
