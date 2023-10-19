async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from_currency = document.getElementById("from_currency").value;
    const to_currency = document.getElementById("to_currency").value;
    
    // Updated endpoint to match the serverless function
    const endpoint = `/api/convert?from_currency=${from_currency}&to_currency=${to_currency}&amount=${amount}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success) {
            // Use the convertedAmount from the response
            const convertedAmount = data.convertedAmount;
            document.getElementById("result").innerText = `${amount} ${from_currency} is ${convertedAmount} ${to_currency}`;
        } else {
            document.getElementById("result").innerText = `Error: ${data.error}`;
        }
    } catch (error) {
        document.getElementById("result").innerText = `Client-side error: ${error.message}`;
    }
}
