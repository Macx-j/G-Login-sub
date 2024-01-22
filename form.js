let fields = ["First Name", "Last Name", "Email", "Date of Birth"];
let data = [];

let n = 1;
let x = 1;

document.addEventListener("DOMContentLoaded", () => {
  setupForm();
  loadTableData();
});

function setupForm() {
  const formContainer = document.getElementById("formContainer");

  fields.forEach((field, index) => {
    const label = document.createElement("label");
    label.textContent = field;
    formContainer.appendChild(label);

    const input = document.createElement("input");
    input.type = field === "Date of Birth" ? "date" : "text";
    input.name = `field${index}`;
    formContainer.appendChild(input);
  });

  const addButton = document.createElement("input");
  addButton.type = "button";
  addButton.value = "Submit";
  addButton.addEventListener("click", addRow);
  formContainer.appendChild(addButton);
}
function addRow() {
  const newRow = document.getElementById("show").insertRow(n);

  fields.forEach((field, index) => {
    const inputValue = document.querySelector(
      `input[name="field${index}"]`
    ).value;
    data[x] = data[x] || {};
    data[x][field] = inputValue;

    const cell = newRow.insertCell(index);
    cell.innerHTML =
      field === "Date of Birth"
        ? new Date(inputValue).toLocaleDateString()
        : inputValue;
  });

  const actionsCell = newRow.insertCell(fields.length);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteRow(x));
  actionsCell.appendChild(deleteButton);

  saveTableData();
  n++;
  x++;
}

function editRow(rowIndex) {
  const formContainer = document.getElementById("formContainer");

  fields.forEach((field, index) => {
    const input = formContainer.querySelector(`input[name="field${index}"]`);
    input.value = data[rowIndex][field];
  });

  const saveButton = document.createElement("input");
  saveButton.type = "button";
  saveButton.value = "Save";
  saveButton.addEventListener("click", () => saveEdit(rowIndex));
  formContainer.appendChild(saveButton);
}

function saveEdit(rowIndex) {
  fields.forEach((field, index) => {
    const inputValue = document.querySelector(
      `input[name="field${index}"]`
    ).value;
    data[rowIndex][field] = inputValue;
  });

  saveTableData();
  clearForm();
}

function deleteRow(rowIndex) {
  document.getElementById("show").deleteRow(rowIndex + 1); // Delete the corresponding row in the table
  data.splice(rowIndex, 0); // Remove the data from the array
  saveTableData();
  n--;
  x--;
}

function clearForm() {
  const formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = "";
  setupForm();
}

function saveTableData() {
  localStorage.setItem("tableData", JSON.stringify(data));
}

function loadTableData() {
  const storedData = localStorage.getItem("tableData");
  if (storedData) {
    data = JSON.parse(storedData);
    data.forEach((rowData, index) => {
      const newRow = document.getElementById("show").insertRow(index + 1);
      fields.forEach((field, columnIndex) => {
        const cell = newRow.insertCell(columnIndex);
        cell.innerHTML =
          field === "Date of Birth"
            ? new Date(rowData[field]).toLocaleDateString()
            : rowData[field];
      });

      const actionsCell = newRow.insertCell(fields.length);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteRow(index));
      actionsCell.appendChild(deleteButton);

      n++;
      x++;
    });
  }
}
