const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const { from_currency, to_currency, amount } = event.queryStringParameters;

        // Fetching conversion rates for the base currency (USD, in this case)
        const apiKey = 99d1cdc125c8f962b92599ffbc8d2921; // Replace with your CoinLayer API key
        const endpoint = `https://api.coinlayer.com/live?access_key=${apiKey}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success && data.rates) {
            // Check if the desired currencies exist in the response
            if (data.rates[from_currency] && data.rates[to_currency]) {
                const rate_from = data.rates[from_currency];
                const rate_to = data.rates[to_currency];

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
