const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { from_currency, to_currency, amount } = req.query;
    const API_KEY = 'USDBTC';
    const ENDPOINT = `http://api.coinlayer.com/live?access_key=${API_KEY}`;

    try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        
        if (!data || !data.rates) {
            res.status(400).send({ success: false, error: "Failed to fetch conversion rates." });
            return;
        }

        const conversionRate = data.rates[to_currency] / data.rates[from_currency];
        const convertedAmount = amount * conversionRate;

        res.status(200).send({ success: true, amount: convertedAmount.toFixed(2) });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};
