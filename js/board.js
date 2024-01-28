// progress-bar //
const progressInput = document.getElementById('progressInput');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');

progressInput.addEventListener('input', updateProgressBar);

function updateProgressBar() {
    const progressValue = progressInput.value;
    progressBar.style.setProperty('--progress', `${progressValue}%`);
    progressText.innerText = `${progressValue}1/2 Subtasks`;
}
// progress-bar //s
