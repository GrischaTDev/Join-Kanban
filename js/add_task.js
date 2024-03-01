let allTasks = [
  {
    "id": 1,
    "category": "user-story",
    "description": "Build start page with recipe recommendation",
    "dueDate": "2024-03-03",
    "priority": {
      "low": false,
      "medium": true,
      "urgent": false
    },
    "subtask": [
      { "name": "works", "status": false },
      { "name": "other stuff", "status": false }
    ],
    "titel": "Kochwelt Page & Recipe Recommender",
    "userSelect": [{
      "fname": "Klaus",
      "lname": "Kruse",
      "backgroundcolor": "#FF5733"
    },{
      "fname": "Berthold",
      "lname": "Wiebe",
      "backgroundcolor": "#33FF4F"
    }],
    "progressfield": "inprogress_container"
  },
  {
    "id": 2,
    "category": "technical-task",
    "description": "Create reusable HTML base templates",
    "dueDate": "2024-03-15",
    "priority": {
      "low": true,
      "medium": false,
      "urgent": false
    },
    "subtask": [
      { "name": "a lot to do", "status": false },
      { "name": "go ahead", "status": true }
    ],
    "titel": "HTML Base Template Creation",
    "userSelect": [{
      "fname": "Frank",
      "lname": "Bülling",
      "backgroundcolor": "#FFDA33"
    },{
      "fname": "Johanna",
      "lname": "Held",
      "backgroundcolor": "#3633FF"
    },{
      "fname": "Viktor",
      "lname": "Schmidt",
      "backgroundcolor": "#33FF74"
    }],
    "progressfield": "await_feedback_container"
  },
  {
    "id": 3,
    "category": "technical-task",
    "description": "Create contact form and imprint page...",
    "dueDate": "2024-03-01",
    "priority": {
      "low": false,
      "medium": true,
      "urgent": false
    },
    "subtask": [
      { "name": "meetings", "status": true },
      { "name": "work together", "status": true },
      { "name": "have fun", "status": false }
    ],
    "titel": "Contact Form & Imprint",
    "userSelect": [{
      "fname": "Stefan",
      "lname": "Dietz",
      "backgroundcolor": "#33FF7A"
    },{
      "fname": "Horst",
      "lname": "Schleifenbaum",
      "backgroundcolor": "#FFF033"
    },{
      "fname": "Detlef",
      "lname": "Sierts",
      "backgroundcolor": "#AFFF33"
    }],
    "progressfield": "await_feedback_container"
  },
  {
    "id": 4,
    "category": "user-story",
    "description": "Define CSS naming conventions and structure",
    "dueDate": "2024-03-10",
    "priority": {
      "low": false,
      "medium": false,
      "urgent": true
    },
    "subtask": [
      { "name": "meetings", "status": true },
      { "name": "work together", "status": true },
      { "name": "have fun", "status": true }
    ],
    "titel": "Define Architecture Planning",
    "userSelect": [{
      "fname": "Waldemar",
      "lname": "Günther",
      "backgroundcolor": "#B833FF"
    },{
      "fname": "Fabian",
      "lname": "Zacharias",
      "backgroundcolor": "#FF9F33"
    },{
      "fname": "Jessica",
      "lname": "Engels",
      "backgroundcolor": "#33A5FF"
    }],
    "progressfield": "done_container"
  }
];

let users = [];
let selectedUser = [];
let selectedUserList;

async function initAddTasks() {
  await includeHTML();
  activeMenu();
  load();
  loadUserProfile();
  loadUsers();
  loadAddTaskUser();
  setMinimumDateForToday('dueDate');
}
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

function openUserList(userList, selectedUserContainer) {
  selectedUserList = selectedUserContainer;
  let userSelect = document.getElementById(userList);
  let inputIcon = document.getElementById('input-icon');
  userSelect.innerHTML = '';
  if (userSelect.classList.contains('d-none')) {
    userSelect.classList.remove('d-none');
    inputIcon.src = './assets/img/arrow_drop_down_2.svg';
  } else {
    userSelect.classList.add('d-none');
    inputIcon.src = './assets/img/arrow_drop_down_1.svg';
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userColor = users[i]['color'];

    let initialLetters = nameInitialLettersAddTasks(user);
    
    userSelect.innerHTML += `
    <div id="currentUser${i}" class="userColumn ${isUSerSelected(i) ? 'user-select-active': ''}" onclick="toggleAddUser(${i})">
      <div class="user-name">
        <span class="letter-icon">${initialLetters}</span>
        <div>${user.name}</div>
      </div>
      <img id="user-checkbox${i}" src="${isUSerSelected(i) ? './assets/img/checkbox_active_white.svg' : './assets/img/checkbox.svg'}" alt="">
    </div>
    `;
    const color = document.getElementsByClassName('letter-icon');
    color[i].style.backgroundColor = `${userColor}`;
  }
  console.log('openUserlist wurde ausgeführt');
}

