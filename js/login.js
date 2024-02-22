// let loggedInUser = [];
let userTest = [];



function initLogin(){
    loadUsersLogin();
    // loadUserProfile()
    console.log('Init login geladen!');
}



async function loadUsersLogin(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

// async function loadUserProfile() {
//     try {
//         loggedInUser = JSON.parse(await getItem('loggedInUser'));
//     } catch(e){
//         console.error('Loading error:', e);
//     }
// }

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
    // let loginEmail = document.getElementById('login-email').value;
    // let loginPassword = document.getElementById('login-password').value;

    document.getElementById('login-email').value = 'test-user@join.com';
    document.getElementById('login-password').value = 'xt8mnVL6t8i4f4N';
}

async function userPushLogin(user) {
    userTest.push({
      id: user.id,
      name: user.name,
      color: user.color
    });
    // await setItem('loggedInUser', JSON.stringify(loggedInUser));
    save();
  }

  function save() {
    let loggedUSer = JSON.stringify(userTest);
    localStorage.setItem('userTest', loggedUSer);dw
}




