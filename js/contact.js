let contact_list = [
    {
        "id": "1",
        "name": "Schulz",
        "given_name": "Anja",
        "e-mail": "schulz@hotmail.com",
        "color": "rgb(255,122,0)",
        "phone": "+49 1111 111 11 1"
    },
    {
        "id": "2",
        "name": "Mayer",
        "given_name": "Anton",
        "e-mail": "antom@gmail.com",
        "color": "rgb(147,39,255)",
        "phone": "+49 2222 222 22 2"
    },
    {
        "id": "3",
        "name": "Ziegler",
        "given_name": "Benedict",
        "e-mail": "benedict@gmail.com",
        "color": "rgb(110,82,255)",
        "phone": "+49 3333 333 33 3"
    },
    {
        "id": "4",
        "name": "Eisenberg",
        "given_name": "David",
        "e-mail": "davidberg@gmail.com",
        "color": "rgb(252,113,255)",
        "phone": "+49 4444 444 44 4"
    },
    {
        "id": "5",
        "name": "Mauer",
        "given_name": "Emmanuel",
        "e-mail": "emmanuelMa@gmail.com",
        "color": "rgb(31,215,193)",
        "phone": "+49 5555 555 55 5"
    },
    {
        "id": "6",
        "name": "Fischer",
        "given_name": "Eva",
        "e-mail": "eva@gmail.com",
        "color": "rgb(255,187,43)",
        "phone": "+49 6666 666 66 6"
    },
    {
        "id": "7",
        "name": "Bauer",
        "given_name": "Marcel",
        "e-mail": "bauer@gmail.com",
        "color": "rgb(70,47,138)",
        "phone": "+49 7777 777 77 7"
    },
    {
        "id": "8",
        "name": "Schmidt",
        "given_name": "Timo",
        "e-mail": "schmidtim@gmail.com",
        "color": "rgb(128,128,186)",
        "phone": "+49 4578 895 65 3"
    },
    {
        "id": "9",
        "name": "Peters",
        "given_name": "Samuel",
        "e-mail": "petersam@gmail.com",
        "color": "rgb(247,247,1)",
        "phone": "+49 7896 542 65 9"
    },
    {
        "id": "10",
        "name": "Becker",
        "given_name": "Vincent",
        "e-mail": "vibe@gmail.com",
        "color": "rgb(235,74,143)",
        "phone": "+49 7589 654 12 5"
    },
    {
        "id": "11",
        "name": "Braun",
        "given_name": "Martin",
        "e-mail": "mabra@gmail.com",
        "color": "rgb(122,196,227)",
        "phone": "+49 8527 419 63 2"
    },
    {
        "id": "12",
        "name": "Friesen",
        "given_name": "Angelika",
        "e-mail": "angi94@gmail.com",
        "color": "rgb(2,109,186)",
        "phone": "+49 3698 521 47 8"
    },
    {
        "id": "13",
        "name": "Lang",
        "given_name": "Susanne",
        "e-mail": "sula82@gmail.com",
        "color": "rgb(237,27,38)",
        "phone": "+49 1346 792 58 0"
    },
    {
        "id": "14",
        "name": "Klein",
        "given_name": "Holger",
        "e-mail": "hoklein@gmail.com",
        "color": "rgb(46,161,108)",
        "phone": "+49 9876 543 21 0"
    },
    {
        "id": "15",
        "name": "Giesbrecht",
        "given_name": "Manfred",
        "e-mail": "magies@gmail.com",
        "color": "rgb(158,201,100)",
        "phone": "+49 4598 984 98 5"
    },
    {
        "id": "16",
        "name": "Günther",
        "given_name": "Lina",
        "e-mail": "ligün@gmail.com",
        "color": "rgb(240,142,30)",
        "phone": "+49 1458 955 69 5"
    },
    {
        "id": "17",
        "name": "Albrecht",
        "given_name": "Margret",
        "e-mail": "marget@gmail.com",
        "color": "rgb(131,87,166)",
        "phone": "+49 1234 567 89 0"
    },
    {
        "id": "18",
        "name": "Kaiser",
        "given_name": "Emil",
        "e-mail": "emi@gmx.com",
        "color": "rgb(42,54,71)",
        "phone": "+49 1212 121 21 2"
    },
    {
        "id": "19",
        "name": "Regehr",
        "given_name": "Paul",
        "e-mail": "paureg@hotmail.com",
        "color": "rgb(41,171,226)",
        "phone": "+49 9999 999 99 9"
    },
    {
        "id": "20",
        "name": "Wolf",
        "given_name": "Tatjana",
        "e-mail": "wolf@gmail.com",
        "color": "rgb(255,70,70)",
        "phone": "+49 8888 888 88 8"
    },
    {   
        "id": "21",
        "name": "Stork",
        "given_name": "Marcel",
        "e-mail": "bauer@gmail.com",
        "color": "rgb(70,47,138)",
        "phone": "+49 7777 777 77 7"
    },
    {
        "id": "22",
        "name": "Tänzer",
        "given_name": "Tatjana",
        "e-mail": "wolf@gmail.com",
        "color": "rgb(255,70,70)",
        "phone": "+49 8888 888 88 8"
    }
]

let selectedIndex = 0;



