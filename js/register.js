let users = [];

async function addUser() {
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
        passwordDontMatch.classList.remove('d-none');

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