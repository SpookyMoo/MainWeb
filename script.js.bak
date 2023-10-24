// Define a function to perform the currency conversion
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const Cash = document.getElementById("Cash").value;
    const toCash = document.getElementById("toCash").value;

    // Construct the endpoint URL with the provided values
    const endpoint = `https://dreadfultech.com/api/convert?Cash=${Cash}&toCash=${toCash}&amount=${amount}`;
	

    try {
        // Make the API request
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data && data.convertedAmount) {
            // Display the result
            document.getElementById("result").innerText = `${amount} ${Cash} is approximately ${data.convertedAmount} ${toCash}`;
			document.getElementById('apiData').value += 'Fiat rates: ' + JSON.stringify(fiatData) + ' ';
			document.getElementById('apiData').value += 'Crypto rates: ' + JSON.stringify(cryptoData) + ' ';
        } else {
            document.getElementById("result").innerText = data.error || "An error occurred.";
			document.getElementById('apiData').value += 'Fiat rates: ' + JSON.stringify(fiatData) + ' ';
			document.getElementById('apiData').value += 'Crypto rates: ' + JSON.stringify(cryptoData) + ' ';
        }
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
}
