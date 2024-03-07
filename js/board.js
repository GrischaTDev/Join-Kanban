loggedInUser = [];

let currentDraggedElement;


/**
 * This function is used to initial the board.
 */
async function initBoard() {
    await includeHTML();
    loadAllTasks();
    activeMenu();
    load();
    loadUsers();
    loadUserProfile();
    showAllTasks(allTasks);
    // Überprüfen, ob der Local Storage leer ist
    if (!localStorage.getItem("allTasks")) {
        // Wenn der Local Storage leer ist, speichern Sie die Aufgaben aus dem Array
        saveTasksToLocalStorage(allTasks);
    } else {
        // Wenn der Local Storage nicht leer ist, laden Sie die Aufgaben aus dem Local Storage
        allTasks = JSON.parse(localStorage.getItem("allTasks"));
        // Aktualisieren Sie das Array im Local Storage, um sicherzustellen, dass es immer synchronisiert ist
        saveTasksToLocalStorage(allTasks);
    }
}


/**
 * This functioin is used to open a new Task Popup.
 */
function openAddNewTaskPopup() {
    if (window.innerWidth > 900) {
        document.body.classList.add('popup-open');
        document.getElementById('add-task-popup-container').classList.remove('d-none');
        document.getElementById('add-task-popup-container').innerHTML = '';
        document.getElementById('add-task-popup-container').innerHTML += renderAddNewTaskInPopup();
    } else {
        window.location.href = 'add_task.html';
    }
}


/**
 * This function is used to close the add new Task Popup.
 */
function closeaddTaskPopup() {
    document.getElementById("add-task-popup-container").classList.add("d-none");
    document.body.classList.remove('popup-open');
}


// Update the showPopup function to include an onchange event listener for the checkboxes
function showPopup(taskId) {
    document.body.classList.add('popup-open');
    let task = findTaskById(taskId);
    let urgentSymbolHTML = task.priority.urgent
        ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent"> Urgent`
        : "";
    let mediumSymbolHTML = task.priority.medium
        ? `<img src="/assets/img/prio-medium.svg" alt="Medium"> Medium`
        : "";
    let lowSymbolHTML = task.priority.low
        ? `<img src="/assets/img/prio-low.svg" alt="Low"> Low`
        : "";
    // Benutzerinitialen und Hintergrundfarben anzeigen
    let userNamesHTML = task.userList
        .map(
            (user) => `
          <div class="user-details user-details-mobile">
              <div class="initials-circle-two initials-circle-mobile" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
              <div class="user-full-name user-full-name-mobile">${user.fname} ${user.lname}</div>
          </div>`
        )
        .join("");
    // Subtasks anzeigen
    let subtasksHTML = task.subtask
        ? task.subtask
            .map(
                (subtask) => `
    <div class="form-check">
        <input class="form-check-input form-check-input-mobile" type="checkbox" id="subtask_${subtask.name}" ${subtask.status ? 'checked' : ''
                    } onchange="updateSubtaskStatus(${taskId}, '${subtask.name}', this.checked)">
        <label class="form-check-label" for="subtask_${subtask.name}">${subtask.name}</label>
    </div>
  `
            )
            .join("")
        : "";
    document.getElementById("incomePopup").classList.remove("d-none");
    document.getElementById("incomePopup").innerHTML = renderTaskDetailsInPopup(task, urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userNamesHTML, subtasksHTML);
}


/**
 * This function is used to close the Popup that shows the Task details
 */
function closeIncomePopup() {
    document.getElementById("incomePopup").classList.add("d-none");
    document.body.classList.remove('popup-open');
}


/**
 * Opens a popup window to edit the details of a selected task.
 * 
 * @param {number} taskId - The ID of the task to be edited.
 */
function editPopup(taskId) {
    document.body.classList.add('popup-open');
    document.getElementById("incomePopup").classList.add("d-none");
    document.getElementById('content-board').classList.add('do-not-scroll');
    document.getElementById('edit_popup').classList.remove('d-none');
    document.getElementById('edit_popup').innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem('allTasks'));
    let taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit && taskToEdit.subtask) {
        todos = taskToEdit.subtask.map(subtask => subtask.name);
    } else {
        todos = [];
    }
    renderEditPopup(taskId);
}


