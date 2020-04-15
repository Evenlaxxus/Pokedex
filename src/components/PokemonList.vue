<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="hidden-sm-and-down">
        <v-card>
          <v-card-title>
            Filters
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <h3 class="pt-3">ID</h3>
            <v-row>
              <v-col>
                <v-text-field v-model="id_from" type="number" label="From">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="id_to" type="number" label="To">
                </v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <h3 class="pt-3">Type</h3>
            <v-row>
              <v-col>
                <v-text-field v-model="type" type="text" label="From">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="9-md-and-up">
        <v-expansion-panels class="hidden-md-and-up">
          <v-expansion-panel>
            <v-expansion-panel-header>Filters</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-row class="pt-2">
                <h4>ID</h4>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field v-model="id_from" type="number" label="From">
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="id_to" type="number" label="To">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="pt-2">
                <h4>Type</h4>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field v-model="type" type="text" label="From">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-text-field v-model="search" label="Search"></v-text-field>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="this.$store.getters.pokemons"
          :items-per-page="10"
          :search="search"
          :href-fn="createEditLink"
          class="elevation-1"
        >
          <template v-slot:item.name="{ item }">
            <span class="text-capitalize">
              {{ item.name }}
            </span>
          </template>
          <template v-slot:item.image="{ item }">
            <img
              v-if="item.image != null"
              :src="item.image"
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
          </template>
          <template v-slot:item.types="{ item }">
            <Types :types="item.types" />
          </template>
          <template v-slot:item.button="{ item }">
            <v-btn
              dark
              class="red darken-4"
              router
              @click="$router.push('/pokemonPage/' + item.id)"
            >
              {{ item.button }}
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import Types from "../components/Types";

export default {
  name: "PokemonList",
  components: {
    Types
  },
  data: () => ({
    selected: [],
    search: "",
    id_from: "",
    id_to: "",
    type: "",
    pokemons: [],
    pokemons_url: []
  }),
  computed: {
    headers() {
      return [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
          filter: value => {
            if (!this.id_from && !this.id_to) return true;
            let from = this.id_from;
            let to = this.id_to;
            if (from == "") from = 0;
            if (to == "") to = 964;
            return value >= parseInt(from) && value <= parseInt(to);
          }
        },
        { text: "Image", sortable: false, value: "image" },
        { text: "Name", value: "name" },
        {
          text: "Types",
          value: "types",
          filter: value => {
            if (!this.type) return true;
            return value.includes(this.type);
          }
        },
        { value: "button", sortable: false }
      ];
    }
  },
  methods: {
    ...mapMutations(["addPokemon"]),
    addPokemon(pokemon) {
      this.$store.commit("addPokemon", pokemon);
    },
    async getData() {
      await axios
        .get("http://pokeapi.co/api/v2/pokemon?limit=964")
        .then(res => {
          const urls = res.data.results;
          for (let i = 0; i < 964; i++) {
            this.pokemons_url.push(urls[i].url);
          }
        });
      for (let i = 0; i < 964; i++) {
        await axios
          .get(this.pokemons_url[i])
          .then(res => {
            const pokemon = res.data;
            this.addPokemon({
              id: pokemon.id,
              name: pokemon.name,
              types: pokemon.types.map(type => type.type.name),
              image: pokemon.sprites.front_default,
              button: "Details"
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    createEditLink() {
      return "/about";
    }
  },
  mounted() {
    if (this.$store.getters.pokemons.length == 0) this.getData();
  }
};
</script>
