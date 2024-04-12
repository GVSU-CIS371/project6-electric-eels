<template>
  <v-container>
    <v-row> 
      <v-col>
        <template v-for="(item) in groceries" :key="item" :item = "item">
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
  const groceries = store.filterByCategory('Groceries');

</script>
