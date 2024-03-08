let users = [];
let selectedUser = [];
let selectedUserList;
let todos = [];


/**
 * This function is used to initialise the add Task side
 */
async function initAddTasks() {
  await includeHTML();
  activeMenu();
  load();
  loadUserProfile();
  loadUsers();
  loadAddTaskUser();
  setMinimumDateForToday('dueDate');
}


/**
 * This function load users from remote storage
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


/**
 * This function filters users in search function
 */
function filterUser() {
  let search = document.getElementById('search-user').value;
  search = search.toLowerCase();
  selectedUserList = document.getElementById('selected-user');;
  let userList = document.getElementById('user-list');
  userList.innerHTML = '';
  if (userList.classList.contains('d-none')) {
    userList.classList.remove('d-none');
  }
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userColor = users[i]['color'];
    let initialLetters = nameInitialLettersAddTasks(user);
    if (user.name.toLowerCase().includes(search)) {
      userList.innerHTML += generateFilteredUserHtml(user, userColor, initialLetters, i); // Hier ist die Änderung
    }
  }
}


/**
 * This function is used to open user list
 * 
 * @param {*} event 
 * @returns 
 */
function openUserList(event) {
  selectedUserList = document.getElementById('selected-user');;
  let userList = document.getElementById('user-list');
  let inputIcon = document.getElementById('input-icon');
  if (selectedUser.length >= 1) {
    userList.classList.remove('d-none');
    event.stopPropagation();
    return;
  }
  userList.innerHTML = '';
  if (userList.classList.contains('d-none')) {
    userList.classList.remove('d-none');
    inputIcon.src = './assets/img/arrow_drop_down_2.svg';
  }
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userColor = users[i]['color'];
    let initialLetters = nameInitialLettersAddTasks(user);
    userList.innerHTML += generateOpenUserListHtml(user, userColor, initialLetters, i);
  }
  event.stopPropagation();
}


/**
 * this function checks if user is selected
 * 
 * @param {*} i 
 * @returns 
 */
function isUSerSelected(i) {
  return selectedUser.some(su => su.id === i)
}


/**
 * This function gets initial letters from users to add to task
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
 * this
 * 
 * @param {*} event 
 */
function doNotClose(event) {
  event.stopPropagation();
}


/**
 * This function is used to render the user list
 */
function renderUserList() {
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
 * This function is used to select a user for a task by toggeling
 * 
 * @param {*} i 
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
 * Close assigned to popup when click outside from popup.
 * 
 * @param userList ID from popup container
 */
if (window.location.href.includes('add_task.html')) {
  document.getElementById('container').addEventListener('click', function (event) {
    const userList = document.getElementById('user-list');
    const inputIcon = document.getElementById('input-icon');
    const isClickInside = userList.contains(event.target);
    if (!isClickInside) { // Klick war außerhalb der Benutzerliste
      userList.classList.add('d-none');
      inputIcon.src = './assets/img/arrow_drop_down_1.svg';
    }
  });
}


/**
 * saves a selected user in local storage
 */
function save() {
  let saveUser = JSON.stringify(selectedUser);
  localStorage.setItem("selectedUser", saveUser);
}


/**
 * this function loads a user for Task
 */
function loadAddTaskUser() {
  let loadUser = localStorage.getItem("selectedUser");
  if (loadUser) {
    selectedUser = JSON.parse(loadUser);
  }
}


/**
 * alles in Json und array speichern und umwandeln
 */
function loadAllTasks() {
  let allTasksAsString = localStorage.getItem("allTasks");
  if (allTasksAsString) {
    allTasks = JSON.parse(allTasksAsString); // Aktualisieren des allTasks-Arrays mit den Daten aus dem Local Storage
  }
}


/**
 * saves a task to local storage
 * 
 * @param {*} tasks 
 */
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("allTasks", JSON.stringify(tasks));
}


/**
 * This function adds a task to allTasks array
 */
function addTask() {
  // Erfassen der Eingabedaten
  let titel = document.getElementById('titel').value;
  let description = document.getElementById('description').value;
  let category = document.getElementById('category').value;
  let urgent = document.getElementById('urgent').classList.contains('active-urgent');
  let medium = document.getElementById('medium').classList.contains('active-medium');
  let low = document.getElementById('low').classList.contains('active-low');
  let dueDate = document.getElementById('dueDate').value;

  // Laden der vorhandenen Tasks aus dem Local Storage oder Initialisieren mit einem leeren Array
  let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];

  // Erhalten des ausgewählten Benutzers aus dem selectedUser-Array
  // Annahme: Dies ist dein ausgewählter Benutzer-Array
  let userListData = selectedUser.map(user => ({
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
    userList: userListData, // Hinzufügen der ausgewählten Benutzerdaten
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

  // initSummary(allTasks);
  closeAddTaskPopup();
  showAllTasks(allTasks);
}


/**
 * this function clears all inputfields after add a task
 */
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
  document.getElementById('search-user').value = '';
  selectedUser.length = 0;
}


/**
 * shows a task on page
 * 
 * @param {} task 
 */
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


/**
 * this function is used to select a priority to task by toggling
 * 
 * @param {} priority 
 */
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


/**
 * loads subtasks in Task, if available
 */
function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    showTodos();
  }
}


/**
 * this function is used to render subtasks in addTask form
 */
function showTodos() {
  const mylist = document.getElementById("mylist");
  mylist.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = generateTaskHtml(todo, i);

    li.addEventListener("mouseenter", function () {
      li.querySelector(".actions").classList.remove("d-none");
    });

    li.addEventListener("mouseleave", function () {
      li.querySelector(".actions").classList.add("d-none");
    });

    mylist.appendChild(li);
  }
}


/**
 *  adds subtasks to local storage
 */
function addTodo() {
  let todo = document.getElementById("subtask").value;
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
  document.getElementById("subtask").value = "";
}


/**
 * this function deletes subtasks from todo array
 * 
 * @param {*} position 
 */
function deleteTodo(position) {
  todos.splice(position, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
}


/**
 * this function allows to edit a subtask
 * 
 * @param {*} index 
 */
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


/**
 * this function is able to update subtasks in todo array in local storage
 * 
 * @param {*} index 
 * @param {*} newValue 
 */
function updateTodo(index, newValue) {
  todos[index] = newValue;
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
}


/**
 * this function prevents to select dates from past
 * 
 * @param {*} inputId 
 */
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

