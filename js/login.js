function init(){
    loadUsers();
}

async function loadUsers(){
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



