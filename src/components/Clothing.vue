<template>
  <v-container>
    <v-row> 
      <v-col>
        <template v-for="(item) in clothing" :key="item" :item = "item">
          <StoreItem :prod = "item"></StoreItem>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import StoreItem from './StoreItem.vue';
  import { useProductStore } from '../stores/ProductStore';

  const store = useProductStore();
  const clothing = store.filterByCategory('Clothing');

</script>
