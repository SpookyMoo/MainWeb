const fetch = require('node-fetch');

export default async (req, res) => {
    try {
        const { from_currency, to_currency, amount } = req.query;

        const apiKey = 'CG-pdiRXN42KbFSkwxqQyekSDxa';
        const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${from_currency},${to_currency}&x_cg_demo_api_key=${apiKey}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (data && data.length === 2) {
            const rate_from = data.find(coin => coin.id === from_currency).current_price;
            const rate_to = data.find(coin => coin.id === to_currency).current_price;

            // Calculate the conversion
            const convertedAmount = (amount / rate_from) * rate_to;

            res.status(200).json({ convertedAmount: convertedAmount.toFixed(2) });
        } else {
            res.status(500).json({ error: "Currency pair not found in the response." });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
};