function initContactList() {
    let index = 0;
    document.getElementById('contacts_list_container').innerHTML = '';
    const groupedContacts = groupContactsByFirstLetter(contact_list);

    for (const [letter, contacts] of groupedContacts) {
        document.getElementById('contacts_list_container').innerHTML += `
            <div class="letter_box">
                <div class="letter">${letter}</div>
            </div>
        `;

        contacts.forEach((contact) => {
            const initials = contact['given_name'][0] + contact['name'][0];
            const backgroundColor = contact['color'] ? `style="background-color: ${contact['color']};"` : 'style="background-color: rgb(209,209,209);"';

            document.getElementById('contacts_list_container').innerHTML += `
            <div onclick="selectContact('${contact.id}')" class="contact_list_snippet_box" id="contactSnippetBox${contact.id}">
                    <div class="initials_circle_contact_list" ${backgroundColor}>
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
            index++; // Zählervariable inkrementieren
        });
    }
}


function groupContactsByFirstLetter(contacts) {
    if (!contacts || !Array.isArray(contacts)) {
        return new Map();
    }

    contacts.sort((a, b) => a.name.localeCompare(b.name));

    const groupedContacts = new Map();

    for (const contact of contacts) {
        const firstLetter = contact.name[0].toUpperCase();
        if (!groupedContacts.has(firstLetter)) {
            groupedContacts.set(firstLetter, []);
        }

        groupedContacts.get(firstLetter).push(contact);
    }

    // Filtere Buchstaben ohne Kontakte
    const filteredGroupedContacts = new Map([...groupedContacts.entries()].filter(([letter, contacts]) => contacts.length > 0));

    // Sortiere nach Anfangsbuchstaben
    const sortedGroupedContacts = new Map([...filteredGroupedContacts.entries()].sort((a, b) => a[0].localeCompare(b[0])));

    return sortedGroupedContacts;
}



function openAddContactCard() {
    document.getElementById('addContactScreen').classList.remove('d-none');
    document.getElementById('add_contact_card').classList.add('move-to-screen');
}

function hideAddContactCardFromScreen() {
    document.getElementById('add_contact_card').classList.add('hide-from-screen');
    document.getElementById('addContactScreen').classList.remove('d-none');
    setTimeout(closeAddContactCard, 200);
}

function closeAddContactCard() {
    document.getElementById('add_contact_card').classList.remove('hide-from-screen');
    document.getElementById('addContactScreen').classList.add('d-none');
}

document.addEventListener("DOMContentLoaded", function() {
    // Hier kommt Ihre Initialisierungslogik oder der Aufruf Ihrer render-Funktion
    loadContactList(); // Beispiel: Aufruf einer Funktion, die beim Laden der Seite ausgeführt werden soll
});

function openEditContactCard(contactId) {
    const contactData = contact_list.find(contact => contact.id === contactId);

    console.log("Kontakt-Daten:", contactData); // Konsolenausgabe hinzufügen
    if (contactData) {
        // Zeige das Popup an
        document.getElementById('editContactScreen').classList.remove('d-none');

        // Rendern Sie das Popup und füllen Sie die Eingabefelder mit den Daten des ausgewählten Kontakts
        document.getElementById('editContactScreen').innerHTML = `
            <div id="edit_contact_card" class="edit_contact_card" onclick="doNotClose(event)">
            <div class="edit_contact_card_header">
            <div class="close_icon_box">
                <img style="cursor: pointer;" onclick="hideEditCardFromScreen()"
                    src="./assets/img/close_icon.svg" alt="close Button">
            </div>
            <div class="edit_contact_popup_headline">
                <div class="popup_logo">
                    <svg width="64" height="79" viewBox="0 0 64 79" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="Capa 1">
                            <path id="Vector" d="M45.8539 0H31.6777V16.3095H45.8539V0Z" fill="white" />
                            <path id="Vector_2"
                                d="M31.6783 29.5737H45.8544V52.5757C45.9192 58.1106 44.344 63.5398 41.329 68.1732C38.352 72.675 32.6052 78.0312 21.973 78.0312C10.3922 78.0312 3.64218 72.5545 0 69.5533L8.94188 58.5233C12.4968 61.426 15.9209 63.8138 22.0276 63.8138C26.6512 63.8138 28.4941 61.9298 29.5737 60.2868C31.0413 58.0047 31.8004 55.3359 31.7546 52.6195L31.6783 29.5737Z"
                                fill="white" />
                            <path id="Vector_3" d="M24.4476 19.2778H10.2715V33.5171H24.4476V19.2778Z"
                                fill="#29ABE2" />
                            <path id="Vector_4"
                                d="M53.2818 71.3496C53.2818 74.3837 51.7442 76.0157 49.596 76.0157C47.4477 76.0157 46.041 74.077 46.041 71.5029C46.041 68.9289 47.4913 66.8916 49.7159 66.8916C51.9405 66.8916 53.2818 68.8961 53.2818 71.3496ZM47.6876 71.4701C47.6876 73.2993 48.4182 74.6465 49.6723 74.6465C50.9263 74.6465 51.6351 73.2226 51.6351 71.3606C51.6351 69.7285 50.9809 68.195 49.6723 68.195C48.3637 68.195 47.6876 69.6737 47.6876 71.4701Z"
                                fill="white" />
                            <path id="Vector_5" d="M56.0947 67.0234V75.8737H54.5244V67.0234H56.0947Z"
                                fill="white" />
                            <path id="Vector_6"
                                d="M57.7949 75.8737V67.0234H59.5397L61.4153 70.6709C61.8981 71.6246 62.3277 72.6046 62.7021 73.6064C62.6039 72.511 62.5603 71.2514 62.5603 69.8494V67.0234H63.9997V75.8737H62.3749L60.4775 72.1496C59.9751 71.1713 59.5273 70.1657 59.1362 69.1374C59.1362 70.2328 59.2125 71.4705 59.2125 72.993V75.8628L57.7949 75.8737Z"
                                fill="white" />
                        </g>
                    </svg>

                </div>
                <h1>Edit contact</h1>
                <div class="blue_line_horizontal"></div>
                <div></div>
            </div>
        </div>
        <div class="edit_contact_card_footer">
            <div>
                <img class="profile_picture" src="./assets/img/profile_picture.svg" alt="profile picture">
            </div>
            <form class="edit_contact_card_footer_desktop">
                <div onclick="hideEditCardFromScreen()" class="popup_close_icon">
                    <svg onclick="hideEditCardFromScreen()" width="32" height="32" viewBox="0 0 32 32"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_71720_5848" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4"
                            y="4" width="24" height="24">
                            <rect x="4" y="4" width="24" height="24" fill="#2A3647" />
                        </mask>
                        <g mask="url(#mask0_71720_5848)">
                            <path
                                d="M15.9998 17.4L11.0998 22.3C10.9165 22.4834 10.6831 22.575 10.3998 22.575C10.1165 22.575 9.88314 22.4834 9.6998 22.3C9.51647 22.1167 9.4248 21.8834 9.4248 21.6C9.4248 21.3167 9.51647 21.0834 9.6998 20.9L14.5998 16L9.6998 11.1C9.51647 10.9167 9.4248 10.6834 9.4248 10.4C9.4248 10.1167 9.51647 9.88338 9.6998 9.70005C9.88314 9.51672 10.1165 9.42505 10.3998 9.42505C10.6831 9.42505 10.9165 9.51672 11.0998 9.70005L15.9998 14.6L20.8998 9.70005C21.0831 9.51672 21.3165 9.42505 21.5998 9.42505C21.8831 9.42505 22.1165 9.51672 22.2998 9.70005C22.4831 9.88338 22.5748 10.1167 22.5748 10.4C22.5748 10.6834 22.4831 10.9167 22.2998 11.1L17.3998 16L22.2998 20.9C22.4831 21.0834 22.5748 21.3167 22.5748 21.6C22.5748 21.8834 22.4831 22.1167 22.2998 22.3C22.1165 22.4834 21.8831 22.575 21.5998 22.575C21.3165 22.575 21.0831 22.4834 20.8998 22.3L15.9998 17.4Z"
                                fill="#2A3647" />
                        </g>
                    </svg>

                </div>
                <div class="inputfield_box">
                    <input id="edit_contact_fname" class="inputfield" type="text" required placeholder="First Name">
                    <img class="input_icon" src="./assets/img/profile_mini_icon.svg" alt="profile icon">
                </div>
                <div class="inputfield_box">
                    <input id="edit_contact_lname" class="inputfield" type="text" required placeholder="Last Name">
                    <img class="input_icon" src="./assets/img/profile_mini_icon.svg" alt="profile icon">
                </div>
                <div class="inputfield_box">
                    <input id="edit_contact_email" class="inputfield" type="email" required placeholder="Email">
                    <img class="input_icon" src="./assets/img/mail_icon.svg" alt="email icon">
                </div>
                <div class="inputfield_box">
                    <input id="edit_contact_phone" class="inputfield" type="tel" required placeholder="Phone">
                    <img class="input_icon" src="./assets/img/phone_icon.svg" alt="phone icon">
                </div>
                <div class="save_contact_box">
                    <button onclick="deleteSelectedContact('${contactId}')" class="submit_delete_contact_button">Delete</button>
                    <button onclick="saveEditedContact('${contactId}')" class="submit_save_contact_button">Save</button>
                    <img style="margin-left: -25px;" src="./assets/img/check.svg" alt="check">
                </div>
            </form>

        </div>
            </div>
        `;

        if (contactData['given_name'] && contactData['name'] && contactData['e-mail'] && contactData['phone']) {
            // Führen Sie den Zugriff auf die Eingabefelder aus
            document.getElementById('edit_contact_fname').value = contactData['given_name'];
            document.getElementById('edit_contact_lname').value = contactData['name'];
            document.getElementById('edit_contact_email').value = contactData['e-mail'];
            document.getElementById('edit_contact_phone').value = contactData['phone'];
        } else {
            console.error("Ungültige Kontakt-Daten für ID:", contactId);
        }
    } else {
        console.error("Kontaktdaten nicht gefunden für ID:", contactId);

}
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
    console.log("Selected contact ID:", contactId); // Überprüfe die ausgewählte Kontakt-ID
    // Finden Sie den ausgewählten Kontakt anhand seiner ID in der Kontaktliste
    const selectedContact = contact_list.find(contact => contact.id === contactId);

    if (selectedContact) {
        // Alle Kontakt-Snippet-Boxen erhalten die Klasse 'contact_list_snippet_box'
        const allContactSnippetBoxes = document.querySelectorAll('.contact_list_snippet_box');
        allContactSnippetBoxes.forEach(box => {
            box.classList.remove('contact_list_snippet_box_blue'); // Entferne die Klasse von allen Boxen
        });

        // Die ausgewählte Kontakt-Snippet-Box erhält die Klasse 'contact_list_snippet_box_blue'
        const selectedContactSnippetBox = document.querySelector(`#contactSnippetBox${contactId}`);
        console.log("Selected contact snippet box:", selectedContactSnippetBox); // Überprüfe, ob das Element gefunden wurde
        if (selectedContactSnippetBox) {
            selectedContactSnippetBox.classList.add('contact_list_snippet_box_blue');
        }

        // Der Rest deines Codes für die Anzeige des ausgewählten Kontakts und die Z-Index-Anpassungen...
        let contactsListContainer = document.getElementById('contacts_list_container');
        let showContactContainer = document.getElementById('showContactContainer');
        let showContactHeaderBox = document.getElementById('showContactHeaderBox');
        let showContactFooterBox = document.getElementById('showContactFooterBox');
        let addContactsButtonBox = document.getElementById('add_contacts_button_box');
        let editContactButtonBox = document.getElementById('open_sidebar_button');

        if (contactsListContainer) {
            contactsListContainer.classList.remove('z_index3');
        }

        if (showContactContainer) {
            showContactContainer.classList.add('z_index5');
        }

        if (showContactHeaderBox) {
            showContactHeaderBox.classList.add('z_index5');
        }

        if (showContactFooterBox) {
            showContactFooterBox.classList.remove('d-none');
            showContactFooterBox.classList.add('z_index5');
        }

        if (addContactsButtonBox) {
            addContactsButtonBox.classList.remove('z_index4');
        }

        if (editContactButtonBox) {
            editContactButtonBox.classList.add('z_index6');
        }

        renderContactDetails(selectedContact);
    } else {
        console.error("Selected contact is undefined.");
    }
}






function renderContactDetails(contact) {
    let backgroundColor = ''; // Standardhintergrundfarbe
   
        backgroundColor = `style="background-color: ${contact['color']};"`;
    

    let initials = contact['given_name'][0] + contact['name'][0];
    let name = contact['given_name'] + ' ' + contact['name'];
    let e_mail = contact['e-mail'];
    let phone = contact['phone'];

    document.getElementById('showContactContainer').innerHTML = '';
    document.getElementById('showContactContainer').innerHTML = `
    <div id="showContactHeaderBox" class="showContactHeaderBox">
    <div class="showContactHeadline">
        <h1 style="color:black !important; font-size: 48px; margin: 0;">Contacts</h1>
        <div id="blue_line_vertical_show_contacts_container_desktop" class="blue_line_vertical"></div>
        <p style="color:black; font-size: 20px; margin: 10px 0px 10px 0px;">Better with a team!</p>
        <div id="blue_line_horizontal_show_contacts_container_desktop" class="blue_line_horizontal"></div>
    </div>
    <div class="close_icon_box">
        <img style="cursor: pointer; height: 36px;" onclick="closeShowContact()" src="./assets/img/arrow_left.svg"
            alt="close Button">
    </div>
</div>

<div id="showContactFooterBox"">
    <div class=" d-flex" id="footer_name_box">
        <div class="initials_circle_show_contact" ${backgroundColor}>${initials}</div>
        <div><h2 style="font-weight: bold;" id="showContactName">${name}</h2>
            <div id="edit_delete_desktop_icons" style="display: flex; cursor:pointer;">
            <div class="fill_icon" onclick="openEditContactCard('${contact.id}')" class="edit_delete_buttons">
                <svg width="96" height="40" viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_71395_18214" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8"
                        width="24" height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_71395_18214)">
                        <path
                            d="M13 27H14.4L23.025 18.375L21.625 16.975L13 25.6V27ZM27.3 16.925L23.05 12.725L24.45 11.325C24.8333 10.9417 25.3042 10.75 25.8625 10.75C26.4208 10.75 26.8917 10.9417 27.275 11.325L28.675 12.725C29.0583 13.1083 29.2583 13.5708 29.275 14.1125C29.2917 14.6542 29.1083 15.1167 28.725 15.5L27.3 16.925ZM25.85 18.4L15.25 29H11V24.75L21.6 14.15L25.85 18.4Z"
                            fill="#2A3647" />
                    </g>
                    <path
                        d="M41.4091 25.5V13.8636H48.4318V15.1136H42.8182V19.0455H48.0682V20.2955H42.8182V24.25H48.5227V25.5H41.4091ZM54.0852 25.6818C53.358 25.6818 52.7159 25.4981 52.1591 25.1307C51.6023 24.7595 51.1667 24.2367 50.8523 23.5625C50.5379 22.8845 50.3807 22.0833 50.3807 21.1591C50.3807 20.2424 50.5379 19.447 50.8523 18.7727C51.1667 18.0985 51.6042 17.5777 52.1648 17.2102C52.7254 16.8428 53.3731 16.6591 54.108 16.6591C54.6761 16.6591 55.125 16.7538 55.4545 16.9432C55.7879 17.1288 56.0417 17.3409 56.2159 17.5795C56.3939 17.8144 56.5322 18.0076 56.6307 18.1591H56.7443V13.8636H58.0852V25.5H56.7898V24.1591H56.6307C56.5322 24.3182 56.392 24.5189 56.2102 24.7614C56.0284 25 55.7689 25.214 55.4318 25.4034C55.0947 25.589 54.6458 25.6818 54.0852 25.6818ZM54.267 24.4773C54.8049 24.4773 55.2595 24.3371 55.6307 24.0568C56.0019 23.7727 56.2841 23.3807 56.4773 22.8807C56.6705 22.3769 56.767 21.7955 56.767 21.1364C56.767 20.4848 56.6723 19.9148 56.483 19.4261C56.2936 18.9337 56.0133 18.5511 55.642 18.2784C55.2708 18.0019 54.8125 17.8636 54.267 17.8636C53.6989 17.8636 53.2254 18.0095 52.8466 18.3011C52.4716 18.589 52.1894 18.9811 52 19.4773C51.8144 19.9697 51.7216 20.5227 51.7216 21.1364C51.7216 21.7576 51.8163 22.322 52.0057 22.8295C52.1989 23.3333 52.483 23.7348 52.858 24.0341C53.2367 24.3295 53.7064 24.4773 54.267 24.4773ZM60.7273 25.5V16.7727H62.0682V25.5H60.7273ZM61.4091 15.3182C61.1477 15.3182 60.9223 15.2292 60.733 15.0511C60.5473 14.8731 60.4545 14.6591 60.4545 14.4091C60.4545 14.1591 60.5473 13.9451 60.733 13.767C60.9223 13.589 61.1477 13.5 61.4091 13.5C61.6705 13.5 61.8939 13.589 62.0795 13.767C62.2689 13.9451 62.3636 14.1591 62.3636 14.4091C62.3636 14.6591 62.2689 14.8731 62.0795 15.0511C61.8939 15.2292 61.6705 15.3182 61.4091 15.3182ZM68.3196 16.7727V17.9091H63.7969V16.7727H68.3196ZM65.1151 14.6818H66.456V23C66.456 23.3788 66.5109 23.6629 66.6207 23.8523C66.7344 24.0379 66.8783 24.1629 67.0526 24.2273C67.2306 24.2879 67.4181 24.3182 67.6151 24.3182C67.7628 24.3182 67.884 24.3106 67.9787 24.2955C68.0734 24.2765 68.1491 24.2614 68.206 24.25L68.4787 25.4545C68.3878 25.4886 68.2609 25.5227 68.098 25.5568C67.9351 25.5947 67.7287 25.6136 67.4787 25.6136C67.0999 25.6136 66.7287 25.5322 66.3651 25.3693C66.0052 25.2064 65.706 24.9583 65.4673 24.625C65.2325 24.2917 65.1151 23.8712 65.1151 23.3636V14.6818Z"
                        fill="#2A3647" />
                </svg>
            </div>
            <div class="fill_icon" onclick="deleteSelectedContact('${contact.id}')" class="edit_delete_buttons">
                <svg width="96" height="40" viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_71395_18225" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="8"
                        width="25" height="24">
                        <rect x="7.5" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_71395_18225)">
                        <path
                            d="M14.5 29C13.95 29 13.4792 28.8042 13.0875 28.4125C12.6958 28.0208 12.5 27.55 12.5 27V14C12.2167 14 11.9792 13.9042 11.7875 13.7125C11.5958 13.5208 11.5 13.2833 11.5 13C11.5 12.7167 11.5958 12.4792 11.7875 12.2875C11.9792 12.0958 12.2167 12 12.5 12H16.5C16.5 11.7167 16.5958 11.4792 16.7875 11.2875C16.9792 11.0958 17.2167 11 17.5 11H21.5C21.7833 11 22.0208 11.0958 22.2125 11.2875C22.4042 11.4792 22.5 11.7167 22.5 12H26.5C26.7833 12 27.0208 12.0958 27.2125 12.2875C27.4042 12.4792 27.5 12.7167 27.5 13C27.5 13.2833 27.4042 13.5208 27.2125 13.7125C27.0208 13.9042 26.7833 14 26.5 14V27C26.5 27.55 26.3042 28.0208 25.9125 28.4125C25.5208 28.8042 25.05 29 24.5 29H14.5ZM14.5 14V27H24.5V14H14.5ZM16.5 24C16.5 24.2833 16.5958 24.5208 16.7875 24.7125C16.9792 24.9042 17.2167 25 17.5 25C17.7833 25 18.0208 24.9042 18.2125 24.7125C18.4042 24.5208 18.5 24.2833 18.5 24V17C18.5 16.7167 18.4042 16.4792 18.2125 16.2875C18.0208 16.0958 17.7833 16 17.5 16C17.2167 16 16.9792 16.0958 16.7875 16.2875C16.5958 16.4792 16.5 16.7167 16.5 17V24ZM20.5 24C20.5 24.2833 20.5958 24.5208 20.7875 24.7125C20.9792 24.9042 21.2167 25 21.5 25C21.7833 25 22.0208 24.9042 22.2125 24.7125C22.4042 24.5208 22.5 24.2833 22.5 24V17C22.5 16.7167 22.4042 16.4792 22.2125 16.2875C22.0208 16.0958 21.7833 16 21.5 16C21.2167 16 20.9792 16.0958 20.7875 16.2875C20.5958 16.4792 20.5 16.7167 20.5 17V24Z"
                            fill="#2A3647" />
                    </g>
                    <path
                        d="M44.5 25.5H40.9091V13.8636H44.6591C45.7879 13.8636 46.7538 14.0966 47.5568 14.5625C48.3598 15.0246 48.9754 15.6894 49.4034 16.5568C49.8314 17.4205 50.0455 18.4545 50.0455 19.6591C50.0455 20.8712 49.8295 21.9148 49.3977 22.7898C48.9659 23.661 48.3371 24.3314 47.5114 24.8011C46.6856 25.267 45.6818 25.5 44.5 25.5ZM42.3182 24.25H44.4091C45.3712 24.25 46.1686 24.0644 46.8011 23.6932C47.4337 23.322 47.9053 22.7936 48.2159 22.108C48.5265 21.4223 48.6818 20.6061 48.6818 19.6591C48.6818 18.7197 48.5284 17.911 48.2216 17.233C47.9148 16.5511 47.4564 16.0284 46.8466 15.6648C46.2367 15.2973 45.4773 15.1136 44.5682 15.1136H42.3182V24.25ZM55.8864 25.6818C55.0455 25.6818 54.3201 25.4962 53.7102 25.125C53.1042 24.75 52.6364 24.2273 52.3068 23.5568C51.9811 22.8826 51.8182 22.0985 51.8182 21.2045C51.8182 20.3106 51.9811 19.5227 52.3068 18.8409C52.6364 18.1553 53.0947 17.6212 53.6818 17.2386C54.2727 16.8523 54.9621 16.6591 55.75 16.6591C56.2045 16.6591 56.6534 16.7348 57.0966 16.8864C57.5398 17.0379 57.9432 17.2841 58.3068 17.625C58.6705 17.9621 58.9602 18.4091 59.1761 18.9659C59.392 19.5227 59.5 20.2083 59.5 21.0227V21.5909H52.7727V20.4318H58.1364C58.1364 19.9394 58.0379 19.5 57.8409 19.1136C57.6477 18.7273 57.3712 18.4223 57.0114 18.1989C56.6553 17.9754 56.2348 17.8636 55.75 17.8636C55.2159 17.8636 54.7538 17.9962 54.3636 18.2614C53.9773 18.5227 53.6799 18.8636 53.4716 19.2841C53.2633 19.7045 53.1591 20.1553 53.1591 20.6364V21.4091C53.1591 22.0682 53.2727 22.6269 53.5 23.0852C53.7311 23.5398 54.0511 23.8864 54.4602 24.125C54.8693 24.3598 55.3447 24.4773 55.8864 24.4773C56.2386 24.4773 56.5568 24.428 56.8409 24.3295C57.1288 24.2273 57.3769 24.0758 57.5852 23.875C57.7936 23.6705 57.9545 23.4167 58.0682 23.1136L59.3636 23.4773C59.2273 23.9167 58.9981 24.303 58.6761 24.6364C58.3542 24.9659 57.9564 25.2235 57.483 25.4091C57.0095 25.5909 56.4773 25.6818 55.8864 25.6818ZM62.8807 13.8636V25.5H61.5398V13.8636H62.8807ZM68.9957 25.6818C68.1548 25.6818 67.4295 25.4962 66.8196 25.125C66.2135 24.75 65.7457 24.2273 65.4162 23.5568C65.0904 22.8826 64.9276 22.0985 64.9276 21.2045C64.9276 20.3106 65.0904 19.5227 65.4162 18.8409C65.7457 18.1553 66.2041 17.6212 66.7912 17.2386C67.3821 16.8523 68.0715 16.6591 68.8594 16.6591C69.3139 16.6591 69.7628 16.7348 70.206 16.8864C70.6491 17.0379 71.0526 17.2841 71.4162 17.625C71.7798 17.9621 72.0696 18.4091 72.2855 18.9659C72.5014 19.5227 72.6094 20.2083 72.6094 21.0227V21.5909H65.8821V20.4318H71.2457C71.2457 19.9394 71.1473 19.5 70.9503 19.1136C70.7571 18.7273 70.4806 18.4223 70.1207 18.1989C69.7647 17.9754 69.3442 17.8636 68.8594 17.8636C68.3253 17.8636 67.8632 17.9962 67.473 18.2614C67.0866 18.5227 66.7893 18.8636 66.581 19.2841C66.3726 19.7045 66.2685 20.1553 66.2685 20.6364V21.4091C66.2685 22.0682 66.3821 22.6269 66.6094 23.0852C66.8404 23.5398 67.1605 23.8864 67.5696 24.125C67.9787 24.3598 68.4541 24.4773 68.9957 24.4773C69.348 24.4773 69.6662 24.428 69.9503 24.3295C70.2382 24.2273 70.4863 24.0758 70.6946 23.875C70.9029 23.6705 71.0639 23.4167 71.1776 23.1136L72.473 23.4773C72.3366 23.9167 72.1075 24.303 71.7855 24.6364C71.4635 24.9659 71.0658 25.2235 70.5923 25.4091C70.1188 25.5909 69.5866 25.6818 68.9957 25.6818ZM78.4446 16.7727V17.9091H73.9219V16.7727H78.4446ZM75.2401 14.6818H76.581V23C76.581 23.3788 76.6359 23.6629 76.7457 23.8523C76.8594 24.0379 77.0033 24.1629 77.1776 24.2273C77.3556 24.2879 77.5431 24.3182 77.7401 24.3182C77.8878 24.3182 78.009 24.3106 78.1037 24.2955C78.1984 24.2765 78.2741 24.2614 78.331 24.25L78.6037 25.4545C78.5128 25.4886 78.3859 25.5227 78.223 25.5568C78.0601 25.5947 77.8537 25.6136 77.6037 25.6136C77.2249 25.6136 76.8537 25.5322 76.4901 25.3693C76.1302 25.2064 75.831 24.9583 75.5923 24.625C75.3575 24.2917 75.2401 23.8712 75.2401 23.3636V14.6818ZM84.027 25.6818C83.1861 25.6818 82.4607 25.4962 81.8509 25.125C81.2448 24.75 80.777 24.2273 80.4474 23.5568C80.1217 22.8826 79.9588 22.0985 79.9588 21.2045C79.9588 20.3106 80.1217 19.5227 80.4474 18.8409C80.777 18.1553 81.2353 17.6212 81.8224 17.2386C82.4134 16.8523 83.1027 16.6591 83.8906 16.6591C84.3452 16.6591 84.794 16.7348 85.2372 16.8864C85.6804 17.0379 86.0838 17.2841 86.4474 17.625C86.8111 17.9621 87.1009 18.4091 87.3168 18.9659C87.5327 19.5227 87.6406 20.2083 87.6406 21.0227V21.5909H80.9134V20.4318H86.277C86.277 19.9394 86.1785 19.5 85.9815 19.1136C85.7884 18.7273 85.5118 18.4223 85.152 18.1989C84.7959 17.9754 84.3755 17.8636 83.8906 17.8636C83.3565 17.8636 82.8944 17.9962 82.5043 18.2614C82.1179 18.5227 81.8205 18.8636 81.6122 19.2841C81.4039 19.7045 81.2997 20.1553 81.2997 20.6364V21.4091C81.2997 22.0682 81.4134 22.6269 81.6406 23.0852C81.8717 23.5398 82.1918 23.8864 82.6009 24.125C83.0099 24.3598 83.4853 24.4773 84.027 24.4773C84.3793 24.4773 84.6974 24.428 84.9815 24.3295C85.2694 24.2273 85.5175 24.0758 85.7259 23.875C85.9342 23.6705 86.0952 23.4167 86.2088 23.1136L87.5043 23.4773C87.3679 23.9167 87.1387 24.303 86.8168 24.6364C86.4948 24.9659 86.0971 25.2235 85.6236 25.4091C85.1501 25.5909 84.6179 25.6818 84.027 25.6818Z"
                        fill="#2A3647" />
                </svg>
            </div>
        </div>
    </div>
</div>

<div class="">
    <p style="color:black; font-size: 24px;">Contact Information</p>
</div>

<div class="">
    <h3 style="font-weight: bold; padding:10px 0px 10px 0px;">Email</h3>
</div>

<div id="contact_card_email" class="contact_email">
    <a href="mailto:${e_mail}">${e_mail}</a>
</div>

<div>
    <h3 style="font-weight: bold; padding:10px 0px 10px 0px;">Phone</h3>
</div>

<div id="phone_box" class="contact_phone">
    <a href="phone:${phone}">${phone}</a>
</div>
<div class="open_sidebar_button" id="open_sidebar_button">
                <div onclick="openEditDeleteContactPopup('${contact.id}'), doNotClose(event)" class="add_contacts_button"><img
                        src="./assets/img/three_points_icon.svg" alt="">
                </div>
            </div>
</div>
</div>
    `;

}

function deleteSelectedContact(contactId) {
    const contacts = JSON.parse(localStorage.getItem('contact_list'));
    
    // Index des ausgewählten Kontakts finden
    const selectedIndex = contacts.findIndex(contact => contact.id === contactId);

    // Kontakt anhand des gefundenen Index mit splice() entfernen
    if (selectedIndex !== -1) {
        contacts.splice(selectedIndex, 1); // Entferne den Kontakt an der gefundenen Indexposition
        localStorage.setItem('contact_list', JSON.stringify(contacts));
    }

    // Kontaktliste neu laden und Ansicht aktualisieren
    loadContactList();
    closeShowContact();
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
    document.getElementById('edit_delete_contact_popup_screen').innerHTML = `
    <div class="edit_delete_contact_popup" id="edit_delete_contact_popup">
                    <div class="fill_icon" onclick="openEditContactCard('${contactId}')" class="edit_delete_buttons">
                        <svg width="96" height="40" viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_71395_18214" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8"
                                width="24" height="24">
                                <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_71395_18214)">
                                <path
                                    d="M13 27H14.4L23.025 18.375L21.625 16.975L13 25.6V27ZM27.3 16.925L23.05 12.725L24.45 11.325C24.8333 10.9417 25.3042 10.75 25.8625 10.75C26.4208 10.75 26.8917 10.9417 27.275 11.325L28.675 12.725C29.0583 13.1083 29.2583 13.5708 29.275 14.1125C29.2917 14.6542 29.1083 15.1167 28.725 15.5L27.3 16.925ZM25.85 18.4L15.25 29H11V24.75L21.6 14.15L25.85 18.4Z"
                                    fill="#2A3647" />
                            </g>
                            <path
                                d="M41.4091 25.5V13.8636H48.4318V15.1136H42.8182V19.0455H48.0682V20.2955H42.8182V24.25H48.5227V25.5H41.4091ZM54.0852 25.6818C53.358 25.6818 52.7159 25.4981 52.1591 25.1307C51.6023 24.7595 51.1667 24.2367 50.8523 23.5625C50.5379 22.8845 50.3807 22.0833 50.3807 21.1591C50.3807 20.2424 50.5379 19.447 50.8523 18.7727C51.1667 18.0985 51.6042 17.5777 52.1648 17.2102C52.7254 16.8428 53.3731 16.6591 54.108 16.6591C54.6761 16.6591 55.125 16.7538 55.4545 16.9432C55.7879 17.1288 56.0417 17.3409 56.2159 17.5795C56.3939 17.8144 56.5322 18.0076 56.6307 18.1591H56.7443V13.8636H58.0852V25.5H56.7898V24.1591H56.6307C56.5322 24.3182 56.392 24.5189 56.2102 24.7614C56.0284 25 55.7689 25.214 55.4318 25.4034C55.0947 25.589 54.6458 25.6818 54.0852 25.6818ZM54.267 24.4773C54.8049 24.4773 55.2595 24.3371 55.6307 24.0568C56.0019 23.7727 56.2841 23.3807 56.4773 22.8807C56.6705 22.3769 56.767 21.7955 56.767 21.1364C56.767 20.4848 56.6723 19.9148 56.483 19.4261C56.2936 18.9337 56.0133 18.5511 55.642 18.2784C55.2708 18.0019 54.8125 17.8636 54.267 17.8636C53.6989 17.8636 53.2254 18.0095 52.8466 18.3011C52.4716 18.589 52.1894 18.9811 52 19.4773C51.8144 19.9697 51.7216 20.5227 51.7216 21.1364C51.7216 21.7576 51.8163 22.322 52.0057 22.8295C52.1989 23.3333 52.483 23.7348 52.858 24.0341C53.2367 24.3295 53.7064 24.4773 54.267 24.4773ZM60.7273 25.5V16.7727H62.0682V25.5H60.7273ZM61.4091 15.3182C61.1477 15.3182 60.9223 15.2292 60.733 15.0511C60.5473 14.8731 60.4545 14.6591 60.4545 14.4091C60.4545 14.1591 60.5473 13.9451 60.733 13.767C60.9223 13.589 61.1477 13.5 61.4091 13.5C61.6705 13.5 61.8939 13.589 62.0795 13.767C62.2689 13.9451 62.3636 14.1591 62.3636 14.4091C62.3636 14.6591 62.2689 14.8731 62.0795 15.0511C61.8939 15.2292 61.6705 15.3182 61.4091 15.3182ZM68.3196 16.7727V17.9091H63.7969V16.7727H68.3196ZM65.1151 14.6818H66.456V23C66.456 23.3788 66.5109 23.6629 66.6207 23.8523C66.7344 24.0379 66.8783 24.1629 67.0526 24.2273C67.2306 24.2879 67.4181 24.3182 67.6151 24.3182C67.7628 24.3182 67.884 24.3106 67.9787 24.2955C68.0734 24.2765 68.1491 24.2614 68.206 24.25L68.4787 25.4545C68.3878 25.4886 68.2609 25.5227 68.098 25.5568C67.9351 25.5947 67.7287 25.6136 67.4787 25.6136C67.0999 25.6136 66.7287 25.5322 66.3651 25.3693C66.0052 25.2064 65.706 24.9583 65.4673 24.625C65.2325 24.2917 65.1151 23.8712 65.1151 23.3636V14.6818Z"
                                fill="#2A3647" />
                        </svg>
                    </div>

                    <div class="fill_icon" onclick="deleteSelectedContact('${contactId}')" class="edit_delete_buttons">
                        <svg width="96" height="40" viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_71395_18225" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="8"
                                width="25" height="24">
                                <rect x="7.5" y="8" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_71395_18225)">
                                <path
                                    d="M14.5 29C13.95 29 13.4792 28.8042 13.0875 28.4125C12.6958 28.0208 12.5 27.55 12.5 27V14C12.2167 14 11.9792 13.9042 11.7875 13.7125C11.5958 13.5208 11.5 13.2833 11.5 13C11.5 12.7167 11.5958 12.4792 11.7875 12.2875C11.9792 12.0958 12.2167 12 12.5 12H16.5C16.5 11.7167 16.5958 11.4792 16.7875 11.2875C16.9792 11.0958 17.2167 11 17.5 11H21.5C21.7833 11 22.0208 11.0958 22.2125 11.2875C22.4042 11.4792 22.5 11.7167 22.5 12H26.5C26.7833 12 27.0208 12.0958 27.2125 12.2875C27.4042 12.4792 27.5 12.7167 27.5 13C27.5 13.2833 27.4042 13.5208 27.2125 13.7125C27.0208 13.9042 26.7833 14 26.5 14V27C26.5 27.55 26.3042 28.0208 25.9125 28.4125C25.5208 28.8042 25.05 29 24.5 29H14.5ZM14.5 14V27H24.5V14H14.5ZM16.5 24C16.5 24.2833 16.5958 24.5208 16.7875 24.7125C16.9792 24.9042 17.2167 25 17.5 25C17.7833 25 18.0208 24.9042 18.2125 24.7125C18.4042 24.5208 18.5 24.2833 18.5 24V17C18.5 16.7167 18.4042 16.4792 18.2125 16.2875C18.0208 16.0958 17.7833 16 17.5 16C17.2167 16 16.9792 16.0958 16.7875 16.2875C16.5958 16.4792 16.5 16.7167 16.5 17V24ZM20.5 24C20.5 24.2833 20.5958 24.5208 20.7875 24.7125C20.9792 24.9042 21.2167 25 21.5 25C21.7833 25 22.0208 24.9042 22.2125 24.7125C22.4042 24.5208 22.5 24.2833 22.5 24V17C22.5 16.7167 22.4042 16.4792 22.2125 16.2875C22.0208 16.0958 21.7833 16 21.5 16C21.2167 16 20.9792 16.0958 20.7875 16.2875C20.5958 16.4792 20.5 16.7167 20.5 17V24Z"
                                    fill="#2A3647" />
                            </g>
                            <path
                                d="M44.5 25.5H40.9091V13.8636H44.6591C45.7879 13.8636 46.7538 14.0966 47.5568 14.5625C48.3598 15.0246 48.9754 15.6894 49.4034 16.5568C49.8314 17.4205 50.0455 18.4545 50.0455 19.6591C50.0455 20.8712 49.8295 21.9148 49.3977 22.7898C48.9659 23.661 48.3371 24.3314 47.5114 24.8011C46.6856 25.267 45.6818 25.5 44.5 25.5ZM42.3182 24.25H44.4091C45.3712 24.25 46.1686 24.0644 46.8011 23.6932C47.4337 23.322 47.9053 22.7936 48.2159 22.108C48.5265 21.4223 48.6818 20.6061 48.6818 19.6591C48.6818 18.7197 48.5284 17.911 48.2216 17.233C47.9148 16.5511 47.4564 16.0284 46.8466 15.6648C46.2367 15.2973 45.4773 15.1136 44.5682 15.1136H42.3182V24.25ZM55.8864 25.6818C55.0455 25.6818 54.3201 25.4962 53.7102 25.125C53.1042 24.75 52.6364 24.2273 52.3068 23.5568C51.9811 22.8826 51.8182 22.0985 51.8182 21.2045C51.8182 20.3106 51.9811 19.5227 52.3068 18.8409C52.6364 18.1553 53.0947 17.6212 53.6818 17.2386C54.2727 16.8523 54.9621 16.6591 55.75 16.6591C56.2045 16.6591 56.6534 16.7348 57.0966 16.8864C57.5398 17.0379 57.9432 17.2841 58.3068 17.625C58.6705 17.9621 58.9602 18.4091 59.1761 18.9659C59.392 19.5227 59.5 20.2083 59.5 21.0227V21.5909H52.7727V20.4318H58.1364C58.1364 19.9394 58.0379 19.5 57.8409 19.1136C57.6477 18.7273 57.3712 18.4223 57.0114 18.1989C56.6553 17.9754 56.2348 17.8636 55.75 17.8636C55.2159 17.8636 54.7538 17.9962 54.3636 18.2614C53.9773 18.5227 53.6799 18.8636 53.4716 19.2841C53.2633 19.7045 53.1591 20.1553 53.1591 20.6364V21.4091C53.1591 22.0682 53.2727 22.6269 53.5 23.0852C53.7311 23.5398 54.0511 23.8864 54.4602 24.125C54.8693 24.3598 55.3447 24.4773 55.8864 24.4773C56.2386 24.4773 56.5568 24.428 56.8409 24.3295C57.1288 24.2273 57.3769 24.0758 57.5852 23.875C57.7936 23.6705 57.9545 23.4167 58.0682 23.1136L59.3636 23.4773C59.2273 23.9167 58.9981 24.303 58.6761 24.6364C58.3542 24.9659 57.9564 25.2235 57.483 25.4091C57.0095 25.5909 56.4773 25.6818 55.8864 25.6818ZM62.8807 13.8636V25.5H61.5398V13.8636H62.8807ZM68.9957 25.6818C68.1548 25.6818 67.4295 25.4962 66.8196 25.125C66.2135 24.75 65.7457 24.2273 65.4162 23.5568C65.0904 22.8826 64.9276 22.0985 64.9276 21.2045C64.9276 20.3106 65.0904 19.5227 65.4162 18.8409C65.7457 18.1553 66.2041 17.6212 66.7912 17.2386C67.3821 16.8523 68.0715 16.6591 68.8594 16.6591C69.3139 16.6591 69.7628 16.7348 70.206 16.8864C70.6491 17.0379 71.0526 17.2841 71.4162 17.625C71.7798 17.9621 72.0696 18.4091 72.2855 18.9659C72.5014 19.5227 72.6094 20.2083 72.6094 21.0227V21.5909H65.8821V20.4318H71.2457C71.2457 19.9394 71.1473 19.5 70.9503 19.1136C70.7571 18.7273 70.4806 18.4223 70.1207 18.1989C69.7647 17.9754 69.3442 17.8636 68.8594 17.8636C68.3253 17.8636 67.8632 17.9962 67.473 18.2614C67.0866 18.5227 66.7893 18.8636 66.581 19.2841C66.3726 19.7045 66.2685 20.1553 66.2685 20.6364V21.4091C66.2685 22.0682 66.3821 22.6269 66.6094 23.0852C66.8404 23.5398 67.1605 23.8864 67.5696 24.125C67.9787 24.3598 68.4541 24.4773 68.9957 24.4773C69.348 24.4773 69.6662 24.428 69.9503 24.3295C70.2382 24.2273 70.4863 24.0758 70.6946 23.875C70.9029 23.6705 71.0639 23.4167 71.1776 23.1136L72.473 23.4773C72.3366 23.9167 72.1075 24.303 71.7855 24.6364C71.4635 24.9659 71.0658 25.2235 70.5923 25.4091C70.1188 25.5909 69.5866 25.6818 68.9957 25.6818ZM78.4446 16.7727V17.9091H73.9219V16.7727H78.4446ZM75.2401 14.6818H76.581V23C76.581 23.3788 76.6359 23.6629 76.7457 23.8523C76.8594 24.0379 77.0033 24.1629 77.1776 24.2273C77.3556 24.2879 77.5431 24.3182 77.7401 24.3182C77.8878 24.3182 78.009 24.3106 78.1037 24.2955C78.1984 24.2765 78.2741 24.2614 78.331 24.25L78.6037 25.4545C78.5128 25.4886 78.3859 25.5227 78.223 25.5568C78.0601 25.5947 77.8537 25.6136 77.6037 25.6136C77.2249 25.6136 76.8537 25.5322 76.4901 25.3693C76.1302 25.2064 75.831 24.9583 75.5923 24.625C75.3575 24.2917 75.2401 23.8712 75.2401 23.3636V14.6818ZM84.027 25.6818C83.1861 25.6818 82.4607 25.4962 81.8509 25.125C81.2448 24.75 80.777 24.2273 80.4474 23.5568C80.1217 22.8826 79.9588 22.0985 79.9588 21.2045C79.9588 20.3106 80.1217 19.5227 80.4474 18.8409C80.777 18.1553 81.2353 17.6212 81.8224 17.2386C82.4134 16.8523 83.1027 16.6591 83.8906 16.6591C84.3452 16.6591 84.794 16.7348 85.2372 16.8864C85.6804 17.0379 86.0838 17.2841 86.4474 17.625C86.8111 17.9621 87.1009 18.4091 87.3168 18.9659C87.5327 19.5227 87.6406 20.2083 87.6406 21.0227V21.5909H80.9134V20.4318H86.277C86.277 19.9394 86.1785 19.5 85.9815 19.1136C85.7884 18.7273 85.5118 18.4223 85.152 18.1989C84.7959 17.9754 84.3755 17.8636 83.8906 17.8636C83.3565 17.8636 82.8944 17.9962 82.5043 18.2614C82.1179 18.5227 81.8205 18.8636 81.6122 19.2841C81.4039 19.7045 81.2997 20.1553 81.2997 20.6364V21.4091C81.2997 22.0682 81.4134 22.6269 81.6406 23.0852C81.8717 23.5398 82.1918 23.8864 82.6009 24.125C83.0099 24.3598 83.4853 24.4773 84.027 24.4773C84.3793 24.4773 84.6974 24.428 84.9815 24.3295C85.2694 24.2273 85.5175 24.0758 85.7259 23.875C85.9342 23.6705 86.0952 23.4167 86.2088 23.1136L87.5043 23.4773C87.3679 23.9167 87.1387 24.303 86.8168 24.6364C86.4948 24.9659 86.0971 25.2235 85.6236 25.4091C85.1501 25.5909 84.6179 25.6818 84.027 25.6818Z"
                                fill="#2A3647" />
                        </svg>
                    </div>
                </div>
    `;
    
}

function moveEditDeleteContactPopupFromScreenToRight() {
    document.getElementById('edit_delete_contact_popup').classList.add('move-from-screen-to-right');
    document.getElementById('edit_delete_contact_popup_screen').classList.remove('d-none');
    setTimeout(closeEditDeleteContactPopup, 600);
}

function closeEditDeleteContactPopup() {
    const popupElement = document.getElementById('edit_delete_contact_popup');
    const screenElement = document.getElementById('edit_delete_contact_popup_screen');

    // Überprüfen, ob die Elemente vorhanden sind, bevor auf ihre Eigenschaften zugegriffen wird
    if (popupElement && screenElement) {
        // Entfernen der Klasse 'move-from-screen-to-right' vom Popup-Element
        popupElement.classList.remove('move-from-screen-to-right');
        // Hinzufügen der Klasse 'd-none' zum Bildschirm-Element
        screenElement.classList.add('d-none');
    } else {
        console.error("Popup-Element oder Bildschirm-Element nicht gefunden.");
    }
}




function showContactCreatedConfirmation() {
    document.getElementById('confirmation_container').classList.remove('d-none');
    document.getElementById('confirmation_container').classList.add('move-to-and-hide-from-screen');
    setTimeout(closeContactCreatedConfirmation, 2000);
}

function closeContactCreatedConfirmation() {
    document.getElementById('contact_created_confirmation').classList.add('d-none');

}

function saveAddedContact() {
    let first_name = document.getElementById('add_contact_fname').value;
    let last_name = document.getElementById('add_contact_lname').value;
    let email = document.getElementById('add_contact_email').value;
    let phone = document.getElementById('add_contact_phone').value;

    let newContact = {
        'id': generateUniqueId(),
        'name': last_name,
        'given_name': first_name,
        'e-mail': email,
        'color': generateRandomColor(),
        'phone': phone
    };

    contact_list.push(newContact);
    localStorage.setItem('contact_list', JSON.stringify(contact_list));

    closeAddContactCard();
    showContactCreatedConfirmation();
    loadContactList();

}



function loadContactList() {
    // Zuerst die Kontaktliste im LocalStorage speichern, falls sie noch nicht vorhanden ist
    if (!localStorage.getItem('contact_list')) {
        localStorage.setItem('contact_list', JSON.stringify(contact_list));
        console.log('Contact list saved to LocalStorage');
    }

    // Die Kontaktliste aus dem LocalStorage laden und initialisieren
    let contactListAsString = localStorage.getItem('contact_list');
    contact_list = JSON.parse(contactListAsString);
    console.log('Loaded all Contacts');
    initContactList();
}


function generateUniqueId() {
    // Hier könntest du eine eindeutige ID-Generierung implementieren
    // Zum Beispiel könntest du die Länge der Kontaktliste nehmen und eine neue ID basierend darauf generieren.
    let newId = (contact_list.length + 1).toString(); // Umwandlung in einen String
    return newId;
}


function generateRandomColor() {
    // Hier könntest du eine zufällige Farbe generieren, zum Beispiel im RGB-Farbraum
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}


function saveEditedContact(contactId) {
    // Indizes der Eingabefelder für die Kontaktdaten
    const firstNameInput = document.getElementById('edit_contact_fname');
    const lastNameInput = document.getElementById('edit_contact_lname');
    const emailInput = document.getElementById('edit_contact_email');
    const phoneInput = document.getElementById('edit_contact_phone');

    // Neue Werte der Eingabefelder
    const newFirstName = firstNameInput.value;
    const newLastName = lastNameInput.value;
    const newEmail = emailInput.value;
    const newPhone = phoneInput.value;

    // Überprüfen, ob eine gültige Kontakt-ID übergeben wurde und die Eingabefelder vorhanden sind
    if (contactId && firstNameInput && lastNameInput && emailInput && phoneInput) {
        // Den ausgewählten Kontakt anhand der ID finden
        const selectedContactIndex = contact_list.findIndex(contact => contact.id === contactId);
        if (selectedContactIndex !== -1) {
            // Alten Kontakt aus der Kontaktliste im Local Storage entfernen
            const oldContact = contact_list.splice(selectedContactIndex, 1)[0];
            console.log("Alter Kontakt:", oldContact);

            // Neue Kontaktinformationen hinzufügen
            const updatedContact = {
                id: oldContact.id,
                name: newLastName,
                given_name: newFirstName,
                'e-mail': newEmail,
                color: oldContact.color, // behalte die alte Farbe bei
                phone: newPhone
            };

            // Aktualisierten Kontakt zur Kontaktliste hinzufügen
            contact_list.push(updatedContact);

            localStorage.setItem('contact_list', JSON.stringify(contact_list));


            // Bearbeitungspopup schließen und Kontaktliste aktualisieren
            closeEditContactCard();
            showContactCreatedConfirmation(); // Bestätigungsnachricht anzeigen
            loadContactList();
        } else {
            console.error("Kontakt-ID nicht gefunden:", contactId);
        }
    } else {
        console.error("Fehlende Eingabefelder oder ungültige Kontakt-ID.");
    }
}

