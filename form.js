let registrationData = [];

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = {
      courses: Array.from(
        document.querySelectorAll('input[name="course"]:checked')
      ).map((course) => course.value),
      firstName: document.getElementById("firstNameInput").value,
      lastName: document.getElementById("lastNameInput").value,
      gender: document.getElementById("genderInput").value,
      dob: document.getElementById("dobInput").value,
      contact: document.getElementById("contactInput").value,
      email: document.getElementById("emailInput").value,
      // Add more fields as needed
    };

    // Check if any courses are selected
    if (formData.courses.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    // Check if a qualification is selected
    const qualificationInputs = document.querySelectorAll(
      'input[name="qualification"]:checked'
    );
    if (qualificationInputs.length === 0) {
      alert("Please select a qualification.");
      return;
    }

    // Check if a status is selected
    const statusInputs = document.querySelectorAll(
      'input[name="status"]:checked'
    );
    if (statusInputs.length === 0) {
      alert("Please select a status.");
      return;
    }

    // Store form data in an array
    registrationData.push(formData);

    // Save data to local storage or process it as needed
    localStorage.setItem("registrationData", JSON.stringify(registrationData));

    // Display success message
    document.getElementById("successMessage").style.display = "block";

    // Display export button
    document.getElementById("exportContainer").style.display = "block";

    // Hide the success message after 5 seconds
    setTimeout(function () {
      document.getElementById("successMessage").style.display = "none";
    }, 5000);
  });

function exportToCSV() {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    registrationData.map((row) => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "registration_data.csv");
  document.body.appendChild(link);

  link.click(); // Trigger the download
}
