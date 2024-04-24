import {
    doc,
    DocumentReference,
    updateDoc,
  } from "firebase/firestore";

import { db } from "../main";
import { Product } from "../types/product";

export function updateItem(id: string, data: Product) {
    const docRef:DocumentReference = doc(db, "products", id);
    updateDoc(docRef, {data: data})
    .then(() => {
        console.log("Document updated with ID: ", docRef.id);})
    .catch((err) => {
        console.log("Failed to update document ", docRef.id, ":", err);
    });
}