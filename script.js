function convertCurrency() {
    // Get values from input fields
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from_currency').value.toUpperCase();
    const toCurrency = document.getElementById('to_currency').value.toUpperCase();

    // Make a request to your serverless function
   fetch(`/api/convert?from_currency=${fromCurrency}&to_currency=${toCurrency}`)
        .then(response => {
            // Log the raw response for debugging
            console.log("Raw response:", response);
            return response.text();
        })
        .then(text => {
            // Attempt to parse the text as JSON
            try {
                const data = JSON.parse(text);
                // ... [rest of the conversion logic]
            } catch (error) {
                console.error("Error parsing JSON:", error, "Raw text:", text);
            }
        })
        .catch(error => {
            console.error("Client-side error:", error);
            document.getElementById('result').innerText = "Client-side error occurred. Please check the console for details.";
        });
}
