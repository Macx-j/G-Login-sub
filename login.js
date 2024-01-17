let attempts = 3;
let lockedOut = false;
let lockoutDuration = 15 * 60 * 1000;

function validateForm() {
  if (lockedOut) {
    displayError("Account locked. Please try again later.");
    return false;
  }

  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  const correctUsername = "Moha";
  const correctPassword = "AdminMack";

  if (usernameInput === correctUsername && passwordInput === correctPassword) {
    displaySuccess("Login successful! Redirecting...");
    return true;
  } else {
    attempts--;

    if (attempts === 0) {
      lockoutUser();
    } else {
      displayError(`Invalid username or password. Attempts left: ${attempts}`);
    }

    return false;
  }
}

function displayError(message) {
  const errorMessageContainer = document.getElementById("error-message");
  errorMessageContainer.innerHTML = `<div class='error'>${message}</div>`;

  if (lockedOut) {
    disableInputs();
    startCountdown();
  }

  saveStateToLocalStorage();
}

function displaySuccess(message) {
  const errorMessageContainer = document.getElementById("error-message");
  errorMessageContainer.innerHTML = `<div class='success'>${message}</div>`;
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const toggleSpan = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleSpan.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleSpan.textContent = "Show";
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
  const countdownContainer = document.getElementById("countdown");
  countdownContainer.innerHTML = `<div class='countdown'>${formatTime(
    lockoutDuration
  )}</div>`;

  const countdownInterval = setInterval(() => {
    lockoutDuration -= 1000;
    countdownContainer.innerHTML = `<div class='countdown'>${formatTime(
      lockoutDuration
    )}</div>`;

    if (lockoutDuration <= 0) {
      clearInterval(countdownInterval);
      countdownContainer.innerHTML = "";
      unlockUser();
    }
  }, 1000);

  saveStateToLocalStorage();
}

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

function unlockUser() {
  lockedOut = false;
  document.getElementById("username").disabled = false;
  document.getElementById("password").disabled = false;
  attempts = 3;
  displayError("");
  saveStateToLocalStorage();
}

function saveStateToLocalStorage() {
  localStorage.setItem("lockedOut", lockedOut.toString());
  localStorage.setItem("lockoutDuration", lockoutDuration.toString());
  localStorage.setItem("attempts", attempts.toString());
}

function loadStateFromLocalStorage() {
  lockedOut = localStorage.getItem("lockedOut") === "true";
  lockoutDuration =
    parseInt(localStorage.getItem("lockoutDuration")) || lockoutDuration;
  attempts = parseInt(localStorage.getItem("attempts")) || attempts;

  if (lockedOut) {
    disableInputs();
    startCountdown();
  }
}

loadStateFromLocalStorage();
