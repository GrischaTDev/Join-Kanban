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

<<<<<<< Updated upstream

/**
 * This functioin is used to open a new Task Popup.
 */
=======
>>>>>>> Stashed changes
function openAddNewTaskPopup() {
  if (window.innerWidth > 900) {
    document.body.classList.add("popup-open");
    document
      .getElementById("add-task-popup-container")
      .classList.remove("d-none");
    document.getElementById("add-task-popup-container").innerHTML = "";
    document.getElementById("add-task-popup-container").innerHTML +=
      renderAddNewTaskInPopup();
  } else {
    window.location.href = "add_task.html";
  }
}

<<<<<<< Updated upstream

/**
 * This function is used to close the add new Task Popup.
 */
=======
function renderAddNewTaskInPopup() {
  return /* html */ `
    <div class="addTask-popup" onclick="doNotClose(event), closeUserListInPopup()">
   
    <div>
        <div class="header-container">
            <h1>Add Task</h1>
        </div>

        <form onsubmit="addTask()">
            <div class="add-task-form">
                <div class="add-task-form-row">
                    <div class="add-task-title">
                        <span>Title<span class="red-asterisk">*</span></span>
                        <input type="text" required placeholder="Enter a title" id="titel">
                    </div>

                    <div class="add-task-title">
                        <span>Description</span>
                        <textarea type="text" required minlength="5" placeholder="Enter a description"
                            id="description"></textarea>
                    </div>

                    <div class="add-task-title">
                        <span>Assigned to</span>
                        <div class="assigned-input">
                            <input class="input-task-select" id="search-user" autocomplete="off"
                                onkeydown="filterUser()" onclick="openUserList(event)" type="text"
                                placeholder="Select contacts to assign">
                            <img onclick="openUserList(event)" id="input-icon" class="input-arrow"
                                src="./assets/img/arrow_drop_down_1.svg" alt="">
                        </div>
                        <div id="user-list" class="d-none" onclick="doNotClose(event)"></div>
                        <div id="selected-user"></div>
                    </div>
                </div>

                <div class="add-task-border"></div>

                <div class="add-task-form-row">
                    <div class="add-task-title">
                        <span>Due a date<span class="red-asterisk">*</span></span>
                        <input class="input-task-date" type="date" id="dueDate" required>
                    </div>

                    <div class="add-task-title">
                        <span>Prio</span>
                        <div class="priority-buttons">
                            <button type="button" class="priority-button" id="urgent"
                                onclick="togglePriority('urgent')">
                                <span>Urgent</span>
                                <svg id="svg-urgent" xmlns="http://www.w3.org/2000/svg" width="21" height="15"
                                    fill="none">
                                    <g fill="#FF3D00" clip-path="url(#a)">
                                        <path
                                            d="M19.571 14.755c-.234 0-.463-.075-.652-.214l-8.252-6.083-8.252 6.083a1.098 1.098 0 0 1-1.304-1.763l8.904-6.57a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.095 1.095 0 0 1-.652 1.977Z" />
                                        <path
                                            d="M19.571 9.006c-.234 0-.463-.075-.652-.214L10.667 2.71 2.415 8.792A1.098 1.098 0 0 1 1.111 7.03L10.015.46a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.096 1.096 0 0 1-.652 1.977Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M.667.245h20v14.51h-20z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type="button" class="priority-button active-medium" id="medium"
                                onclick="togglePriority('medium')">
                                <span>Medium</span>
                                <svg id="svg-medium" xmlns="http://www.w3.org/2000/svg" width="18" height="8"
                                    fill="none">
                                    <g fill="#FFA800" clip-path="url(#a)">
                                        <path
                                            d="M16.569 7.167H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.099.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275ZM16.569 2.71H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.1.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M.5.833h17v6.333H.5z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type="button" class="priority-button" id="low" onclick="togglePriority('low')">
                                <span>Low</span>
                                <svg id="svg-low" xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none">
                                    <g fill="#7AE229">
                                        <path
                                            d="M10.334 9.006c-.235 0-.463-.075-.652-.214L.779 2.222A1.096 1.096 0 1 1 2.083.46l8.251 6.082L18.585.46a1.097 1.097 0 0 1 1.304 1.763l-8.903 6.57c-.189.138-.417.213-.652.213Z" />
                                        <path
                                            d="M10.334 14.754c-.235 0-.463-.074-.652-.213L.779 7.97a1.096 1.096 0 1 1 1.304-1.763l8.251 6.083 8.251-6.083a1.098 1.098 0 0 1 1.304 1.763l-8.903 6.57c-.189.139-.417.214-.652.213Z" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="add-task-title">
                        <span>Category<span class="red-asterisk">*</span></span>
                        <select class="input-task-select" id="category" aria-placeholder="Select task category">
                            <option value="" disabled selected>Select a Category</option>
                            <option value="technical-task">Technical Task</option>
                            <option value="user-story">User Story</option>
                        </select>
                    </div>

                    <div class="subtask-container">
                        <span>Subtask</span>
                        <div class="input-sub-field">
                            <input class="input-subtask" id="subtask" />
                            <div onclick="addTodo();" id="addButton" class="suffix">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none">
                                    <path fill="#2A3647"
                                        d="M6.249 8h-5a.968.968 0 0 1-.713-.287A.968.968 0 0 1 .249 7c0-.283.095-.52.287-.713A.968.968 0 0 1 1.249 6h5V1c0-.283.095-.52.287-.713A.968.968 0 0 1 7.249 0c.283 0 .52.096.712.287.192.192.288.43.288.713v5h5c.283 0 .52.096.712.287.192.192.287.43.287.713s-.095.52-.287.713a.967.967 0 0 1-.713.287h-5v5c0 .283-.095.52-.287.713a.967.967 0 0 1-.712.287.967.967 0 0 1-.713-.287.968.968 0 0 1-.287-.713V8Z" />
                                </svg>
                            </div>
                        </div>
                        <ul id="mylist"></ul>
                    </div>
                </div>
            </div>

            <div class="create-task-container">
                <span>
                    <span class="red-asterisk">*</span>This field is required
                </span>
                <div class="form-button">
                    <div class="button-clear" onclick="clearInputFields()">
                        <span>Clear</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
                            <mask id="a" width="24" height="24" x="4" y="4" maskUnits="userSpaceOnUse"
                                style="mask-type:alpha">
                                <path fill="#D9D9D9" d="M4 4h24v24H4z" />
                            </mask>
                            <g mask="url(#a)">
                                <path fill="#fff"
                                    d="m16 17.4-4.9 4.9a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275.948.948 0 0 1-.275-.7c0-.283.091-.517.275-.7l4.9-4.9-4.9-4.9a.948.948 0 0 1-.275-.7c0-.283.091-.517.275-.7a.948.948 0 0 1 .7-.275c.283 0 .516.092.7.275l4.9 4.9 4.9-4.9a.948.948 0 0 1 .7-.275c.283 0 .516.092.7.275a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7L17.4 16l4.9 4.9a.949.949 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275L16 17.4Z" />
                            </g>
                        </svg>
                    </div>
                    <button class="button-create">
                        <span>Create Task</span>
                        <img src="/assets/img/check.svg" alt="">
                    </button>
                </div>
            </div>
        </form>
    </div>
    `;
}

