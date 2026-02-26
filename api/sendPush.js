export default async function handler(req, res) {
  const order = req.body;

  const message = {
    app_id: "3854b8dd-3b56-434a-9e65-0a67564cf920",
    include_player_ids: ["PLAYER_ID_1"],
    headings: { "en": "New Order Received!" },
    contents: { "en": `Order #${order.id} placed by ${order.email}` }
  };

  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic ofyb7firtubtnb5jiu2aosyez"
    },
    body: JSON.stringify(message)
  });

  const result = await response.json();
  res.status(200).json(result);
}