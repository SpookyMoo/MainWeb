
const fetch = require('node-fetch');

export const fiatConvert = async (req, res) => {
    try {
        console.log("Fiat conversion started");

        const { Cash, toCash, amount } = req.query;
        console.log(`Parameters received: Cash=${Cash}, toCash=${toCash}, amount=${amount}`);

        const fiatEndpoint = `https://api.exchangerate-api.com/v4/latest/USD`;
        console.log(`Fetching fiat rates from: ${fiatEndpoint}`);
        const fiatResponse = await fetch(fiatEndpoint);
        const fiatData = await fiatResponse.json();
        console.log(`Fiat rates received:`, fiatData);

        let rate_From = fiatData.rates[Cash];
        let rate_To = fiatData.rates[toCash];

        if (!rate_From || !rate_To) {
            throw new Error("Currency pair not found in the fiat rates");
        }

        const convertedAmount = amount * (rate_To / rate_From);
        console.log(`Conversion result: ${convertedAmount}`);
        res.status(200).json({ convertedAmount: convertedAmount.toFixed(2) });

    } catch (error) {
        console.log(`Error encountered: ${error.message}`);
        res.status(500).json({ error: "Server error." });
    }
};

const fetch = require('node-fetch');

export const cryptoConvert = async (req, res) => {
    try {
        console.log("Crypto conversion started");

        const { Cash, toCash, amount } = req.query;
        console.log(`Parameters received: Cash=${Cash}, toCash=${toCash}, amount=${amount}`);

        const cryptoEndpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
        console.log(`Fetching crypto rates from: ${cryptoEndpoint}`);
        const cryptoResponse = await fetch(cryptoEndpoint);
        const cryptoData = await cryptoResponse.json();
        console.log(`Crypto rates received:`, cryptoData);

        const cryptoRates = {};
        cryptoData.forEach(coin => {
            cryptoRates[coin.symbol.toLowerCase()] = coin.current_price;
        });

        let rate_From = cryptoRates[Cash];
        let rate_To = cryptoRates[toCash];

        if (!rate_From || !rate_To) {
            throw new Error("Currency pair not found in the crypto rates");
        }

        const convertedAmount = amount * (rate_To / rate_From);
        console.log(`Conversion result: ${convertedAmount}`);
        res.status(200).json({ convertedAmount: convertedAmount.toFixed(2) });

    } catch (error) {
        console.log(`Error encountered: ${error.message}`);
        res.status(500).json({ error: "Server error." });
    }
};

const fetch = require('node-fetch');

export const universalConvert = async (req, res) => {
    try {
        console.log("Universal conversion started");

        const { Cash, toCash, amount } = req.query;
        console.log(`Parameters received: Cash=${Cash}, toCash=${toCash}, amount=${amount}`);

        const fiatEndpoint = `https://api.exchangerate-api.com/v4/latest/USD`;
        const fiatResponse = await fetch(fiatEndpoint);
        const fiatData = await fiatResponse.json();
        console.log(`Fiat rates received:`, fiatData);

        const cryptoEndpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
        const cryptoResponse = await fetch(cryptoEndpoint);
        const cryptoData = await cryptoResponse.json();
        console.log(`Crypto rates received:`, cryptoData);

        const combinedRates = { ...fiatData.rates };
        cryptoData.forEach(coin => {
            combinedRates[coin.symbol.toLowerCase()] = coin.current_price;
        });
        console.log(`Combined rates:`, combinedRates);

        let rate_From = combinedRates[Cash];
        let rate_To = combinedRates[toCash];

        if (!rate_From || !rate_To) {
            throw new Error("Currency pair not found in the combined rates");
        }

        const convertedAmount = amount * (rate_To / rate_From);
        console.log(`Conversion result: ${convertedAmount}`);
        res.status(200).json({ convertedAmount: convertedAmount.toFixed(2) });

    } catch (error) {
        console.log(`Error encountered: ${error.message}`);
        res.status(500).json({ error: "Server error." });
    }
};