>>>>>>> Stashed changes
function closeaddTaskPopup() {
  document.getElementById("add-task-popup-container").classList.add("d-none");
  document.body.classList.remove("popup-open");
}

// Update the showPopup function to include an onchange event listener for the checkboxes
function showPopup(taskId) {
<<<<<<< Updated upstream
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
=======
  document.body.classList.add("popup-open");
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
>>>>>>> Stashed changes
          <div class="user-details user-details-mobile">
              <div class="initials-circle-two initials-circle-mobile" style="background-color: ${
                user.backgroundcolor
              };">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
              <div class="user-full-name user-full-name-mobile">${user.fname} ${
        user.lname
      }</div>
          </div>`
<<<<<<< Updated upstream
        )
        .join("");
    // Subtasks anzeigen
    let subtasksHTML = task.subtask
        ? task.subtask
            .map(
                (subtask) => `
=======
    )
    .join("");

  // Subtasks anzeigen
  let subtasksHTML = task.subtask
    ? task.subtask
        .map(
          (subtask) => `
>>>>>>> Stashed changes
    <div class="form-check">
        <input class="form-check-input form-check-input-mobile" type="checkbox" id="subtask_${
          subtask.name
        }" ${
            subtask.status ? "checked" : ""
          } onchange="updateSubtaskStatus(${taskId}, '${
            subtask.name
          }', this.checked)">
        <label class="form-check-label" for="subtask_${subtask.name}">${
            subtask.name
          }</label>
    </div>
  `
<<<<<<< Updated upstream
            )
            .join("")
        : "";
    document.getElementById("incomePopup").classList.remove("d-none");
    document.getElementById("incomePopup").innerHTML = renderTaskDetailsInPopup(task, urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userNamesHTML, subtasksHTML);
}


/**
 * This function is used to close the Popup that shows the Task details
 */
=======
        )
        .join("")
    : "";

  document.getElementById("incomePopup").classList.remove("d-none");
  document.getElementById("incomePopup").innerHTML = renderTaskDetailsInPopup(
    task,
    urgentSymbolHTML,
    mediumSymbolHTML,
    lowSymbolHTML,
    userNamesHTML,
    subtasksHTML
  );
}

