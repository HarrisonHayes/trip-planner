const logoutBtn = document.querySelector('#logout');
const loginBtn = document.querySelector('#login');
const signupBtn = document.querySelector('#signup');
const createtripBtn = document.querySelector('#createtrip');

const callLogout = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  }
};

const callLogin = async (event) => {
  event.preventDefault();
  document.location.replace('/login');
};

const createtrip = async (event) => {
  event.preventDefault();
  document.location.replace('/createtrip');
};

if (logoutBtn) {
  logoutBtn.addEventListener('click', callLogout);
}

if (loginBtn) {
  loginBtn.addEventListener('click', callLogin);
}

if (signupBtn) {
  signupBtn.addEventListener('click', callLogin);
}

if (createtripBtn) {
  createtripBtn.addEventListener('click', createtrip);
}
