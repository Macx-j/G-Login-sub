function validateForm() {
  // Your validation logic here

  // Assuming the validation is successful
  if (specificUsernameAndPasswordEntered()) {
    redirectToFormPage();
  } else {
    displayErrorMessage("Invalid username or password.");
  }

  return false; // Prevents the form from submitting
}

function specificUsernameAndPasswordEntered() {
  const enteredUsername = document.getElementById("username").value;
  const enteredPassword = document.getElementById("password").value;

  // Check if the entered username is "Admin" (case insensitive) and the password is "2345"
  return (
    enteredUsername.toLowerCase() === "admin" && enteredPassword === "2345"
  );
}

function redirectToFormPage() {
  // Redirect to the form page
  window.location.href = "form.html";
}

function displayErrorMessage(message) {
  // Display error message logic (you can customize this based on your UI)
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
}
