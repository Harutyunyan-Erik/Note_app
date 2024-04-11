
import { btn, workspace, textArea, notes } from "./constants.js";
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

function noteCreator() {
    const newTextArea = document.createElement('textarea'); 
    newTextArea.className = "notes";
    newTextArea.placeholder = "Empty Note";
    workspace.appendChild(newTextArea); 
    workspace.appendChild(btn);
    newTextArea.addEventListener("dblclick", removeNote); 
    taskList.push(newTextArea.value); 
    changeLocalStorage();
}

btn.addEventListener("click", noteCreator);

function removeNote(e) {
    const index = taskList.indexOf(e.target.value); 
    taskList.splice(index, 1); 
    e.target.remove();
    changeLocalStorage();
}

function changeLocalStorage(){
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

console.log(taskList);