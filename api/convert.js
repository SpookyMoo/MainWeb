// api/convert.js
import fetch from 'node-fetch';

export default async (req, res) => {
    const { from_currency, to_currency } = req.query;

    const API_ENDPOINT = `http://api.coinlayer.com/live?access_key=${process.env.USDBTC}&symbols=${to_currency}&source=${from_currency}`;

    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        if (data.success) {
            const conversionRate = data.rates[to_currency];
            res.status(200).json({ rate: conversionRate });
        } else {
            res.status(500).json({ error: data.error.info });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversion rate' });
    }
};
