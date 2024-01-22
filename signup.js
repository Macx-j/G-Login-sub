function validateSignUp() {
  // Your validation logic here

  // Assuming the validation is successful and the entered values are specific ones
  if (specificUsernameAndPasswordEntered()) {
    redirectToLoginPage();
  } else {
    displayErrorMessage("Invalid username or password.");
  }

  return false; // Prevents the form from submitting
}

function specificUsernameAndPasswordEntered() {
  const enteredUsername = document.getElementById("newUsername").value;
  const enteredPassword = document.getElementById("newPassword").value;

  // Check if the entered username and password match your specific values
  return enteredUsername === "Admin" && enteredPassword === "2345";
}

function redirectToLoginPage() {
  // Redirect to the login page
  window.location.href = "login.html";
}

function displayErrorMessage(message) {
  // Display error message logic (you can customize this based on your UI)
  const errorMessageElement = document.getElementById("signup-error-message");
  errorMessageElement.textContent = message;
}
