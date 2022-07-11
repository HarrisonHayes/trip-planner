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

//validate inputs for city, country, dates present, and end date after start date
const validateDestinationInputs = (city, country, date_start, date_end) => {
  let validationErrors = [];
  if (city == '') {
    validationErrors.push('Enter a valid city');
  }
  if (country == '0') {
    validationErrors.push('Enter a valid country');
  }
  if (date_start == '') {
    validationErrors.push('Enter a valid start date');
  }
  if (date_start == '') {
    validationErrors.push('Enter a valid end date');
  }
  if (date_start != '' && date_end != '' && date_end < date_start) {
    validationErrors.push('Enter a trip end date after the start date');
  }
  return validationErrors;
};

//validate inputs for trip name present, dates present, and end date after start date
const validateTripInputs = (name, date_start, date_end) => {
  let validationErrors = [];
  if (name == '') {
    validationErrors.push('Enter a trip name');
  }
  if (date_start == '') {
    validationErrors.push('Enter a valid start date');
  }
  if (date_start == '') {
    validationErrors.push('Enter a valid end date');
  }
  if (date_start != '' && date_end != '' && date_end < date_start) {
    validationErrors.push('Enter a trip end date after the start date');
  }
  return validationErrors;
};

//update existing trip
//call PUT /api/trips/id:
const updateTrip = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#trip-id').value.trim();
  const name = capWord(document.querySelector('#trip-name').value.trim());
  const date_start = document.querySelector('#trip-start-date').value.trim();
  const date_end = document.querySelector('#trip-end-date').value.trim();

  const validationResult = validateTripInputs(name, date_start, date_end);
  if (validationResult.length == 0) {
    const jsonBody = JSON.stringify({ id, name, date_start, date_end });

    const response = await fetch('/api/trips/' + id, {
      method: 'PUT',
      body: jsonBody,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Error updating trip');
    }
  } else {
    alert(validationResult.join('\n'));
  }
};

const deleteDestination = async (destination_id) => {
  const response = await fetch('/api/destinations/' + destination_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  window.location.reload();
}

//add destination to existing trip
//call POST on /api/destinations/id: route
const addDestination = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#trip-id').value.trim();
  const city = capWord(
    document.querySelector('#destination-city').value.trim()
  );
  let countryRaw = document.querySelector('#destination-country').value.trim();
  const date_start = document
    .querySelector('#destination-start-date')
    .value.trim();
  const date_end = document.querySelector('#destination-end-date').value.trim();

  const validationResult = validateDestinationInputs(
    city,
    countryRaw,
    date_start,
    date_end
  );
  if (validationResult.length == 0) {
    let countryIso = '';
    let countryName = '';
    if (countryRaw.includes('|')) {
      countryRaw = countryRaw.split('|');
      countryIso = countryRaw[0];
      countryName = countryRaw[1];
    } else {
      countryName = countryRaw;
    }

    const jsonBody = JSON.stringify({
      id,
      city,
      countryName,
      countryIso,
      date_start,
      date_end,
    });

    const response = await fetch('/api/destinations/' + id, {
      method: 'POST',
      body: jsonBody,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert('Error adding destination');
    }
  } else {
    alert(validationResult.join('\n'));
  }
};

let editBtnText = document.getElementById('edit-btn');
let destBtnText = document.getElementById('dest-btn');

//event handler for collapsible section
document
  .querySelector('.collapsible-edit')
  .addEventListener('click', function () {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
      editBtnText.textContent = 'Edit Trip +';
    } else {
      content.style.display = 'block';
      editBtnText.textContent = 'Edit Trip -';
    }
  });

//event handler for collapsible section
document
  .querySelector('.collapsible-dest')
  .addEventListener('click', function () {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
      destBtnText.textContent = 'Add Destination +';
    } else {
      content.style.display = 'block';
      destBtnText.textContent = 'Add Destination -';
    }
  });

//event handler for updating trip
document.querySelector('.trip-form').addEventListener('submit', updateTrip);
//event handler for adding a destination
document
  .querySelector('.destination-form')
  .addEventListener('submit', addDestination);
