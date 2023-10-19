function convertCurrency() {
    // Get values from input fields
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from_currency').value.toUpperCase();
    const toCurrency = document.getElementById('to_currency').value.toUpperCase();

    // Make a request to your serverless function
    fetch(`/api/convert?from_currency=${fromCurrency}&to_currency=${toCurrency}`)
        .then(response => response.json())
        .then(data => {
            const convertedAmount = amount * data.rate;
            document.getElementById('result').innerText = `${amount} ${fromCurrency} is approximately ${convertedAmount.toFixed(2)} ${toCurrency}.`;
        })
        .catch(error => {
            console.error("Error fetching conversion rate:", error);
            document.getElementById('result').innerText = "Error converting currency. Please try again.";
        });
}