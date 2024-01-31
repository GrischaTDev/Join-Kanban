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