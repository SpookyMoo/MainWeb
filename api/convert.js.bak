// api/convert.js
import fetch from 'node-fetch';

export default async (req, res) => {
    const { from_currency, to_currency } = req.query;

    const API_ENDPOINT = `http://api.coinlayer.com/live?access_key=${process.env.CURRENCY_API_KEY}`;

    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        if (data.success) {
            const rate = data.rates[to_currency] / data.rates[from_currency];
            res.status(200).json({ rate: rate });
        } else {
            res.status(500).json({ error: data.error.info });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversion rate' });
    }
};
