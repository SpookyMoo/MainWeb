const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const { from_currency, to_currency, amount } = event.queryStringParameters;

        // New API key and endpoint
        const apiKey = 'CG-pdiRXN42KbFSkwxqQyekSDxa';
        const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${from_currency},${to_currency}&key=${apiKey}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (data && data.length === 2) {
            const rate_from = data.find(coin => coin.id === from_currency).current_price;
            const rate_to = data.find(coin => coin.id === to_currency).current_price;

            // Calculate the conversion
            const convertedAmount = (amount / rate_from) * rate_to;

            return {
                statusCode: 200,
                body: JSON.stringify({ convertedAmount: convertedAmount.toFixed(2) })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Currency pair not found in the response." })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error." })
        };
    }
};
