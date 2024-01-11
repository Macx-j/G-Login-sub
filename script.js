const words = ["WELCOME TO GOMINDZ LOGIN PAGE"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === words.length) {
    count = 0;
  }
  currentText = words[count];
  letter = currentText.slice(0, ++index);

  document.getElementById("typing-text").textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000); // Delay before erasing
  } else {
    setTimeout(type, 200); // Typing speed
  }
})();
