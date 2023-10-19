// Define a function to perform the currency conversion
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from_currency = document.getElementById("from_currency").value;
    const to_currency = document.getElementById("to_currency").value;

    // Make an API request to the serverless function (convert.js)
    try {
        const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${from_currency},${to_currency}&key=${apiKey}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (response.ok) {
            // Display the result
            document.getElementById("result").innerText = `${amount} ${from_currency} is ${data.convertedAmount} ${to_currency}`;
        } else {
            document.getElementById("result").innerText = data.error || "An error occurred.";
        }
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
}
