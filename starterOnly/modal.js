function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModal = document.querySelector(".close");
const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox = document.querySelector('input[type="checkbox"]');
const radioButtons = document.querySelector('input[name="location"]');
const bgroundNone = document.getElementById("bground-none");
const thanks = document.getElementById("thanks");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
closeModal.addEventListener("click", () => {
  modalbg.style.display = "";
});

// form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const firstNameValue = firstName.value.trim();
  const emailValue = email.value.trim();
  const lastNameValue = lastName.value.trim();
  const birthdateValue = birthdate.value.trim();
  const quantityValue = quantity.value.trim();
  const radioButtonsChecked = document.querySelector(
    'input[name="location"]:checked'
  );
  const checkboxChecked = document.querySelector(
    'input[type="checkbox"]:checked'
  );

  // firstname
  if (firstNameValue === "") {
    setError(firstName, "Un prénom est requis.");
  } else if (firstNameValue.length < 2) {
    setError(
      firstName,
      "Veuillez entrer un prénom comportant 2 caractères ou plus."
    );
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === "") {
    // name
    setError(lastName, "Un nom est requis.");
  } else if (lastNameValue.length < 2) {
    setError(
      lastName,
      "Veuillez entrer un nom comportant 2 caractères ou plus."
    );
  } else {
    setSuccess(lastName);
  }

  // email
  if (emailValue === "") {
    setError(email, "Une adresse mail est requise");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Veuillez entrer une adresse email valide.");
  } else {
    setSuccess(email);
  }

  // birthdate
  if (birthdateValue === "") {
    setError(birthdate, "Veuillez entrer votre date de naissance.");
  } else {
    setSuccess(birthdate);
  }

  // quantity
  if (quantityValue === "") {
    setError(quantity, "Veuillez indiquer le nombre de tournois.");
  } else {
    setSuccess(quantity);
  }

  // radioButtons
  if (radioButtonsChecked == null) {
    setError(radioButtons, "Veuillez choisir une option.");
  } else {
    setSuccess(radioButtons);
  }

  // checkbox
  if (checkboxChecked == null) {
    setError(
      checkbox,
      "Vous devez vérifier que vous acceptez les termes et conditions"
    );
  } else {
    setSuccess(checkbox);
  }

  // Validation message
  if (
    firstNameValue !== "" &&
    lastNameValue !== "" &&
    emailValue !== "" &&
    birthdateValue !== "" &&
    quantityValue !== "" &&
    radioButtonsChecked !== null &&
    checkboxChecked !== null
  ) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      bgroundNone.style.display = "none";
      thanks.style.display = "flex";
      setTimeout(() => form.submit(), 2000);
    });
  }
};
