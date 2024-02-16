let selectedIndex = 0;

function initContactList() {
    let index = 0;
    document.getElementById('contacts_list_container').innerHTML = '';
    let groupedContacts = groupContactsByFirstLetter(contact_list);
    for (const [letter, contacts] of groupedContacts) {
        document.getElementById('contacts_list_container').innerHTML += renderLetterbox(letter);
        contacts.forEach((contact) => {
            const initials = contact['given_name'][0] + contact['name'][0];
            const backgroundColor = contact['color'] ? `style="background-color: ${contact['color']};"` : 'style="background-color: rgb(209,209,209);"';
            document.getElementById('contacts_list_container').innerHTML += renderSnippetBox(contact, backgroundColor);
            index++; // Zählervariable inkrementieren
        });
    }
}


function groupContactsByFirstLetter(contacts) {
    if (!contacts || !Array.isArray(contacts)) {
        return new Map();
    }
    const groupedContacts = contacts.reduce((map, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        const contactsWithSameLetter = map.get(firstLetter) || [];
        contactsWithSameLetter.push(contact);
        map.set(firstLetter, contactsWithSameLetter);
        return map;
    }, new Map());
    return new Map([...groupedContacts].filter(([letter, contacts]) => contacts.length > 0).sort());
}


function openAddContactCard() {
    document.getElementById('addContactScreen').classList.remove('d-none');
    document.getElementById('add_contact_card').classList.add('move-to-screen');
    setTimeout(removeAnimationsFromOpenAddContactCard, 300);
}


function removeAnimationsFromOpenAddContactCard() {
    document.getElementById('add_contact_card').classList.remove('move-to-screen');
}


function hideAddContactCardFromScreen() {
    document.getElementById('add_contact_card').classList.add('hide-from-screen');
    setTimeout(closeAddContactCard, 200);
}


function closeAddContactCard() {
    document.getElementById('addContactScreen').classList.add('d-none');
    document.getElementById('add_contact_card').classList.remove('hide-from-screen');
}


function openEditContactCard(contactId) {
    const contactData = contact_list.find(contact => contact.id === contactId);
    document.getElementById('editContactScreen').classList.remove('d-none');
    fillEditContactCardWithContactData(contactData, contactId);
    setTimeout(removeAnimationsFromOpenEditContactCard, 300);
}


function fillEditContactCardWithContactData(contactData, contactId) {
    document.getElementById('editContactScreen').innerHTML = renderEditContactCard(contactData, contactId);
    document.getElementById('edit_contact_fname').value = contactData['given_name'];
    document.getElementById('edit_contact_lname').value = contactData['name'];
    document.getElementById('edit_contact_email').value = contactData['e-mail'];
    document.getElementById('edit_contact_phone').value = contactData['phone'];
}


function removeAnimationsFromOpenEditContactCard() {
    document.getElementById('edit_contact_card').classList.remove('move-to-screen');
}


function hideEditCardFromScreen() {
    document.getElementById('edit_contact_card').classList.add('hide-from-screen');
    document.getElementById('editContactScreen').classList.remove('d-none');
    setTimeout(closeEditContactCard, 200);
}


function closeEditContactCard() {
    document.getElementById('edit_contact_card').classList.remove('hide-from-screen');
    document.getElementById('editContactScreen').classList.add('d-none');
}


function doNotClose(event) {
    event.stopPropagation();
}


function selectContact(contactId) {
    const selectedContact = contact_list.find(contact => contact.id === contactId);
    const allContactSnippetBoxes = document.querySelectorAll('.contact_list_snippet_box');
    allContactSnippetBoxes.forEach(box => box.classList.remove('contact_list_snippet_box_blue'));
    const selectedContactSnippetBox = document.querySelector(`#contactSnippetBox${contactId}`);
    if (selectedContactSnippetBox) {
        selectedContactSnippetBox.classList.add('contact_list_snippet_box_blue');
    }
    const elements = ['contacts_list_container', 'showContactContainer', 'showContactHeaderBox', 'showContactFooterBox', 'add_contacts_button_box', 'open_sidebar_button'];
    selectedContactIfElseBranch(elements);
    renderContactDetails(selectedContact);
}


function selectedContactIfElseBranch(elements) {
    elements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            if (elementId === 'contacts_list_container') {
                element.classList.remove('z_index3'); // Entferne z-index für Kontaktlistencontainer
            } else if (elementId === 'showContactContainer' || elementId === 'showContactHeaderBox' || elementId === 'showContactFooterBox') {
                element.classList.add('z_index5'); // Füge z-index für den Anzeigecontainer hinzu
                if (elementId === 'showContactFooterBox') {
                    element.classList.remove('d-none'); // Zeige den Footer an, falls versteckt
                }
            } else if (elementId === 'add_contacts_button_box') {
                element.classList.remove('z_index4'); // Entferne z-index für den Schaltflächencontainer
            } else if (elementId === 'open_sidebar_button') {
                element.classList.add('z_index6'); // Füge z-index für die Seitenleistenschaltfläche hinzu
            }
        }
    });
}


function renderContactDetails(contact) {
    let backgroundColor = ''; // Standardhintergrundfarbe
    backgroundColor = `style="background-color: ${contact['color']};"`;
    let initials = contact['given_name'][0] + contact['name'][0];
    let name = contact['given_name'] + ' ' + contact['name'];
    let e_mail = contact['e-mail'];
    let phone = contact['phone'];
    document.getElementById('showContactContainer').innerHTML = '';
    document.getElementById('showContactContainer').innerHTML = generateContactDetailsHtml(contact);
    document.getElementById('showContactFooterBox').classList.add('show');
}


