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

        const cryptoEndpoint = `https://api.coingate.com/v2/rates/trader`;  // Replace with your new API endpoint
        console.log(`Fetching crypto rates from: ${cryptoEndpoint}`);
        const cryptoResponse = await fetch(cryptoEndpoint);
        const cryptoData = await cryptoResponse.json();
        console.log(`Crypto rates received:`, cryptoData);

        const combinedRates = { ...fiatData.rates };
        Object.keys(cryptoData).forEach(coin => {
            combinedRates[coin] = parseFloat(cryptoData[coin] && cryptoData[coin]['USD']);
        });
        console.log(`Combined rates:`, combinedRates);

        let rate_From = combinedRates[Cash()];
		let rate_To = combinedRates[toCash()];

        if (!rate_From || !rate_To) {
            throw new Error("Currency pair not found in the combined rates");
        }

        const convertedAmount = amount * (rate_To / rate_From);

        console.log(`Conversion result: ${convertedAmount}`);
        res.status(200).json({ convertedAmount: convertedAmount.toFixed(2) });
		let htmlResponse = `<h2>Rates</h2>`;
        htmlResponse += `<p>USD rate (from fiat API): ${fiatData.rates['USD']}</p>`;
        htmlResponse += `<p>LTC rate (from crypto API): ${cryptoData['LTC'] && cryptoData['LTC']['USD']}</p>`;
        htmlResponse += `<h2>Conversion Result</h2>`;
        htmlResponse += `<p>${amount} ${Cash} is equal to ${convertedAmount.toFixed(2)} ${toCash}</p>`;

        // Send the constructed HTML as the response
        res.status(200).send(htmlResponse);
    } catch (error) {
        console.log(`Error encountered: ${error.message}`);
        res.status(500).json({ error: "Server error." });
    }
};
