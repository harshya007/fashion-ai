import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(file: File) {
  const imgRef = ref(storage, `clothes/${Date.now()}-${file.name}`);

  await uploadBytes(imgRef, file);
  return await getDownloadURL(imgRef);
}
