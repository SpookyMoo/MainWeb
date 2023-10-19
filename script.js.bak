// Define a function to perform the currency conversion
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from_currency = document.getElementById("from_currency").value;
    const to_currency = document.getElementById("to_currency").value;

    // Make an API request to fetch the latest exchange rates
    try {
        const apiKey = 99d1cdc125c8f962b92599ffbc8d2921; // Replace with your API key
        const response = await fetch(`https://api.coinlayer.com/live?access_key=${apiKey}`);
        const data = await response.json();

        if (data.success && data.rates) {
            // Check if the desired currencies exist in the response
            if (data.rates[from_currency] && data.rates[to_currency]) {
                const rate_from = data.rates[from_currency];
                const rate_to = data.rates[to_currency];

                // Calculate the conversion
                const convertedAmount = (amount * rate_to) / rate_from;

                // Display the result
                document.getElementById("result").innerText = `${amount} ${from_currency} is ${convertedAmount.toFixed(2)} ${to_currency}`;
            } else {
                document.getElementById("result").innerText = "Invalid currency selection.";
            }
        } else {
            document.getElementById("result").innerText = "Failed to fetch exchange rates.";
        }
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
}

// Attach the convertCurrency function to a button click event
document.getElementById("convertButton").addEventListener("click", convertCurrency);
