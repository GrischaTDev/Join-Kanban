let users = [];

function init() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

function openUserList() {
    let userSelect = document.getElementById('userSelect');
    let inputIcon = document.getElementById('input-icon');
    inputIcon.src = './assets/img/arrow_drop_down_2.svg';
    userSelect.innerHTML = '';

    userSelect.classList.remove('d-none');
    userSelect.classList.remove('d-none');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        userSelect.innerHTML += /* html */ `
            <div class="userColumn">
                <span>DE</span>
                <div>${user.name}</div>
            </div>
        `;
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

// /**
//  * save all Data to a Array for the Board-Card
//  */


// let informations = [];

// function addToInformations(){
//     let titel = document.getElementById('titel');
//     let description = document.getElementById('description');

//     let information = {
//         "titel": titel.value,
//         "description": description.value,
//     };

//     informations.push(information);
//     console.log(informations);
//     titel.value = '';
//     description.value = '';

// }

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
