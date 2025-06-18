// memory_match_game.js

// Step 5: Defining variables to access data

// Array holding distinct colors for the cards. These will be duplicated to create pairs.
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'magenta']; // Added more colors for more pairs

// The main array holding the shuffled cards for the current game.
// It will be initialized after shuffling and concatenating colors.
let cards = [];

// Array to temporarily store the two cards currently selected by the player.
let selectedCards = [];

// Variable to track the player's score. Initialized to 0.
let score = 0;

// Variable to store the remaining time for the game in seconds.
let timeLeft = 30;

// Variable to hold the interval ID for the game timer, allowing it to be cleared.
let gameInterval;

// DOM element selection: Get references to relevant HTML elements by their IDs.
const startbtn = document.getElementById('startbtn'); // The button to start/restart the game
const gameContainer = document.getElementById('game-container'); // The container for the game cards
const scoreElement = document.getElementById('score'); // Element to display the score
const timerElement = document.getElementById('timer'); // Element to display the time left

// Step 6: Create and call functions to start the game

/**
 * Shuffles the elements of an array randomly using the Fisher-Yates algorithm.
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} The shuffled array.
 */
function shuffle(array) {
    // Loop from the last element down to the second element (index 1).
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index 'j' from 0 to 'i' (inclusive).
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at index 'i' and index 'j'.
        // This moves the current element to a random position, and the element at j to i.
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return the shuffled array.
}

/**
 * Dynamically creates and appends card elements to the game container.
 * Each card is a div with a 'card' class, a hidden color (dataset.color),
 * and initially displays a question mark.
 */
function generateCards() {
    // Clear any existing cards in the container to prepare for a new game.
    gameContainer.innerHTML = '';

    // Iterate over each color in the 'cards' array (which contains shuffled pairs).
    for (const color of cards) {
        // Create a new div element for the card.
        const card = document.createElement('div');
        // Add the 'card' class for styling.
        card.classList.add('card');
        // Store the actual color as a data attribute (hidden initially).
        card.dataset.color = color;
        // Set the initial text content to a question mark.
        card.textContent = '?';
        // Append the created card to the game container.
        gameContainer.appendChild(card);
    }
}

/**
 * Handles the click event on a card.
 * Reveals the card's color, adds it to selectedCards, and triggers
 * a match check if two cards are selected.
 * @param {Event} event - The click event object.
 */
function handleCardClick(event) {
    const card = event.target; // Get the actual DOM element that was clicked.

    // Check if the clicked element is a card and not already matched.
    // Also, prevent selecting more than two cards at a time.
    if (!card.classList.contains('card') || card.classList.contains('matched') || selectedCards.length === 2) {
        return; // Ignore clicks if not a valid card, already matched, or two cards are already selected.
    }

    // Reveal the card's color by setting its text content and background color.
    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;

    // Add the clicked card to the `selectedCards` array.
    selectedCards.push(card);

    // If two cards have been selected, wait briefly then check for a match.
    if (selectedCards.length === 2) {
        // Disable further clicks temporarily to prevent new selections during the check.
        gameContainer.removeEventListener('click', handleCardClick);
        setTimeout(checkMatch, 700); // Delay for 700ms to allow player to see both cards.
    }
}

/**
 * Evaluates whether the two cards in `selectedCards` match.
 * If they match, they stay revealed and score increases.
 * If they don't match, they flip back over.
 * Resets `selectedCards` for the next turn.
 */
function checkMatch() {
    // Destructure the two selected cards from the `selectedCards` array.
    const [card1, card2] = selectedCards;

    // Compare the `dataset.color` of the two cards.
    if (card1.dataset.color === card2.dataset.color) {
        // If colors match:
        // Add 'matched' class to both cards to visually signify a match (e.g., permanent color, disable clicks).
        card1.classList.add('matched');
        card2.classList.add('matched');

        // Increase the score by 2 for a successful match.
        score += 2;
        // Update the score display.
        scoreElement.textContent = `Score: ${score}`;

        // Check if all cards are matched (game won).
        if (document.querySelectorAll('.card:not(.matched)').length === 0) {
            clearInterval(gameInterval); // Stop the timer.
            console.log('Congratulations! You matched all cards!'); // Use console.log instead of alert
            startbtn.disabled = false; // Re-enable the start button
        }

    } else {
        // If colors do not match:
        // Flip cards back by resetting their text content to '?' and background color.
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd'; // Default card back color
        card2.style.backgroundColor = '#ddd';
    }

    // Clear the `selectedCards` array for the next selection.
    selectedCards = [];

    // Re-enable card clicks after the match check is complete.
    gameContainer.addEventListener('click', handleCardClick);
}

/**
 * Starts the game timer, updates the display, and handles game over when time runs out.
 * @param {number} initialTime - The starting time for the game in seconds.
 */
function startGameTimer(initialTime) {
    timeLeft = initialTime; // Set the global timeLeft variable
    // Display the initial time.
    timerElement.textContent = `Time Left: ${timeLeft}`;

    // Clear any existing interval to prevent multiple timers running.
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Set up a new interval to decrement time every second.
    gameInterval = setInterval(() => {
        timeLeft--; // Decrement the remaining time.
        timerElement.textContent = `Time Left: ${timeLeft}`; // Update the display.

        // Check if time has run out.
        if (timeLeft <= 0) { // Use <= 0 to handle cases where it might go slightly below 0
            clearInterval(gameInterval); // Stop the timer.
            console.log('Game Over! Time is up.'); // Use console.log instead of alert
            startbtn.disabled = false; // Re-enable the start button.
            // Optionally, reveal all unmatched cards or clear the board.
            document.querySelectorAll('.card:not(.matched)').forEach(card => {
                card.textContent = card.dataset.color;
                card.style.backgroundColor = card.dataset.color;
            });
            gameContainer.removeEventListener('click', handleCardClick); // Disable clicks
        }
    }, 1000); // 1000 milliseconds = 1 second
}


/**
 * Initializes and starts a new memory match game.
 * Resets score, shuffles cards, generates new card elements,
 * and starts the game timer.
 */
function startGame() {
    // Disable the start button to prevent starting multiple games.
    startbtn.disabled = true;

    // Reset the score to zero for the new game.
    score = 0;
    scoreElement.textContent = `Score: ${score}`; // Update score display.

    // Prepare the cards: duplicate the colors and shuffle them.
    cards = shuffle(colors.concat(colors)); // Concatenate to double the array, then shuffle.

    // Clear any selected cards from a previous game.
    selectedCards = [];

    // Generate and display the new set of cards in the game container.
    generateCards();

    // Start the game timer with the initial time.
    startGameTimer(30); // Game starts with 30 seconds.

    // Add an event listener to the game container to handle card clicks.
    // This needs to be re-added each time startGame is called because it might have been removed.
    gameContainer.addEventListener('click', handleCardClick);
}

// Event listener: When the 'startbtn' is clicked, call the 'startGame' function.
if (startbtn) {
    startbtn.addEventListener('click', startGame);
} else {
    console.error("Element with ID 'startbtn' not found.");
}

// Initial display or setup (optional, but good practice if needed before first game)
// For example, you might want to display initial score and timer as 0/N.
scoreElement.textContent = `Score: ${score}`;
timerElement.textContent = `Time Left: ${timeLeft}`;

// You might want to initially generate cards but faced down for the first view
// generateCards(); // Uncomment if you want to show cards before starting
