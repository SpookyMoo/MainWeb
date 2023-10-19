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

        const cryptoCurrencies = cryptoData.map(coin => coin.symbol.toUpperCase());

        let rate_From = combinedRates[Cash];
        let rate_To = combinedRates[toCash];

        if (!rate_From || !rate_To) {
            throw new Error("Currency pair not found in the combined rates");
        }

        let convertedAmount;
        // If both are crypto
        if (cryptoCurrencies.includes(Cash) && cryptoCurrencies.includes(toCash)) {
            // Convert from source crypto to USD and then to target crypto
            convertedAmount = amount / rate_From * rate_To;
        } else {
            // Regular conversion
            convertedAmount = amount * (rate_To / rate_From);
        }

        console.log(`Conversion result: ${convertedAmount}`);
        res.status(200).json({ convertedAmount: convertedAmount.toFixed(2) });

    } catch (error) {
        console.log(`Error encountered: ${error.message}`);
        res.status(500).json({ error: "Server error." });
    }
};
