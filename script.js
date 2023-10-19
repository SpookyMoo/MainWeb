function convertCurrency() {
    let amount = document.getElementById('amount').value;
    let from_currency = document.getElementById('from_currency').value;
    let to_currency = document.getElementById('to_currency').value;

    // Call the serverless function
    fetch('/api/convert?from_currency=' + from_currency + '&to_currency=' + to_currency + '&amount=' + amount)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('result').innerText = "Converted Amount: " + data.converted_amount;
            } else {
                document.getElementById('result').innerText = "Error: " + data.message;
            }
        })
        .catch(error => {
            document.getElementById('result').innerText = "Client-side error: " + error;
        });
}
