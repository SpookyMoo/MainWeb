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
		document.getElementById('apiData').value += 'Fiat rates: ' + JSON.stringify(fiatData) + ' ';

        const cryptoEndpoint = `https://api.coingate.com/v2/rates/trader`;  // Replace with your new API endpoint
        console.log(`Fetching crypto rates from: ${cryptoEndpoint}`);
        const cryptoResponse = await fetch(cryptoEndpoint);
        const cryptoData = await cryptoResponse.json();
        console.log(`Crypto rates received:`, cryptoData);
		document.getElementById('apiData').value += 'Crypto rates: ' + JSON.stringify(cryptoData) + ' ';

		
        const combinedRates = { ...fiatData.rates };
        Object.keys(cryptoData).forEach(coin => {
            combinedRates[coin] = parseFloat(cryptoData[coin] && cryptoData[coin]['USD']);
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
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const Cash = document.getElementById("Cash").value;
    const toCash = document.getElementById("toCash").value;

    // Construct the endpoint URL with the provided values
    const endpoint = `https://dreadfultech.com/api/convert?Cash=${Cash}&toCash=${toCash}&amount=${amount}`;
	

    try {
        // Make the API request
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data && data.convertedAmount) {
            // Display the result
            document.getElementById("result").innerText = `${amount} ${Cash} is approximately ${data.convertedAmount} ${toCash}`;
        } else {
            document.getElementById("result").innerText = data.error || "An error occurred.";
        }
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
}
