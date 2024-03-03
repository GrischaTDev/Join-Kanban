loggedInUser = [];

let currentDraggedElement;

async function initBoard() {
    await includeHTML();
  loadAllTasks();
  activeMenu();
  load();
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




function openAddNewTaskPopup(userListId, selectedUserId) {
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

                <div class="add-task-title">
                    <span>Assigned to</span>
                    <div class="assigned-input">
                        <input onclick="openUserList('${userListId}', '${selectedUserId}')" class="input-task-select" type="text"
                            placeholder="Select contacts to assign">
                        <img onclick="openUserList('${userListId}', '${selectedUserId}')" id="input-icon" class="input-arrow"
                            src="./assets/img/arrow_drop_down_1.svg" alt="">
                    </div>
                    <div id="user-select" class="d-none"></div>
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
                        <button type="button" class="priority-button" id="urgent" onclick="togglePriority('urgent')">
                            Urgent
                            <svg id="svg-urgent" xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none"><g fill="#FF3D00" clip-path="url(#a)"><path d="M19.571 14.755c-.234 0-.463-.075-.652-.214l-8.252-6.083-8.252 6.083a1.098 1.098 0 0 1-1.304-1.763l8.904-6.57a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.095 1.095 0 0 1-.652 1.977Z"/><path d="M19.571 9.006c-.234 0-.463-.075-.652-.214L10.667 2.71 2.415 8.792A1.098 1.098 0 0 1 1.111 7.03L10.015.46a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.096 1.096 0 0 1-.652 1.977Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.667.245h20v14.51h-20z"/></clipPath></defs></svg>
                        </button>
                        <button type="button" class="priority-button active-medium" id="medium" onclick="togglePriority('medium')">
                            Medium
                            <svg id="svg-medium" xmlns="http://www.w3.org/2000/svg" width="18" height="8" fill="none"><g fill="#FFA800" clip-path="url(#a)"><path d="M16.569 7.167H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.099.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275ZM16.569 2.71H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.1.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.5.833h17v6.333H.5z"/></clipPath></defs></svg>
                        </button>
                        <button type="button" class="priority-button" id="low" onclick="togglePriority('low')">
                            Low
                            <svg id="svg-low" xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none"><g fill="#7AE229"><path d="M10.334 9.006c-.235 0-.463-.075-.652-.214L.779 2.222A1.096 1.096 0 1 1 2.083.46l8.251 6.082L18.585.46a1.097 1.097 0 0 1 1.304 1.763l-8.903 6.57c-.189.138-.417.213-.652.213Z"/><path d="M10.334 14.754c-.235 0-.463-.074-.652-.213L.779 7.97a1.096 1.096 0 1 1 1.304-1.763l8.251 6.083 8.251-6.083a1.098 1.098 0 0 1 1.304 1.763l-8.903 6.57c-.189.139-.417.214-.652.213Z"/></g></svg>
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
        <input class="form-check-input form-check-input-mobile" type="checkbox" id="subtask_${subtask.name}" ${
              subtask.status ? 'checked' : ''
            } onchange="updateSubtaskStatus(${taskId}, '${subtask.name}', this.checked)">
        <label class="form-check-label" for="subtask_${subtask.name}">${subtask.name}</label>
    </div>
  `
          )
          .join("")
      : "";
  
    document.getElementById("incomePopup").classList.remove("d-none");
    document.getElementById("incomePopup").innerHTML = `
          <div class="complete_board_popup" onclick="doNotClose(event)">
              <div class="popup-card", onclick="doNotClose(event)">
              <div class="board_popup board_popup_mobile">
                  <div class="flex_container_head">
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
  
  

function closeIncomePopup() {
    document.getElementById("incomePopup").classList.add("d-none");
  }
  








//   function editPopup(taskId) {
//     // Verberge das showPopup
//     document.getElementById("incomePopup").classList.add("d-none");

//     // Zeige das editPopup
//     document.getElementById('edit_popup').classList.remove('d-none');
//     document.getElementById('edit_popup').innerHTML = '';

//     // Abrufen des Tasks aus dem Local Storage
//     let tasks = JSON.parse(localStorage.getItem('allTasks'));
//     let taskToEdit = tasks.find(task => task.id === taskId);

//     // Füge das Formular für die Bearbeitung hinzu und setze die Werte der Eingabefelder
//     document.getElementById('edit_popup').innerHTML += `
//         <form class="popup-card" onsubmit="saveEditedTask(taskId)">
//             <div class="task-edit-form" >
//                 <div class="add-task-title">
//                     <span>Title<span class="red-asterisk"></span></span>
//                     <input type="text" required placeholder="Enter a title" id="titel">
//                 </div>

//                 <div class="add-task-title">
//                     <span>Description</span>
//                     <textarea type="text" required minlength="5" placeholder="Enter a description" id="description"></textarea>
//                 </div>
//                 <div class="add-task-title prio-mobile">
//                     <span>Prio</span>
//                     <div class="priority-buttons">
//                         <button type="button" class="priority-button" id="urgent" onclick="togglePriority('urgent')">
//                             Urgent
//                             <img src="/assets/img/prio-urgent.svg" alt="Urgent Image">
//                         </button>
//                         <button type="button" class="priority-button" id="medium" onclick="togglePriority('medium')">
//                             Medium
//                             <img src="/assets/img/prio-medium.svg" alt="Medium Image">
//                         </button>
//                         <button type="button" class="priority-button" id="low" onclick="togglePriority('low')">
//                             Low
//                             <img src="/assets/img/prio-low.svg" alt="Low Image">
//                         </button>  
//                     </div>
//                 </div>
            
//                 <div class="add-task-title">
//                     <span>Due a date<span class="red-asterisk"></span></span>
//                     <input class="input-task-date" type="date" id="dueDate" required>
//                 </div>

//                 <div class="add-task-title">
//                     <span>Category<span class="red-asterisk"></span></span>
//                     <select class="input-task-select" id="category" aria-placeholder="Select task category">
//                         <option value="" disabled selected>Select a Category</option>
//                         <option value="technical-task">Technical Task</option>
//                         <option value="user-story">User Story</option>
//                     </select>
//                 </div>
//                 <div class="add-task-title assigned-mobile">
//                     <span>Assigned to</span>
//                     <div class="assigned-input">
//                         <input onclick="openUserList('user-select-mobile', 'selected-user-mobile')" class="input-task-select" type="text" placeholder="Select contacts to assign">
//                         <img onclick="openUserList('user-select-mobile')" id="input-icon" class="input-arrow" src="./assets/img/arrow_drop_down_1.svg" alt="">
//                     </div>
//                     <div id="user-select-mobile" class="d-none"></div>
//                     <div id="selected-user-mobile"></div>
//                 </div>
//                 <div>
//                     <span class="subtask-container">Subtask</span>
//                     <div class="input-sub-field">
//                         <input class="input-subtask" id="subtask" />
//                         <div onclick="addTodo();" id="addButton"><span class="suffix"><i><svg width="12" height="12" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Capa 1"><g id="Group 11"><path id="Vector 13" d="M11 1V21" stroke="black" stroke-width="2" stroke-linecap="round" /><path id="Vector 14" d="M21 11L1.00048 11.138" stroke="black" stroke-width="2" stroke-linecap="round" /></g></g></svg></i></span></div>
//                     </div>
//                     <ul id="mylist"></ul>
//                 </div>
//                 <div class="ok-button">
//                     <button id="saveEditButton" class="button-create" onclick="SaveEditedTask(taskId)">OK<img src="/assets/img/check.svg" alt=""></button>
//                 </div>
//             </div>
//         </form>
//     `;

//     // Setze die Werte der Eingabefelder basierend auf dem abgerufenen Task
//     document.getElementById('titel').value = taskToEdit.titel;
//     document.getElementById('description').value = taskToEdit.description;
//     document.getElementById('dueDate').value = taskToEdit.dueDate;
//     document.getElementById('category').value = taskToEdit.category;
//     // Weitere Felder entsprechend setzen...

//     // Setze die Prioritätsschaltflächen entsprechend
//     if (taskToEdit.priority.urgent) {
//         document.getElementById('urgent').classList.add('active');
//     } else if (taskToEdit.priority.medium) {
//         document.getElementById('medium').classList.add('active');
//     } else {
//         document.getElementById('low').classList.add('active');
//     }
// }



// function fillPopupFields(taskId) {
//     let task = findTaskById(taskId);

//     // Fülle die Eingabefelder mit den Daten der Aufgabe
//     document.getElementById("titel").value = task.titel;
//     document.getElementById("description").value = task.description;
//     document.getElementById("dueDate").value = task.dueDate;
//     document.getElementById("category").value = task.category;

//     // Fülle die Prioritätssymbole entsprechend der Aufgabe
//     document.getElementById("urgent").classList.toggle("active", task.priority.urgent);
//     document.getElementById("medium").classList.toggle("active", task.priority.medium);
//     document.getElementById("low").classList.toggle("active", task.priority.low);

//     // Fülle weitere Daten der Aufgabe ein, falls vorhanden
// }




// function SaveEditedTask(taskId) {
//     // Abrufen des Tasks aus dem Local Storage
//     let tasks = JSON.parse(localStorage.getItem('allTasks'));
//     let taskIndex = tasks.findIndex(task => task.id === taskId);

//         // Aktualisiere die Werte des Tasks basierend auf den Eingabefeldern
//         tasks[taskIndex].titel = document.getElementById('titel').value;
//         tasks[taskIndex].description = document.getElementById('description').value;
//         tasks[taskIndex].dueDate = document.getElementById('dueDate').value;
//         tasks[taskIndex].category = document.getElementById('category').value;

//         localStorage.setItem('allTasks', JSON.stringify(tasks));

//         // Optional: Zeige eine Erfolgsmeldung oder führe andere Aktionen aus
//         console.log('Task erfolgreich bearbeitet und gespeichert.');
   
// }

function editPopup(taskId) {
    // Verberge das showPopup
    document.getElementById("incomePopup").classList.add("d-none");

    // Zeige das editPopup
    document.getElementById('edit_popup').classList.remove('d-none');
    document.getElementById('edit_popup').innerHTML = '';

    // Abrufen des Tasks aus dem Local Storage
    let tasks = JSON.parse(localStorage.getItem('allTasks'));
    let taskToEdit = tasks.find(task => task.id === taskId);

    // Füge das Formular für die Bearbeitung hinzu und setze die Werte der Eingabefelder
    document.getElementById('edit_popup').innerHTML += `
        <form class="popup-card" onsubmit="SaveEditedTask(${taskId})">
            <div class="task-edit-form" >
                <div class="add-task-title">
                    <span>Title<span class="red-asterisk"></span></span>
                    <input type="text" required placeholder="Enter a title" id="titel">
                </div>

                <div class="add-task-title">
                    <span>Description</span>
                    <textarea type="text" required minlength="5" placeholder="Enter a description" id="description"></textarea>
                </div>
                <div class="add-task-title prio-mobile">
                    <span>Prio</span>
                    <div class="priority-buttons">
                        <button type="button" class="priority-button" id="urgent" onclick="togglePriority('urgent')">
                            Urgent
                            <img src="/assets/img/prio-urgent.svg" alt="Urgent Image">
                        </button>
                        <button type="button" class="priority-button" id="medium" onclick="togglePriority('medium')">
                            Medium
                            <img src="/assets/img/prio-medium.svg" alt="Medium Image">
                        </button>
                        <button type="button" class="priority-button" id="low" onclick="togglePriority('low')">
                            Low
                            <img src="/assets/img/prio-low.svg" alt="Low Image">
                        </button>  
                    </div>
                </div>
            
                <div class="add-task-title">
                    <span>Due a date<span class="red-asterisk"></span></span>
                    <input class="input-task-date" type="date" id="dueDate" required>
                </div>

                <div class="add-task-title">
                    <span>Category<span class="red-asterisk"></span></span>
                    <select class="input-task-select" id="category" aria-placeholder="Select task category">
                        <option value="" disabled selected>Select a Category</option>
                        <option value="technical-task">Technical Task</option>
                        <option value="user-story">User Story</option>
                    </select>
                </div>
                <div class="add-task-title assigned-mobile">
                    <span>Assigned to</span>
                    <div class="assigned-input">
                        <input onclick="openUserList('user-select-mobile', 'selected-user-mobile')" class="input-task-select" type="text" placeholder="Select contacts to assign">
                        <img onclick="openUserList('user-select-mobile')" id="input-icon" class="input-arrow" src="./assets/img/arrow_drop_down_1.svg" alt="">
                    </div>
                    <div id="user-select-mobile" class="d-none"></div>
                    <div id="selected-user-mobile"></div>
                </div>
                <div>
                    <span class="subtask-container">Subtask</span>
                    <div class="input-sub-field">
                        <input class="input-subtask" id="subtask" />
                        <div onclick="addTodo();" id="addButton"><span class="suffix"><i><svg width="12" height="12" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Capa 1"><g id="Group 11"><path id="Vector 13" d="M11 1V21" stroke="black" stroke-width="2" stroke-linecap="round" /><path id="Vector 14" d="M21 11L1.00048 11.138" stroke="black" stroke-width="2" stroke-linecap="round" /></g></g></svg></i></span></div>
                    </div>
                    <ul id="mylist"></ul>
                </div>
                <div class="ok-button">
                    <button id="saveEditButton" class="button-create" onclick="SaveEditedTask(${taskId})">OK<img src="/assets/img/check.svg" alt=""></button>
                </div>
            </div>
        </form>
    `;

    // Setze die Werte der Eingabefelder basierend auf dem abgerufenen Task
    document.getElementById('titel').value = taskToEdit.titel;
    document.getElementById('description').value = taskToEdit.description;
    document.getElementById('dueDate').value = taskToEdit.dueDate;
    document.getElementById('category').value = taskToEdit.category;
    // Weitere Felder entsprechend setzen...

    // Setze die Prioritätsschaltflächen entsprechend
    if (taskToEdit.priority.urgent) {
        document.getElementById('urgent').classList.add('active');
    } else if (taskToEdit.priority.medium) {
        document.getElementById('medium').classList.add('active');
    } else {
        document.getElementById('low').classList.add('active');
    }

    // Anzeigen der ausgewählten Benutzer
    taskToEdit.userList.forEach(user => {
        document.getElementById('selected-user-mobile').innerHTML += `
            <div class="user-details">
                <div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
                <div class="user-full-name user-full-name-mobile">${user.fname} ${user.lname}</div>
            </div>
        `;
    });

    // Anzeigen der Subtasks
    taskToEdit.subtask.forEach(subtask => {
        document.getElementById('mylist').innerHTML += `
            <li>${subtask.name}</li>
        `;
    });
}


function SaveEditedTask(taskId) {
    // Abrufen des Tasks aus dem Local Storage
    let tasks = JSON.parse(localStorage.getItem('allTasks'));

    // Finden des Index des bearbeiteten Tasks im Array
    let taskIndex = tasks.findIndex(task => task.id === taskId);
        // Aktualisieren der Werte des bearbeiteten Tasks basierend auf den Eingabefeldern
        tasks[taskIndex].titel = document.getElementById('titel').value;
        tasks[taskIndex].description = document.getElementById('description').value;
        tasks[taskIndex].dueDate = document.getElementById('dueDate').value;
        tasks[taskIndex].category = document.getElementById('category').value;
        // Weitere Felder entsprechend aktualisieren...

        // Aktualisieren der Priorität des bearbeiteten Tasks basierend auf den Schaltflächen
        let priorityButtons = document.querySelectorAll('.priority-button');
        tasks[taskIndex].priority.urgent = priorityButtons[0].classList.contains('active');
        tasks[taskIndex].priority.medium = priorityButtons[1].classList.contains('active');
        tasks[taskIndex].priority.low = priorityButtons[2].classList.contains('active');

        // Speichern der aktualisierten Tasks im Local Storage
        localStorage.setItem('allTasks', JSON.stringify(tasks));

        // Optional: Zeige eine Erfolgsmeldung oder führe andere Aktionen aus
        console.log('Bearbeiteter Task erfolgreich gespeichert.');
        closeEditPopup(taskId);
 
}



function closeEditPopup() {
    // Schließe das editPopup
    document.getElementById("edit_popup").classList.add("d-none");
    loadAllTasks();
    showAllTasks(allTasks);
}



function updateSubtaskStatus(taskId, subtaskName, status) {
  // Find the task by ID
  let task = findTaskById(taskId);
  if (task) {
      let subtask = task.subtask.find(sub => sub.name === subtaskName);
      if (subtask && subtask.status !== status) { 
          // Update the subtask status
          subtask.status = status;
          let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
          let totalSubtasks = task.subtask ? task.subtask.length : 0;
          let progressPercentage = Math.round((completedSubtasks / totalSubtasks) * 100);
          task.progress = progressPercentage;

            // Save the updated task object to local storage
            saveTasksToLocalStorage(allTasks);
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

      let userInitialsHTML = task.userList.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');

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

    let userInitialsHTML = task.userList.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');

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

    let userInitialsHTML = task.userList.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');

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

    let userInitialsHTML = task.userList.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');

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


