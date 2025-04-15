var lengthInput = document.getElementById("length");
var generateBtn = document.getElementById("generate");
var passwordResult = document.getElementById("password");
lengthInput.addEventListener("input", function () {
  var value = lengthInput.value;
  value = value.replace(/\D/g, "");
  if (value !== "") value = Math.max(1, Math.min(32, parseInt(value)));
  lengthInput.value = String(value);
});
lengthInput.addEventListener("blur", function () {
  if (lengthInput.value === "") lengthInput.value = "10";
});
function generatePassword(length, includeNumbers, includeSpecial) {
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var uppercase = lowercase.toUpperCase();
  var numbers = "0123456789";
  var special = "!@#$%^&*()_+-=[]{}|;:',.<>?";
  var charactersPool = lowercase + uppercase;
  if (includeNumbers) charactersPool += numbers;
  if (includeSpecial) charactersPool += special;
  var password = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charactersPool.length);
    password += charactersPool[randomIndex];
  }
  return password;
}
generateBtn.addEventListener("click", function () {
  var length = parseInt(lengthInput.value);
  var includeNumbers = document.getElementById("include-numbers").checked;
  var includeSpecial = document.getElementById("include-special").checked;
  var password = generatePassword(length, includeNumbers, includeSpecial);
  passwordResult.textContent = password;
  savePassword(password);
  displaySavedPasswords();
});
function savePassword(password) {
  var _a;
  var savedPasswords = JSON.parse(
    (_a = localStorage.getItem("passwords")) !== null && _a !== void 0
      ? _a
      : "[]"
  );
  savedPasswords.unshift(password);
  if (savedPasswords.length > 10) savedPasswords.pop();
  localStorage.setItem("passwords", JSON.stringify(savedPasswords)); // update!
}
function displaySavedPasswords() {
  var _a;
  var savedPasswords = JSON.parse(
    (_a = localStorage.getItem("passwords")) !== null && _a !== void 0
      ? _a
      : "[]"
  );
  var listOfPasswords = savedPasswords
    .map(function (password, index) {
      return "<div><span>"
        .concat(index + 1, "</span> ")
        .concat(escapeHTML(password), "</div>");
    })
    .join("");
  document.getElementById("saved-passwords").innerHTML =
    listOfPasswords || "Passwords Will Show Here";
}
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
document.addEventListener("DOMContentLoaded", displaySavedPasswords);
