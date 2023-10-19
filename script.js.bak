// Define a function to perform the currency conversion
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from_currency = document.getElementById("from_currency").value;
    const to_currency = document.getElementById("to_currency").value;

    // Construct the endpoint URL with the provided values
    const endpoint = `https://dreadfultech.com/api/convert?from_currency=${from_currency}&to_currency=${to_currency}&amount=${amount}`;

    try {
        // Make the API request
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data && data.convertedAmount) {
            // Display the result
            document.getElementById("result").innerText = `${amount} ${from_currency} is approximately ${data.convertedAmount} ${to_currency}`;
        } else {
            document.getElementById("result").innerText = data.error || "An error occurred.";
        }
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
}

// Attach the convertCurrency function to the "Convert" button
document.getElementById("convertBtn").addEventListener("click", convertCurrency);
