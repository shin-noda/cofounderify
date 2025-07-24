import type { VercelRequest, VercelResponse } from "@vercel/node";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { publicId } = req.body;

  if (!publicId) {
    res.status(400).json({ error: "Missing publicId" });
    return;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
}