function renderTaskDetailsInPopup(
  task,
  urgentSymbolHTML,
  mediumSymbolHTML,
  lowSymbolHTML,
  userNamesHTML,
  subtasksHTML
) {
  return /*html*/ `
    <div class="complete_board_popup" onclick="doNotClose(event)">
        <div class="popup-card popup-card-mobile", onclick="doNotClose(event)">
        <div class="board_popup board_popup_mobile">
            <div class="flex-container-head">
                <div class="task_popup_${task.category}">
                    <p>${task.category}</p>
                </div>
                <div class="close_icon_box">
                    <img class="img_popup img_popup_mobile" style="cursor: pointer;" onclick="closeIncomePopup()"
                        src="./assets/img/close_icon.svg" alt="close Button">
                </div>
            </div>
            
            <textarea class="titelarea titelarea-mobile">${task.titel}</textarea>
      
     
            <textarea class="descriptionarea descriptionarea-mobile">${task.description}</textarea>
        
            <div class="due_date_popup due-date-popup-mobile">
                <p style="color: #42526E;">Due Date:</p>
                <p id="variable_date">${task.dueDate}</p>
            </div>
            <div class="priority_popup priority-popup-mobile">
                <p class="prioity_container prioity-container-mobile" style="color: #42526E;">Priority:</p>
                ${urgentSymbolHTML}
                ${mediumSymbolHTML}
                ${lowSymbolHTML}
            </div>
            <div class="assigned-popup">
    <p class="assigned-mobile" style="color: #42526E;">Assigned to:</p>
    <div class="user-container-popup">
        ${userNamesHTML} 
    </div>
    <p class="subtask_container subtask-container-mobile" style="color: #42526E;">Subtasks</p>
    <div class="subtask-list subtask-list-mobile">
        ${subtasksHTML} 
    </div>
    <div class="edit-delete" id="edit">
        <a class="button-delete-edit" href="#" onclick="deleteTask(${task.id})">
            <img class="edit-delete-img edit-delete-img-mobile" src="/assets/img/delete_icon.svg"
                alt="Bild plus Button" />
            <div class="edit-delete-popup-button edit-delete-popup-button-mobile">Delete</div>
        </a>
        <a class="button-delete-edit" href="#" onclick="editPopup(${task.id})">
            <img class="edit-delete-img edit-delete-img-mobile" src="/assets/img/edit_icon.svg"
                alt="Bild plus Button" />
            <div class="edit-delete-popup-button edit-delete-popup-button-mobile">Edit</div>
        </a>
    </div>
</div>
        </div>
    </div>
`;
}

>>>>>>> Stashed changes
function closeIncomePopup() {
  document.getElementById("incomePopup").classList.add("d-none");
  document.body.classList.remove("popup-open");
}

<<<<<<< Updated upstream

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
=======
function editPopup(taskId) {
  // Verberge das showPopup
  document.body.classList.add("popup-open");
  document.getElementById("incomePopup").classList.add("d-none");
  document.getElementById("content-board").classList.add("do-not-scroll");
  // Zeige das editPopup
  document.getElementById("edit_popup").classList.remove("d-none");
  document.getElementById("edit_popup").innerHTML = "";

  // Abrufen des Tasks aus dem Local Storage
  let tasks = JSON.parse(localStorage.getItem("allTasks"));
  let taskToEdit = tasks.find((task) => task.id === taskId);

  if (taskToEdit && taskToEdit.subtask) {
    // Laden der Subtasks ins todos-Array
    todos = taskToEdit.subtask.map((subtask) => subtask.name);
  } else {
    todos = []; // Falls keine Subtasks vorhanden sind
  }

  // Rendern des Popups mit den bearbeiteten Daten
  renderEditPopup(taskId);
}

