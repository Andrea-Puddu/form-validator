"use strict";

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

// Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

// Check email is valid
const checkEmail = (input) => {
  String(input.value.trim())
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? showSuccess(input)
    : showError(input, "Email is not valid");
};

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    input.value.trim() === ""
      ? showError(input, `${getFieldName(input)} is required`)
      : showSuccess(input);
  });
};

// Check input length
const checkLength = (input, min, max) =>
  input.value.length < min || input.value.length > max
    ? showError(
        input,
        `${getFieldName(input)} must be between ${min} and ${max} characters`
      )
    : showSuccess(input);

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value)
    showError(input2, "Passwords do not match");
};

// Get fieldname
const getFieldName = (input) => {
  const fieldName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  return input.id === "password2" ? fieldName.slice(0, -1) : fieldName;
};

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
