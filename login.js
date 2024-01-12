// login.js

var attempts = 3; // Number of login attempts allowed
var lockedOut = false; // Flag to track if the user is locked out
var lockoutDuration = 15 * 60 * 1000; // Lockout duration in milliseconds (e.g., 15 minutes)
var localStorageKey = "loginState"; // Key for localStorage

function init() {
    // Check if there is a saved state in localStorage
    var savedState = JSON.parse(localStorage.getItem(localStorageKey));
    if (savedState) {
        lockedOut = savedState.lockedOut;
        attempts = savedState.attempts;

        if (lockedOut) {
            disableInputs();
            startCountdown();
        }
    }
}

function validateForm() {
    if (lockedOut) {
        displayError("Account locked. Please try again later.");
        return false;
    }

    var usernameInput = document.getElementById("username").value;
    var passwordInput = document.getElementById("password").value;

    // Implement server-side validation and authentication here
    // For now, we'll simulate a check with hardcoded values
    var correctUsername = "user";
    var correctPassword = "password";

    if (usernameInput === correctUsername && passwordInput === correctPassword) {
        // Successful login
        displaySuccess("Login successful! Redirecting...");
        // Add logic to redirect to another page or perform additional actions
        return true;
    } else {
        // Failed login attempt
        attempts--;

        if (attempts === 0) {
            lockoutUser();
        } else {
            displayError("Invalid username or password. Attempts left: " + attempts);
        }

        return false;
    }
}

function displayError(message) {
    var errorMessageContainer = document.getElementById("error-message");
    errorMessageContainer.innerHTML = "<div class='error'>" + message + "</div>";

    if (lockedOut) {
        disableInputs();
        startCountdown();
    }
}

function displaySuccess(message) {
    var errorMessageContainer = document.getElementById("error-message");
    errorMessageContainer.innerHTML = "<div class='success'>" + message + "</div>";
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var toggleSpan = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleSpan.textContent = "👁️"; // Eye open emoji
    } else {
        passwordInput.type = "password";
        toggleSpan.textContent = "👁️"; // Eye closed emoji
    }
}

function lockoutUser() {
    lockedOut = true;
    displayError("Account locked. Please try again later.");
    disableInputs();
    startCountdown();
    saveStateToLocalStorage();
}

function disableInputs() {
    document.getElementById("username").disabled = true;
    document.getElementById("password").disabled = true;
}

function startCountdown() {
    var countdownContainer = document.getElementById("countdown");
    countdownContainer.innerHTML = "<div class='countdown'>" + formatTime(lockoutDuration) + "</div>";

    var countdownInterval = setInterval(function () {
        lockoutDuration -= 1000;
        countdownContainer.innerHTML = "<div class='countdown'>" + formatTime(lockoutDuration) + "</div>";

        if (lockoutDuration <= 0) {
            clearInterval(countdownInterval);
            countdownContainer.innerHTML = ""; // Clear the countdown when the lockout is lifted
            unlockUser();
        }
    }, 1000);
}

function formatTime(milliseconds) {
    var seconds = Math.floor(milliseconds / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function unlockUser() {
    lockedOut = false;
    document.getElementById("username").disabled = false;
    document.getElementById("password").disabled = false;
    attempts = 3; // Reset the attempts after the lockout duration
    displayError(""); // Clear any previous error message
    saveStateToLocalStorage();
}

function saveStateToLocalStorage() {
    var stateToSave = {
        lockedOut: lockedOut,
        attempts: attempts,
    };

    localStorage.setItem(localStorageKey, JSON.stringify(stateToSave));
}

// Event listener for visibility change
document.addEventListener("visibilitychange", function () {
    if (!document.hidden && lockedOut) {
        alert("Lockout period is over. You can attempt logging in again.");
    }
});

// Initialize the state on page load
init();

//////changes are to be made still incomplete
