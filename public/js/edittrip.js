const updateTrip = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#trip-id').value.trim();
  const name = document.querySelector('#trip-name').value.trim();
  const date_start = document.querySelector('#trip-start-date').value.trim();
  const date_end = document.querySelector('#trip-end-date').value.trim();

  const jsonBody = JSON.stringify({ id, name, date_start, date_end });
  console.log(jsonBody);
  if (id && name && date_start && date_end) {
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
  }
};

const addDestination = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#trip-id').value.trim();
  const city = document.querySelector('#destination-city').value.trim();
  let countryRaw = document.querySelector('#destination-country').value.trim();
  let countryIso = '';
  let countryName = '';
  if (countryRaw.includes('|')) {
    countryRaw = countryRaw.split('|');
    countryIso = countryRaw[0];
    countryName = countryRaw[1];
  } else {
    countryName = countryRaw;
  }
  const date_start = document.querySelector('#destination-start-date').value.trim();
  const date_end = document.querySelector('#destination-end-date').value.trim();

  const jsonBody = JSON.stringify({
    id,
    city,
    countryName,
    countryIso,
    date_start,
    date_end,
  });
  if (id && city && date_start && date_end) {
    const response = await fetch('/api/destinations/' + id, {
      method: 'POST',
      body: jsonBody,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('added destination');
    } else {
      alert('Error adding destination');
    }
  }
};

let editBtnText = document.getElementById('edit-btn');
let destBtnText = document.getElementById('dest-btn');

document.querySelector('.collapsible-edit').addEventListener('click', function () {
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

document.querySelector('.collapsible-dest').addEventListener('click', function () {
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

document.querySelector('.trip-form').addEventListener('submit', updateTrip);
document
  .querySelector('.destination-form')
  .addEventListener('submit', addDestination);
