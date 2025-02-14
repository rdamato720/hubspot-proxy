import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const response = await axios.get("https://api.hubapi.com/scheduler/v3/meeting-links", {
            headers: {
                Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching meetings:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch meetings" });
    }
}
