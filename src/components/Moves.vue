<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-1 subtitle-1 text-capitalize">
        <v-row class="pa-0">
          <v-col cols="6" class="py-0">
            {{ move.name }}
          </v-col>
          <v-col cols="6" class="text-right py-0">
            <Types :types="[move.type]" />
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="px-1 pt-1">
        {{ move.effect }}
      </v-expansion-panel-content>
      <v-divider></v-divider>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Types from "../components/Types";

export default {
  name: "Moves",
  props: ["move"],
  components: {
    Types
  }
};
</script>
