const contact_list = [
    {
        "name": "Schulz",
        "given_name": "Anja",
        "e-mail": "schulz@hotmail.com",
        "color": "rgb(255,122,0)",
        "phone": "+49 1111 111 11 1"
    },
    {
        "name": "Mayer",
        "given_name": "Anton",
        "e-mail": "antom@gmail.com",
        "color": "rgb(147,39,255)",
        "phone": "+49 2222 222 22 2"
    },
    {
        "name": "Ziegler",
        "given_name": "Benedict",
        "e-mail": "benedict@gmail.com",
        "color": "rgb(110,82,255)",
        "phone": "+49 3333 333 33 3"
    },
    {
        "name": "Eisenberg",
        "given_name": "David",
        "e-mail": "davidberg@gmail.com",
        "color": "rgb(252,113,255)",
        "phone": "+49 4444 444 44 4"
    },
    {
        "name": "Mauer",
        "given_name": "Emmanuel",
        "e-mail": "emmanuelMa@gmail.com",
        "color": "rgb(31,215,193)",
        "phone": "+49 5555 555 55 5"
    },
    {
        "name": "Fischer",
        "given_name": "Eva",
        "e-mail": "eva@gmail.com",
        "color": "rgb(255,187,43)",
        "phone": "+49 6666 666 66 6"
    },
    {
        "name": "Bauer",
        "given_name": "Marcel",
        "e-mail": "bauer@gmail.com",
        "color": "rgb(70,47,138)",
        "phone": "+49 7777 777 77 7"
    },
    {
        "name": "Wolf",
        "given_name": "Tatjana",
        "e-mail": "wolf@gmail.com",
        "color": "rgb(255,70,70)",
        "phone": "+49 8888 888 88 8"
    }
]

function initContactList() {
    document.getElementById('contacts_list_container').innerHTML = '';
    const groupedContacts = groupContactsByFirstLetter(contact_list);

    for (const [letter, contacts] of groupedContacts) {
        // Erstelle Letterbox
        document.getElementById('contacts_list_container').innerHTML += `
            <div class="letter_box">
                <div class="letter">${letter}</div>
            </div>
        `;

        // Füge Kontakte zur jeweiligen Letterbox hinzu
        for (const contact of contacts) {
            const initials = contact['given_name'][0] + contact['name'][0];
            const backgroundColor = contact['color'] ? `style="background-color: ${contact['color']};"` : '';
            document.getElementById('contacts_list_container').innerHTML += `
                <div onclick="openShowContact()" class="contact_list_snippet_box">
                    <div class="initials_circle" ${backgroundColor}>
                        ${initials}
                    </div>
                    <div class="name_and_email_snippet">
                        <div class="contacts_name">
                            ${contact['given_name']} ${contact['name']}
                        </div>
                        <div class="contacts_e-mail">
                            ${contact['e-mail']}
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

function groupContactsByFirstLetter(contacts) {
    const groupedContacts = new Map();

    for (const contact of contacts) {
        const firstLetter = contact['name'][0].toUpperCase();
        if (!groupedContacts.has(firstLetter)) {
            groupedContacts.set(firstLetter, []);
        }

        groupedContacts.get(firstLetter).push(contact);
    }

    // Filtere Buchstaben ohne Kontakte
    const filteredGroupedContacts = new Map([...groupedContacts.entries()].filter(([letter, contacts]) => contacts.length > 0));

    // Sortiere nach Anfangsbuchstaben
    const sortedGroupedContacts = new Map([...filteredGroupedContacts.entries()].sort());

    return sortedGroupedContacts;
}

function openAddContactCard() {
    document.getElementById('addContactScreen').classList.remove('hide-from-screen');
    document.getElementById('addContactScreen').classList.remove('d-none');
}

function hideAddCardToBottomFromScreen() {
    document.getElementById('addContactScreen').classList.remove('move-to-screen');
    document.getElementById('addContactScreen').classList.add('hide-from-screen');


    setTimeout(closeAddContactCard, 800);
}

function closeAddContactCard() {
document.getElementById('addContactScreen').classList.add('d-none');
    
    document.getElementById('addContactScreen').classList.add('move-to-screen');
    
}

function openEditContactCard() {
    document.getElementById('editContactScreen').classList.remove('d-none');
}

function hideEditCardToBottomFromScreen() {
    document.getElementById('editContactScreen').classList.add('hide-to-bottom-from-screen');
    setTimeout(closeEditContactCard, 600);
}

function closeEditContactCard() {
    document.getElementById('editContactScreen').classList.remove('hide-to-bottom-from-screen');
    document.getElementById('editContactScreen').classList.add('d-none');
}

function doNotClose(event) {
    event.stopPropagation();
}

function openShowContact() {

    document.getElementById('contacts_list_container').classList.remove('z_index3');
    document.getElementById('showContactContainer').classList.add('z_index5');
    document.getElementById('showContactHeaderBox').classList.add('z_index5');
    document.getElementById('showContactFooterBox').classList.remove('d-none');
    document.getElementById('showContactFooterBox').classList.add('z_index5');
    document.getElementById('add_contacts_button_box').classList.remove('z_index4');
}

function closeShowContact() {
    document.getElementById('contacts_list_container').classList.add('z_index3');
    document.getElementById('showContactContainer').classList.remove('z_index5');
    document.getElementById('showContactHeaderBox').classList.remove('z_index5');
    document.getElementById('showContactFooterBox').classList.remove('z_index5');
    document.getElementById('showContactFooterBox').classList.add('d-none');
    document.getElementById('add_contacts_button_box').classList.add('z_index4');
}

function openEditDeleteContactPopup() {
    document.getElementById('edit_delete_contact_popup_screen').classList.remove('d-none');
    document.getElementById('edit_delete_contact_popup').classList.add('move-from-right-to-screen');
}

function moveEditDeleteContactPopupFromScreenToRight() {
    document.getElementById('edit_delete_contact_popup').classList.add('move-from-screen-to-right');
    document.getElementById('edit_delete_contact_popup_screen').classList.remove('d-none');
    setTimeout(closeEditDeleteContactPopup, 600);
}

function closeEditDeleteContactPopup() {
    document.getElementById('edit_delete_contact_popup').classList.remove('move-from-screen-to-right');
    document.getElementById('edit_delete_contact_popup_screen').classList.add('d-none');
}



function showContactCreatedConfirmation() {
    document.getElementById('contact_created_confirmation').classList.remove('d-none');
    setTimeout(closeContactCreatedConfirmation, 2000);
}

function closeContactCreatedConfirmation() {
    document.getElementById('contact_created_confirmation').classList.add('d-none');
}

function saveAddedContact() {
    closeAddContactCard();
    initContactList();
    showContactCreatedConfirmation();
}

function saveEditedContact() {
    closeEditContactCard()
    closeShowContact();
    closeEditDeleteContactPopup();
    initContactList();
    showContactCreatedConfirmation();
}