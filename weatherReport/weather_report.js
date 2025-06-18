// weather_report.js

/**
 * Fetches and displays weather details for a given city.
 * Prevents the default form submission behavior and handles API requests.
 * @param {Event} event - The event object (e.g., submit event from a form).
 */
function showweatherDetails(event) {
    // Prevent the default form submission behavior (which would cause a page reload).
    event.preventDefault();

    // Step 2: Defining variables

    // Get the city name entered by the user from the input field.
    const city = document.getElementById('city').value;

    // Define the API key for OpenWeatherMap.
    // NOTE: In a real application, API keys should be stored securely and not exposed in client-side code.
    const apiKey = '8fb12171ee2ef86830d1525fe0bd1585'; // Provided API Key

    // Construct the API URL using the city and API key.
    // `units=metric` is added to get temperature in Celsius.
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Use the Fetch API to make an asynchronous HTTP request to the OpenWeatherMap API.
    fetch(apiUrl)
        // First .then() block: Handle the response from the server.
        // `response.json()` parses the JSON body of the response and returns a Promise
        // that resolves with the JavaScript object result.
        .then(response => {
            // Check if the response was successful (status code 200-299).
            if (!response.ok) {
                // If the response is not OK (e.g., 404 for city not found),
                // throw an error to be caught by the .catch() block.
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON data
        })
        // Second .then() block: Process the parsed JSON data.
        .then(data => {
            // Get the HTML element where weather information will be displayed.
            const weatherInfo = document.getElementById('weatherInfo');

            // Update the innerHTML of the weatherInfo div with the fetched data.
            // Using template literals for cleaner string concatenation.
            // &#8451; is the HTML entity for the Celsius degree symbol.
            weatherInfo.innerHTML = `
                <h2 class="text-3xl font-bold text-blue-800 mb-2">Weather in ${data.name}</h2>
                <p class="text-xl text-gray-700 mb-1">Temperature: ${data.main.temp} &#8451;</p>
                <p class="text-xl text-gray-700">Weather: ${data.weather[0].description}</p>
            `;
        })
        // .catch() block: Handle any errors that occur during the fetch operation
        // (e.g., network errors, invalid city name, API key issues).
        .catch(error => {
            // Log the error to the console for debugging purposes.
            console.error('Error fetching weather:', error);
            // Get the HTML element to display error messages to the user.
            const weatherInfo = document.getElementById('weatherInfo');
            // Update the innerHTML with a user-friendly error message.
            weatherInfo.innerHTML = `
                <p class="text-red-600 text-lg font-semibold">Failed to fetch weather. Please try again or check the city name.</p>
            `;
        });
}

// Attach an event listener to the form with ID 'weatherForm'.
// When the form is submitted, the `showweatherDetails` function will be called.
// This ensures that the weather details are fetched and displayed when the user
// submits the city name.
document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
