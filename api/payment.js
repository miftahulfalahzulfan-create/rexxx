export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, nominal } = req.body;
  const order_id = "ORDER-" + Date.now();

  const response = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64")
    },
    body: JSON.stringify({
      payment_type: "qris",
      transaction_details: {
        order_id,
        gross_amount: Number(nominal) * 1000
      }
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
