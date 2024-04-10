import { btn, workspace, notes, textArea } from "./constants.js";
const taskList = JSON.parse(localStorage.getItem('tasklist')) || [] ;


function noteCreator() {
    textArea.className = "notes";
    textArea.placeholder = "Empty Note";
    workspace.appendChild(textArea);
    workspace.appendChild(btn);
    taskList.push(textArea.value);
    changeLocaleStorage();
    console.log(taskList);
}

btn.addEventListener("click", noteCreator);

workspace.addEventListener("dblclick", (e)=> {
    if (e.target.classList.contains('notes')) {
        const index = taskList.indexOf(e.target.value); // Find the index of the note
        taskList.splice(index, 1); // Remove the note from the taskList array
        e.target.remove();
        changeLocaleStorage();
    }
})


function changeLocaleStorage(){
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

//-------------------------------------------------