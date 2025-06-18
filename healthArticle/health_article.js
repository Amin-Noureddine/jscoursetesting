// health_article.js

// Step 3: Defining object and variables for XMLHttpRequest

// Declare a variable to create a new XMLHttpRequest object.
// XMLHttpRequest is used to interact with servers. It can retrieve data
// from a URL without needing to do a full page refresh.
var xhr = new XMLHttpRequest();

// Declare a variable to define the URL of the JSON file to be fetched.
// This path assumes the JSON file is in the same directory as this JS file.
var url = './health_article.json';

// Step 4: URL definition and request set up

// Configure the XMLHttpRequest to prepare a GET request.
// 'GET': Specifies the HTTP method to retrieve data.
// url: The URL of the resource to fetch.
// true: Indicates that the request should be asynchronous.
// This means the script will continue to execute while the request is being processed,
// and a callback function will be triggered when the response is ready.
xhr.open('GET', url, true);

// Step 5: Response type specification

// Inform the XMLHttpRequest object that the expected response from the server
// should be in JSON format. This will automatically parse the response text
// into a JavaScript object when it's received.
xhr.responseType = 'json';

// Step 6: Handling the 'onload' event

// Define what should happen when the data is successfully loaded from the server.
// The `onload` event fires when the XMLHttpRequest transaction completes successfully.
xhr.onload = function() {
    // Check if the request was successful (HTTP status 200).
    if (xhr.status === 200) {
        // Retrieve the 'articles' array from the JSON response.
        // Since `responseType` is 'json', `xhr.response` is already a JavaScript object.
        var articles = xhr.response.articles;

        // Retrieve the HTML element with the ID 'articles'.
        // This is where the fetched content will be dynamically displayed.
        var articlesDiv = document.getElementById('articles');

        // Step 7: Iterating through articles and constructing HTML

        // Iterate over each article in the fetched 'articles' array.
        // For each article, dynamically create HTML elements to display its details.
        articles.forEach(function(article) {
            // Create a main div element for each article.
            var articleDiv = document.createElement('div');
            // Add a class for styling purposes.
            articleDiv.classList.add('article');

            // Create an <h2> element for the article title.
            var title = document.createElement('h2');
            // Set the text content of the <h2> to the article's title.
            title.textContent = article.title;

            // Create a <p> element for the article description.
            var description = document.createElement('p');
            // Set the text content of the <p> to the article's description.
            description.textContent = article.description;

            // Create an <h3> element for the "Ways to Achieve" header.
            var waysHeader = document.createElement('h3');
            waysHeader.textContent = 'Ways to Achieve:';

            // Create an unordered list (<ul>) for the ways to achieve.
            var waysList = document.createElement('ul');
            // Iterate over each way in `article.ways_to_achieve`.
            article.ways_to_achieve.forEach(function(way) {
                // Create a list item (<li>) for each way.
                var listItem = document.createElement('li');
                listItem.textContent = way; // Set the text content.
                waysList.appendChild(listItem); // Append the list item to the ways list.
            });

            // Create an <h3> element for the "Benefits" header.
            var benefitsHeader = document.createElement('h3');
            benefitsHeader.textContent = 'Benefits:';

            // Create an unordered list (<ul>) for the benefits.
            var benefitsList = document.createElement('ul');
            // Iterate over each benefit in `article.benefits`.
            article.benefits.forEach(function(benefit) {
                // Create a list item (<li>) for each benefit.
                var listItem = document.createElement('li');
                listItem.textContent = benefit; // Set the text content.
                benefitsList.appendChild(listItem); // Append the list item to the benefits list.
            });

            // Append all created elements to the main articleDiv.
            articleDiv.appendChild(title);
            articleDiv.appendChild(description);
            articleDiv.appendChild(waysHeader);
            articleDiv.appendChild(waysList);
            articleDiv.appendChild(benefitsHeader);
            articleDiv.appendChild(benefitsList);

            // Append the complete articleDiv to the 'articles' container in the HTML.
            articlesDiv.appendChild(articleDiv);
        });
    } else {
        // Log an error if the request was not successful.
        console.error('Failed to fetch articles: ' + xhr.status);
    }
};

// Handle network errors or other issues that prevent the request from completing.
xhr.onerror = function() {
    console.error('XMLHttpRequest error: Could not complete the request.');
};

// Step 8: Sending the request

// Send the XMLHttpRequest to fetch the data from the specified URL.
// This initiates the configured GET request.
xhr.send();
