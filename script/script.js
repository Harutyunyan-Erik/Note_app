import { btn, workspace, notes } from "./constants.js";


function noteCreator() {
    const textArea = document.createElement("textarea");
    textArea.className = "notes";
    textArea.placeholder = "Empty Note";
    workspace.appendChild(textArea);
    workspace.appendChild(btn);
}

btn.addEventListener("click", noteCreator);

notes.addEventListener("dblclick", ()=> {
    console.log("piti jnjvi");
})