function deleteSelectedContact(contactId) {
    const contacts = JSON.parse(localStorage.getItem('contact_list'));
    const selectedIndex = contacts.findIndex(contact => contact.id === contactId);

    if (selectedIndex !== -1) {
        contacts.splice(selectedIndex, 1); // Entferne den Kontakt an der gefundenen Indexposition
        localStorage.setItem('contact_list', JSON.stringify(contacts));
    }

    loadContactList();
    closeShowContact();
    showContactDeletedConfirmation();
}


function closeShowContact() {
    document.getElementById('contacts_list_container').classList.add('z_index3');
    document.getElementById('showContactContainer').classList.remove('z_index5');
    document.getElementById('showContactHeaderBox').classList.remove('z_index5');
    document.getElementById('showContactFooterBox').classList.remove('z_index5');
    document.getElementById('showContactFooterBox').classList.add('d-none');
    document.getElementById('add_contacts_button_box').classList.add('z_index4');
    const allContactSnippetBoxes = document.querySelectorAll('.contact_list_snippet_box');
    allContactSnippetBoxes.forEach(box => {
        box.classList.remove('contact_list_snippet_box_blue');
    });
}


function openEditDeleteContactPopup(contactId) {
    document.getElementById('edit_delete_contact_popup_screen').classList.remove('d-none');
    document.getElementById('edit_delete_contact_popup_screen').innerHTML = '';
    document.getElementById('edit_delete_contact_popup_screen').innerHTML = renderEditDeleteContactPoup(contactId);
}


function moveEditDeleteContactPopupFromScreenToRight() {
    document.getElementById('edit_delete_contact_popup').classList.add('move-from-screen-to-right');
    document.getElementById('edit_delete_contact_popup_screen').classList.remove('d-none');
    setTimeout(closeEditDeleteContactPopup, 600);
}


function closeEditDeleteContactPopup() {
    const popupElement = document.getElementById('edit_delete_contact_popup');
    const screenElement = document.getElementById('edit_delete_contact_popup_screen');

    if (popupElement && screenElement) {
        popupElement.classList.remove('move-from-screen-to-right');
        screenElement.classList.add('d-none');
    }
}


function showContactCreatedConfirmation() {
    document.getElementById('confirmation_container').classList.remove('d-none');
    setTimeout(hideContactCreatedConfirmation, 1400);
}


function hideContactCreatedConfirmation() {
    document.getElementById('confirmation_container').classList.add('d-none');
}


function showContactDeletedConfirmation() {
    document.getElementById('delete_confirmation_container').classList.remove('d-none');
    setTimeout(hideContactDeletedConfirmation, 1400);
}


function hideContactDeletedConfirmation() {
    document.getElementById('delete_confirmation_container').classList.add('d-none');
}


function saveAddedContact() {
    let form = document.querySelector('.inputfields');
    let first_name = document.getElementById('add_contact_fname');
    let last_name = document.getElementById('add_contact_lname');
    let email = document.getElementById('add_contact_email');
    let phone = document.getElementById('add_contact_phone');
    let newContact = getNewContactInformation(first_name, last_name, email, phone);
    contact_list.push(newContact);
    localStorage.setItem('contact_list', JSON.stringify(contact_list));
    clearAddContactInputfields(first_name, last_name, email, phone);
    showContactCreatedConfirmation();
    hideAddContactCardFromScreen();
    loadContactList();
}


function getNewContactInformation(first_name, last_name, email, phone) {
    return {
        'id': generateUniqueId(),
        'name': last_name.value,
        'given_name': first_name.value,
        'e-mail': email.value,
        'color': generateRandomColor(),
        'phone': phone.value
    };
}


function clearAddContactInputfields(first_name, last_name, email, phone) {
    first_name.value = '';
    last_name.value = '';
    email.value = '';
    phone.value = '';
}


function loadContactList() {
    if (!localStorage.getItem('contact_list')) {
        localStorage.setItem('contact_list', JSON.stringify(contact_list));
        console.log('Contact list saved to LocalStorage');
    }

    let contactListAsString = localStorage.getItem('contact_list');
    contact_list = JSON.parse(contactListAsString);
    initContactList();
}


function generateUniqueId() {
    let newId = (contact_list.length + 1).toString();
}


function generateRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}


function saveEditedContact(contactId) {
    const updatedContact = updateContact(contactId);
    contact_list.push(updatedContact);
    localStorage.setItem('contact_list', JSON.stringify(contact_list));
    showContactCreatedConfirmation();
    hideEditCardFromScreen();
    loadContactList();
    document.getElementById('showContactFooterBox').innerHTML = '';
    document.getElementById('showContactContainer').classList.remove('z_index5');
}


function updateContact(contactId) {
    const { firstName, lastName, email, phone } = declareInputs();
    const selectedContactIndex = contact_list.findIndex(contact => contact.id === contactId);
    const oldContact = contact_list.splice(selectedContactIndex, 1)[0];
    const updatedContact = {
        id: oldContact.id,
        name: lastName.value,
        given_name: firstName.value,
        'e-mail': email.value,
        color: oldContact.color,
        phone: phone.value
    };
    return updatedContact;
}


function declareInputs() {
    return {
        firstName: document.getElementById('edit_contact_fname'),
        lastName: document.getElementById('edit_contact_lname'),
        email: document.getElementById('edit_contact_email'),
        phone: document.getElementById('edit_contact_phone')
    };
}