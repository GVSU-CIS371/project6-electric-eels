import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  setDoc,
} from "firebase/firestore";
    import { db } from "../main";
    import { Product } from "../types/product";

export function createItem(id: string, data: Product) {
    const doc1 = doc(db, "products", id);
    setDoc(doc1, {data: data})
    .then(() => {
        console.log("Document written with ID: ", doc1.id);})
    .catch((error) => {
        console.log("Failed to add document ", doc1.id, ":", error);
    });
}

export function addItem(data: Product) {
    const coll = collection(db, "products");
    let doc1: DocumentReference = doc(db, "products", "temp");
    addDoc(coll, {data: data})
    .then((docRef: DocumentReference) => {
        console.log("Document written with ID: ", docRef.id);
        doc1 = docRef;
        return docRef;
    })
    .catch((error) => {
        console.log("Failed to add document: ", error);
        return doc1;
    });
    return doc1;
}
    