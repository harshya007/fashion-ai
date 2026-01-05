import axios from "axios";
import { auth } from "../firebase";

export const API_URL = "http://localhost:4000";

// 🔐 Auth header
async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

// 🤖 Chatbot
export async function sendChat(message: string) {
  const headers = await getAuthHeaders();
  const r = await axios.post(
    `${API_URL}/api/chat`,
    { message },
    { headers }
  );
  return r.data.reply;
}

// 🧥 Wardrobe
export async function uploadWardrobeItem(file: File) {
  const form = new FormData();
  form.append("image", file);
  const headers = { ...(await getAuthHeaders()), "Content-Type": "multipart/form-data" };
  const r = await axios.post(`${API_URL}/api/wardrobe/upload`, form, { headers });
  return r.data;
}

export async function getWardrobe() {
  const headers = await getAuthHeaders();
  const r = await axios.get(`${API_URL}/api/wardrobe`, { headers });
  return r.data.items;
}

export async function getWardrobeMock() {
  return [
    { id: "1", url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80", name: "Blue Jacket", tags: ["blue", "jacket"] },
    { id: "2", url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80", name: "White Tee", tags: ["white", "casual"] },
    { id: "3", url: "https://images.unsplash.com/photo-1520975915371-1a0a9378a2d0?w=800&q=80", name: "Brown Boots", tags: ["brown", "shoes"] },
  ];
}

// 👕 Outfit recommendation
export async function getRecommendations(data: { items: string[]; occasion: string; weather: string }) {
  const headers = await getAuthHeaders();
  const r = await axios.post(`${API_URL}/api/recommend`, data, { headers });
  return r.data.recommendations;
}

// 🧍‍♂️ Virtual try-on
export async function tryOn(person: File, cloth: File) {
  const form = new FormData();
  form.append("person", person);
  form.append("cloth", cloth);
  const headers = { ...(await getAuthHeaders()), "Content-Type": "multipart/form-data" };
  const r = await axios.post(`${API_URL}/api/try-on`, form, { headers });
  return r.data.result;
}
