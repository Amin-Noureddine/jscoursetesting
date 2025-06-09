function groceryTracker() {
    // Get the values from the input fields and convert to floats
    let amount1 = parseFloat(document.getElementById('grocery1').value) || 0;
    let amount2 = parseFloat(document.getElementById('grocery2').value) || 0;
    let amount3 = parseFloat(document.getElementById('grocery3').value) || 0;

    // Calculate the total
    let total = amount1 + amount2 + amount3;

    // Display the result
    document.getElementById('totalResult').innerText = `The total amount is: $${total.toFixed(2)}`;
}
