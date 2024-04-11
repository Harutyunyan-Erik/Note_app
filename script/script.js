import { btn, workspace, textArea, notes } from "./constants.js";
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

function noteCreator() {
    const newTextArea = document.createElement('textarea'); 
    newTextArea.className = "notes";
    newTextArea.placeholder = "Empty Note";
    workspace.appendChild(newTextArea); 
    workspace.appendChild(btn);
    newTextArea.addEventListener("dblclick", () => {
        const confirmQuestion = confirm("Do you want to delete this note?");
        if(confirmQuestion){
            removeNote(newTextArea);
        }
    }); 
    taskList.push(newTextArea.value); 
    changeLocalStorage();
}

btn.addEventListener("click", noteCreator);

function removeNote(textArea) {
    const index = taskList.indexOf(textArea.value); 
    taskList.splice(index, 1); 
    textArea.remove();
    changeLocalStorage();
}

function changeLocalStorage(){
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

console.log(taskList);