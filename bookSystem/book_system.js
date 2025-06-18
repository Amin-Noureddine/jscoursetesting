// book_system.js

// Declare an empty books array to store book details
let books = [];

/**
 * Adds a new book to the management system.
 * It retrieves values from input fields, validates them,
 * creates a book object, adds it to the books array,
 * then updates the display and clears the input fields.
 */
function addBook() {
    // Get values from the input fields
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const bookDescription = document.getElementById('bookDescription').value;
    const pagesNumber = parseInt(document.getElementById('pagesNumber').value);

    // Validate inputs: ensure all fields are filled and pagesNumber is a valid number
    if (bookName && authorName && bookDescription && !isNaN(pagesNumber)) {
        // Create a new book object
        const book = {
            name: bookName,
            authorName: authorName,
            bookDescription: bookDescription,
            pagesNumber: pagesNumber
        };
        // Add the new book to the books array
        books.push(book);

        // Update the display with the new book list
        showbooks();
        // Clear the input fields for the next entry
        clearInputs();
    } else {
        // If validation fails, log an error message to the console
        // (Replacing alert() as per environment guidelines)
        console.error('Please fill in all fields correctly.');
        // Optionally, you could update a dedicated message div on the page
        // document.getElementById('messageArea').textContent = 'Please fill in all fields correctly.';
    }
}

/**
 * Displays all books currently in the `books` array.
 * It maps each book to an HTML string, including its details and an 'Edit' button,
 * then injects this HTML into the element with ID 'books'.
 */
function showbooks() {
    // Map each book in the array to an HTML string
    const booksDiv = books.map((book, index) => `
        <div class="book-item p-4 mb-4 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-bold mb-2">Book Number: ${index + 1}</h2>
            <p class="mb-1"><strong>Book Name: </strong>${book.name}</p>
            <p class="mb-1"><strong>Author Name:</strong> ${book.authorName}</p>
            <p class="mb-1"><strong>Book Description:</strong> ${book.bookDescription}</p>
            <p class="mb-3"><strong>No. of Pages:</strong> ${book.pagesNumber} page(s)</p>
            <button onclick="editbook(${index})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                Edit
            </button>
        </div>
    `).join(''); // Join all HTML strings into one

    // Get the HTML element where books will be displayed
    const booksContainer = document.getElementById('books');
    if (booksContainer) {
        booksContainer.innerHTML = booksDiv; // Set its inner HTML
    } else {
        console.error('HTML element with ID "books" not found.');
    }
}

/**
 * Populates the input form fields with details of a selected book for editing.
 * After populating, it removes the book from the array to prepare for re-adding the updated version,
 * and refreshes the book list display.
 * @param {number} index - The index of the book to be edited in the `books` array.
 */
function editbook(index) {
    // Ensure the index is valid
    if (index >= 0 && index < books.length) {
        const book = books[index]; // Get the book object by its index

        // Populate the form fields with the book's current details
        document.getElementById('bookName').value = book.name;
        document.getElementById('authorName').value = book.authorName;
        document.getElementById('bookDescription').value = book.bookDescription;
        document.getElementById('pagesNumber').value = book.pagesNumber;

        // Remove the old entry from the array to avoid duplicates when re-adding
        books.splice(index, 1);
        // Refresh the list to reflect the removal (the book will be re-added via addBook later)
        showbooks();
    } else {
        console.error(`Invalid index for editbook: ${index}`);
    }
}

/**
 * Clears all the input fields in the book entry form.
 */
function clearInputs() {
    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('pagesNumber').value = '';
}