/**
 * Renders a popup window for editing the details of a selected task.
 * 
 * @param {number} taskId - The ID of the task to be edited.
 */
function renderEditPopup(taskId) {
    // Abrufen des Tasks aus dem Local Storage
    let tasks = JSON.parse(localStorage.getItem('allTasks'));
    let taskToEdit = tasks.find(task => task.id === taskId);
    document.getElementById('edit_popup').innerHTML += generateHtmlForEditPopup(taskId);
    document.getElementById('titel').value = taskToEdit.titel;
    document.getElementById('description').value = taskToEdit.description;
    document.getElementById('dueDate').value = taskToEdit.dueDate;
    if (taskToEdit.priority.urgent) {
        document.getElementById('urgent').classList.add('active');
    } else if (taskToEdit.priority.medium) {
        document.getElementById('medium').classList.add('active');
    } else {
        document.getElementById('low').classList.add('active');
    }
    taskToEdit.userList.forEach(user => {
        document.getElementById('selected-user').innerHTML += `
            <div class="user-details">
                <div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
            </div>
        `;
    });
    showTodos();
}


/**
 * This function closes the user list in a popup
 */
function closeUserListInPopup() {
    document.getElementById('user-list').classList.add('d-none');
}


/**
 * Renders the selected users by displaying their initials inside colored circles.
 * 
 * @param {Array} selectedUser - An array containing user objects with 'color' property.
 */
function renderSelectedUsersInEdit(selectedUser) {
    let selectedUserList = document.getElementById('selected-user');
    selectedUserList.innerHTML = '';
    selectedUser.forEach(user => {
        let initialLetters = nameInitialLettersAddTasks(user);
        const userColor = user['color'];
        selectedUserList.innerHTML += /* html */ `
        <div class="user-icon" style="background-color: ${userColor};">${initialLetters}</div>
      `;
    });
}


/**
 * 
 * @param {*} event 
 */
function openUserListEdit(event) {
    let userList = document.getElementById('user-list');
    let inputIcon = document.getElementById('input-icon');
    userList.innerHTML = '';
    if (userList.classList.contains('d-none')) {
        userList.classList.remove('d-none');
        inputIcon.src = './assets/img/arrow_drop_down_2.svg';
    }
    users.forEach((user, i) => {
        const userColor = user['color'];
        let initialLetters = nameInitialLettersAddTasks(user);
        userList.innerHTML += /* html */ `
        <div id="currentUser${i}" class="userColumn ${isUSerSelectedEdit(user.id) ? 'user-list-active' : ''}" onclick="toggleAddUserEdit(${user.id})">
          <div class="user-name">
            <span class="letter-icon" style="background-color:${userColor}">${initialLetters}</span>
            <div>${user.name}</div>
          </div>
          <img id="user-checkbox${i}" src="${isUSerSelectedEdit(user.id) ? './assets/img/checkbox_active_white.svg' : './assets/img/checkbox.svg'}" alt="">
        </div>
      `;
    });
}


/**
 * This function checks if a user is selected in edit popup
 * 
 * @param {*} userId 
 * @returns 
 */
function isUSerSelectedEdit(userId) {
    return selectedUser.some(su => su.id === userId);
}


/**
 * This function is used to add or remove with toggle a user to userlist in edit popup
 * 
 * @param {*} userId 
 */
function toggleAddUserEdit(userId) {
    let user = users.find(u => u.id === userId);
    let selectedUSerIndex = selectedUser.findIndex(u => u.id === userId);
    let checkBoxUser = document.getElementById(`user-checkbox${userId}`);
    if (selectedUSerIndex === -1) {
        selectedUser.push(user);
        checkBoxUser.src = './assets/img/checkbox_active_white.svg';
    } else {
        selectedUser.splice(selectedUSerIndex, 1);
        checkBoxUser.src = './assets/img/checkbox.svg';
    }
    renderSelectedUsersInEdit(selectedUser);
}


/**
 * This function saves a selected user to local storage
 * 
 * @param {*} selectedUser 
 */
function saveSelectedUserToLocalStorage(selectedUser) {
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
}


/**
 * This function loads selected users from local storage
 */
