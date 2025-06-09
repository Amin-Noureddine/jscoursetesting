// Step 1: Declare userRole and accessLevel
let userRole = "admin";
let accessLevel;

// Step 2: Use if...else to determine accessLevel
if (userRole === "admin") {
    accessLevel = "Full access granted";
} else if (userRole === "manager") {
    accessLevel = "Limited access granted";
} else {
    accessLevel = "No access granted";
}

// Output access level
console.log("Access Level:", accessLevel);

// Step 3: Declare isLoggedIn and userMessage
let isLoggedIn = true;
let userMessage;

// Nested if...else to determine user message
if (isLoggedIn) {
    if (userRole === "admin") {
        userMessage = "Welcome, Admin!";
    } else {
        userMessage = "Welcome, User!";
    }
} else {
    userMessage = "Please log in to access the system.";
}

// Output user message
console.log("User Message:", userMessage);

// Step 4: Declare userType and userCategory
let userType = "subscriber";
let userCategory;

// Use switch statement to determine userCategory
switch (userType) {
    case "admin":
        userCategory = "Administrator";
        break;
    case "manager":
        userCategory = "Manager";
        break;
    case "subscriber":
        userCategory = "Subscriber";
        break;
    default:
        userCategory = "Unknown";
}

// Output user category
console.log("User Category:", userCategory);

// Step 5: Use ternary operator for authentication status
let isAuthenticated = true;
let authenticationStatus = isAuthenticated ? "Authenticated" : "Not authenticated";

// Output authentication status
console.log("Authentication Status:", authenticationStatus);