function renderEditPopup(taskId) {
  // Abrufen des Tasks aus dem Local Storage
  let tasks = JSON.parse(localStorage.getItem("allTasks"));
  let taskToEdit = tasks.find((task) => task.id === taskId);

  // Füge das Formular für die Bearbeitung hinzu und setze die Werte der Eingabefelder
  document.getElementById("edit_popup").innerHTML += /*html*/ `
<form class="task-edit-form" onsubmit="addTask()" onclick="doNotClose(event), closeUserListInPopup()">
<div class="close-icon-edit-popup" onclick="closeEditPopup();">
        <img class="img_popup" style="cursor: pointer;" src="./assets/img/close_icon.svg" alt="close Button">
    </div>
<div class="add-task-form-row">
    <div class="add-task-title">
        <span>Title<span class="red-asterisk">*</span></span>
        <input type="text" required placeholder="Enter a title" id="titel">
    </div>
    <div class="add-task-title">
        <span>Description</span>
        <textarea type="text" required minlength="5" placeholder="Enter a description" id="description"></textarea>
    </div>
    <div class="add-task-title">
        <span>Assigned to</span>
        <div class="assigned-input">
    <input class="input-task-select" id="search-user" autocomplete="off" onkeydown="filterUser()" onclick="openUserList(event)" type="text" placeholder="Select contacts to assign">
    <img onclick="openUserList(event)" id="input-icon" class="input-arrow" src="./assets/img/arrow_drop_down_1.svg" alt="">
      </div>
      <div id="user-list" class="d-none" onclick="doNotClose(event)"></div>
    <div id="selected-user"></div>
    </div>
    <div class="add-task-title">
        <span>Due a date<span class="red-asterisk">*</span></span>
        <input class="input-task-date" type="date" id="dueDate" required>
    </div>
    <div class="add-task-title">
        <span>Prio</span>
        <div class="priority-buttons">
            <button type="button" class="priority-button" id="urgent" onclick="togglePriority('urgent')">
                <span>Urgent</span>
                <svg id="svg-urgent" xmlns="http://www.w3.org/2000/svg" width="21" height="15"
                                    fill="none">
                                    <g fill="#FF3D00" clip-path="url(#a)">
                                        <path
                                            d="M19.571 14.755c-.234 0-.463-.075-.652-.214l-8.252-6.083-8.252 6.083a1.098 1.098 0 0 1-1.304-1.763l8.904-6.57a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.095 1.095 0 0 1-.652 1.977Z" />
                                        <path
                                            d="M19.571 9.006c-.234 0-.463-.075-.652-.214L10.667 2.71 2.415 8.792A1.098 1.098 0 0 1 1.111 7.03L10.015.46a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.096 1.096 0 0 1-.652 1.977Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M.667.245h20v14.51h-20z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type="button" class="priority-button active-medium" id="medium"
                                onclick="togglePriority('medium')">
                                <span>Medium</span>
                                <svg id="svg-medium" xmlns="http://www.w3.org/2000/svg" width="18" height="8"
                                    fill="none">
                                    <g fill="#FFA800" clip-path="url(#a)">
                                        <path
                                            d="M16.569 7.167H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.099.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275ZM16.569 2.71H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.1.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M.5.833h17v6.333H.5z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type="button" class="priority-button" id="low" onclick="togglePriority('low')">
                                <span>Low</span>
                                <svg id="svg-low" xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none">
                                    <g fill="#7AE229">
                                        <path
                                            d="M10.334 9.006c-.235 0-.463-.075-.652-.214L.779 2.222A1.096 1.096 0 1 1 2.083.46l8.251 6.082L18.585.46a1.097 1.097 0 0 1 1.304 1.763l-8.903 6.57c-.189.138-.417.213-.652.213Z" />
                                        <path
                                            d="M10.334 14.754c-.235 0-.463-.074-.652-.213L.779 7.97a1.096 1.096 0 1 1 1.304-1.763l8.251 6.083 8.251-6.083a1.098 1.098 0 0 1 1.304 1.763l-8.903 6.57c-.189.139-.417.214-.652.213Z" />
                                    </g>
                                </svg>
                            </button>
        </div>
    </div>
    <div class="subtask-container">
        <span>Subtask</span>
        <div class="input-sub-field">
            <input class="input-subtask" id="subtask" />
            <div onclick="addTodo();" id="addButton" class="suffix">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none">
                <path fill="#2A3647"
                   d="M6.249 8h-5a.968.968 0 0 1-.713-.287A.968.968 0 0 1 .249 7c0-.283.095-.52.287-.713A.968.968 0 0 1 1.249 6h5V1c0-.283.095-.52.287-.713A.968.968 0 0 1 7.249 0c.283 0 .52.096.712.287.192.192.288.43.288.713v5h5c.283 0 .52.096.712.287.192.192.287.43.287.713s-.095.52-.287.713a.967.967 0 0 1-.713.287h-5v5c0 .283-.095.52-.287.713a.967.967 0 0 1-.712.287.967.967 0 0 1-.713-.287.968.968 0 0 1-.287-.713V8Z" />
                </svg>
            </div>
        </div>
        <ul id="mylist"></ul>
    </div>
</div>
<div class="button-ok">
    <button id="saveEditButton" class="button-edit-ok" onclick="SaveEditedTask(${taskId})">OK<img src="/assets/img/check.svg" alt=""></button>
</div>
</form>
 `;

  // Setze die Werte der Eingabefelder basierend auf dem abgerufenen Task
  document.getElementById("titel").value = taskToEdit.titel;
  document.getElementById("description").value = taskToEdit.description;
  document.getElementById("dueDate").value = taskToEdit.dueDate;
  // Weitere Felder entsprechend setzen...

  // Setze die Prioritätsschaltflächen entsprechend
  if (taskToEdit.priority.urgent) {
    document.getElementById("urgent").classList.add("active");
  } else if (taskToEdit.priority.medium) {
    document.getElementById("medium").classList.add("active");
  } else {
    document.getElementById("low").classList.add("active");
  }

  // Anzeigen der ausgewählten Benutzer
  taskToEdit.userList.forEach((user) => {
    document.getElementById("selected-user").innerHTML += `
>>>>>>> Stashed changes
            <div class="user-details">
                <div class="initials-circle" style="background-color: ${
                  user.backgroundcolor
                };">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
            </div>
        `;
<<<<<<< Updated upstream
    });
    showTodos();
}


/**
 * This function closes the user list in a popup
 */
=======
  });

  // Anzeigen der Subtasks im Popup-Fenster
  showTodos();
}

>>>>>>> Stashed changes
function closeUserListInPopup() {
  document.getElementById("user-list").classList.add("d-none");
}

