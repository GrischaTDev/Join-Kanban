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