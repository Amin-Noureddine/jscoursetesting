let count = 0; // Initialize count to 0

// Function to increase the follower count
function increaseCount() {
  count++;              // Increment count
  displayCount();       // Update the count on the page
  checkCountValue();    // Check for milestone messages
}

// Function to display count on the web page
function displayCount() {
  document.getElementById('countDisplay').innerHTML = count;
}

// Function to check for follower milestones
function checkCountValue() {
  if (count === 10) {
    alert("Your Instagram post gained 10 followers! Congratulations!");
  } else if (count === 20) {
    alert("Your Instagram post gained 20 followers! Keep it up!");
  }
}
