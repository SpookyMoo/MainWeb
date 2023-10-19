// api/convert.js
import fetch from 'node-fetch';

export default async (req, res) => {
    const { from_currency, to_currency, amount } = req.query;

    const API_ENDPOINT = `http://api.coinlayer.com/convert?access_key=${process.env.USDBTC}&from=${from_currency}&to=${to_currency}&amount=${amount}`;

    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        if (data.success) {
            res.status(200).json({ result: data.result });
        } else {
            res.status(500).json({ error: data.error.info });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversion rate' });
    }
};
