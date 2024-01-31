//-category//
function updatePlaceholder() {
    var select = document.getElementById("categorySelect");
    var inputTask = document.getElementById("taskTitle");

    if (select.value === "technical-task") {
        inputTask.placeholder = "Enter a Technical Task";
    } else if (select.value === "user-story") {
        inputTask.placeholder = "Enter a User Story";
    } else {
        inputTask.placeholder = "Select a Category";
    }
} 
//category-END//
