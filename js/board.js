loggedInUser = [];

let currentDraggedElement;

document.addEventListener("DOMContentLoaded", function () {
  // Hier kannst du die Funktionen aufrufen, die nach dem Laden des DOM ausgeführt werden sollen
  loadAllTasks(); // Aufruf der Funktion zum Laden der Aufgaben aus dem Local Storage
});

async function initBoard() {
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

  // Führen Sie die übrigen Initialisierungsschritte durch
  await includeHTML();
  load();
  loadUserProfile();
  showAllTasks(allTasks); // Rufen Sie showAllTasks mit dem allTasks-Array auf
}

// Dieses Popup ist die originale Version vom Max
// Funktioniert! (Fehlen die Parameter)

// function showPopup() {
//   document.getElementById("incomePopup").classList.remove("d-none");
//   document.getElementById('incomePopup').innerHTML = `

//   <div class="complete_board_popup" onclick="doNotClose(event)">
//                         <div class="board_popup">
//                             <div class="flex_container_head">
//                                 <div class="task_popup">
//                                     <p>User Story</p>
//                                 </div>
//                                 <div class="close_icon_box">
//                                     <img class="img_popup" style="cursor: pointer;" onclick="closePopup()"
//                                         src="./assets/img/close_icon.svg" alt="close Button">
//                                 </div>
//                             </div>
//                             <div class="header_popup">
//                                 <h2>Kochwelt Page & Recipe Recommender</h2>
//                             </div>
//                             <div class="p-element">
//                                 <p>Build start page with recipe recommendation.</p>
//                             </div>
//                             <div class="due_date_popup">
//                                 <p style="color: #42526E;">Due Date:</p>
//                                 <p id="variable_date">05/05/2024</p>
//                             </div>
//                             <div class="priority_popup">
//                                 <p style="color: #42526E;">Priority:</p>
//                                 <p id="variable_priority">Medium <img src="/assets/img/prio-medium.svg" alt=""></p>
//                             </div>
//                             <div class="assigned-popup">
//                                 <p style="color: #42526E;">Assigned To:</p>
//                                 <div class="user_popup_container">
//                                     <div class="initials_circle" style="background-color: turquoise;">EM</div>
//                                     <div>Emmanuel Mauer</div>
//                                 </div>
//                                 <div class="user_popup_container">
//                                     <div class="initials_circle" style="background-color: rgb(17, 36, 121);">EM</div>
//                                     <div>Marcel Bauer</div>
//                                 </div>
//                                 <div class="user_popup_container">
//                                     <div class="initials_circle" style="background-color: rgb(209, 95, 50);">EM</div>
//                                     <div>Anton Mayer</div>
//                                 </div>
//                                 <p class="subtask_container" style="color: #42526E;">Subtasks</p>
//                                 <div class="user_popup_item" onclick="toggleSubtask(this)">
//                                     <input type="checkbox" class="subtask_checkbox">
//                                     <div>Implement Recipe Recommendation</div>
//                                 </div>
//                                 <div class="user_popup_item" onclick="toggleSubtask(this)">
//                                     <input type="checkbox" class="subtask_checkbox">
//                                     <div>Start Page Layout</div>
//                                 </div>

//                                 <div class="edit-delete" id="edit">
//                                     <a class="button-delete-edit" href="#" onclick="deleteTask()">
//                                         <img class="edit-delete-img" src="/assets/img/delete_icon.svg"
//                                             alt="Bild plus Button" />
//                                         <div class="text-container">Delete</div>
//                                     </a>

//                                     <a class="button-delete-edit" href="#" onclick="saveAddedContact()">
//                                         <img class="edit-delete-img" src="/assets/img/edit_icon.svg"
//                                             alt="Bild plus Button" />
//                                         <div class="text-container">Edit</div>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//   `;
// }


