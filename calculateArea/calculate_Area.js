// Step 1: Declare variables for length and width
let length;
let width;

// Step 2: Define the calculateArea function
function calculateArea() {
    // Get input values and convert them to floating-point numbers
    length = parseFloat(document.getElementById('length').value);
    width = parseFloat(document.getElementById('width').value);

    // Calculate the area
    let area = length * width;

    // Display the result in the HTML element with ID 'result'
    document.getElementById('result').innerText = `The area of the rectangle is: ${area}`;
}
