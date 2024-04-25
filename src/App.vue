<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
      <v-btn color="secondary" @click="showAddProductDialog = true">
        <v-icon>mdi-plus</v-icon>
        Add Product
      </v-btn>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>

    <v-dialog v-model="showAddProductDialog" persistent max-width="600px">
      <v-card>
        <v-card-text>
          <AddItem @closeDialog="showAddProductDialog = false" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="showAddProductDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";


import { useProductStore } from './stores/ProductStore';
import AddItem from "./components/AddItem.vue";

const store = useProductStore();
store.init();

const showAddProductDialog = ref(false);

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);
</script>
