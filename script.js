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
    document.getElementById('help').classList.remove('d-none');
}

function openLegalNotice() {
    
    document.getElementById('legal_notice').classList.add('text_position, z_index3');
    document.getElementById('legal_notice').classList.add('');
    
}

function openPrivacyPolicy() {
    document.getElementById('privacy_policy').classList.remove('d-none');
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

function openHelp(){
    document.getElementById('showContactContainer').classList.add('d-none');
    document.getElementById('help_popup').classList.remove('d-none');
}