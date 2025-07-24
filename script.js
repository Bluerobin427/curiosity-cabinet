async function retrieveNotes() {
  let notes = [];
  let keys = Object.keys(localStorage);
  for (let key of keys) {
    if (localStorage.getItem(key).id !== 'undefined'){
      let note = localStorage.getItem(key);
      let arrayNote = note.split(",");
      notes.push(arrayNote);
    }
  }
  console.log(notes);
  populateNotes(notes);
}

function saveNote(){
  const name = document.getElementById("NoteName").value;
  const noteID = `${name}${Date.now()}`;
  console.log(noteID);
  const content = document.getElementById("NoteContent").value;
  const button = document.getElementById("SubmitButton");

  let note = [noteID, name, content];
  //const note = name.value;
  localStorage.setItem(noteID, note);
  //setTimeout(() => {
  //  button.textContent = "Note Saved!";
  //}, 5000);
  console.log("Save Ran");
}

function populateNotes(notes){
    const section = document.querySelector("#notesArea");
    section.textContent = "";
    const name = 1;
    const content = 2;
    for (let note of notes) {
        const nextNote = document.createElement("article");
        const noteH3 = document.createElement("h3");
        const noteP = document.createElement("p");

        let noteName = note[name];
        //console.log(noteName);
        noteH3.textContent = noteName;

        let noteContent = note[content];
        //console.log(noteContent);
        //if (noteContent.includes('\n')){
        //  noteContent.replace(/(\r\n|\r|\n)/g, '\r\n');
        //  console.log("Found a newline!");
        //}
        //console.log(noteContent);
        noteP.textContent = noteContent;
        nextNote.appendChild(noteH3);
        nextNote.appendChild(noteP);

        section.appendChild(nextNote);
    }
}

const form = document.getElementById("form");
form.addEventListener("submit", saveNote);

retrieveNotes();