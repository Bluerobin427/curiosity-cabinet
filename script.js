function createNoteLibrary(){
  let noteLibrary = [];
  localStorage.noteLibrary = JSON.stringify(noteLibrary);
}

function getNoteLibrary(){
  let noteLibrary = JSON.parse(localStorage.noteLibrary);
  return noteLibrary;
}

function setNoteLibrary(noteLibrary){
  localStorage.noteLibrary = JSON.stringify(noteLibrary);
}

/*
async function retrieveNotes(){
  let notes = [];
  let keys = Object.keys(localStorage);
  for (let key of keys) {
    if (localStorage.getItem(key).id !== 'undefined'){
      let note = JSON.parse(localStorage.getItem(key));
      notes.push(note);
    }
  }
  console.log(notes);
  populateNotes(notes);
}
*/

function saveNote(e){
  e.preventDefault();

  //Grab the HTML elements and their contents, then create the note.
  const name = document.getElementById("NoteName").value;
  const content = document.getElementById("NoteContent").value;
  const button = document.getElementById("SubmitButton");
  const formMode = document.getElementsByClassName("formMode")[0];
  let noteId = "";

  if (formMode.id == "edit") {
    noteId = document.getElementsByClassName("noteIdHolder")[0].id;
  } else if (formMode.id == "create"){
    noteId = `note-${Date.now()}`;
    console.log("making a new note!");
  } else {
    alert("Something went wrong with the form mode!")
  }

  let newNote = {"noteID":noteId, "name":name, "content":content};

  //Grab the noteLibrary and add the note.
  //If the note already exists, replace it with the edited one.
  let noteLibrary = getNoteLibrary();
  if (formMode.id == "edit") {
    //find the index
    const index = noteLibrary.findIndex((entry) => entry.noteID === newNote.noteID);
    //edit the note
    noteLibrary[index] = newNote;
  } else if (formMode.id == "create"){
    noteLibrary.push(newNote);
  } 

  setNoteLibrary(noteLibrary);

  //Make the button let you know it worked.
  button.textContent = "Note Saved!";
  formMode.id = "create";

  //Wrap up and clean up.
  console.log("Save Ran");
  
  setTimeout(() => {
    form.submit();
  }, 1000);
}

function populateNotes(){
    const section = document.querySelector("#notesArea");
    section.textContent = "";
    //const name = 1;
    //const content = 2;
    let noteLibrary = getNoteLibrary();
    for (let note of noteLibrary) {
        const nextNote = document.createElement("article");
        const noteH3 = document.createElement("h3");
        const noteP = document.createElement("p");
        const noteEditButton = document.createElement("button");

        noteH3.textContent = note.name;
        noteEditButton.textContent = "✏️";
        noteEditButton.id = note.noteID;
        noteEditButton.className = "editButton";
        noteH3.appendChild(noteEditButton);

        noteP.textContent = note.content;
        nextNote.appendChild(noteH3);
        nextNote.appendChild(noteP);

        section.appendChild(nextNote);
    }
}

//The next functions handle when happens when you click on
//the edit and delete buttons on notes.
function handleClick(e) {
  if (e.target.className == "editButton"){
    editNote(e);
  }
  else if (e.target.className == "deleteButton"){
    deleteNote(e);
  }
  else {
    return false;
  }
}
function editNote(e){
  //Grab the note's noteID from the button (it's the button's ID)
  let editingNoteID = e.target.id;

  //Grab the note editing form's HTML elements.
  const formName = document.getElementById("NoteName");
  const formContent = document.getElementById("NoteContent");
  const formIdHolder = document.getElementsByClassName("noteIdHolder")[0];
  const formButton = document.getElementById("SubmitButton");
  const formMode = document.getElementsByClassName("formMode")[0];

  //Grab the noteLibrary.
  let noteLibrary = getNoteLibrary();

  //Find the note
  const existingNote = noteLibrary.find((entry) => entry.noteID === editingNoteID);
  //When you find it, set the note editing form's text fields
  //to the notes's name and content.
  formName.value = existingNote.name;
  formContent.value = existingNote.content;
  formIdHolder.id = existingNote.noteID;
  formButton.textContent = "Edit Note";
  formMode.id = "edit";
}
function deleteNote(e){
  //nothing here yet.
}

//If the noteLibrary doesn't exist, create it.
if(localStorage.noteLibrary == 'undefined'){
  createNoteLibrary();
}

//Event Listeners! One for submitting the note editing form and one
//for handling clicks on edit and delete buttons (calls functions above)
const form = document.getElementById("form");
document.addEventListener('DOMContentLoaded', function() {
  form.addEventListener("submit", saveNote);
  document.body.addEventListener("click", handleClick);
});

//Populate the notes area.
populateNotes();