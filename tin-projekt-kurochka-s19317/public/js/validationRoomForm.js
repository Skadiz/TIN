function validateForm() {
const numberInput = document.getElementById('roomNumber');
const typeInput = document.getElementById('type');
const priceInput = document.getElementById('price');
const numberOfPlacesInput = document.getElementById('numberOfPlaces');

const errorNumber = document.getElementById('errorNumber');
const errorType = document.getElementById('errorType');
const errorPrice = document.getElementById('errorPrice');
const errorPlaces = document.getElementById('errorPlaces');
const errorsSummary = document.getElementById('errorsSummary'); 

resetErrors([numberInput, typeInput, priceInput, numberOfPlacesInput], [errorNumber, errorType, errorPrice, errorPlaces], errorsSummary);


let valid = true;

if (!checkRequired(numberInput.value)) {
    valid = false;
    numberInput.classList.add("error-input");
    errorNumber.innerText = "Pole jest wymagane";
} else if (!checkNumberRange(numberInput.value, 100, 500)) {
    valid = false;
    numberInput.classList.add("error-input");
    errorNumber.innerText = "Pole powinno być w przedziałe <100,500>";
}

if (!checkRequired(typeInput.value)) {
    valid = false;
    typeInput.classList.add("error-input");
    errorType.innerText = "Pole jest wymagane";
} else if (!checkTextLengthRange(typeInput.value, 2, 60)) {
    valid = false;
    typeInput.classList.add("error-input");
    errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
}

if (!checkRequired(priceInput.value)) {
    valid = false;
    priceInput.classList.add("error-input");
    errorPrice.innerText = "Pole jest wymagane";
} else if (!checkNumberRange(priceInput.value, 1, 999999999)) {
    valid = false;
    priceInput.classList.add("error-input");
    errorPrice.innerText = "Pole powinno być większe od 0";
}

if (!checkRequired(numberOfPlacesInput.value)) {
    valid = false;
    numberOfPlacesInput.classList.add("error-input");
    errorPlaces.innerText = "Pole jest wymagane";
} else if (!checkNumberRange(numberOfPlacesInput.value, 1, 5)) {
    valid = false;
    numberOfPlacesInput.classList.add("error-input");
    errorPlaces.innerText = "Pole powinno być w przedziałe <1,5>";
}

if (!valid) {
    errorsSummary.innerText = "Formularz zawiera błędy";
}
return valid;
}
