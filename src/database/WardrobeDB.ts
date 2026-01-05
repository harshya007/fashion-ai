import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const wardrobeRef = collection(db, "wardrobe");

export async function addClothingItem(item: any) {
  return addDoc(wardrobeRef, item);
}

export async function getWardrobe() {
  const snap = await getDocs(wardrobeRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
