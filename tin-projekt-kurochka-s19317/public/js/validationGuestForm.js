function validateForm() {
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const peselInput = document.getElementById('pesel');
const dateOfBirthInput = document.getElementById('dateOfBirth');

const errorFirstName = document.getElementById('errorFirstName');
const errorLastName = document.getElementById('errorLastName');
const errorPesel = document.getElementById('errorPesel');
const errorDateOfBirth = document.getElementById('errorDateOfBirth');
const errorsSummary = document.getElementById('errorsSummary'); 

resetErrors([firstNameInput, lastNameInput, peselInput, dateOfBirthInput], [errorFirstName, errorLastName, errorPesel, errorDateOfBirth], errorsSummary);


let valid = true;

if (!checkRequired(firstNameInput.value)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole jest wymagane";
} else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
}

if (!checkRequired(lastNameInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole jest wymagane";
} else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
}

if (!checkRequired(peselInput.value)) {
    valid = false;
    peselInput.classList.add("error-input");
    errorPesel.innerText = "Pole jest wymagane";
} else if (!checkTextLengthRange(lastNameInput.value, 2, 20)) {
    valid = false;
    peselInput.classList.add("error-input");
    errorPesel.innerText = "Pole powinno zawierać od 2 do 20 znaków";
}

if (!checkRequired(dateOfBirthInput.value)) {
    valid = false;
    dateOfBirthInput.classList.add("error-input");
    errorDateOfBirth.innerText = "Pole jest wymagane";
}  else if (checkDateIfAfter(dateOfBirthInput.value, nowString)) {
    valid = false;
    dateOfBirthInput.classList.add("error-input");
    errorDateOfBirth.innerText = "Data nie może być z przyszłości";
}

if (!valid) {
    errorsSummary.innerText = "Formularz zawiera błędy";
}
return valid;
}



