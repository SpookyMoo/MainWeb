const fetch = require('node-fetch');

export default async (req, res) => {
    try {
        console.log("Function started");

        const { Cash, toCash, amount } = req.query;
        console.log(`Parameters received: Cash=${Cash}, toCash=${toCash}, amount=${amount}`);

        const fiatEndpoint = `https://api.exchangerate-api.com/v4/latest/USD`;
        console.log(`Fetching fiat rates from: ${fiatEndpoint}`);
        const fiatResponse = await fetch(fiatEndpoint);
        const fiatData = await fiatResponse.json();
        console.log(`Fiat rates received:`, fiatData);

        const cryptoEndpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
        console.log(`Fetching crypto rates from: ${cryptoEndpoint}`);
        const cryptoResponse = await fetch(cryptoEndpoint);
        const cryptoData = await cryptoResponse.json();
        console.log(`Crypto rates received:`, cryptoData);

        const combinedRates = { ...fiatData.rates };
        cryptoData.forEach(coin => {
            combinedRates[coin.symbol.toUpperCase()] = coin.current_price;
        });
        console.log(`Combined rates:`, combinedRates);

        if (combinedRates[Cash] && combinedRates[toCash]) {
            const rate_from = combinedRates[Cash];
            const rate_to = combinedRates[toCash];
			console.log(`Rate from (${Cash}):`, rate_From);
			console.log(`Rate to (${toCash}):`, rate_To);
            const convertedAmount = (amount / rate_from) * rate_to;
            console.log(`Conversion result: ${convertedAmount}`);
            res.status(200).json({ convertedAmount: convertedAmount.toFixed(2) });
        } else {
            console.log("Error: Currency pair not found in the combined rates");
            res.status(500).json({ error: "Currency pair not found in the response." });
        }
    } catch (error) {
        console.log(`Error encountered: ${error.message}`);
        res.status(500).json({ error: "Server error." });
    }
};