function openAddNewTaskPopup(){
  document.getElementById('add-task-popup-container').classList.remove('d-none');
  document.getElementById('add-task-popup-container').innerHTML = '';
  document.getElementById('add-task-popup-container').innerHTML += `
  <div class="addTask_popup" onclick="doNotClose(event)">
                <div class="header-container">
                    <h1>Add Task</h1>
                </div>
        
                <form class="form-width" onsubmit="addTask()">
                    <div class="add-task-form" >
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
        
                            <div class="add-task-title assigned-desktop">
                                <span>Assigned to</span>
                                <div class="assigned-input">
                                    <input onclick="openUserList('user-select-desktop', 'selected-user-desktop')" class="input-task-select" type="text"
                                        placeholder="Select contacts to assign">
                                    <img onclick="openUserList('user-select-desktop')" id="input-icon" class="input-arrow"
                                        src="./assets/img/arrow_drop_down_1.svg" alt="">
                                </div>
                                <div id="user-select-desktop" class="d-none"></div>
                                <div id="selected-user-desktop"></div>
                            </div>
        
                            <div class="add-task-title prio-mobile">
                                <span>Prio</span>
                                <div class="priority-buttons">
                                    <button type="button" class="priority-button" id="urgent" onclick="togglePriority('urgent')">
                                        Urgent
                                        <img src="/assets/img/prio-urgent.svg" alt="Urgent Image">
                                    </button>
                                    <button type="button" class="priority-button active" id="medium" onclick="togglePriority('medium')">
                                        Medium
                                        <img src="/assets/img/prio-medium.svg" alt="Medium Image">
                                    </button>
                                    <button type="button" class="priority-button" id="low" onclick="togglePriority('low')">
                                        Low
                                        <img src="/assets/img/prio-low.svg" alt="Low Image">
                                    </button>  
                                </div>
                            </div>
                        </div>
        
                        <div class="add-task-border"></div>
        
                        <div class="add-task-form-row">
                            <div class="add-task-title">
                                <span>Due a date<span class="red-asterisk">*</span></span>
                                <input class="input-task-date" type="date" id="dueDate" required>
                            </div>
        
                            <div class="add-task-title prio-desktop">
                                <span>Prio</span>
                                <div class="priority-buttons">
                                    <button type="button" class="priority-button" id="urgent-desktop" onclick="togglePriority('urgent-desktop')">
                                        Urgent
                                        <img src="/assets/img/prio-urgent.svg" alt="Urgent Image">
                                    </button>
                                    <button type="button" class="priority-button active" id="medium-desktop" onclick="togglePriority('medium-desktop')">
                                        Medium
                                        <img src="/assets/img/prio-medium.svg" alt="Medium Image">
                                    </button>
                                    <button type="button" class="priority-button" id="low-desktop" onclick="togglePriority('low-desktop')">
                                        Low
                                        <img src="/assets/img/prio-low.svg" alt="Low Image">
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
        
        
                            <div class="add-task-title assigned-mobile">
                                <span>Assigned to</span>
                                <div class="assigned-input">
                                    <input onclick="openUserList('user-select-mobile', 'selected-user-mobile')" class="input-task-select" type="text"
                                        placeholder="Select contacts to assign">
                                    <img onclick="openUserList('user-select-mobile')" id="input-icon" class="input-arrow"
                                        src="./assets/img/arrow_drop_down_1.svg" alt="">
                                </div>
                                <div id="user-select-mobile" class="d-none"></div>
                                <div id="selected-user-mobile"></div>
                            </div>
        
                            
                            <div>
                                <span class="subtask-container">Subtask</span>
                                <div class="input-sub-field">
                                    <input class="input-subtask" id="subtask" />
                                    <div onclick="addTodo();" id="addButton"><span class="suffix"><i><svg width="12" height="12"
                                        viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Capa 1">
                                            <g id="Group 11">
                                                <path id="Vector 13" d="M11 1V21" stroke="black" stroke-width="2"
                                                    stroke-linecap="round" />
                                                <path id="Vector 14" d="M21 11L1.00048 11.138" stroke="black"
                                                    stroke-width="2" stroke-linecap="round" />
                                            </g>
                                        </g>
                                    </svg></i></span></div>
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
                            <button href="#" class="button-clear">Clear <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_71720_5848" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4"
                                        width="24" height="24">
                                        <rect x="4" y="4" width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_71720_5848)">
                                        <path
                                            d="M15.9998 17.4L11.0998 22.3C10.9165 22.4834 10.6831 22.575 10.3998 22.575C10.1165 22.575 9.88314 22.4834 9.6998 22.3C9.51647 22.1167 9.4248 21.8834 9.4248 21.6C9.4248 21.3167 9.51647 21.0834 9.6998 20.9L14.5998 16L9.6998 11.1C9.51647 10.9167 9.4248 10.6834 9.4248 10.4C9.4248 10.1167 9.51647 9.88338 9.6998 9.70005C9.88314 9.51672 10.1165 9.42505 10.3998 9.42505C10.6831 9.42505 10.9165 9.51672 11.0998 9.70005L15.9998 14.6L20.8998 9.70005C21.0831 9.51672 21.3165 9.42505 21.5998 9.42505C21.8831 9.42505 22.1165 9.51672 22.2998 9.70005C22.4831 9.88338 22.5748 10.1167 22.5748 10.4C22.5748 10.6834 22.4831 10.9167 22.2998 11.1L17.3998 16L22.2998 20.9C22.4831 21.0834 22.5748 21.3167 22.5748 21.6C22.5748 21.8834 22.4831 22.1167 22.2998 22.3C22.1165 22.4834 21.8831 22.575 21.5998 22.575C21.3165 22.575 21.0831 22.4834 20.8998 22.3L15.9998 17.4Z"
                                            fill="white" />
                                    </g>
                                </svg>
                            </button>
                            <button class="button-create">Create Task <img src="/assets/img/check.svg" alt=""></button>
                        </div>
                    </div>
                </form>
            
        </div>
  `;
}


