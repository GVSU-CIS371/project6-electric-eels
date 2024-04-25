<template>
    <v-card>
      <v-card-title>Add New Product</v-card-title>
      <v-card-text>
        <v-text-field v-model="newItem.name" label="Name"></v-text-field>
        <v-text-field v-model="newItem.description" label="Description"></v-text-field>
        <v-text-field v-model="newItem.price" label="Price" type="number"></v-text-field>
        <v-text-field v-model="newItem.stock" label="Stock" type="number"></v-text-field>
        <v-text-field v-model="newItem.rating" label="Rating" type="number"></v-text-field>
        <v-text-field v-model="newItem.image" label="Image URL"></v-text-field>
        <v-select v-model="newItem.category" :items="categories" label="Category"></v-select>
        <v-btn color="primary" @click="createItem">Add Item</v-btn>
      </v-card-text>
    </v-card>
</template>
  
<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import { Product } from '../types/product';
  
const store = useProductStore();
const categories = ['Groceries', 'Electronics', 'Clothing']

const newItem: Ref<Product> = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  image: '',
  category: '',
  rating: 0
});
  
  const createItem = async () => {
  if (newItem.value.name && newItem.value.price) {
    const confirmed = confirm("Are you sure you want to make this new item?")
    if (confirmed) {
      await store.addProduct(newItem.value);
    }
  } else {
    alert("Please fill in all required fields.");
  }
};
</script>