function isUSerSelected(i) {
  return selectedUser.some(su => su.id === i )
}

function nameInitialLettersAddTasks(user) {
  const fullNameSplitt = user.name.split(" ");
  const letters = fullNameSplitt.map(name => name[0]);
  const initialLetters = letters.join("");
  return initialLetters;
}


function renderUserList() {
  let selectedUserContainer = document.getElementById(selectedUserList);
  selectedUserContainer.innerHTML = '';

  selectedUser.forEach(user => {
    let initialLetters = nameInitialLettersAddTasks(user);
    const userColor = user['color'];

    selectedUserContainer.innerHTML += /* html */ `
      <div class="user-icon" style="background-color: ${userColor};">${initialLetters}</div>
    `;
  });
}


function toggleAddUser(i) {
  let userColumn = document.getElementById(`currentUser${i}`);
  let user = users[i];
  let selectedUSerIndex = selectedUser.findIndex(u => u.id === i);
  let checkBoxUser = document.getElementById(`user-checkbox${i}`);
  if (selectedUSerIndex === -1) {
    userColumn.classList.add('user-select-active');
    selectedUser.push(user)
    checkBoxUser.src = './assets/img/checkbox_active_white.svg';
  } else {
    userColumn.classList.remove('user-select-active');
    selectedUser.splice(selectedUSerIndex, 1);
    checkBoxUser.src = './assets/img/checkbox.svg';
  }
  renderUserList(i);
  save();
}


function save() {
  let saveUser = JSON.stringify(selectedUser);
  localStorage.setItem("selectedUser", saveUser);
}


function loadAddTaskUser() {
  let loadUser = localStorage.getItem("selectedUser");
  if (loadUser) {
    selectedUser = JSON.parse(loadUser);
  }
}
//////////////////////////////////////////////////////////////////////

/**
 * alles in Json und array speichern und umwandeln
 */

// function loadAllTasks() {
//   let allTasksAsString = localStorage.getItem("allTask");
//   if (allTasksAsString) {
//     allTasks = JSON.parse(allTasksAsString);
//   }
// }


//alte version
// function loadAllTasks() {
//   let allTasksAsString = localStorage.getItem("allTask");
//   if (allTasksAsString) {
//       let allTasks = JSON.parse(allTasksAsString);
//       showAllTasks(allTasks);
//   }
// }

// function loadAllTasks() {
//   let allTasksAsString = localStorage.getItem("allTasks");
//   if (allTasksAsString) {
//       let allTasks = JSON.parse(allTasksAsString);
//       showAllTasks(allTasks);

//       // Initialisieren der Zusammenfassung nach dem Laden aller Tasks
//       initSummary(allTasks);
//   }
// }

function loadAllTasks() {
  let allTasksAsString = localStorage.getItem("allTasks");
  if (allTasksAsString) {
      allTasks = JSON.parse(allTasksAsString); // Aktualisieren des allTasks-Arrays mit den Daten aus dem Local Storage
  }
}



// function addTask() {
//   let titel = document.getElementById('titel').value;
//   let description = document.getElementById('description').value;
//   let category = document.getElementById('category').value;
//   let dueDate = document.getElementById('dueDate').value;
//   let userSelect = selectedUser.map(user => user.name);
//   let subtask = document.getElementById('subtask').value;
//   let urgent = document.getElementById('urgent').classList.contains('active');
//   let medium = document.getElementById('medium').classList.contains('active');
//   let low = document.getElementById('low').classList.contains('active');

//   let task = {
//     titel: titel,
//     description: description,
//     dueDate: dueDate,
//     category: category,
//     userSelect: userSelect,
//     subtask: subtask,
//     priority: {
//       urgent: urgent,
//       medium: medium,
//       low: low,
//     },
//   };

//   allTasks.push(task);

//   let allTasksAsString = JSON.stringify(allTasks);
//   localStorage.setItem("allTask", allTasksAsString);
//   init();
// }

//alte version
// function saveTasksToLocalStorage(tasks) {
//   localStorage.setItem("allTask", JSON.stringify(tasks));
// }


