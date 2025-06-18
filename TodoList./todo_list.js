// todo_list.js

// Step 2: Defining variables to access data

// Retrieve the HTML input element where users type new tasks.
const taskInput = document.getElementById("taskInput");

// Retrieve the HTML button element for adding tasks.
const addTaskBtn = document.getElementById("addTaskBtn");

// Retrieve the HTML unordered list element where tasks will be displayed.
const taskList = document.getElementById("taskList");

// Retrieve the HTML button element for clearing completed tasks.
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Declare an empty array to store the tasks.
// Each task will be an object with at least `text` and `completed` properties.
let tasks = [];

// Step 3: Defining various functions to access data

/**
 * Adds a new task to the tasks array.
 * Retrieves the text from the taskInput, trims whitespace,
 * adds it as a new task object (with completed status as false by default),
 * clears the input field, and then updates the displayed tasks.
 */
function addTask() {
    // Get the value from the input field and remove leading/trailing whitespace.
    const taskText = taskInput.value.trim();

    // Check if the task text is not empty.
    if (taskText !== "") {
        // Add a new task object to the `tasks` array.
        // `completed: false` by default for new tasks.
        tasks.push({ text: taskText, completed: false });

        // Clear the input field after adding the task.
        taskInput.value = "";

        // Re-render the tasks list to show the newly added task.
        displayTasks();
    }
}

/**
 * Displays all tasks from the `tasks` array in the taskList HTML element.
 * Clears existing content and then dynamically creates list items for each task,
 * including a checkbox and a label.
 */
function displayTasks() {
    // Clear any existing content in the task list to prevent duplicates when re-rendering.
    taskList.innerHTML = "";

    // Iterate over each task in the `tasks` array.
    tasks.forEach((task, index) => {
        // Create a new list item (<li>) HTML element for each task.
        const li = document.createElement("li");

        // Set the inner HTML of the list item.
        // It includes a checkbox and a label for the task text.
        // The checkbox's `checked` attribute is set based on `task.completed` status.
        li.innerHTML = `
            <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
            <label for="task-${index}" class="${task.completed ? "line-through text-gray-500" : "text-gray-800"}">${task.text}</label>
        `;

        // Add an event listener to the checkbox.
        // When the checkbox's state changes, call `toggleTask` with the task's index.
        li.querySelector("input").addEventListener("change", () => toggleTask(index));

        // Append the newly created list item to the `taskList` (UL element).
        taskList.appendChild(li);
    });
}

/**
 * Toggles the completion status of a task at a specific index.
 * After toggling, it re-renders the task list to reflect the change.
 * @param {number} index - The index of the task in the `tasks` array to toggle.
 */
function toggleTask(index) {
    // Toggle the `completed` property of the task at the given index.
    tasks[index].completed = !tasks[index].completed;

    // Re-render the tasks list to update the display (e.g., strike-through text).
    displayTasks();
}

/**
 * Removes all tasks that are marked as completed from the `tasks` array.
 * It filters the array to keep only non-completed tasks and then updates the display.
 */
function clearCompletedTasks() {
    // Filter the `tasks` array to create a new array containing only tasks
    // where `completed` is false (i.e., not completed).
    tasks = tasks.filter(task => !task.completed);

    // Re-render the tasks list to remove the completed tasks from the display.
    displayTasks();
}

// Step 4: Event Listeners and Initial Display

// Add an event listener to the "Add Task" button.
// When clicked, the `addTask` function will be executed.
if (addTaskBtn) {
    addTaskBtn.addEventListener("click", addTask);
} else {
    console.error("Element with ID 'addTaskBtn' not found.");
}

// Add an event listener to the "Clear Completed" button.
// When clicked, the `clearCompletedTasks` function will be executed.
if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener("click", clearCompletedTasks);
} else {
    console.error("Element with ID 'clearCompletedBtn' not found.");
}

// Call `displayTasks` once when the script loads to show any initial tasks
// (though `tasks` is currently empty). This sets up the initial UI.
displayTasks();
