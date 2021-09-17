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

function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(input.value)) {
    showSuccess(input.value);
  } else {
    showError(input, "Email is not valid");
  }
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

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function checkPassword(input, inputConfirm) {
  if (input.value !== inputConfirm.value) {
    showError(inputConfirm, "Passwords do not match");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password]);
  checkLength(username, 3, 21);
  checkLength(password, 6, 28);
  checkEmail(email);
  checkPassword(password, passwordConfirm);
});