function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("allTasks", JSON.stringify(tasks));
}
//alte Version
// function addTask() {
//   // Erfassen der Eingabedaten
//   let titel = document.getElementById('titel').value;
//   let description = document.getElementById('description').value;
//   let category = document.getElementById('category').value;
//   let userSelect = document.getElementById('user-select').innerText.trim();
//   let subtask = document.getElementById('subtask').value;
//   let urgent = document.getElementById('urgent').classList.contains('active');
//   let medium = document.getElementById('medium').classList.contains('active');
//   let low = document.getElementById('low').classList.contains('active');
//   let dueDate = document.getElementById('dueDate').value;

//   // Laden der vorhandenen Tasks aus dem Local Storage oder Initialisieren mit einem leeren Array
//   let allTasks = JSON.parse(localStorage.getItem("allTask")) || [];

//   // Erstellen des Task-Objekts mit progressfield: "todo_container" und Subtasks
//   let task = {
//     id: allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0, // Setzen der ID
//     titel: titel,
//     description: description,
//     dueDate: dueDate,
//     category: category,
//     userSelect: userSelect,
//     subtask: subtask,
//     priority: {
//       urgent: urgent,
//       medium: medium,
//       low: low,
//     },
//     progressfield: "todo_container", // Hinzufügen des progressfield: "todo"
//     subtasks: todos // Hinzufügen der Subtasks
//   };

//   // Hinzufügen des neuen Tasks zum Array
//   allTasks.push(task);

//   // Speichern des aktualisierten Arrays im Local Storage
//   saveTasksToLocalStorage(allTasks);

//   // Leeren der Eingabefelder
//   document.getElementById('titel').value = '';
//   document.getElementById('description').value = '';
//   document.getElementById('category').value = '';
//   document.getElementById('user-select').innerText = '';
//   document.getElementById('subtask').value = '';
//   document.getElementById('urgent').classList.remove('active');
//   document.getElementById('medium').classList.remove('active');
//   document.getElementById('low').classList.remove('active');
//   document.getElementById('dueDate').value = '';
//   todos = []; // Leeren der Subtasks

//   // Neu laden der Seite, um den aktualisierten Task anzuzeigen

//   location.reload();
  
// }

function addTask() {
  // Erfassen der Eingabedaten
  let titel = document.getElementById('titel').value;
  let description = document.getElementById('description').value;
  let category = document.getElementById('category').value;
  let urgent = document.getElementById('urgent').classList.contains('active');
  let medium = document.getElementById('medium').classList.contains('active');
  let low = document.getElementById('low').classList.contains('active');
  let dueDate = document.getElementById('dueDate').value;

  // Laden der vorhandenen Tasks aus dem Local Storage oder Initialisieren mit einem leeren Array
  let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];

  // Erhalten des ausgewählten Benutzers aus dem selectedUser-Array
  // Annahme: Dies ist dein ausgewählter Benutzer-Array
  let userSelectData = selectedUser.map(user => ({
    fname: user.name.split(' ')[0], // Extrahieren des Vornamens aus dem Namen des Benutzers
    lname: user.name.split(' ')[1], // Extrahieren des Nachnamens aus dem Namen des Benutzers
    backgroundcolor: user.color // Verwendung der Hintergrundfarbe des Benutzers
  }));

  // Hinzufügen der Todos aus dem todos-Array als Subtasks
  // Annahme: Dein Todos-Array
  let subtasks = todos.map(todo => ({ name: todo, status: false })); // Todos als Subtasks mit 'false' hinzufügen

  // Erstellen des Task-Objekts mit progressfield: "todo_container" und Subtasks
  let task = {
    id: allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0, // Setzen der ID
    titel: titel,
    description: description,
    dueDate: dueDate,
    category: category,
    userSelect: userSelectData, // Hinzufügen der ausgewählten Benutzerdaten
    subtask: subtasks, // Hinzufügen der Todos als Subtasks
    priority: {
      urgent: urgent,
      medium: medium,
      low: low,
    },
    progressfield: "todo_container", // Hinzufügen des progressfield: "todo"
  };

  // Hinzufügen des neuen Tasks zum Array
  allTasks.push(task);

  // Speichern des aktualisierten Arrays im Local Storage
  saveTasksToLocalStorage(allTasks);

  // Hinzufügen des neu erstellten Tasks zur Anzeige auf der Seite
  showTaskOnPage(task);

  // Leeren der Eingabefelder
  document.getElementById('titel').value = '';
  document.getElementById('description').value = '';
  document.getElementById('category').value = '';
  document.getElementById('subtask').value = '';
  document.getElementById('urgent').classList.remove('active');
  document.getElementById('medium').classList.add('active');
  document.getElementById('low').classList.remove('active');
  document.getElementById('dueDate').value = '';
  // Standort neu laden, falls notwendig
  // location.reload(); // Diese Anweisung scheint nicht notwendig zu sein und kann eventuell entfernt werden

  initSummary(allTasks);
}

