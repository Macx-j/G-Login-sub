function validateForm() {
  var usernameInput = document.getElementById("username").value;
  var passwordInput = document.getElementById("password").value;
  var errorMessageContainer = document.getElementById("error-message");

  // Basic client-side validation
  if (!usernameInput || !passwordInput) {
    errorMessageContainer.innerText =
      "Both username and password are required.";
    return false;
  }

  // Add more validation logic as needed

  // If everything is valid
  errorMessageContainer.innerText = ""; // Clear any previous error messages
  return true;
}

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var toggleSpan = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleSpan.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleSpan.textContent = "Show";
  }
}
