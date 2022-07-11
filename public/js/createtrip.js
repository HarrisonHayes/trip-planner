//this function capitalizes the first letter of each word
const capWord = (string) => {
  if (string == '') {
    return '';
  }
  let stringArr = string.split(' ');
  for (let i = 0; i < stringArr.length; i++) {
    stringArr[i] = stringArr[i][0].toUpperCase() + stringArr[i].substr(1);
  }
  return stringArr.join(' ');
};

//validate inputs for trip name present, dates present, and end date after start date
const validateTripInputs = (name, date_start, date_end) => {
  let validationError = [];
  if (name === '') {
    validationError.push('Enter a trip name');
  }
  if (date_start === '') {
    validationError.push('Enter a valid start date');
  }
  if (date_end === '') {
    validationError.push('Enter a valid end date');
  }
  if (date_start !== '' && date_end !== '' && date_end < date_start) {
    validationError.push('Enter a trip end date after the start date');
  }

  return validationError;
};

//this function is called by the create trip button on the homepage
//call the POST /api/trips route with JSON containing the trip name, start date, and end date
const createTrip = async (event) => {
  event.preventDefault();

  let name = document.querySelector('#trip-name').value.trim();
  name = capWord(name);
  const date_start = document.querySelector('#start-date').value.trim();
  const date_end = document.querySelector('#end-date').value.trim();

  const validationResult = validateTripInputs(name, date_start, date_end);
  if (validationResult.length === 0) {
    const jsonBody = JSON.stringify({ name, date_start, date_end });
    // if (name && date_start && date_end) {
    const response = await fetch('/api/trips', {
      method: 'POST',
      body: jsonBody,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Error creating trip');
    }
  } else {
    alert(validationResult.join('\n'));
  }
};

let createBtnText = document.getElementById('create-btn');

document
  .querySelector('.collapsible-create')
  .addEventListener('click', function () {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
      createBtnText.textContent = 'Create Trip +';
    } else {
      content.style.display = 'block';
      createBtnText.textContent = 'Create Trip -';
    }
  });

//add event listener for the create trip 
document.querySelector('.trip-form').addEventListener('submit', createTrip);