function loadSelectedUserFromLocalStorage() {
    let loadUser = localStorage.getItem("selectedUser");
    if (loadUser) {
        selectedUser = JSON.parse(loadUser);
    }
}


/**
 * this function checks if a user is selected in addTask
 * 
 * @param {*} i 
 * @returns 
 */
function isUSerSelected(i) {
    return selectedUser.some(su => su.id === i)
}


/**
 * this function is used to generate initial letters of users
 * 
 * @param {*} user 
 * @returns 
 */
function nameInitialLettersAddTasks(user) {
    const fullNameSplitt = user.name.split(" ");
    const letters = fullNameSplitt.map(name => name[0]);
    const initialLetters = letters.join("");
    return initialLetters;
}


/**
 * this function is used to prevent to close a popup by clicking on it
 * 
 * @param {*} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * This function is used to add or remove with toggle a user to userlist in addTask popup
 * 
 * @param {*} userId 
 */
function toggleAddUser(i) {
    let userColumn = document.getElementById(`currentUser${i}`);
    let user = users[i];
    let selectedUSerIndex = selectedUser.findIndex(u => u.id === i);
    let checkBoxUser = document.getElementById(`user-checkbox${i}`);
    if (selectedUSerIndex === -1) {
        userColumn.classList.add('user-list-active');
        selectedUser.push(user)
        checkBoxUser.src = './assets/img/checkbox_active_white.svg';
    } else {
        userColumn.classList.remove('user-list-active');
        selectedUser.splice(selectedUSerIndex, 1);
        checkBoxUser.src = './assets/img/checkbox.svg';
    }
    renderUserList(i);
    save();
}


/**
 * this function is used to update the user list in tasks
 */
function updateUserListInTasks() {
    allTasks.forEach(task => {
        // Überprüfen, ob der Task Benutzer hat
        if (task.userList && task.userList.length > 0) {
            task.userList = task.userList.map(user => {
                // Suchen des entsprechenden Benutzers im selectedUser-Array
                const selectedUserIndex = selectedUser.findIndex(selected => selected.name === user.fname + ' ' + user.lname);
                if (selectedUserIndex !== -1) {
                    // Aktualisieren der Benutzerdaten im Task
                    user.backgroundcolor = selectedUser[selectedUserIndex].color;
                }
                return user;
            });
        }
    });
}


/**
 * This function saves a edited Task
 * 
 * @param {*} taskId 
 */
function SaveEditedTask(taskId) {
    const editedTask = {
        id: taskId,
        titel: document.getElementById('titel').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('dueDate').value,
        category: allTasks.find(task => task.id === taskId).category,
        priority: {
            low: document.getElementById('low').classList.contains('active-low'),
            medium: document.getElementById('medium').classList.contains('active-medium'),
            urgent: document.getElementById('urgent').classList.contains('active-urgent')
        },
        subtask: todos.map(name => ({ name, status: false })),
        userList: selectedUser.map(user => ({
            fname: user.name.split(' ')[0],
            lname: user.name.split(' ')[1],
            backgroundcolor: user.color
        })),
        progressfield: allTasks.find(task => task.id === taskId).progressfield
    };
    const index = allTasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        allTasks[index] = editedTask;
    }
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    closeEditPopup();
}


/**
 * this function closes the edit popup
 */
function closeEditPopup() {
    document.getElementById('user-list').classList.add('d-none');
    document.body.classList.remove('popup-open');
    document.getElementById("edit_popup").classList.add("d-none");
    loadAllTasks();
    showAllTasks(allTasks);
}


/**
 * This function is used to update the subtask status
 * 
 * @param {*} taskId 
 * @param {*} subtaskName 
 * @param {*} status 
 */
function updateSubtaskStatus(taskId, subtaskName, status) {
    let task = findTaskById(taskId);
    if (task) {
        let subtask = task.subtask.find(sub => sub.name === subtaskName);
        if (subtask && subtask.status !== status) {
            subtask.status = status;
            let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
            let totalSubtasks = task.subtask ? task.subtask.length : 0;
            let progressPercentage = Math.round((completedSubtasks / totalSubtasks) * 100);
            task.progress = progressPercentage;
            saveTasksToLocalStorage(allTasks);
            showAllTasks(allTasks);
        }
    }
}


