export default async function handler(req, res) {
  const { order_id } = req.query;

  const response = await fetch(
    "https://api.sandbox.midtrans.com/v2/" + order_id + "/status",
    {
      headers: {
        "Authorization": "Basic " + Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64")
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
