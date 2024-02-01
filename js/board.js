function showPopup() {
  document.getElementById("incomePopup").classList.remove("d-none");
}

function hideAddCardToBottomFromScreen() {
  document.getElementById("incomePopup").classList.add("d-none");
}

function closePopup() {
  hideAddCardToBottomFromScreen();
}

function doNotClose(event) {
  if (!event.target.closest('.close_icon_box')) {
    event.stopPropagation();
  }
}