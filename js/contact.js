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

function initContactList(){
    document.getElementById('contacts_list_container').innerHTML = '';

    for (let i = 0; i < contact_list.length; i++) {
        const contact = contact_list[i];
        const initials = contact['given_name'][0] + contact['name'][0];
        const backgroundColor = contact['color'] ? `style="background-color: ${contact['color']};"` : '';
        document.getElementById('contacts_list_container').innerHTML += `
        <div class="contact_list_snippet_box">
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