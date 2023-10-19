const fetch = require('node-fetch');

export default async (req, res) => {
    try {
        const { Cash, toCash, amount } = req.query;

        // Fetch fiat currency rates
        const fiatEndpoint = `https://api.exchangerate-api.com/v4/latest/USD`;
        const fiatResponse = await fetch(fiatEndpoint);
        const fiatData = await fiatResponse.json();

        // Fetch cryptocurrency rates
        const cryptoEndpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
        const cryptoResponse = await fetch(cryptoEndpoint);
        const cryptoData = await cryptoResponse.json();

        // Combine both sets of rates
        const combinedRates = { ...fiatData.rates };
        cryptoData.forEach(coin => {
            combinedRates[coin.symbol.toUpperCase()] = coin.current_price;
        });

        // Check if the currencies exist in the combined rates
        if (combinedRates[Cash] && combinedRates[toCash]) {
            // Extract the rates
            const rate_from = combinedRates[Cash];
            const rate_to = combinedRates[toCash];

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
