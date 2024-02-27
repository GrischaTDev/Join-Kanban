let loggedInUser = [];
let checkBoxLogin = false;


function initLogin(){
    loadRegisteredUsers();
}


async function loadRegisteredUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function login() {
    let loginEmail = document.getElementById('login-email').value;
    let loginPassword = document.getElementById('login-password').value;
    let user = users.find(u => u.email == loginEmail && u.password == loginPassword);

    console.log('Benutzer', user);
    if (loginEmail == user.email && loginPassword == user.password) {
        resetLoginForm(loginEmail, loginPassword);
        userPushLogin(user);
        location.href = './summary.html';
    } else {
        console.log('Falsche Eingabe')
        return
    }
}


function resetLoginForm(loginEmail, loginPassword) {
    loginEmail = '';
    loginPassword = '';
}


function guestLogIn() {
    document.getElementById('login-email').value = 'test-user@join.com';
    document.getElementById('login-password').value = 'xt8mnVL6t8i4f4N';
}


async function userPushLogin(user) {
    loggedInUser.push({
      id: user.id,
      name: user.name,
      color: user.color
    });

    save();
  }

  function save() {
    let loggedUSer = JSON.stringify(loggedInUser);
    localStorage.setItem('loggedInUser', loggedUSer);
}


function rememberMe() {
    let checkBoxImage = document.getElementById('remember-me');

    if (!checkBoxLogin) {
      checkBoxImage.src = './assets/img/checkbox_active.svg';
      checkBoxLogin = true;
    } else {
      checkBoxImage.src = './assets/img/checkbox.svg';
      checkBoxLogin = false;
    }
}



