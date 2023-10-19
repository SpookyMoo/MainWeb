// Define a function to perform the currency conversion
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const Cash = document.getElementById("from_currency").value;
    const toCash = document.getElementById("to_currency").value;

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

// Attach the convertCurrency function to the "Convert" button
document.getElementById("convertBtn").addEventListener("click", convertCurrency);
