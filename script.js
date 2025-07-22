async function retrieveNotes() {
  const requestURL =
    "https://raw.githubusercontent.com/Bluerobin427/curiosity-cabinet/main/notes.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const notes = await response.json();

  populateNotes(notes);
}

function populateNotes(notes){
    const section = document.querySelector("#notesArea");
    
    for (const note of notes) {
        const nextNote = document.createElement("article");
        const noteH3 = document.createElement("h3");
        const noteP = document.createElement("p");

        noteH3.textContent = note.title;
        noteP.textContent = note.content;

        nextNote.appendChild(noteH3);
        nextNote.appendChild(noteP);

        section.appendChild(nextNote);
    }
}

retrieveNotes();