function closeaddTaskPopup() {
  document.getElementById("add-task-popup-container").classList.add("d-none");
}

// Update the showPopup function to include an onchange event listener for the checkboxes
function showPopup(taskId) {
    let task = findTaskById(taskId);
    let urgentSymbolHTML = task.priority.urgent
        ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">`
        : "";
    let mediumSymbolHTML = task.priority.medium
        ? `<img src="/assets/img/prio-medium.svg" alt="Medium">`
        : "";
    let lowSymbolHTML = task.priority.low
        ? `<img src="/assets/img/prio-low.svg" alt="Low">`
        : "";

    // Benutzerinitialen und Hintergrundfarben anzeigen
    let userNamesHTML = task.userSelect.map(user => `
        <div class="user-details">
            <div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
            <div class="user-full-name">${user.fname} ${user.lname}</div>
        </div>`).join('');

    // Subtasks anzeigen
    let subtasksHTML = task.subtask ? task.subtask.map(subtask => `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="subtask_${subtask.name}" ${subtask.status ? 'checked' : ''} onchange="updateSubtaskStatus(${taskId}, '${subtask.name}', this.checked)">
            <label class="form-check-label" for="subtask_${subtask.name}">${subtask.name}</label>
        </div>
    `).join('') : '';

    document.getElementById("incomePopup").classList.remove("d-none");
    document.getElementById("incomePopup").innerHTML = `
        <div class="complete_board_popup" onclick="doNotClose(event)">
            <div onclick="doNotClose(event)">
            <div class="board_popup">
                <div class="flex_container_head">
                    <div class="task_popup_${task.category}">
                        <p>${task.category}</p>
                    </div>
                    <div class="close_icon_box">
                        <img class="img_popup" style="cursor: pointer;" onclick="closeIncomePopup()"
                            src="./assets/img/close_icon.svg" alt="close Button">
                    </div>
                </div>
                <div class="header_popup">
                    <h2>${task.titel}</h2>
                </div>
                <div class="p-element">
                    <p>${task.description}</p>
                </div>
                <div class="due_date_popup">
                    <p style="color: #42526E;">Due Date:</p>
                    <p id="variable_date">${task.dueDate}</p>
                </div>
                <div class="priority_popup">
                    <p style="color: #42526E;">Priority:</p>
                    ${urgentSymbolHTML}
                    ${mediumSymbolHTML}
                    ${lowSymbolHTML}
                </div>
                <div class="assigned-popup">
        <p style="color: #42526E;">Assigned to:</p>
        <div class="user-container-popup">
            ${userNamesHTML} <!-- Hier werden Initialen und Vor- und Nachnamen angezeigt -->
        </div>
        <p class="subtask_container" style="color: #42526E;">Subtasks</p>
        <div class="subtask-list">
            ${subtasksHTML} <!-- Hier werden die Subtasks mit Checkboxen angezeigt -->
        </div>
        <div class="edit-delete" id="edit">
            <a class="button-delete-edit" href="#" onclick="deleteTask(${task.id})">
                <img class="edit-delete-img" src="/assets/img/delete_icon.svg"
                    alt="Bild plus Button" />
                <div class="text-container">Delete</div>
            </a>
            <a class="button-delete-edit" href="#" onclick="saveAddedContact()">
                <img class="edit-delete-img" src="/assets/img/edit_icon.svg"
                    alt="Bild plus Button" />
                <div class="text-container">Edit</div>
            </a>
        </div>
    </div>
            </div>
        </div>
    `;
}


function updateSubtaskStatus(taskId, subtaskName, status) {
    // Find the task by ID
    let task = findTaskById(taskId);
    if (task) {
        // Find the subtask by name
        let subtask = task.subtask.find(sub => sub.name === subtaskName);
        if (subtask) {
            // Update the subtask status
            subtask.status = status;

            // Update the task progress based on the subtasks
            let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
            let totalSubtasks = task.subtask ? task.subtask.length : 0;
            let progressPercentage = Math.round((completedSubtasks / totalSubtasks) * 100);
            task.progress = progressPercentage;

            // Save the updated task object to local storage
            saveTasksToLocalStorage(allTasks);

            // Update the popup display to reflect the changes
            showPopup(taskId);

            // Update the progress bar in the showAllTasks function
            showAllTasks(allTasks);
        }
    }
}

  


