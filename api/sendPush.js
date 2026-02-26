export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const order = req.body;

    const message = {
      app_id: "3854b8dd-3b56-434a-9e65-0a67564cf920", 
      include_player_ids: ["95365288-8e21-4261-997e-0a13d87e1c89"],
      headings: { en: "New Order Received!" },
      contents: { en: `Order #${order.id} from ${order.email}` },
    };

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic ofyb7firtubtnb5jiu2aosyez",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}