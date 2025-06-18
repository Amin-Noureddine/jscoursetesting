// speed_analysis.js

// Define the test text for the typing speed test.
// This is the sentence the user will type to measure their speed.
let testText = "The quick brown fox jumps over the lazy dog.";

// Declare variables to store the start and end times of the test.
// These will be used to calculate the time elapsed.
let startTime, endTime;

/**
 * Initializes and starts the typing speed test.
 * This function sets the test text, resets the display,
 * starts the timer, and updates the main button's text and functionality.
 */
function startTest() {
    // Set the predefined test text into the display area for the user to type.
    const inputTextElement = document.getElementById("inputText");
    if (inputTextElement) {
        inputTextElement.value = testText;
    } else {
        console.error("Element with ID 'inputText' not found.");
        return; // Exit if critical element is missing
    }

    // Clear any previous results displayed in the output area.
    const outputElement = document.getElementById("output");
    if (outputElement) {
        outputElement.innerHTML = "";
    } else {
        console.error("Element with ID 'output' not found.");
        return; // Exit if critical element is missing
    }

    // Get the user input area and ensure it's editable for the test.
    const userInputElement = document.getElementById("userInput");
    if (userInputElement) {
        userInputElement.value = ""; // Clear previous user input
        userInputElement.readOnly = false; // Make sure it's writable
    } else {
        console.error("Element with ID 'userInput' not found.");
        return; // Exit if critical element is missing
    }

    // Record the current time to mark the start of the test.
    startTime = new Date().getTime();

    // Get the main action button.
    const button = document.getElementById("btn");
    if (button) {
        // Change the button text to "End Test" since the test has started.
        button.innerHTML = "End Test";
        // Assign the endTest function to the button's click event.
        button.onclick = endTest;
    } else {
        console.error("Element with ID 'btn' not found.");
    }
}

/**
 * Concludes the typing speed test and displays the results.
 * This function calculates the time elapsed, words per minute (WPM),
 * disables user input, and resets the button for a new test.
 */
function endTest() {
    // Record the current time to mark the end of the test.
    endTime = new Date().getTime();

    // Disable further input in the user's typing area after the test.
    const userInputElement = document.getElementById("userInput");
    if (userInputElement) {
        userInputElement.readOnly = true;
    } else {
        console.error("Element with ID 'userInput' not found.");
        return; // Exit if critical element is missing
    }

    // Calculate the total time elapsed in seconds.
    const timeElapsed = (endTime - startTime) / 1000; // in seconds

    // Get the text typed by the user.
    const userTypedText = userInputElement.value;

    // Split the user's typed text into words using a regular expression
    // to handle multiple spaces, newlines, etc., and filter out empty strings.
    const typedWords = userTypedText.split(/\s+/).filter(function (word) {
        return word !== "";
    }).length;

    let wpm = 0; // Initialize Words Per Minute (WPM) to 0.

    // Calculate WPM only if timeElapsed is not zero and typedWords is a valid number.
    if (timeElapsed !== 0 && !isNaN(typedWords)) {
        // WPM = (number of typed words / time elapsed in minutes)
        wpm = Math.round((typedWords / timeElapsed) * 60);
    }

    // Get the output division to display the results.
    const outputDiv = document.getElementById("output");
    if (outputDiv) {
        // Construct the HTML string to display the test results.
        outputDiv.innerHTML = `
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Typing Test Results:</h2>
            <p class="text-lg text-gray-700 mb-2">Words Typed: <span class="font-semibold">${typedWords}</span></p>
            <p class="text-lg text-gray-700 mb-2">Time Elapsed: <span class="font-semibold">${timeElapsed.toFixed(2)}</span> seconds</p>
            <p class="text-2xl font-bold text-blue-600">Words Per Minute (WPM): <span class="text-3xl">${wpm}</span></p>
        `;
    } else {
        console.error("Element with ID 'output' not found.");
    }

    // Reset the main action button for a new test.
    const button = document.getElementById("btn");
    if (button) {
        button.innerHTML = "Start Test"; // Change text back to "Start Test"
        button.onclick = startTest; // Re-assign startTest function to click event
    } else {
        console.error("Element with ID 'btn' not found.");
    }
}