<<<<<<< Updated upstream

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
=======
function renderSelectedUsersInEdit(selectedUser) {
  let selectedUserList = document.getElementById("selected-user");
  selectedUserList.innerHTML = "";

  selectedUser.forEach((user) => {
    let initialLetters = nameInitialLettersAddTasks(user);
    const userColor = user["color"];

    selectedUserList.innerHTML += /* html */ `
>>>>>>> Stashed changes
        <div class="user-icon" style="background-color: ${userColor};">${initialLetters}</div>
      `;
  });
}


/**
 * 
 * @param {*} event 
 */
function openUserListEdit(event) {
  let userList = document.getElementById("user-list");
  let inputIcon = document.getElementById("input-icon");
  userList.innerHTML = "";
  if (userList.classList.contains("d-none")) {
    userList.classList.remove("d-none");
    inputIcon.src = "./assets/img/arrow_drop_down_2.svg";
  }
  users.forEach((user, i) => {
    const userColor = user["color"];
    let initialLetters = nameInitialLettersAddTasks(user);
    userList.innerHTML += /* html */ `
        <div id="currentUser${i}" class="userColumn ${
      isUSerSelectedEdit(user.id) ? "user-list-active" : ""
    }" onclick="toggleAddUserEdit(${user.id})">
          <div class="user-name">
            <span class="letter-icon" style="background-color:${userColor}">${initialLetters}</span>
            <div>${user.name}</div>
          </div>
          <img id="user-checkbox${i}" src="${
      isUSerSelectedEdit(user.id)
        ? "./assets/img/checkbox_active_white.svg"
        : "./assets/img/checkbox.svg"
    }" alt="">
        </div>
      `;
  });
}

<<<<<<< Updated upstream

/**
 * This function checks if a user is selected in edit popup
 * 
 * @param {*} userId 
 * @returns 
 */
=======
// Funktion zum Überprüfen, ob ein Benutzer im Bearbeitungsmodus ausgewählt ist
>>>>>>> Stashed changes
function isUSerSelectedEdit(userId) {
  return selectedUser.some((su) => su.id === userId);
}


/**
 * This function is used to add or remove with toggle a user to userlist in edit popup
 * 
 * @param {*} userId 
 */
function toggleAddUserEdit(userId) {
  let user = users.find((u) => u.id === userId);
  let selectedUSerIndex = selectedUser.findIndex((u) => u.id === userId);
  let checkBoxUser = document.getElementById(`user-checkbox${userId}`);
  if (selectedUSerIndex === -1) {
    selectedUser.push(user);
    checkBoxUser.src = "./assets/img/checkbox_active_white.svg";
  } else {
    selectedUser.splice(selectedUSerIndex, 1);
    checkBoxUser.src = "./assets/img/checkbox.svg";
  }
  renderSelectedUsersInEdit(selectedUser);
}

<<<<<<< Updated upstream

/**
 * This function saves a selected user to local storage
 * 
 * @param {*} selectedUser 
 */
=======
// Funktion zum Speichern der ausgewählten Benutzer im Local Storage
>>>>>>> Stashed changes
function saveSelectedUserToLocalStorage(selectedUser) {
  localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
}

<<<<<<< Updated upstream

/**
 * This function loads selected users from local storage
 */
=======
// Funktion zum Laden der ausgewählten Benutzer aus dem Local Storage
>>>>>>> Stashed changes
function loadSelectedUserFromLocalStorage() {
  let loadUser = localStorage.getItem("selectedUser");
  if (loadUser) {
    selectedUser = JSON.parse(loadUser);
  }
}

<<<<<<< Updated upstream

/**
 * this function checks if a user is selected in addTask
 * 
 * @param {*} i 
 * @returns 
 */
=======
>>>>>>> Stashed changes
function isUSerSelected(i) {
  return selectedUser.some((su) => su.id === i);
}

<<<<<<< Updated upstream

/**
 * this function is used to generate initial letters of users
 * 
 * @param {*} user 
 * @returns 
 */
=======
>>>>>>> Stashed changes
function nameInitialLettersAddTasks(user) {
  const fullNameSplitt = user.name.split(" ");
  const letters = fullNameSplitt.map((name) => name[0]);
  const initialLetters = letters.join("");
  return initialLetters;
}

<<<<<<< Updated upstream

/**
 * this function is used to prevent to close a popup by clicking on it
 * 
 * @param {*} event 
 */
=======
>>>>>>> Stashed changes
function doNotClose(event) {
  event.stopPropagation();
}

<<<<<<< Updated upstream

/**
 * This function is used to add or remove with toggle a user to userlist in addTask popup
 * 
 * @param {*} userId 
 */
=======
>>>>>>> Stashed changes
function toggleAddUser(i) {
  let userColumn = document.getElementById(`currentUser${i}`);
  let user = users[i];
  let selectedUSerIndex = selectedUser.findIndex((u) => u.id === i);
  let checkBoxUser = document.getElementById(`user-checkbox${i}`);
  if (selectedUSerIndex === -1) {
    userColumn.classList.add("user-list-active");
    selectedUser.push(user);
    checkBoxUser.src = "./assets/img/checkbox_active_white.svg";
  } else {
    userColumn.classList.remove("user-list-active");
    selectedUser.splice(selectedUSerIndex, 1);
    checkBoxUser.src = "./assets/img/checkbox.svg";
  }
  renderUserList(i);
  save();
}

