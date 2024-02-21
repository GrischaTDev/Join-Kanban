let users = [];
let checkBox = false;

function initRegister() {
  loadUsersRegister();
  console.log('Init register geladen!');
}


async function loadUsersRegister() {  
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}


function addUser() {
  let registerButton = document.getElementById('register-button');
  registerButton.disabled = true;
  let registerName = document.getElementById('register-name').value;
  let registerEmail = document.getElementById('register-email').value;
  let registerPassword = document.getElementById('register-password').value;
  let registerConfirmPassword = document.getElementById('register-confirm-password').value;

  if (registerPassword !== registerConfirmPassword) {
    checkPassword(registerButton);
    return
  }

  if (!checkBox) {
    checkPrivacyConsent(registerButton);
    return;
  }

  let dontPrivacyAccept = document.getElementById('dont-accept');
  dontPrivacyAccept.classList.add('d-none');

  userPush(registerName, registerEmail, registerPassword, registerConfirmPassword);
  successfullyMessage();
  resetForm(registerName, registerEmail, registerPassword, registerConfirmPassword, registerButton);
}


function checkPassword(registerButton) {
  let passwordDontMatch = document.getElementById('password-dont-match');
  let passwordDontMatchBorder = document.getElementById('register-confirm-password');
  let dontPrivacyAccept = document.getElementById('dont-accept');
  dontPrivacyAccept.classList.add('d-none');
  passwordDontMatch.classList.remove('d-none');
  passwordDontMatchBorder.classList.add('input-invalid');
  registerButton.disabled = false;
}


function checkPrivacyConsent(registerButton) {
  let dontPrivacyAccept = document.getElementById('dont-accept');
  dontPrivacyAccept.classList.remove('d-none');
  let passwordDontMatch = document.getElementById('password-dont-match');
  let passwordDontMatchBorder = document.getElementById('register-confirm-password');
  passwordDontMatch.classList.add('d-none');
  passwordDontMatchBorder.classList.remove('input-invalid');
  registerButton.disabled = false;
}

async function userPush(registerName, registerEmail, registerPassword) {
  let userId = users.length;
  users.push({
    id: userId,
    name: registerName,
    email: registerEmail,
    password: registerPassword,
    color: generateRandomColor()
  });
  await setItem('users', JSON.stringify(users));
}


function privacyCheck() {
  let checkBoxImage = document.getElementById('checkbox');

  if (!checkBox) {
    checkBoxImage.src = './assets/img/checkbox_active.svg';
    checkBox = true;
  } else {
    checkBoxImage.src = './assets/img/checkbox.svg';
    checkBox = false;
  }
}


async function successfullyMessage() {
  let msg = document.getElementById('msgBox');
  msg.classList.remove('d-none');
  msg.classList.add('msgBox');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}


function resetForm(registerName, registerEmail, registerPassword, registerConfirmPassword, registerButton) {
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerConfirmPassword = '';
  registerButton.disabled = false;
}


function showPassword(input, showIcon) {
  let inputField = document.getElementById(input);
  let icon = document.getElementById(showIcon);

  if (inputField.value === '') {
    return
  } if (inputField.type === "password") {
    inputField.type = "text";
    icon.src = './assets/img/visibility.svg';
  } else {
    inputField.type = "password";
    icon.src = './assets/img/visibility_off.svg';
  }
}


function changePasswordIcon(input, showIcon) {
  const inputField = document.getElementById(input);
  const icon = document.getElementById(showIcon);

  if (inputField.value === '') {
    icon.src = './assets/img/lock_icon.svg';
  } else {
    icon.src = './assets/img/visibility_off.svg';
  } if (inputField.type === "text") {
    icon.src = './assets/img/visibility.svg';
  } if (inputField.value === '') {
    icon.src = './assets/img/lock_icon.svg';
    inputField.type = "password";
  }
}
