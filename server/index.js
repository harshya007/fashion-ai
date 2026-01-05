// -------------------------------
// Fashion-AI Backend (Node.js)
// -------------------------------
import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import Replicate from "replicate";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 4000;

// -------------------------------
// MIDDLEWARES
// -------------------------------
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// -------------------------------
// FILE UPLOAD CONFIG
// -------------------------------
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/"),
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// -------------------------------
// AI SETUP
// -------------------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const gemini = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY
});

// -------------------------------
// TEMP USER STORE (replace with DB later)
// -------------------------------
const users = [];
const wardrobeItems = [];

// -------------------------------
// ROUTES
// -------------------------------

// 🟢 ROOT CHECK
app.get("/", (_, res) => {
  res.send("🚀 Fashion-AI Backend is running");
});

// -------------------------------
// 🔐 AUTH — SIGNUP
// -------------------------------
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const exists = users.find(u => u.email === email);
  if (exists)
    return res.status(409).json({ message: "User already exists" });

  users.push({ name, email, password });

  res.json({
    success: true,
    user: { name, email }
  });
});

// -------------------------------
// 🧥 1) UPLOAD WARDROBE ITEM
// -------------------------------
app.post(
  "/api/wardrobe/upload",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file received" });
    }

    const item = {
      id: Date.now().toString(),
      url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    };

    wardrobeItems.push(item);

    // 🔥 Return item object (frontend expects this)
    res.json(item);
  }
);

// -------------------------------
// 🧥 2) GET WARDROBE LIST
// -------------------------------
app.get("/api/wardrobe", (_, res) => {
  res.json({ items: wardrobeItems });
});

// -------------------------------
// 🤖 3) CHATBOT (GEMINI)
// -------------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const result = await gemini.generateContent(message);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot Error:", err);
    res.status(500).json({ error: "AI Chatbot failed" });
  }
});

// -------------------------------
// 👗 4) OUTFIT RECOMMENDATION
// -------------------------------
app.post("/api/recommend", async (req, res) => {
  try {
    const { items, occasion, weather } = req.body;

    const prompt = `
You are a professional fashion stylist.

Wardrobe:
${JSON.stringify(items, null, 2)}

Occasion: ${occasion}
Weather: ${weather}

Suggest 3 outfits in bullet points.
    `;

    const result = await gemini.generateContent(prompt);
    const text = result.response.text();

    res.json({ recommendations: text });
  } catch (err) {
    console.error("Recommendation Error:", err);
    res.status(500).json({ error: "Recommendation failed" });
  }
});

// -------------------------------
// 🧍 5) VIRTUAL TRY-ON (REPLICATE)
// -------------------------------
app.post(
  "/api/try-on",
  upload.fields([{ name: "person" }, { name: "cloth" }]),
  async (req, res) => {
    try {
      const person = req.files["person"]?.[0];
      const cloth = req.files["cloth"]?.[0];

      if (!person || !cloth)
        return res.status(400).json({ error: "Missing images" });

      const personUrl = `http://localhost:${PORT}/uploads/${person.filename}`;
      const clothUrl = `http://localhost:${PORT}/uploads/${cloth.filename}`;

      const output = await replicate.run(
        "fofr/virtual-try-on:7b5e1d78ee12e07916b69cb47d8144a6",
        {
          input: {
            image: personUrl,
            garment: clothUrl
          }
        }
      );

      res.json({ result: output });
    } catch (err) {
      console.error("Try-On Error:", err);
      res.status(500).json({ error: "Virtual try-on failed" });
    }
  }
);

// -------------------------------
// SERVER START
// -------------------------------
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
