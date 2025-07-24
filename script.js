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

function saveNote(){
  const name = document.getElementById("NoteName").value;
  const noteID = `note-${Date.now()}`;
  const content = document.getElementById("NoteContent").value;
  const button = document.getElementById("SubmitButton");

  let note = {"noteID":noteID, "name":name, "content":content};
  //const note = name.value;

  let noteLibrary = getNoteLibrary();
  noteLibrary.push(note);
  console.log(noteLibrary);
  setNoteLibrary(noteLibrary);

  button.textContent = "Note Saved!";

  console.log("Save Ran");
  event.preventDefault();
  
  setTimeout(() => {
    form.submit();
  }, 2000);
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

        noteH3.textContent = note.name;

        //console.log(noteContent);
        //if (noteContent.includes('\n')){
        //  noteContent.replace(/(\r\n|\r|\n)/g, '\r\n');
        //  console.log("Found a newline!");
        //}
        //console.log(noteContent);
        noteP.textContent = note.content;
        nextNote.appendChild(noteH3);
        nextNote.appendChild(noteP);

        section.appendChild(nextNote);
    }
}

if(localStorage.noteLibrary == 'undefined'){
  createNoteLibrary();
}

const form = document.getElementById("form");
document.addEventListener('DOMContentLoaded', function() {
  form.addEventListener("submit", saveNote);
});

populateNotes();