const logoutBtn = document.querySelector('#logout');
const loginBtn = document.querySelector('#login');
const signupBtn = document.querySelector('#signup');
const createtripBtn = document.querySelector('#createtrip');

//log out signed in user
//call POST on /api/users/logout
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

//navigate to login screen
const callLogin = async (event) => {
  event.preventDefault();
  document.location.replace('/login');
};

//navigate to create trip screen
const createtrip = async (event) => {
  event.preventDefault();
  document.location.replace('/createtrip');
};

//logout listener
if (logoutBtn) {
  logoutBtn.addEventListener('click', callLogout);
}

//login listener
if (loginBtn) {
  loginBtn.addEventListener('click', callLogin);
}

//sign in listener
if (signupBtn) {
  signupBtn.addEventListener('click', callLogin);
}

//create trip listener
if (createtripBtn) {
  createtripBtn.addEventListener('click', createtrip);
}
