const updateTrip = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#trip-id').value.trim();
  const name = document.querySelector('#trip-name').value.trim();
  const date_start = document.querySelector('#start-date').value.trim();
  const date_end = document.querySelector('#end-date').value.trim();

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
  let countryISO = '';
  let countryName = '';
  if (countryRaw.includes('|')) {
    countryRaw = countryRaw.split('|');
    countryISO = countryRaw[0];
    countryName = countryRaw[1];
  }
  const date_start = document.querySelector('#start-date').value.trim();
  const date_end = document.querySelector('#end-date').value.trim();

  const jsonBody = JSON.stringify({
    id,
    city,
    countryName,
    countryISO,
    date_start,
    date_end,
  });
  console.log(jsonBody);
  if (id && city && date_start && date_end) {
    const response = await fetch('/api/destinations/' + id, {
      method: 'PUT',
      body: jsonBody,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Error adding destination');
    }
  }
};

document.querySelector('.trip-form').addEventListener('submit', updateTrip);
document
  .querySelector('.destination-form')
  .addEventListener('submit', addDestination);