function clearInputFields() {
  document.getElementById('titel').value = '';
  document.getElementById('description').value = '';
  document.getElementById('category').value = '';
  document.getElementById('subtask').value = '';
  document.getElementById('urgent').classList.remove('active-urgent');
  document.getElementById('medium').classList.add('active-medium');
  document.getElementById('low').classList.remove('active-low');
  document.getElementById('dueDate').value = '';
  document.getElementById('mylist').innerHTML = '';
  document.getElementById('selected-user').innerHTML = '';
  selectedUser.length = 0;
}





// Funktion zum Anzeigen eines Tasks auf der Seite hinzugefügt
function showTaskOnPage(task) {
  // Hier kannst du den neu hinzugefügten Task zur Anzeige auf der Seite hinzufügen, z.B. durch Manipulation des DOM
  // Je nachdem, wie deine Seite strukturiert ist, könntest du dies auf verschiedene Arten erreichen.
  // Zum Beispiel könntest du eine Funktion aufrufen, die den neuen Task in die entsprechende Liste einfügt.
  // Beachte, dass du die Logik anpassen musst, um den Task entsprechend deinem Seitenlayout hinzuzufügen.
  // Ein Beispiel:
  let container = document.getElementById(task.progressfield); // Annahme: Die ID des Containers entspricht dem progressfield-Wert des Tasks
  let taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.textContent = task.titel; // Annahme: Der Titel des Tasks soll angezeigt werden
  container.appendChild(taskElement);
}


// function addTask() {
//   // Erfassen der Eingabedaten
//   let titel = document.getElementById('titel').value;
//   let description = document.getElementById('description').value;
//   let category = document.getElementById('category').value;
//   let userSelect = selectedUser; // Benutzer aus der Auswahl
//   let subtasks = document.getElementById('subtask').value.split(',').map(todo => ({ todo: todo.trim() })); // Subtasks aus Textfeld

//   // Priorität aus den Klassen der Buttons erhalten
//   let urgent = document.getElementById('urgent').classList.contains('active');
//   let medium = document.getElementById('medium').classList.contains('active');
//   let low = document.getElementById('low').classList.contains('active');

//   // Laden der vorhandenen Tasks aus dem Local Storage oder Initialisieren mit einem leeren Array
//   let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];

//   // Erstellen des Task-Objekts mit progressfield: "todo_container" und Subtasks
//   let task = {
//     id: allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 1, // Setzen der ID
//     titel: titel,
//     description: description,
//     dueDate: dueDate,
//     category: category,
//     userSelect: userSelect,
//     subtask: subtasks,
//     priority: {
//       urgent: urgent,
//       medium: medium,
//       low: low,
//     },
//     progressfield: "todo_container", // Hinzufügen des progressfield: "todo"
//   };

//   // Hinzufügen des neuen Tasks zum Array
//   allTasks.push(task);

//   // Speichern des aktualisierten Arrays im Local Storage
//   saveTasksToLocalStorage(allTasks);

//   // Hinzufügen des neu erstellten Tasks zur Anzeige auf der Seite
//   showTaskOnPage(task);

//   // Leeren der Eingabefelder
//   document.getElementById('titel').value = '';
//   document.getElementById('description').value = '';
//   document.getElementById('category').value = '';
//   document.getElementById('user-select').innerText = '';
//   document.getElementById('subtask').value = '';
//   document.getElementById('urgent').classList.remove('active');
//   document.getElementById('medium').classList.remove('active');
//   document.getElementById('low').classList.remove('active');
//   document.getElementById('dueDate').value = '';
// }




function togglePriority(priority) {
  let urgentButton = document.getElementById('urgent');
  let mediumButton = document.getElementById('medium');
  let lowButton = document.getElementById('low'); 
                      
  let prioButton = document.getElementById(priority);
  if (prioButton == urgentButton) {
    mediumButton.classList.remove('active-medium');
    lowButton.classList.remove('active-low');
    urgentButton.classList.add('active-urgent');

  } if (prioButton == mediumButton) {
    urgentButton.classList.remove('active-urgent');
    lowButton.classList.remove('active-low');
    mediumButton.classList.add('active-medium');
  } if (prioButton == lowButton) {
    urgentButton.classList.remove('active-urgent');
    mediumButton.classList.remove('active-medium');
    lowButton.classList.add('active-low');
  }
}


