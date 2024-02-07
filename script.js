
async function loadMenu() {
    await includeHTML();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function openHelp() {
    window.location.href = "help.html?content=help";
}



function openLegalNotice() {
    window.location.href = "help.html?content=legal_notice";
}

function openPrivacyPolicy() {
    window.location.href = "help.html?content=privacy_policy";
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get('content');

    if (content === 'legal_notice') {
        renderLegalNotice();
    } else if (content === 'privacy_policy') {
        renderPrivacyPolicy();
    } else if (content === 'help') {
        renderHelp();
    }
});

function renderLegalNotice() {
    document.getElementById('help_container').innerHTML = `
    <div class="text_templates"  id="legal_notice">
    <div>
        <h1>Legal Notice</h1>

    </div>
    <h2>Imprint</h2>
    <ul>
        Grischa Tänzer
        Maximilian Popp
        Helmut Martens
    </ul>

    <div>
        <h3>Exploring the Board</h3>
        <p>Email: <a href="#">bla@bla</a></p>
    </div>

    <div>
        <h3>Acceptance of terms</h3>
        <p>By accessing and using Join (Product), you acknowledge and agree to the following terms and
            conditions, and any policies, guidelines, or amendments thereto that may be presented to you from
            time to time. We, the listed students, may update or change the terms and conditions from time to
            time without notice.</p>
    </div>

    <div>
        <h3>Scope and ownership of the product</h3>
        <p>Join has been developed as part of a student group project in a web development bootcamp at the
            Developer Akademie GmbH. It has an educational purpose and is not intended for extensive personal &
            business usage. As such, we cannot guarantee consistent availability, reliability, accuracy, or any
            other aspect of quality regarding this Product.

            The design of Join is owned by the Developer Akademie GmbH. Unauthorized use, reproduction,
            modification, distribution, or replication of the design is strictly prohibited.</p>
    </div>

    <div>
        <h3>Proprietary rights</h3>
        <p>Aside from the design owned by Developer Akademie GmbH, we, the listed students, retain all
            proprietary rights in Join, including any associated copyrighted material, trademarks, and other
            proprietary information.</p>
    </div>

    <div>
        <h3>Use of the product</h3>
        <p>Join is intended to be used for lawful purposes only, in accordance with all applicable laws and
            regulations. Any use of Join for illegal activities, or to harass, harm, threaten, or intimidate
            another person, is strictly prohibited. You are solely responsible for your interactions with other
            users of Join.</p>
    </div>

    <div>
        <h3>Disclaimer of warranties and limitation of liability</h3>
        <p>Join is provided "as is" without warranty of any kind, whether express or implied, including but not
            limited to the implied warranties of merchantability, fitness for a particular purpose, and
            non-infringement. In no event will we, the listed students, or the Developer Akademie, be liable for
            any direct, indirect, incidental, special, consequential or exemplary damages, including but not
            limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we
            have been advised of the possibility of such damages, arising out of or in connection with the use
            or performance of Join.</p>
    </div>

    <div>
        <h3>Indemnity</h3>
        <p>You agree to indemnify, defend and hold harmless us, the listed students, the Developer Akademie, and
            our affiliates, partners, officers, directors, agents, and employees, from and against any claim,
            demand, loss, damage, cost, or liability (including reasonable legal fees) arising out of or
            relating to your use of Join and/or your breach of this Legal Notice.

            For any questions or notices, please contact us at [Contact Email].

            Date: July 26, 2023</p>
    </div>
</div>
    `;
}

function renderPrivacyPolicy() {
    document.getElementById('help_container').innerHTML = `
    <div class="text_templates" id="privacy_policy">
    Privacy Policy
    </div>
    `;
}

function renderHelp() {
    document.getElementById('help_container').innerHTML = `
         <div class="text_templates" id="help">
            <div>
                <h1>Help</h1>
            </div>

            <div>
                <p>Welcome to the help page for Join, your guide to using our kanban project management tool. Here,
                    we'll provide an overview of what Join is, how it can benefit you, and how to use it.</p>
            </div>

            <div>
                <h3 style="font-weight: bold;">What is Join?</h3>
                <p>Join is a kanban-based project management tool designed and built by a group of dedicated students as
                    part of their web development bootcamp at the Developer Akademie.

                    Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit
                    work-in-progress, and maximize efficiency (or flow). Join leverages the principles of kanban to help
                    users manage their tasks and projects in an intuitive, visual interface.

                    It is important to note that Join is designed as an educational exercise and is not intended for
                    extensive business usage. While we strive to ensure the best possible user experience, we cannot
                    guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding
                    Join.</p>
            </div>

            <div>
                <h3 style="font-weight: bold;">How to use it</h3>
                <p>Here is a step-by-step guide on how to use Join:</p>
            </div>

            <div>
                <h3 style="font-weight: bold;">1.</h3>
                <h4 style="font-weight: bold;">Exploring the Board</h4>
                <p>When you log in to Join, you'll find a default board. This board represents your project and contains
                    four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p>
            </div>

            <div>
                <h3 style="font-weight: bold;">2.</h3>
                <h4 style="font-weight: bold;">Creating Contacts</h4>
                <p>In Join, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on
                    "New contact", and fill in the required information. Once added, these contacts can be assigned
                    tasks and they can interact with the tasks on the board.</p>
            </div>

            <div>
                <h3 style="font-weight: bold;">3.</h3>
                <h4 style="font-weight: bold;">Adding Cards</h4>
                <p>Now that you've added your contacts, you can start adding cards. Cards represent individual tasks.
                    Click the "+" button under the appropriate list to create a new card. Fill in the task details in
                    the card, like task name, description, due date, assignees, etc.</p>
            </div>

            <div>
                <h3 style="font-weight: bold;">4.</h3>
                <h4 style="font-weight: bold;">Moving Cards</h4>
                <p>As the task moves from one stage to another, you can reflect that on the board by dragging and
                    dropping the card from one list to another.</p>
            </div>

            <div>
                <h3 style="font-weight: bold;">5.</h3>
                <h4 style="font-weight: bold;">Deleting Cards</h4>
                <p>Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card
                    will permanently remove it from the board. Please exercise caution when deleting cards, as this
                    action is irreversible.

                    Remember that using Join effectively requires consistent updates from you and your team to ensure
                    the board reflects the current state of your project.

                    Have more questions about Join? Feel free to contact us at [Your Contact Email]. We're here to help
                    you!
                </p>
            </div>
        </div>
    `;
}

function openLegalNoticeSidebar() {
    document.getElementById('legal_notice_sidebar_screen').classList.remove('d-none');
    document.getElementById('legal_notice_sidebar').classList.add('move-from-right-to-screen');
}

function moveLegalNoticeSidebarFromScreenToRight() {
    document.getElementById('legal_notice_sidebar').classList.add('move-from-screen-to-right');
    document.getElementById('legal_notice_sidebar_screen').classList.remove('d-none');
    setTimeout(closeLegalNoticeSidebar, 500);
}

function closeLegalNoticeSidebar() {
    document.getElementById('legal_notice_sidebar').classList.remove('move-from-screen-to-right');
    document.getElementById('legal_notice_sidebar_screen').classList.add('d-none');
}


function goBack() {
    window.history.back();
}