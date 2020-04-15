<template>
  <v-row class="headline pt-0">
    <v-col>
      <span class="text-uppercase font-weight-regular caption"> id </span>
      <div v-text="id"></div>
    </v-col>
    <v-col>
      <span class="text-uppercase font-weight-regular caption">
        weight
      </span>
      <div v-text="weight"></div>
    </v-col>
    <v-col>
      <span class="text-uppercase font-weight-regular caption">
        height
      </span>
      <div v-text="height"></div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "BasicInfo",
  props: ["id", "weight", "height"]
};
</script>
