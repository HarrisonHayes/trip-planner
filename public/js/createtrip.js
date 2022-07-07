
const createTrip = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#trip-name').value.trim();
  const date_start = document.querySelector('#start-date').value.trim();
  const date_end = document.querySelector('#end-date').value.trim();

  const validationResult = validateTripInputs(name, date_start, date_end);
  if (validationResult.length == 0) {
    const jsonBody = JSON.stringify({ name, date_start, date_end });
    console.log(jsonBody);
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
  }
};


let createBtnText = document.getElementById('create-btn');

document
  .querySelector('.collapsible-dest')
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

const validateTripInputs = (name, date_start, date_end) => {
  if (name == '') {
    validationError.push('Enter a trip name');
  }
  if (date_start == '') {
    validationError.push('Enter a vaild start date');
  }
  if (date_end == '') {
    validationError.push('Enter a vaild end date');
  }
  if (date_start != '' && date_end != '' && date_end < date_start) {
    validationError.push('Enter a trip end date after the start date');
  }

  return validationError;
};


document.querySelector('.trip-form').addEventListener('submit', createTrip);
