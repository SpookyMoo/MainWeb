// Define a function to perform the currency conversion
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fiatFrom = document.getElementById("fiatFrom").value;
    const cryptoFrom = document.getElementById("cryptoFrom").value;
    const fiatTo = document.getElementById("fiatTo").value;
    const cryptoTo = document.getElementById("cryptoTo").value;

    // Construct the endpoint URL with the provided values
    const endpoint = `https://dreadfultech.com/api/convert?fiatFrom=${fiatFrom}&cryptoFrom=${cryptoFrom}&fiatTo=${fiatTo}&cryptoTo=${cryptoTo}&amount=${amount}`;

    try {
        // Make the API request
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data && data.convertedAmount) {
            // Display the result
            document.getElementById("result").innerText = `${amount} ${fiatFrom || cryptoFrom} is approximately ${data.convertedAmount} ${fiatTo || cryptoTo}`;
        } else {
            document.getElementById("result").innerText = data.error || "An error occurred.";
        }
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
}