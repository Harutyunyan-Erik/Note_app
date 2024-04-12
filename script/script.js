// import { btn, workspace, textArea, notes } from "./constants.js";
// import { createListener } from "./helpers.js";

// const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

// function noteCreator(e) {
//     e.preventDefault();

//     const newTextArea = textArea; 
//     newTextArea.className = "notes";
//     newTextArea.id = "notes";
//     newTextArea.placeholder = "Empty Note";
//     workspace.appendChild(newTextArea); 
//     workspace.appendChild(btn);
//     newTextArea.addEventListener("dblclick", () => {
//         const confirmQuestion = confirm("Do you want to delete this note?");
//         if(confirmQuestion){
//             removeNote(newTextArea);
//         }
//     }); 
//     taskList.push(newTextArea.value); 
//     changeLocalStorage();
//     console.log(notes.value);
// }
// createListener("btn", "click", noteCreator);
// // btn.addEventListener("click", noteCreator);

// function removeNote(textArea) {
//     const index = taskList.indexOf(textArea.value); 
//     taskList.splice(index, 1); 
//     textArea.remove();
//     changeLocalStorage();
// }

// function changeLocalStorage(){
//     localStorage.setItem('taskList', JSON.stringify(taskList));
// }

// function safeLocalStorage(){
//     // localStorage.setItem(notes.value);
//     taskList.push(notes.value);
//     changeLocalStorage();
//     removeNote();
// }

// safeLocalStorage();

// console.log(taskList);
// console.log(notes.value);


// ------------------

class NoteApp {
    constructor() {
        this.btnEl = document.getElementById("btn");
        this.appEl = document.getElementById("workspace");
        // this.searchInput = document.getElementById("search");
        this.notes = this.getNotes();
        this.init();
    }

    init() {
        this.renderNotes();
        this.btnEl.addEventListener("click", () => this.addNote());
        // this.searchInput.addEventListener("input", () => this.searchNotes());
    }

    renderNotes() {
        this.notes.forEach((note) => {
            const noteEl = this.createNoteEl(note.id, note.content);
            this.appEl.insertBefore(noteEl, this.btnEl);
        });
    }

    createNoteEl(id, content) {
        const element = document.createElement("textarea");
        element.classList.add("note");
        element.placeholder = "Empty Note";
        element.value = content;
        
        element.addEventListener("dblclick", () => {
            const warning = confirm("Do you want to delete this note?");
            if (warning) {
                this.deleteNote(id, element);
            }
        });

        element.addEventListener("input", () => {
            this.updateNote(id, element.value);
        });

        element.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.updateNote(id, element.value);
            }
        });

        return element;
    }

    deleteNote(id, element) {
        this.notes = this.notes.filter((note) => note.id !== id);
        this.saveNotes();
        this.appEl.removeChild(element);
    }

    updateNote(id, content) {
        const targetNote = this.notes.find((note) => note.id === id);
        if (targetNote) {
            targetNote.content = content;
            this.saveNotes();
        }
    }

    addNote() {
        const noteObj = {
            id: Math.floor(Math.random() * 100000),
            content: "",
        };
        const noteEl = this.createNoteEl(noteObj.id, noteObj.content);
        this.appEl.insertBefore(noteEl, this.btnEl);
        this.notes.push(noteObj);
        this.saveNotes();
    }

    saveNotes() {
        localStorage.setItem("note-app", JSON.stringify(this.notes));
    }

    getNotes() {
        return JSON.parse(localStorage.getItem("note-app") || "[]");
    }

    // searchNotes() {
    //     const searchTerm = this.searchInput.value.toLowerCase();
    //     const filteredNotes = this.notes.filter((note) => 
    //         note.content.toLowerCase().includes(searchTerm)
    //     );
    //     this.renderNotes(filteredNotes);
    // }

    // clearNotes() {
    //     while (this.appEl.firstChild) {
    //         this.appEl.removeChild(this.appEl.firstChild);
    //     }
    // }
}

const myNoteApp = new NoteApp();