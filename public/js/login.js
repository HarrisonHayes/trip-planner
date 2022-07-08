//logic to handle user login
//calling POST to /api/users/login
const login = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(name + ' could not log in');
    }
  }
};

//logic to handle creating a new user
//calling POST to /api/users
const signup = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  const jsonBody = JSON.stringify({ name, email, password });
  console.log(jsonBody);
  if (name && password && email) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: jsonBody,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Error creating user');
    }
  }
};

//adding event handler for the login button
document.querySelector('.login-form').addEventListener('submit', login);
//adding event handler for the submit button
document.querySelector('.signup-form').addEventListener('submit', signup);