<<<<<<< Updated upstream

/**
 * this function is used to update the user list in tasks
 */
=======
>>>>>>> Stashed changes
function updateUserListInTasks() {
  allTasks.forEach((task) => {
    // Überprüfen, ob der Task Benutzer hat
    if (task.userList && task.userList.length > 0) {
      task.userList = task.userList.map((user) => {
        // Suchen des entsprechenden Benutzers im selectedUser-Array
        const selectedUserIndex = selectedUser.findIndex(
          (selected) => selected.name === user.fname + " " + user.lname
        );
        if (selectedUserIndex !== -1) {
          // Aktualisieren der Benutzerdaten im Task
          user.backgroundcolor = selectedUser[selectedUserIndex].color;
        }
        return user;
      });
    }
  });
}

<<<<<<< Updated upstream

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
=======
function SaveEditedTask(taskId) {
  // Abrufen des bearbeiteten Tasks aus dem Formular
  const editedTask = {
    id: taskId,
    titel: document.getElementById("titel").value,
    description: document.getElementById("description").value,
    dueDate: document.getElementById("dueDate").value,
    category: allTasks.find((task) => task.id === taskId).category, // Category unverändert lassen
    priority: {
      low: document.getElementById("low").classList.contains("active-low"),
      medium: document
        .getElementById("medium")
        .classList.contains("active-medium"),
      urgent: document
        .getElementById("urgent")
        .classList.contains("active-urgent"),
    },
    subtask: todos.map((name) => ({ name, status: false })), // Subtasks aktualisieren
    userList: selectedUser.map((user) => ({
      fname: user.name.split(" ")[0], // Extrahieren des Vornamens aus dem Namen des Benutzers
      lname: user.name.split(" ")[1], // Extrahieren des Nachnamens aus dem Namen des Benutzers
      backgroundcolor: user.color, // Verwendung der Hintergrundfarbe des Benutzers
    })),
    progressfield: allTasks.find((task) => task.id === taskId).progressfield, // Progressfield unverändert lassen
  };

  // Suchen und aktualisieren des bearbeiteten Tasks im Array
  const index = allTasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    allTasks[index] = editedTask;
  }

  // Speichern des aktualisierten Arrays im Local Storage
  localStorage.setItem("allTasks", JSON.stringify(allTasks));

  // Schließen des Bearbeitungspopups
  closeEditPopup();
}

function closeEditPopup() {
  // Schließe das editPopup
  document.getElementById("user-list").classList.add("d-none");
  document.body.classList.remove("popup-open");
  document.getElementById("edit_popup").classList.add("d-none");
  loadAllTasks();
  showAllTasks(allTasks);
}

function updateSubtaskStatus(taskId, subtaskName, status) {
  // Find the task by ID
  let task = findTaskById(taskId);
  if (task) {
    let subtask = task.subtask.find((sub) => sub.name === subtaskName);
    if (subtask && subtask.status !== status) {
      // Update the subtask status
      subtask.status = status;
      let completedSubtasks = task.subtask
        ? task.subtask.filter((subtask) => subtask.status).length
        : 0;
      let totalSubtasks = task.subtask ? task.subtask.length : 0;
      let progressPercentage = Math.round(
        (completedSubtasks / totalSubtasks) * 100
      );
      task.progress = progressPercentage;

      // Save the updated task object to local storage
      saveTasksToLocalStorage(allTasks);
      // Update the progress bar in the showAllTasks function
      showAllTasks(allTasks);
>>>>>>> Stashed changes
    }
  }
}

<<<<<<< Updated upstream

/**
 * This function is used to find tasks by id
 * 
 * @param {*} taskId 
 * @returns 
 */
=======
>>>>>>> Stashed changes
function findTaskById(taskId) {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id === taskId) {
      return allTasks[i];
    }
  }
  return null;
}

<<<<<<< Updated upstream

/**
 * This function is used to show all tasks
 * 
 * @param {*} allTasks 
 */
