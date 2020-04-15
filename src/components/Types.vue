<template>
  <div>
    <v-chip
      v-for="type in types"
      :key="type.name"
      :color="getColor(type)"
      dark
      class="caption text-uppercase"
    >
      {{ type }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "Types",
  props: ["types"],
  methods: {
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
    }
  }
};
</script>
