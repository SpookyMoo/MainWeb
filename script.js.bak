function convertCurrency() {
    // Get values from input fields
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from_currency').value.toUpperCase();
    const toCurrency = document.getElementById('to_currency').value.toUpperCase();

    // Make a request to your serverless function
    fetch(`/api/convert?from_currency=${fromCurrency}&to_currency=${toCurrency}`)
        .then(response => response.json())
        .then(data => {
            if (data.rate) {
                const convertedAmount = amount * data.rate;
                document.getElementById('result').innerText = `${amount} ${fromCurrency} is approximately ${convertedAmount.toFixed(2)} ${toCurrency}.`;
            } else if (data.error) {
                // Display the error message from the server
                document.getElementById('result').innerText = `Error: ${data.error}`;
            } else {
                document.getElementById('result').innerText = "Unexpected error. Please try again.";
            }
        })
        .catch(error => {
            console.error("Client-side error:", error);
            document.getElementById('result').innerText = "Client-side error occurred. Please check the console for details.";
        });
}
