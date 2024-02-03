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
    window.location.href = "help.html";
    
    document.getElementById('help').classList.add('z_index3');
    
}


function openLegalNotice() {
    window.location.href = "help.html";
    document.getElementById('help').classList.add('d-none');
    document.getElementById('legal_notice').classList.remove('d-none');
    document.getElementById('legal_notice').classList.add('z_index1');
}

function openPrivacyPolicy() {
    window.location.href = "help.html";
    
    document.getElementById('help').classList.add('d-none');
    document.getElementById('privacy_policy').classList.remove('d-none');
    document.getElementById('privacy_policy').classList.add('z_index2');
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