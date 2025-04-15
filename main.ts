const lengthInput = document.getElementById("length") as HTMLInputElement;
const generateBtn = document.getElementById("generate") as HTMLButtonElement;
const passwordResult = document.getElementById("password") as HTMLDivElement;

lengthInput.addEventListener("input", () => {
  let value: string | number = lengthInput.value;
  value = value.replace(/\D/g, "");
  if (value !== "") value = Math.max(1, Math.min(32, parseInt(value)));
  lengthInput.value = String(value);
});

lengthInput.addEventListener("blur", function () {
  if (lengthInput.value === "") lengthInput.value = "10";
});

function generatePassword(
  length: number,
  includeNumbers: boolean,
  includeSpecial: boolean
): string {
  const lowercase: string = "abcdefghijklmnopqrstuvwxyz";
  const uppercase: string = lowercase.toUpperCase();
  const numbers: string = "0123456789";
  const special: string = "!@#$%^&*()_+-=[]{}|;:',.<>?";

  let charactersPool: string = lowercase + uppercase;
  if (includeNumbers) charactersPool += numbers;
  if (includeSpecial) charactersPool += special;

  let password: string = "";
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(
      Math.random() * charactersPool.length
    );
    password += charactersPool[randomIndex];
  }

  return password;
}

generateBtn.addEventListener("click", function (): void {
  let length: number = parseInt(lengthInput.value);
  const includeNumbers = (
    document.getElementById("include-numbers") as HTMLInputElement
  ).checked;

  const includeSpecial = (
    document.getElementById("include-special") as HTMLInputElement
  ).checked;

  const password = generatePassword(length, includeNumbers, includeSpecial);

  passwordResult.textContent = password;
  savePassword(password);
  displaySavedPasswords();
});

function savePassword(password: string): void {
  const savedPasswords: string[] = JSON.parse(
    localStorage.getItem("passwords") ?? "[]"
  );

  savedPasswords.unshift(password);
  if (savedPasswords.length > 10) savedPasswords.pop();
  localStorage.setItem("passwords", JSON.stringify(savedPasswords)); // update!
}

function displaySavedPasswords(): void {
  const savedPasswords: string[] = JSON.parse(
    localStorage.getItem("passwords") ?? "[]"
  );
  const listOfPasswords = savedPasswords
    .map(
      (password: string, index: number) =>
        `<div><span>${index + 1}</span> ${escapeHTML(password)}</div>`
    )
    .join("");
  (document.getElementById("saved-passwords") as HTMLDivElement).innerHTML =
    listOfPasswords || "Passwords Will Show Here";
}

function escapeHTML(str: string) : string{
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", displaySavedPasswords);
