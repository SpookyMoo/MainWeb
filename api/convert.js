const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const { from_currency, to_currency, amount } = event.queryStringParameters;

        // Fetching conversion rates without the amount
        const endpoint = `http://api.coinlayer.com/live?access_key=${process.env.USDBTC}&from=${from_currency}&to=${to_currency}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success) {
            // Calculate the conversion using the fetched rate and the provided amount
            const rate = data.rates[to_currency];
            const convertedAmount = amount * rate;

            return {
                statusCode: 200,
                body: JSON.stringify({ convertedAmount: convertedAmount.toFixed(2) })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to fetch conversion rates." })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error." })
        };
    }
};
