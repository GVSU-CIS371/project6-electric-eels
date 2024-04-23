<template>
  <v-card class="store-item" height="100%" hover>
    <v-img :src="image" height="200px"></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>
      <v-rating
        v-model="rating"
        color="amber"
        size="14"
        readonly
        class="ma-2"
      ></v-rating>
    <span class="ma-2">
      <v-icon style="color: green;">mdi-cash</v-icon> ${{ price }}
    </span>
    <span class="ma-2">
      <v-icon style="color: blue">mdi-package-variant-closed</v-icon> {{ stock }}
    </span>
    </v-card-subtitle>
    <v-card-text>{{ description }}</v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import { ProductDoc } from '../types/product';
  import { ref } from 'vue';
  import { db } from "../main";
  import { doc } from "firebase/firestore";
  
  const exampleRef = doc(db, 'products', 'product1')


  const props = defineProps<{prod: ProductDoc}>();

  const info = props.prod.data;
  const name = info.name;
  const image = info.image;
  const rating = ref(info.rating);
  const price = info.price;
  const stock = info.stock;
  const description = info.description;

</script>
