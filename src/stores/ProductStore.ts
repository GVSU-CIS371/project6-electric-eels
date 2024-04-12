import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export const useProductStore = defineStore("ProductStore", {
  //initProducts is the list of items
  //ProductDoc is the type of each item
  /*
  ProductDoc {
    id: string;
    data: { //Product
      name: string;
      description: string;
      price: number;
      rating: number;
      category: string;
      image: string;
    };
  }
  */


  state: () => {
      return { items: [] as ProductDoc[] };
    },
    actions: {
      init() {
        this.items = initProducts;
      },
      filterByCategory(category: string) {
        return this.items.filter((item) => item.data.category === category);
      },
      filterByRating(minRating: number) {
        return this.items.filter((item) => item.data.rating >= minRating);
      }
    },
});
