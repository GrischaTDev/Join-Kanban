loggedInUser = [];

/**
 * Load functions on Summary page.
 */
async function init() {
    await includeHTML();
    activeMenu();
    load();
    loadUserProfile();
    greatingUser();
}

/**
 * Load localStorage loggedInUser.
 */
function load() {
    let currentUserUser = localStorage.getItem('loggedInUser');
    if (currentUserUser) {
        loggedInUser = JSON.parse(currentUserUser);
        if (loggedInUser.length === 0) {
            alert('Sie müssen sich anmelden!');
            window.location.href = './index.html';
        }
    }
}


function logout() {
    loggedInUser.splice(0, loggedInUser.length);
    window.location.href = './index.html';
    save();
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


/**
 * Function load active menu tab
 * 
 * @param menuItems
 */
function activeMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const currentPath = window.location.pathname.substring(1); // Entfernt führenden Schrägstrich
  
    menuItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPath) {
        item.classList.add('active-menu');
      } else {
        item.classList.remove('active-menu');
      }
    });
}
  

function greatingUser() {
    let name = loggedInUser[0].name;
    let nameMobile = document.getElementById('user-greating-mobile');
    let nameDesktop = document.getElementById('user-greating-desktop');
    nameMobile.innerHTML = `<div>${name}</div>`;
    nameDesktop.innerHTML = `<div>${name}</div>`;
}

function loadUserProfile() {
    let userName = loggedInUser[0].name;
    let initialLetters = nameInitialLetters(userName);
    let userProfile = document.getElementById('log-user');
    userProfile.innerHTML = /* html */ `${initialLetters}`;
}

function nameInitialLetters(userName) {
    const fullNameSplitt = userName.split(" ");
    const letters = fullNameSplitt.map(name => name[0]);
    const initialLetters = letters.join("");
    return initialLetters;
}




// function openLegalNotice() {
//     window.location.href = "help.html?content=legal_notice";
// }

// function openPrivacyPolicy() {
//     window.location.href = "help.html?content=privacy_policy";
// }

// document.addEventListener('DOMContentLoaded', function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const content = urlParams.get('content');

//     if (content === 'legal_notice') {
//         renderLegalNotice();
//     } else if (content === 'privacy_policy') {
//         renderPrivacyPolicy();
//     }
// });


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

function generateRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}