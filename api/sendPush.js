export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const order = req.body;

    console.log("ORDER RECEIVED:", order);

    const message = {
      app_id: "71226e07-3e72-4611-a750-9183d5600c8c",
      include_player_ids: ["95365288-8e21-4261-997e-0a13d87e1c89"],
      headings: { en: "New Order Received!" },
      contents: { en: `Order #${order.id} from ${order.email}` },
    };

    const response = await fetch(
      "https://onesignal.com/api/v1/notifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Basic os_v2_app_oerg4bz6ojdbdj2qsgb5kyamrtyhfsiq33xeatupjsiknamplilejsrgs3svempt5salkygfebf5wfd3urf2meukks7bbxw4vftuwwi",
        },
        body: JSON.stringify(message),
      }
    );

    const result = await response.json();
    return res.status(200).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}