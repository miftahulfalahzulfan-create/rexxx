import crypto from "crypto";
import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method tidak diizinkan" });
    }

    const { userId, nominal } = req.body || {};

    if (!userId || !nominal) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const USERNAME = process.env.USERNAME;
    const API_KEY = process.env.API_KEY;

    if (!USERNAME || !API_KEY) {
      return res.status(500).json({ error: "ENV belum diset" });
    }

    const ref_id = "TRX" + Date.now();

    const sign = crypto
      .createHash("md5")
      .update(USERNAME + API_KEY + ref_id)
      .digest("hex");

    const response = await axios.post("https://api.digiflazz.com/v1/transaction", {
      username: USERNAME,
      buyer_sku_code: nominal,
      customer_no: userId,
      ref_id,
      sign
    });

    console.log("[TOPUP SUCCESS]", ref_id, response.data);

    res.status(200).json(response.data);

  } catch (err) {
    console.error("[TOPUP ERROR]", err?.response?.data || err.message);
    res.status(500).json({ error: "Gagal transaksi", detail: err.message });
  }
}
