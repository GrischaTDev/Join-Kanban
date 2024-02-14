let users = [];
let selectedUser = [];

function init() {
    loadUsers();
    load();
    renderUserList();
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

function openUserList() {
    let userSelect = document.getElementById('user-select');
    let inputIcon = document.getElementById('input-icon');
    userSelect.innerHTML = '';
    if (userSelect.classList.contains('d-none')) {
        userSelect.classList.remove('d-none');
        inputIcon.src = './assets/img/arrow_drop_down_2.svg';
    } else {
        userSelect.classList.add('d-none');
        inputIcon.src = './assets/img/arrow_drop_down_1.svg';
    }
    

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let initialLetters = user['name'][0];
        userSelect.innerHTML += /* html */ `
            <div id="currentUser${i}" class="userColumn" onclick="addUser(${i})">
                <div class="user-name">
                    <span class="letter-icon">${initialLetters}</span>
                    <div>${user.name}</div>
                </div>
                <img src="./assets/img/checkbox.svg" alt="">
            </div>
        `;
    }
}


// /**
//  * Close openUserList Popup when click outside
//  */
// window.addEventListener('mouseup',function(event){
//     let userSelect = document.getElementById('user-select');
//     let inputIcon = document.getElementById('input-icon');
//     if(event.target != userSelect && event.target.parentNode != userSelect){
//         userSelect.classList.add('d-none');
//         inputIcon.src = './assets/img/arrow_drop_down_1.svg';
//     }
// });

/**
 * 
 */

function renderUserList(i) {
    document.getElementById('selected-user').innerHTML = '';

    for (let i = 0; i < selectedUser.length; i++) {
        const userList = selectedUser[i]['name'][0];

        document.getElementById('selected-user').innerHTML += /* html */`
        <div class="user-icon">${userList}</div>
        `;
    }
}


function addUser(i) {
    let userColumn = document.getElementById(`currentUser${i}`);
    let user = users[i];
    if (!selectedUser.includes(user)) {
        userColumn.classList.add('user-select-active');
        selectedUser.push(user)
    } else {
        userColumn.classList.remove('user-select-active');
        selectedUser.splice(i, 1);
    }

    renderUserList(i);
    save();
}


function save() {
    let saveUser = JSON.stringify(selectedUser);
    localStorage.setItem('selectedUser', saveUser)
}


function load() {
    let loadUser = localStorage.getItem('selectedUser');
    if (loadUser) {
        selectedUser = JSON.parse(loadUser);
    }
}
//////////////////////////////////////////////////////////////////////


// alles in Json und array speichern und umwandeln//

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTask');
    if (allTasksAsString) {
        allTasks = JSON.parse(allTasksAsString);
    }
}

let allTasks = [];

function addTask(){
    let titel = document.getElementById('titel').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let userSelect = document.getElementById('user-select').innerText.trim(); // Nutzername aus dem Text des ausgewählten Elements extrahieren
    let subtask = document.getElementById('subtask').value;
    let urgend = document.getElementById('urgent').classList.contains('active');
    let medium = document.getElementById('medium').classList.contains('active');
    let low = document.getElementById('low').classList.contains('active');

    let task = {
        'titel': titel,
        'description': description,
        'dueDate': dueDate,
        'category': category,
        'userSelect': userSelect,
        'subtask': subtask,
        'priority': {
            'urgent': urgend,
            'medium': medium,
            'low': low
        }
    };

    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTask', allTasksAsString);
}



function togglePriority(priority) {
    var button = document.getElementById(priority);
    
    if (button.classList.contains('active')) {
        // Wenn der aktuelle Button bereits ausgewählt ist, dann abwählen
        button.classList.remove('active');
        button.style.backgroundColor = 'white';
        button.style.color = ''; 
        button.querySelector('img').style.filter = ''; 
    } else {
        // Andernfalls den aktuellen Button auswählen und den vorherigen abwählen
        var prevSelectedButton = document.querySelector('.priority-button.active');
        if (prevSelectedButton) {
            prevSelectedButton.classList.remove('active');
            prevSelectedButton.style.backgroundColor = 'white';
            prevSelectedButton.style.color = ''; 
            prevSelectedButton.querySelector('img').style.filter = ''; 
        }
        
        button.classList.add('active');
        var computedStyle = getComputedStyle(button);
        button.style.backgroundColor = computedStyle.backgroundColor;
        button.style.color = 'white'; 
        button.querySelector('img').style.filter = 'brightness(0) invert(100%)'; 
    }
}



// contacts.forEach((contact) => {
//     const initials = contact['given_name'][0] + contact['name'][0];
//     const backgroundColor = contact['color'] ? `style="background-color: ${contact['color']};"` : '';
//     document.getElementById('contacts_list_container').innerHTML += `
//         <div onclick="selectContact(${index})" class="contact_list_snippet_box" id="contactSnippetBox${index}">
//             <div class="initials_circle_contact_list" ${backgroundColor}>
//                 ${initials}
//             </div>
//             <div class="name_and_email_snippet">
//                 <div class="contacts_name">
//                     ${contact['given_name']} ${contact['name']}
//                 </div>
//                 <div class="contacts_e-mail">
//                     ${contact['e-mail']}
//                 </div>
//             </div>
//         </div>
//     `;
//     index++; // Zählervariable inkrementieren
// });


// /**
//  * Shows the Popup from the Side
//  */
// function showPopup() {
//     console.log('Showing popup');
//     document.getElementById('incomePopup').classList.remove('d-none');
//     document.getElementById('incomePopup').classList.add('income-popup');
// }

// function closePopup() {
//     console.log('Closing popup');
//     document.getElementById('incomePopup').classList.add('d-none');
//     document.getElementById('incomePopup').classList.remove('income-popup');
// }

//**
//* Popup-end 
//

// function openContactList() {
//     document.getElementById('userSelect').innerHTML = '';

//     for (let i = 0; i < contact_list.length; i++) {
//         const contact = contact_list[i];
//         const initials = contact['given_name'][0] + contact['name'][0];
//         const backgroundColor = contact['color'] ? `style="background-color: ${contact['color']};"` : '';

//         document.getElementById('userSelect').innerHTML += `
//         <option value="" disabled selected><div onclick="selectContact()" class="contact_list_snippet_box"><div class="initials_circle_contact_list" ${backgroundColor}>
//         ${initials}
//     </div>
//     <div class="name_and_email_snippet">
//             <div class="contacts_name">
//                 ${contact['given_name']} ${contact['name']}
//             </div>
//     </div></div></option>
//         `;
//     }
// }
