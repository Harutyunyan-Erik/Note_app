import { btn, workspace, textArea, notes } from "./constants.js";
import { createListener } from "./helpers.js";

const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

function noteCreator(e) {
    e.preventDefault();

    const newTextArea = textArea; 
    newTextArea.className = "notes";
    newTextArea.id = "notes";
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
    console.log(notes.value);
}
createListener("btn", "click", noteCreator);
// btn.addEventListener("click", noteCreator);

function removeNote(textArea) {
    const index = taskList.indexOf(textArea.value); 
    taskList.splice(index, 1); 
    textArea.remove();
    changeLocalStorage();
}

function changeLocalStorage(){
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function safeLocalStorage(){
    // localStorage.setItem(notes.value);
    taskList.push(notes.value);
    changeLocalStorage();
    removeNote();
}

safeLocalStorage();

console.log(taskList);
console.log(notes.value);


