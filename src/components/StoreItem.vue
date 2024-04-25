<template>
  <v-card class="store-item" height="100%" hover>
      <v-img :src="product.data?.image" height="200px"></v-img>
      <v-card-title>{{ product.data?.name }}</v-card-title>
      <v-card-subtitle>
          <v-rating v-model="product.data.rating" color="amber" size="14" readonly class="ma-2"></v-rating>
          <span class="ma-2">
              <v-icon style="color: green;">mdi-cash</v-icon> ${{ product.data.price }}
          </span>
          <span class="ma-2">
              <v-icon style="color: blue">mdi-package-variant-closed</v-icon> {{ product.data.stock }}
          </span>
      </v-card-subtitle>
      <v-card-text v-if="!editMode">{{ product.data.description }}</v-card-text>
      <v-card-actions v-if="!editMode">
          <v-btn color="primary" @click="editMode = true">Modify</v-btn>
          <v-btn color="error" @click="deleteItem">Delete</v-btn>
      </v-card-actions>
      <div v-else>
          <v-text-field v-model="editedItem.data.name" label="Name"></v-text-field>
          <v-text-field v-model="editedItem.data.description" label="Description"></v-text-field>
          <v-text-field v-model="editedItem.data.price" label="Price" type="number"></v-text-field>
          <v-rating v-model="editedItem.data.rating" color="amber" size="14" dense></v-rating>
          <v-text-field v-model="editedItem.data.stock" label="Stock" type="number"></v-text-field>
          <v-text-field v-model="editedItem.data.image" label="Image URL"></v-text-field>
          <v-select v-model="editedItem.data.category" :items="categories" label="Category"></v-select>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="cancelEdit">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="updateItem">Update</v-btn>
          </v-card-actions>
      </div>
  </v-card>
</template>

<script lang="ts" setup>
import { ProductDoc } from '../types/product';
import { useProductStore } from '../stores/ProductStore';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { db } from "../main";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const props = defineProps<{ prod: ProductDoc }>();
const store = useProductStore();
const product = reactive({ ...props.prod });
const categories = ['Groceries', 'Electronics', 'Clothing']

let unsubscribe: () => void;
onMounted(() => {
  const docRef = doc(db, "products", props.prod.id);
  unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      product.data = doc.data().data;
    } else {
      console.log("No such document!");
    }
  });
});

onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe();
    }
});

const editMode = ref(false);
const editedItem = reactive({ ...props.prod });

const deleteItem = async () => {
    const confirmed = confirm(`Are you sure you want to delete ${props.prod.data.name}?`);
    console.log("Deleting ID:", props.prod.id);
    if (confirmed) {
        store.deleteProduct(props.prod.id)
    }
}

const updateItem = async () => {
    const confirmed = confirm(`Are you sure you want to update ${props.prod.data.name}?`);

    if (confirmed) {
        Object.assign(product.data, editedItem.data)
        const docRef = doc(db, "products", props.prod.id);
        await updateDoc(docRef, editedItem)
        .catch((error) => {
            console.error("Failed to update: ", error);
            Object.assign(product.data, props.prod.data);
        });
        editMode.value = false;
    }
}

const cancelEdit = () => {
    editedItem.data = { ...props.prod.data };
    editMode.value = false;
}
</script>