/**
 * This function is used to find tasks by id
 * 
 * @param {*} taskId 
 * @returns 
 */
function findTaskById(taskId) {
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id === taskId) {
            return allTasks[i];
        }
    }
    return null;
}


/**
 * This function is used to show all tasks
 * 
 * @param {*} allTasks 
 */
function showAllTasks(allTasks) {
    let todo_container = allTasks.filter(t => t['progressfield'] == 'todo_container');
    document.getElementById('todo_container').innerHTML = '';

    if (todo_container.length === 0) {
        document.getElementById('todo_container').innerHTML = renderEmptyProgressfieldTodo();
    } else {
        for (let i = 0; i < todo_container.length; i++) {
            let task = todo_container[i];
            let taskDetails = calculateTaskDetails(task);
            document.getElementById('todo_container').innerHTML += renderAllTasksInProgressfieldTodo(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);}
    }

    let inprogress_container = allTasks.filter(t => t['progressfield'] == 'inprogress_container');
    document.getElementById('inprogress_container').innerHTML = '';
    for (let i = 0; i < inprogress_container.length; i++) {
        let task = inprogress_container[i];
        let taskDetails = calculateTaskDetails(task);
        document.getElementById('inprogress_container').innerHTML += renderAllTasksInProgressfieldInProgress(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);
    }

    let await_feedback_container = allTasks.filter(t => t['progressfield'] == 'await_feedback_container');
    document.getElementById('await_feedback_container').innerHTML = '';
    for (let i = 0; i < await_feedback_container.length; i++) {
        let task = await_feedback_container[i];
        let taskDetails = calculateTaskDetails(task);
        document.getElementById('await_feedback_container').innerHTML += renderAllTasksInProgressfieldAwaitFeedback(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);
    }

    let done_container = allTasks.filter(t => t['progressfield'] == 'done_container');
    document.getElementById('done_container').innerHTML = '';
    for (let i = 0; i < done_container.length; i++) {
        let task = done_container[i];
        let taskDetails = calculateTaskDetails(task);
        document.getElementById('done_container').innerHTML += renderAllTasksInProgressfieldDone(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);
    }
}


/**
 * this function calculates all tasks details
 * 
 * @param {*} task 
 * @returns 
 */
function calculateTaskDetails(task) {
    let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
    let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
    let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';
    let userInitialsHTML = task.userList.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');
    let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
    let totalSubtasks = task.subtask ? task.subtask.length : 0;
    let progressPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
    return {urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userInitialsHTML, completedSubtasks, totalSubtasks, progressPercentage};
}


/**
 * this function allows to drag an element
 * 
 * @param {*} index 
 */
function startDragging(index) {
    currentDraggedElement = index;
}


/**
 * this function allows too drop an element
 * 
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * this function moves a task in other progressfields
 * 
 * @param {*} progressfield 
 */
function moveTo(progressfield) {
    const taskIndex = currentDraggedElement - 1;
    allTasks[taskIndex]["progressfield"] = progressfield;
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    showAllTasks(allTasks);
}


/**
 * this function is used to highlight the progressfield while dragging
 * 
 * @param {*} id 
 */
function highlight(id) {
    document.getElementById(id).classList.add("drag-area-highlight");
}


/**
 * this function removes the highlight when task is dropped
 * 
 * @param {*} id 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove("drag-area-highlight");
}


/**
 * this function is used to search tasks 
 */
function findTask() {
    let searchInput = document.getElementById('search').value.toLowerCase();
    let filteredTasks = allTasks.filter(task =>
        task.titel.toLowerCase().includes(searchInput) ||
        task.description.toLowerCase().includes(searchInput) ||
        task.category.toLowerCase().includes(searchInput)
    );
    showAllTasks(filteredTasks);
}


/**
 * this function deletes a task
 * 
 * @param {*} taskId 
 */
function deleteTask(taskId) {
    let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    let taskIndex = allTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        allTasks.splice(taskIndex, 1);
        saveTasksToLocalStorage(allTasks);
        loadAllTasks();
        closeIncomePopup();
        showAllTasks(allTasks);
    } else {
        console.log("Task not found");
    }
}
