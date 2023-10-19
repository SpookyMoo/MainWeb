const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const { from_currency, to_currency, amount } = event.queryStringParameters;

        // Fetching conversion rates for the two currencies of interest
        const endpoint = `http://api.coinlayer.com/live?access_key=${'99d1cdc125c8f962b92599ffbc8d2921'}&from=${from_currency}&to=${to_currency}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success && data.rates && data.rates[to_currency]) {
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
