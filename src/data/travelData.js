import express from "express";
import Deal from "../models/Deal.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;