=======
>>>>>>> Stashed changes
function showAllTasks(allTasks) {
  let todo_container = allTasks.filter(
    (t) => t["progressfield"] == "todo_container"
  );
  document.getElementById("todo_container").innerHTML = "";

<<<<<<< Updated upstream
    if (todo_container.length === 0) {
        document.getElementById('todo_container').innerHTML = renderEmptyProgressfieldTodo();
    } else {
        for (let i = 0; i < todo_container.length; i++) {
            let task = todo_container[i];
            let taskDetails = calculateTaskDetails(task);
            document.getElementById('todo_container').innerHTML += renderAllTasksInProgressfieldTodo(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);}
=======
  if (todo_container.length === 0) {
    document.getElementById("todo_container").innerHTML =
      renderEmptyProgressfieldTodo();
  } else {
    for (let i = 0; i < todo_container.length; i++) {
      let task = todo_container[i];
      let taskDetails = calculateTaskDetails(task); // Hier die berechneten Details abrufen
      document.getElementById("todo_container").innerHTML +=
        renderAllTasksInProgressfieldTodo(
          task,
          taskDetails.urgentSymbolHTML,
          taskDetails.mediumSymbolHTML,
          taskDetails.lowSymbolHTML,
          taskDetails.userInitialsHTML,
          taskDetails.progressPercentage,
          taskDetails.completedSubtasks,
          taskDetails.totalSubtasks
        );
>>>>>>> Stashed changes
    }
  }

  let inprogress_container = allTasks.filter(
    (t) => t["progressfield"] == "inprogress_container"
  );
  document.getElementById("inprogress_container").innerHTML = "";
  for (let i = 0; i < inprogress_container.length; i++) {
    let task = inprogress_container[i];
    let taskDetails = calculateTaskDetails(task);
    document.getElementById("inprogress_container").innerHTML +=
      renderAllTasksInProgressfieldInProgress(
        task,
        taskDetails.urgentSymbolHTML,
        taskDetails.mediumSymbolHTML,
        taskDetails.lowSymbolHTML,
        taskDetails.userInitialsHTML,
        taskDetails.progressPercentage,
        taskDetails.completedSubtasks,
        taskDetails.totalSubtasks
      );
  }

  let await_feedback_container = allTasks.filter(
    (t) => t["progressfield"] == "await_feedback_container"
  );
  document.getElementById("await_feedback_container").innerHTML = "";
  for (let i = 0; i < await_feedback_container.length; i++) {
    let task = await_feedback_container[i];
    let taskDetails = calculateTaskDetails(task);
    document.getElementById("await_feedback_container").innerHTML +=
      renderAllTasksInProgressfieldAwaitFeedback(
        task,
        taskDetails.urgentSymbolHTML,
        taskDetails.mediumSymbolHTML,
        taskDetails.lowSymbolHTML,
        taskDetails.userInitialsHTML,
        taskDetails.progressPercentage,
        taskDetails.completedSubtasks,
        taskDetails.totalSubtasks
      );
  }

  let done_container = allTasks.filter(
    (t) => t["progressfield"] == "done_container"
  );
  document.getElementById("done_container").innerHTML = "";
  for (let i = 0; i < done_container.length; i++) {
    let task = done_container[i];
    let taskDetails = calculateTaskDetails(task);
    document.getElementById("done_container").innerHTML +=
      renderAllTasksInProgressfieldDone(
        task,
        taskDetails.urgentSymbolHTML,
        taskDetails.mediumSymbolHTML,
        taskDetails.lowSymbolHTML,
        taskDetails.userInitialsHTML,
        taskDetails.progressPercentage,
        taskDetails.completedSubtasks,
        taskDetails.totalSubtasks
      );
  }
}


/**
 * this function calculates all tasks details
 * 
 * @param {*} task 
 * @returns 
 */
function calculateTaskDetails(task) {
  let urgentSymbolHTML = task.priority.urgent
    ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">`
    : "";
  let mediumSymbolHTML = task.priority.medium
    ? `<img src="/assets/img/prio-medium.svg" alt="Medium">`
    : "";
  let lowSymbolHTML = task.priority.low
    ? `<img src="/assets/img/prio-low.svg" alt="Low">`
    : "";
  let userInitialsHTML = task.userList
    .map(
      (user) =>
        `<div class="initials-circle" style="background-color: ${
          user.backgroundcolor
        };">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`
    )
    .join("");
  let completedSubtasks = task.subtask
    ? task.subtask.filter((subtask) => subtask.status).length
    : 0;
  let totalSubtasks = task.subtask ? task.subtask.length : 0;
  let progressPercentage =
    totalSubtasks > 0
      ? Math.round((completedSubtasks / totalSubtasks) * 100)
      : 0;
  return {
    urgentSymbolHTML,
    mediumSymbolHTML,
    lowSymbolHTML,
    userInitialsHTML,
    completedSubtasks,
    totalSubtasks,
    progressPercentage,
  };
}

<<<<<<< Updated upstream

/**
 * this function allows to drag an element
 * 
 * @param {*} index 
 */
=======
function renderAllTasksInProgressfieldTodo(
  task,
  urgentSymbolHTML,
  mediumSymbolHTML,
  lowSymbolHTML,
  userInitialsHTML,
  progressPercentage,
  completedSubtasks,
  totalSubtasks
) {
  return /*html*/ `
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
      <div class="card">
        <div class="card-category-${task.category}">${task.category}</div>
        <div class="card-headline">${task.titel}</div>
        <div class="card-description">${task.description}</div>
        <div class="progress-container">
          <div class="progress" style="flex: 1;">
            <div class="progress-bar" style="width: ${progressPercentage}%; background-color:#4586ff;" role="progressbar" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress-text">${completedSubtasks}/${totalSubtasks} Subtasks</div>
        </div>
        <div class="user-priority-container">
          <div class="user-container">
            ${userInitialsHTML}
          </div>
          <div class="priority-symbols">
            ${urgentSymbolHTML}
            ${mediumSymbolHTML}
            ${lowSymbolHTML}
          </div>
        </div>
        
      </div>
    </a>`;
}

function renderAllTasksInProgressfieldInProgress(
  task,
  urgentSymbolHTML,
  mediumSymbolHTML,
  lowSymbolHTML,
  userInitialsHTML,
  progressPercentage,
  completedSubtasks,
  totalSubtasks
) {
  return /*html*/ `
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-description">${task.description}</div>
    <div class="progress-container">
              <div class="progress" style="flex: 1;">
                <div class="progress-bar" style="width: ${progressPercentage}%; background-color:#4586ff;" role="progressbar" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="progress-text">${completedSubtasks}/${totalSubtasks} Subtasks</div>
            </div>
    <div class="user-priority-container">
                    <div class="user-container">
                        ${userInitialsHTML}
                    </div>
                    <div class="priority-symbols">
                        ${urgentSymbolHTML}
                        ${mediumSymbolHTML}
                        ${lowSymbolHTML}
                    </div>
                </div>
            </div>
        </a>
    `;
}

function renderAllTasksInProgressfieldAwaitFeedback(
  task,
  urgentSymbolHTML,
  mediumSymbolHTML,
  lowSymbolHTML,
  userInitialsHTML,
  progressPercentage,
  completedSubtasks,
  totalSubtasks
) {
  return /*html*/ `
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-description">${task.description}</div>
    <div class="progress-container">
              <div class="progress" style="flex: 1;">
                <div class="progress-bar" style="width: ${progressPercentage}%; background-color:#4586ff;" role="progressbar" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="progress-text">${completedSubtasks}/${totalSubtasks} Subtasks</div>
            </div>
    <div class="user-priority-container">
                    <div class="user-container">
                        ${userInitialsHTML}
                    </div>
                    <div class="priority-symbols">
                        ${urgentSymbolHTML}
                        ${mediumSymbolHTML}
                        ${lowSymbolHTML}
                    </div>
                </div>
            </div>
        </a>
    `;
}

function renderAllTasksInProgressfieldDone(
  task,
  urgentSymbolHTML,
  mediumSymbolHTML,
  lowSymbolHTML,
  userInitialsHTML,
  progressPercentage,
  completedSubtasks,
  totalSubtasks
) {
  return /*html*/ `
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-description">${task.description}</div>
    <div class="progress-container">
              <div class="progress" style="flex: 1;">
                <div class="progress-bar" style="width: ${progressPercentage}%; background-color:#4586ff;" role="progressbar" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="progress-text">${completedSubtasks}/${totalSubtasks} Subtasks</div>
            </div>
    <div class="user-priority-container">
                    <div class="user-container">
                        ${userInitialsHTML}
                    </div>
                    <div class="priority-symbols">
                        ${urgentSymbolHTML}
                        ${mediumSymbolHTML}
                        ${lowSymbolHTML}
                    </div>
                </div>
            </div>
        </a>
    `;
}

>>>>>>> Stashed changes
function startDragging(index) {
  currentDraggedElement = index;
}

<<<<<<< Updated upstream

/**
 * this function allows too drop an element
 * 
 * @param {*} ev 
 */
=======
>>>>>>> Stashed changes
function allowDrop(ev) {
  ev.preventDefault();
}

<<<<<<< Updated upstream

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
=======
function moveTo(progressfield) {
  // Index um 1 reduzieren, da IDs bei 1 beginnen
  const taskIndex = currentDraggedElement - 1;

  // Aktualisiere den Fortschrittsstatus des gezogenen Elements
  allTasks[taskIndex]["progressfield"] = progressfield;

  // Speichere den aktualisierten allTasks-Array im Local Storage
  localStorage.setItem("allTasks", JSON.stringify(allTasks));

  // Aktualisiere die Anzeige aller Aufgaben
  showAllTasks(allTasks);
}

>>>>>>> Stashed changes
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

<<<<<<< Updated upstream

/**
 * this function removes the highlight when task is dropped
 * 
 * @param {*} id 
 */
=======
>>>>>>> Stashed changes
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

<<<<<<< Updated upstream

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
=======
function findTask() {
  let searchInput = document.getElementById("search").value.toLowerCase();
  let filteredTasks = allTasks.filter(
    (task) =>
      task.titel.toLowerCase().includes(searchInput) ||
      task.description.toLowerCase().includes(searchInput) ||
      task.category.toLowerCase().includes(searchInput)
  );

  showAllTasks(filteredTasks);
}

function deleteTask(taskId) {
  let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];

  // Finden des Index des Tasks im Array anhand der ID
  let taskIndex = allTasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    // Löschen des Tasks aus dem Array
    allTasks.splice(taskIndex, 1);
    saveTasksToLocalStorage(allTasks);
    loadAllTasks();
    closeIncomePopup();
    showAllTasks(allTasks);
  } else {
    console.log("Task not found");
  }
}

function doNotClose(event) {
  event.stopPropagation();
}
>>>>>>> Stashed changes
