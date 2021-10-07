function validateForm() {
const dateToInput = document.getElementById('dateTo');
const dateFromInput = document.getElementById('dateFrom');
const guestInput = document.getElementById('guestId');
const roomInput = document.getElementById('roomId');

const errorGuest = document.getElementById('errorGuest');
const errorRoom = document.getElementById('errorRoom');
const errorDateTo = document.getElementById('errorDateTo');
const errorDateFrom = document.getElementById('errorDateFrom');
const errorsSummary = document.getElementById('errorsSummary'); 

resetErrors([guestInput, roomInput, dateToInput, dateFromInput], [errorGuest, errorRoom, errorDateFrom, errorDateTo], errorsSummary);


let valid = true;

let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear();
if (month.length < 2)
    month = '0' + month;
if (day.length < 2)
    day = '0' + day;
const nowString = [year, month, day].join('-');


if (!checkRequired(guestInput.value)) {
    valid = false;
    guestInput.classList.add("error-input");
    errorGuest.innerText = "Pole jest wymagane";
}

if (!checkRequired(roomInput.value)) {
    valid = false;
    roomInput.classList.add("error-input");
    errorRoom.innerText = "Pole jest wymagane";
}

if (!checkRequired(dateFromInput.value)) {
    valid = false;
    dateFromInput.classList.add("error-input");
    errorDateFrom.innerText = "Pole jest wymagane";
}  else if (checkRequired(dateToInput.value) && checkDate(dateToInput.value)
    && !checkDateIfAfter(dateToInput.value, dateFromInput.value)) {
    valid = false;
    dateToInput.classList.add("error-input");
    errorDateTo.innerText = "Data do powinna być późniejsza niż data od";
}
if (!checkRequired(dateToInput.value)) {
    valid = false;
    dateToInput.classList.add("error-input");
    errorDateTo.innerText = "Pole jest wymagane";
}  

if (!valid) {
    errorsSummary.innerText = "Formularz zawiera błędy";
}
return valid;
}