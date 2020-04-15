<template>
  <div class="home">
    <PokemonList />
  </div>
</template>

<script>
// @ is an alias to /src
import PokemonList from "../components/PokemonList";

export default {
  name: "Home",
  components: {
    PokemonList
  }
};
</script>
