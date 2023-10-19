async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from_currency = document.getElementById("from_currency").value;
    const to_currency = document.getElementById("to_currency").value;
    
    // Removed the amount from the endpoint
    const endpoint = `/api/convert?from_currency=${from_currency}&to_currency=${to_currency}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success) {
            // Multiply the conversion rate by the amount to get the result
            const convertedAmount = amount * data.rate;
            document.getElementById("result").innerText = `${amount} ${from_currency} is ${convertedAmount.toFixed(2)} ${to_currency}`;
        } else {
            document.getElementById("result").innerText = `Error: ${data.error}`;
        }
    } catch (error) {
        document.getElementById("result").innerText = `Client-side error: ${error.message}`;
    }
}
