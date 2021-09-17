const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");

function showError(input, msg) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = msg;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function checkRequired(inputArr) {
  inputArr.forEach((field) => {
    if (field.value.trim() === "") {
      showError(field, `${getFieldName(field)} is required`);
    } else {
      showSuccess(field);
    }
  });
}

function getFieldName(field) {
  return field.id.charAt(0).toUpperCase() + field.id.slice(1);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, passwordConfirm]);
});
