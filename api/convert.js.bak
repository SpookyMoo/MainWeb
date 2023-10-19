const fetch = require('node-fetch');

exports.default = async (req, res) => {
    try {
        const { from_currency, to_currency, amount } = req.query;

        // Fetching conversion rates without the amount
        const endpoint = `http://api.coinlayer.com/live?access_key=YOUR_API_KEY&from=${from_currency}&to=${to_currency}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success) {
            // Calculate the conversion using the fetched rate and the provided amount
            const rate = data.rates[to_currency];
            const convertedAmount = amount * rate;

            res.status(200).send({ convertedAmount: convertedAmount.toFixed(2) });
        } else {
            res.status(500).send({ error: "Failed to fetch conversion rates." });
        }
    } catch (error) {
        res.status(500).send({ error: "Server error." });
    }
};
