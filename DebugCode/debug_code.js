// debug_code.js

/**
 * Performs an operation (multiplication in this case) using user inputs.
 * Retrieves two numbers from input fields, validates them,
 * calls the multiply function, and displays the result or an error message.
 */
function performOperation() {
    // Get user input from input fields
    // parseInt() is used to convert the string value from the input to an integer.
    let num1 = parseInt(document.getElementById('input1').value);
    let num2 = parseInt(document.getElementById('input2').value);

    // Check if inputs are valid numbers using isNaN (Is Not a Number).
    // If both are valid numbers, proceed with the operation.
    if (!isNaN(num1) && !isNaN(num2)) {
        // Perform the operation by calling the multiply function.
        let result = multiply(num1, num2);

        // Display the calculated result on the webpage.
        displayResult(result);
    } else {
        // If inputs are not valid numbers, display an error message.
        displayResult('Please enter valid numbers');
    }
}

/**
 * Multiplies two numbers.
 * Includes a `debugger` statement to pause execution, allowing for inspection
 * of variables and step-by-step debugging in browser developer tools.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The product of a and b.
 */
function multiply(a, b) {
    // The 'debugger' statement will pause code execution at this line
    // if the browser's developer tools are open (e.g., F12 in Chrome/Firefox).
    debugger;

    // Multiply the numbers and return the product.
    return a * b;
}

/**
 * Displays the given result in a designated paragraph element on the webpage.
 * @param {string|number} result - The result to be displayed (can be a number or an error string).
 */
function displayResult(result) {
    // Get the HTML element where the result will be displayed.
    const resultElement = document.getElementById('result');

    // Check if the element exists to prevent errors.
    if (resultElement) {
        // Set the text content of the element to show the result.
        // Using textContent is safer than innerHTML to prevent XSS attacks
        // when inserting user-controlled content.
        resultElement.textContent = `The result is: ${result}`;
    } else {
        // Log an error to the console if the result element is not found.
        console.error("Element with ID 'result' not found.");
    }
}