function findTaskById(taskId) {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id === taskId) {
      return allTasks[i];
    }
  }

  return null;
}

function closeIncomePopup() {
  document.getElementById("incomePopup").classList.add("d-none");
}





function showAllTasks(allTasks) {
  let todo_container = allTasks.filter(t => t['progressfield'] == 'todo_container');
  document.getElementById('todo_container').innerHTML = '';

  if (todo_container.length === 0) {
    document.getElementById('todo_container').innerHTML = `
      <div>
        <div class="no-tasks desktop-no-tasks">
          <span>No tasks to do</span>
        </div>
      </div>`;
  } else {
    for (let i = 0; i < todo_container.length; i++) {
      let task = todo_container[i];
      let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
      let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
      let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';

      let userInitialsHTML = task.userSelect.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');

      let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
      let totalSubtasks = task.subtask ? task.subtask.length : 0;

      // Calculate the progress percentage
      let progressPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

      document.getElementById('todo_container').innerHTML += `
        <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
          <div class="card">
            <div class="card-category-${task.category}">${task.category}</div>
            <div class="card-headline">${task.titel}</div>
            <div class="card-discription">${task.description}</div>
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
  }

    let inprogress_container = allTasks.filter(t => t['progressfield'] == 'inprogress_container');
document.getElementById('inprogress_container').innerHTML = '';
for (let i = 0; i < inprogress_container.length; i++) {
    let task = inprogress_container[i];
    let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
    let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
    let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';

    let userInitialsHTML = task.userSelect.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');

    let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
    let totalSubtasks = task.subtask ? task.subtask.length : 0;

    let progressPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

    document.getElementById('inprogress_container').innerHTML += `
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">


    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-discription">${task.description}</div>
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

let await_feedback_container = allTasks.filter(t => t['progressfield'] == 'await_feedback_container');
document.getElementById('await_feedback_container').innerHTML = '';
for (let i = 0; i < await_feedback_container.length; i++) {
    let task = await_feedback_container[i];
    let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
    let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
    let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';

    let userInitialsHTML = task.userSelect.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');

    let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
    let totalSubtasks = task.subtask ? task.subtask.length : 0;

    let progressPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

    document.getElementById('await_feedback_container').innerHTML += `
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">


    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-discription">${task.description}</div>
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

let done_container = allTasks.filter(t => t['progressfield'] == 'done_container');
document.getElementById('done_container').innerHTML = '';
for (let i = 0; i < done_container.length; i++) {
    let task = done_container[i];
    let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
    let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
    let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';

    let userInitialsHTML = task.userSelect.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');

    let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
    let totalSubtasks = task.subtask ? task.subtask.length : 0;

    let progressPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

    document.getElementById('done_container').innerHTML += `
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">


    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-discription">${task.description}</div>
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
}





function startDragging(index) {
  currentDraggedElement = index;
}

function allowDrop(ev) {
  ev.preventDefault();
}

// alte version ohne speichern im local storage

// function moveTo(progressfield) {
//     allTasks[currentDraggedElement - 1]['progressfield'] = progressfield; // Index um 1 reduzieren, da IDs bei 1 beginnen
//     showAllTasks(allTasks);
// }

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

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

// function moveTo(progressfield) {
//     allTasks[currentDraggedElement]['progressfield'] = progressfield;
//     // Speichern des aktualisierten Arrays im Local Storage
//     saveTasksToLocalStorage(allTasks);
//     // Neu laden der Seite, um den aktualisierten Task anzuzeigen
//     location.reload();
// }


function findTask() {
  let searchInput = document.getElementById('search').value.toLowerCase();
  let filteredTasks = allTasks.filter(task =>
      task.titel.toLowerCase().includes(searchInput) ||
      task.description.toLowerCase().includes(searchInput) ||
      task.category.toLowerCase().includes(searchInput)
  );

  showAllTasks(filteredTasks);
}

function deleteTask(taskId) {
  let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  
  // Finden des Index des Tasks im Array anhand der ID
  let taskIndex = allTasks.findIndex(task => task.id === taskId);
  
  if (taskIndex !== -1) {
      // Löschen des Tasks aus dem Array
      allTasks.splice(taskIndex, 1);
      
      // Aktualisieren des Local Storage
      saveTasksToLocalStorage(allTasks);
      
      // Aktualisieren der Anzeige
      loadAllTasks();
      
      // Schließen des Popups
      closePopup();
  } else {
      console.log("Task not found");
  }
}



function doNotClose(event) {
  event.stopPropagation();
}

