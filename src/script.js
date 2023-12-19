const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayLabel = document.getElementById("label-day");
const monthLabel = document.getElementById("label-month");
const yearLabel = document.getElementById("label-year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const form = document.querySelector("form");

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;

  inputs.forEach((i) => {
    const parent = i.parentElement;

    if (!i.value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required.";
      if (i === monthInp) {
        monthLabel.style.color = "red";
      } else if (i === dayInp) {
        dayLabel.style.color = "red";
      } else if (i === yearInp) {
        yearLabel.style.color = "red";
      }
      validator = false;
    } else {
      i.style.borderColor = "black";
      parent.querySelector("small").innerText = "";

      if (i === monthInp && monthInp.value > 12) {
        monthInp.style.borderColor = "red";
        monthLabel.style.color = "red";
        parent.querySelector("small").innerText = "Must be a valid month.";
        validator = false;
      } else if (i === dayInp && dayInp.value > 31) {
        dayInp.style.borderColor = "red";
        dayLabel.style.color = "red";
        parent.querySelector("small").innerText = "Must be a valid day.";
        validator = false;
      } else if (i === yearInp && yearInp.value > date.getFullYear()) {
        yearInp.style.borderColor = "red";
        yearLabel.style.color = "red";
        parent.querySelector("small").innerText = "Must be a valid year.";
        validator = false;
      }
    }
  });

  return validator;
}

function handleInputChange(e) {
  const input = e.target;
  const parent = input.parentElement;

  if (input.value) {
    input.style.borderColor = "black";
    parent.querySelector("small").innerText = "";
    if (input === monthInp) {
      monthLabel.style.color = "black";
    } else if (input === dayInp) {
      dayLabel.style.color = "black";
    } else if (input === yearInp) {
      yearLabel.style.color = "black";
    }
  }
}

function handleSubmit(e) {
  e.preventDefault();
  if (validate()) {
    if (dayInp.value > day) {
      day = day + months[month - 1];
      month = month - 1;
    }
    if (monthInp.value > month) {
      month = month + 12;
      year = year - 1;
    }

    const d = day - dayInp.value;
    const m = month - monthInp.value;
    const y = year - yearInp.value;

    dayOtp.innerHTML = d;
    monthOtp.innerHTML = m;
    yearOtp.innerHTML = y;
  }
}

form.addEventListener("submit", handleSubmit);
dayInp.addEventListener("input", handleInputChange);
monthInp.addEventListener("input", handleInputChange);
yearInp.addEventListener("input", handleInputChange);
