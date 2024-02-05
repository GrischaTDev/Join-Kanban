let users = [];

async function addUser() {
    let registerButton = document.getElementById('register-button');
    registerButton.disabled = true;
    let registerName = document.getElementById('register-name').value;
    let registerEmail = document.getElementById('register-email').value;
    let registerPassword = document.getElementById('register-password').value;
    let registerConfirmPassword = document.getElementById('register-confirm-password').value;
    users.push({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        confirmPassword: registerConfirmPassword,
    });

    if (registerPassword === registerConfirmPassword) {
        await setItem('users', JSON.stringify(users));
        successfullyMessage();
        resetForm(registerName, registerEmail, registerPassword, registerConfirmPassword);
    
        console.log('User data:', users);
    } else {
        let passwordDontMatch = document.getElementById('password-dont-match');
        let passwordDontMatchBorder = document.getElementById('register-confirm-password');
        passwordDontMatch.classList.remove('d-none');
        passwordDontMatchBorder.classList.add('input-invalid');

        registerButton.disabled = false;
        console.log('Paswörter stimmen nicht überein');
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

function resetForm(registerName, registerEmail, registerPassword, registerConfirmPassword) {
    registerName = '';
    registerEmail = '';
    registerPassword = '';
    registerConfirmPassword = '';
    registerButton.disabled = false;
}


function showPassword() {
    let showInputPassword = document.getElementById("register-password");
    const inputField = document.getElementById('register-password');
    const icon = document.getElementById('password-icon');
    if (inputField.value === '') {
        return
    } if (showInputPassword.type === "password") {
        showInputPassword.type = "text";  
        icon.src = './assets/img/visibility.svg';
    } else {
        showInputPassword.type = "password";
        icon.src = './assets/img/visibility_off.svg';
    }
}

function showPassword2() {
    let showInputPassword = document.getElementById("register-confirm-password");
    const inputField = document.getElementById('register-confirm-password');
    const icon = document.getElementById('confirm-password-icon');
    if (inputField.value === '') {
        return;
    } if (showInputPassword.type === "password") {
        showInputPassword.type = "text";  
        icon.src = './assets/img/visibility.svg';
    } else {
        showInputPassword.type = "password";
        icon.src = './assets/img/visibility_off.svg';
    }
}

let showInputPassword = document.getElementById("register-password");
let showInputPassword2 = document.getElementById("register-confirm-password");
const inputField = document.getElementById('register-password'); 
const inputField2 = document.getElementById('register-confirm-password'); 
const icon = document.getElementById('password-icon'); 
const icon2 = document.getElementById('confirm-password-icon'); 

inputField.addEventListener('input', () => {
  if (inputField.value === '') {
    icon.src = './assets/img/lock_icon.svg'; 
  } else {
    icon.src = './assets/img/visibility_off.svg';
  } if (showInputPassword.type === "text") {
    icon.src = './assets/img/visibility.svg';
  } if (inputField.value === '') {
    icon.src = './assets/img/lock_icon.svg'; 
    showInputPassword.type = "password";
  }
});

inputField2.addEventListener('input', () => {
  if (inputField2.value === '') {
    icon2.src = './assets/img/lock_icon.svg'; 
  } else {
    icon2.src = './assets/img/visibility_off.svg';
  } if (showInputPassword2.type === "text") {
    icon2.src = './assets/img/visibility.svg';
  } if (inputField2.value === '') {
    icon2.src = './assets/img/lock_icon.svg'; 
    showInputPassword2.type = "password";
  }
});