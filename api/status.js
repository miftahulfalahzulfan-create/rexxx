import crypto from "crypto";
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { ref_id } = req.query;

    if (!ref_id) {
      return res.status(400).json({ error: "ref_id kosong" });
    }

    const USERNAME = process.env.USERNAME;
    const API_KEY = process.env.API_KEY;

    const sign = crypto
      .createHash("md5")
      .update(USERNAME + API_KEY + ref_id)
      .digest("hex");

    const response = await axios.post("https://api.digiflazz.com/v1/transaction", {
      username: USERNAME,
      ref_id,
      sign
    });

    const status = response.data?.data?.status || "Unknown";

    console.log("[STATUS CHECK]", ref_id, status);

    res.status(200).json({ status });

  } catch (err) {
    console.error("[STATUS ERROR]", err?.response?.data || err.message);
    res.status(500).json({ status: "Error", detail: err.message });
  }
}
