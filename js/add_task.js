
/**
 * Shows the Popup from the Side
 */
function showPopup() {
    console.log('Showing popup');
    document.getElementById('incomePopup').classList.remove('d-none');
    document.getElementById('incomePopup').classList.add('income-popup');
}

function closePopup() {
    console.log('Closing popup');
    document.getElementById('incomePopup').classList.add('d-none');
    document.getElementById('incomePopup').classList.remove('income-popup');
}

/**
 * save all Data to a Array for the Board-Card
 */


let informations = [];

function addToInformations(){
    let titel = document.getElementById('titel');
    let description = document.getElementById('description');

    let information = {
        "titel": titel.value,
        "description": description.value,
    };

    informations.push(information);
    console.log(informations);
    titel.value = '';
    description.value = '';

}

function openContactList() {
    document.getElementById('userSelect').innerHTML = '';

    for (let i = 0; i < contact_list.length; i++) {
        const contact = contact_list[i];
        const initials = contact['given_name'][0] + contact['name'][0];
        const backgroundColor = contact['color'] ? `style="background-color: ${contact['color']};"` : '';

        document.getElementById('userSelect').innerHTML += `
        <option value="" disabled selected><div onclick="selectContact()" class="contact_list_snippet_box"><div class="initials_circle_contact_list" ${backgroundColor}>
        ${initials}
    </div>
    <div class="name_and_email_snippet">
            <div class="contacts_name">
                ${contact['given_name']} ${contact['name']}
            </div>
    </div></div></option>
        `;
    }
}
