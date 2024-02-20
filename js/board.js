function initBoard() {
    loadAllTasks();
}

function showPopup() {
  document.getElementById("incomePopup").classList.remove("d-none");
}

function closePopup() {
  document.getElementById("incomePopup").classList.add("d-none");
}


//dragAndDrop//

function showAllTasks(allTasks) {
    let todoContainer = document.getElementById('todo_container');
    todoContainer.innerHTML = ""; // Clear previous tasks

    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : '';
        let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : '';
        let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : '';

        let taskHTML = `
            <a href="#" class="card-section desktop-card-section" onclick="showPopup()">
                <div class="card">
                    <div class="card-category-${task.category}">${task.category}</div>
                    <div class="card-headline">${task.titel}</div>
                    <div class="card-discription">${task.description}</div>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill-half"></div>
                        </div>
                        <div class="progress-text">1/2 Subtasks</div>
                    </div>
                    <div class="user-priority-container">
                        <div class="user-container">
                            <div class="initials-circle" style="background-color: rgb(252, 113, 255);">MP</div>
                            <div class="initials-circle" style="background-color: rgb(113, 255, 134);">HS</div>
                            <div class="initials-circle" style="background-color: rgb(120, 113, 255);">UW</div>
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
        todoContainer.insertAdjacentHTML('beforeend', taskHTML);
    }
}
