const loginEmailInput = document.querySelector("#in-email");
const loginPasswordInput = document.querySelector("#in-password");
const btnLogin = document.querySelector("#btn-login");
const signupLink = document.querySelector("#up-link");
const signupNameInput = document.querySelector("#up-name");
const signupEmailInput = document.querySelector("#up-email");
const signupPasswordInput = document.querySelector("#up-password");
const btnSignup = document.querySelector("#btn-signup");
const loginLink = document.querySelector("#in-link");
const alertUserName = document.querySelector("#alert-userName");
const alertEmail = document.querySelector("#alert-email");
const passwordAlert = document.querySelector("#alert-password");
let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userDisplay = document.querySelector("#userDisplay");
const btnLogout = document.querySelector("#btn-logout");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userNameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

load();
function load() {
  if (
    currentUser &&
    (window.location.href.includes("index.html") ||
      window.location.href.includes("signUp.html"))
  ) {
    window.location.href = "home.html";
  }
}
console.log(window.location.href.split("/").pop());

// SignUp Start
function signUp() {
  let user = {
    userName: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };
  if (checkUserName(user) && checkEmail(user)) {
    usersList.push(user);
    localStorage.setItem("usersList", JSON.stringify(usersList));
    clearInputs();
    window.location.href = "index.html";
  }
}

btnSignup &&
  btnSignup.addEventListener("click", () => {
    if (
      signupNameInput.classList.contains("is-valid") &&
      signupEmailInput.classList.contains("is-valid") &&
      signupPasswordInput.classList.contains("is-valid")
    ) {
      signUp();
    } else {
      alert("Please enter valid details");
    }
  });

function clearInputs() {
  signupPasswordInput.value = "";
  signupEmailInput.value = "";
  signupNameInput.value = "";
  signupEmailInput.classList.remove("is-valid");
  signupNameInput.classList.remove("is-valid");
  signupPasswordInput.classList.remove("is-valid");
}

function checkUserName(currentUser) {
  for (const user of usersList) {
    if (user.userName === currentUser.userName) {
      alert("User name already exists");
      return false;
    }
  }
  return true;
}

function checkEmail(currentUser) {
  for (const user of usersList) {
    if (user.email === currentUser.email) {
      alert("Email already exists");
      return false;
    }
  }
  return true;
}

function validateEmail() {
  let email = signupEmailInput.value;

  if (emailRegex.test(email)) {
    signupEmailInput.classList.remove("is-invalid");
    signupEmailInput.classList.add("is-valid");
    alertEmail.classList.add("d-none");
    alertEmail.classList.remove("d-block");
  } else {
    signupEmailInput.classList.remove("d-none");
    signupEmailInput.classList.add("is-invalid");
    alertEmail.classList.remove("d-none");
    alertEmail.classList.add("d-block");
  }
}

function validateUserName() {
  let userName = signupNameInput.value;
  if (userNameRegex.test(userName)) {
    signupNameInput.classList.remove("is-invalid");
    signupNameInput.classList.add("is-valid");
    alertUserName.classList.remove("d-block");
    alertUserName.classList.add("d-none");
  } else {
    signupNameInput.classList.remove("d-none");
    signupNameInput.classList.add("is-invalid");
    alertUserName.classList.remove("d-none");
    alertUserName.classList.add("d-block");
  }
}

function validatePassword() {
  let password = signupPasswordInput.value;
  if (passwordRegex.test(password)) {
    signupPasswordInput.classList.remove("is-invalid");
    signupPasswordInput.classList.add("is-valid");
    passwordAlert.classList.remove("d-block");
    passwordAlert.classList.add("d-none");
  } else {
    signupPasswordInput.classList.remove("is-valid");
    signupPasswordInput.classList.add("is-invalid");
    passwordAlert.classList.remove("d-none");
    passwordAlert.classList.add("d-block");
  }
}

signupNameInput &&
  signupNameInput.addEventListener("input", () => {
    validateUserName();
  });

signupEmailInput &&
  signupEmailInput.addEventListener("input", () => {
    validateEmail();
  });

signupPasswordInput &&
  signupPasswordInput.addEventListener("input", () => {
    validatePassword();
  });
// SignUp End

// Login Start
function login() {
  let currentUser = {
    userEmail: loginEmailInput.value.trim(),
    userPassword: loginPasswordInput.value.trim(),
  };

  if (!currentUser.userEmail || !currentUser.userPassword) {
    alert("Please fill in both email and password.");
    return false;
  }

  for (const user of usersList) {
    if (
      user.email === currentUser.userEmail &&
      user.password === currentUser.userPassword
    ) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "home.html";
      return true;
    }
  }
  alert("userName or password is incorrect");
  return false;
}
btnLogin &&
  btnLogin.addEventListener("click", () => {
    login();
  });

// Login End

// Home Start

if (currentUser) {
  if (userDisplay) {
    userDisplay.innerText = `Hello ${currentUser.userName}`;
  }
}
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
btnLogout &&
  btnLogout.addEventListener("click", () => {
    logout();
  });

// Home End
