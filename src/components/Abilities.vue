<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-1 subtitle-1 text-capitalize">
        {{ ability.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content class="px-1">
        {{ ability.effect }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "Abilities",
  props: ["ability"]
};
</script>