let todos = [];

function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    showTodos();
  }
}

function showTodos() {
  const mylist = document.getElementById("mylist");
  mylist.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
            <div>
                <span>${todo}</span>
                <input size="60" class="edit-input d-none" value="${todo}" onchange="updateTodo(${i}, this.value)">
                </div>
            <div class="actions d-none">
                <a href="#/" onclick='editTodo(${i})'><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_129363_1220" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_129363_1220)">
                <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                </g>
                </svg>
                </a>
                <a href="#/" onclick='deleteTodo(${i})'><svg width="20" height="19" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_129363_1225" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_129363_1225)">
                <path d="M7.5 21C6.95 21 6.47917 20.8042 6.0875 20.4125C5.69583 20.0208 5.5 19.55 5.5 19V6C5.21667 6 4.97917 5.90417 4.7875 5.7125C4.59583 5.52083 4.5 5.28333 4.5 5C4.5 4.71667 4.59583 4.47917 4.7875 4.2875C4.97917 4.09583 5.21667 4 5.5 4H9.5C9.5 3.71667 9.59583 3.47917 9.7875 3.2875C9.97917 3.09583 10.2167 3 10.5 3H14.5C14.7833 3 15.0208 3.09583 15.2125 3.2875C15.4042 3.47917 15.5 3.71667 15.5 4H19.5C19.7833 4 20.0208 4.09583 20.2125 4.2875C20.4042 4.47917 20.5 4.71667 20.5 5C20.5 5.28333 20.4042 5.52083 20.2125 5.7125C20.0208 5.90417 19.7833 6 19.5 6V19C19.5 19.55 19.3042 20.0208 18.9125 20.4125C18.5208 20.8042 18.05 21 17.5 21H7.5ZM7.5 6V19H17.5V6H7.5ZM9.5 16C9.5 16.2833 9.59583 16.5208 9.7875 16.7125C9.97917 16.9042 10.2167 17 10.5 17C10.7833 17 11.0208 16.9042 11.2125 16.7125C11.4042 16.5208 11.5 16.2833 11.5 16V9C11.5 8.71667 11.4042 8.47917 11.2125 8.2875C11.0208 8.09583 10.7833 8 10.5 8C10.2167 8 9.97917 8.09583 9.7875 8.2875C9.59583 8.47917 9.5 8.71667 9.5 9V16ZM13.5 16C13.5 16.2833 13.5958 16.5208 13.7875 16.7125C13.9792 16.9042 14.2167 17 14.5 17C14.7833 17 15.0208 16.9042 15.2125 16.7125C15.4042 16.5208 15.5 16.2833 15.5 16V9C15.5 8.71667 15.4042 8.47917 15.2125 8.2875C15.0208 8.09583 14.7833 8 14.5 8C14.2167 8 13.9792 8.09583 13.7875 8.2875C13.5958 8.47917 13.5 8.71667 13.5 9V16Z" fill="#2A3647"/>
                </g>
                </svg>
                </a>
            </div>
        
        `;

    li.addEventListener("mouseenter", function () {
      li.querySelector(".actions").classList.remove("d-none");
    });

    li.addEventListener("mouseleave", function () {
      li.querySelector(".actions").classList.add("d-none");
    });

    mylist.appendChild(li);
  }
}


function addTodo() {
  let todo = document.getElementById("subtask").value;
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
  document.getElementById("subtask").value = "";
}

function deleteTodo(position) {
  todos.splice(position, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
}


function editTodo(index) {
  let inputField = document.querySelector(
    `#mylist .todo-item:nth-child(${index + 1}) .edit-input`
  );
  let spanElement = document.querySelector(
    `#mylist .todo-item:nth-child(${index + 1}) span`
  );

  inputField.classList.toggle("d-none");
  spanElement.classList.toggle("d-none");

  if (!inputField.classList.contains("d-none")) {
    inputField.focus();
  }
}

function updateTodo(index, newValue) {
  todos[index] = newValue;
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
}




function setMinimumDateForToday(inputId) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  // Ensure leading zeros if needed
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  // Set the minimum date for the input to today's date
  const minDate = year + '-' + month + '-' + day;
  document.getElementById(inputId).min = minDate;
}
