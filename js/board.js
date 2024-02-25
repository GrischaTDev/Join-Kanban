loggedInUser = [];

let currentDraggedElement;

document.addEventListener('DOMContentLoaded', function() {
    // Hier kannst du die Funktionen aufrufen, die nach dem Laden des DOM ausgeführt werden sollen
    loadAllTasks(); // Aufruf der Funktion zum Laden der Aufgaben aus dem Local Storage
});

async function initBoard() {
    // Überprüfen, ob der Local Storage leer ist
    if (!localStorage.getItem('allTasks')) {
        // Wenn der Local Storage leer ist, speichern Sie die Aufgaben aus dem Array
        saveTasksToLocalStorage(allTasks);
    } else {
        // Wenn der Local Storage nicht leer ist, laden Sie die Aufgaben aus dem Local Storage
        allTasks = JSON.parse(localStorage.getItem('allTasks'));
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

// Diese Funktion soll das popup (mit den Parametern) sein, das die detaillierten Informationen von dem selected Task hat.
// Funktioniert auch, muss aber noch angepasst werden

function showPopup(taskId) {
    let task = findTaskById(taskId);
    let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
    let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
    let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';

    // Benutzerinitialen und Hintergrundfarben anzeigen
    let userNamesHTML = task.userSelect.map(user => `
        <div class="user-details">
            <div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
            <div class="user-full-name">${user.fname} ${user.lname}</div>
        </div>`).join('');

    document.getElementById("incomePopup").classList.remove("d-none");
    document.getElementById('incomePopup').innerHTML = '';
    document.getElementById('incomePopup').innerHTML = `
        <div class="complete_board_popup" onclick="doNotClose(event)">
            <div class="complete_board_popup ${task.category}" onclick="doNotClose(event)">
            <div class="board_popup">
                <div class="flex_container_head">
                    <div class="task_popup">
                        <p>${task.category}</p>
                    </div>
                    <div class="close_icon_box">
                        <img class="img_popup" style="cursor: pointer;" onclick="closePopup()"
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
    <p style="color: #42526E;">Assigned To:</p>
    <div class="user-container-popup">
        ${userNamesHTML} <!-- Hier werden Initialen und Vor- und Nachnamen angezeigt -->
    </div>
    <p class="subtask_container" style="color: #42526E;">Subtasks</p>
    ${task.subtask ? task.subtask.map(subtask => `
        <div class="user_popup_item" onclick="toggleSubtask(this)">
            <input type="checkbox" class="subtask_checkbox" ${subtask.completed ? 'checked' : ''}>
            <div>${subtask.todo}</div>
        </div>
    `).join('') : ''}
    <div class="edit-delete" id="edit">
        <a class="button-delete-edit" href="#" onclick="deleteTask()">
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






function findTaskById(taskId) {
    // Durchlaufe die Liste der Tasks und suche nach der Task-ID
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id === taskId) {
            // Wenn die Task-ID gefunden wurde, gib den entsprechenden Task zurück
            return allTasks[i];
        }
    }
    // Wenn die Task-ID nicht gefunden wurde, gib null zurück oder handle den Fall entsprechend
    return null;
}







function closePopup() {
  document.getElementById("incomePopup").classList.add("d-none");
}

// function loadTasksFromLocalStorage() {
//     let tasksString = localStorage.getItem("allTask");
//     if (tasksString) {
//         let allTasks = JSON.parse(tasksString); // Laden der Aufgaben aus dem Local Storage
//         showAllTasks(allTasks); // Anzeigen der geladenen Aufgaben
//     }
// }

//dragAndDrop//

// Das ist die erste showAllTasks Version (mit den initials user) funktioniert zwar, hat aber nicht alle neuerungen

// function showAllTasks(allTasks) {
//     console.log('Es wird jetzt versucht, die Tasks anzuzeigen');
//     document.getElementById('todo_container').innerHTML = '';
//     console.log('Es wird jetzt versucht, die Tasks mit forschleife zu zeigen');
//     for (let i = 0; i < allTasks.length; i++) {
//         let task = allTasks[i];
//         let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
//         let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
//         let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';

//         document.getElementById('todo_container').innerHTML += `
//             <a href="#" class="card-section desktop-card-section" onclick="showPopup()">
//                 <div class="card">
//                     <div class="card-category-${task.category}">${task.category}</div>
//                     <div class="card-headline">${task.titel}</div>
//                     <div class="card-discription">${task.description}</div>
//                     <div class="progress-container">
//                         <div class="progress-bar">
//                             <div class="progress-fill-half"></div>
//                         </div>
//                         <div class="progress-text">1/2 Subtasks</div>
//                     </div>
//                     <div class="user-priority-container">
//                         <div class="user-container">
//                             <div class="initials-circle" style="background-color: rgb(252, 113, 255);">MP</div>
//                             <div class="initials-circle" style="background-color: rgb(113, 255, 134);">HS</div>
//                             <div class="initials-circle" style="background-color: rgb(120, 113, 255);">UW</div>
//                         </div>
//                         <div class="priority-symbols">
//                             ${urgentSymbolHTML}
//                             ${mediumSymbolHTML}
//                             ${lowSymbolHTML}
//                         </div>
//                     </div>
//                 </div>
//             </a>
//         `;
//         // todoContainer.insertAdjacentHTML('beforeend', taskHTML);
//     }
// }




// Das ist die zweite showallTasks version (Die hat schon fast alle neuerungen, aber kein drag and drop)

// function showAllTasks(allTasks) {
    
//     document.getElementById('todo_container').innerHTML = '';
//     for (let i = 0; i < allTasks.length; i++) {
//         let task = allTasks[i];
//         let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
//         let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
//         let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';

//         let userInitialsHTML = selectedUser.map(user => `<div class="initials-circle" style="background-color: ${user.color};">${nameInitialLetters(user)}</div>`).join('');

//         document.getElementById('todo_container').innerHTML += `
//             <a href="#" class="card-section desktop-card-section" onclick="showPopup()">
//                 <div class="card">
//                     <div class="card-category-${task.category}">${task.category}</div>
//                     <div class="card-headline">${task.titel}</div>
//                     <div class="card-discription">${task.description}</div>
//                     <div class="progress-container">
//                         <div class="progress-bar">
//                             <div class="progress-fill-half"></div>
//                         </div>
//                         <div class="progress-text">1/2 Subtasks</div>
//                     </div>
//                     <div class="user-priority-container">
//                         <div class="user-container">
//                             ${userInitialsHTML}
//                         </div>
//                         <div class="priority-symbols">
//                             ${urgentSymbolHTML}
//                             ${mediumSymbolHTML}
//                             ${lowSymbolHTML}
//                         </div>
//                     </div>
//                 </div>
//             </a>
//         `;
//         // todoContainer.insertAdjacentHTML('beforeend', taskHTML);
//     }
// }

// Das ist die neueste Version mit Drag and Drop (hat aber noch ein Problem, dass die Tasks aus dem array nicht problemlos angezeigt werden..)



function showAllTasks(allTasks) {
    let todo_container = allTasks.filter(t => t['progressfield'] == 'todo_container');
    document.getElementById('todo_container').innerHTML = '';
  
    if (todo_container.length === 0) {
      document.getElementById('todo_container').innerHTML = `
        <div>
          <div class="no-tasks desktop-no-tasks">
            <span>No tasks To do</span>
          </div>
        </div>`;
    } else {
      for (let i = 0; i < todo_container.length; i++) {
        let task = todo_container[i];
        let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
        let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
        let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';
  
        let userInitialsHTML = task.userSelect.map(user => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join('');
  
        let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.completed).length : 0;
        let totalSubtasks = task.subtask ? task.subtask.length : 0;
  
        document.getElementById('todo_container').innerHTML += `
          <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
            <div class="card">
              <div class="card-category-${task.category}">${task.category}</div>
              <div class="card-headline">${task.titel}</div>
              <div class="card-discription">${task.description}</div>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill-half"></div>
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

      let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.completed).length : 0;
      let totalSubtasks = task.subtask ? task.subtask.length : 0;

      document.getElementById('inprogress_container').innerHTML += `
      <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">


              <div class="card">
                  <div class="card-category-${task.category}">${task.category}</div>
                  <div class="card-headline">${task.titel}</div>
                  <div class="card-discription">${task.description}</div>
                  <div class="progress-container">
                      <div class="progress-bar">
                          <div class="progress-fill-half"></div>
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

      let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.completed).length : 0;
      let totalSubtasks = task.subtask ? task.subtask.length : 0;

      document.getElementById('await_feedback_container').innerHTML += `
      <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">


              <div class="card">
                  <div class="card-category-${task.category}">${task.category}</div>
                  <div class="card-headline">${task.titel}</div>
                  <div class="card-discription">${task.description}</div>
                  <div class="progress-container">
                      <div class="progress-bar">
                          <div class="progress-fill-half"></div>
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

      let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.completed).length : 0;
      let totalSubtasks = task.subtask ? task.subtask.length : 0;

      document.getElementById('done_container').innerHTML += `
      <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">


              <div class="card">
                  <div class="card-category-${task.category}">${task.category}</div>
                  <div class="card-headline">${task.titel}</div>
                  <div class="card-discription">${task.description}</div>
                  <div class="progress-container">
                      <div class="progress-bar">
                          <div class="progress-fill-half"></div>
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
    allTasks[taskIndex]['progressfield'] = progressfield;
    
    // Speichere den aktualisierten allTasks-Array im Local Storage
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    
    // Aktualisiere die Anzeige aller Aufgaben
    showAllTasks(allTasks);
}



function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


// function moveTo(progressfield) {
//     allTasks[currentDraggedElement]['progressfield'] = progressfield;
//     // Speichern des aktualisierten Arrays im Local Storage
//     saveTasksToLocalStorage(allTasks);
//     // Neu laden der Seite, um den aktualisierten Task anzuzeigen
//     location.reload();
// }

