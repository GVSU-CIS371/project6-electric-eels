import {
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { db } from "../main";


export function deleteItem(id: string) {
    deleteDoc(doc(db, "products", id))
    .then(() => {
        console.log("Document deleted with ID: ", id);})
    .catch((error) => {
        console.log("Failed to delete document ", id, ":", error);
    });
}