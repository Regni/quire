const demo = document.getElementById('demo');
const demoTitle = document.getElementById('demoTitle');
const demoText = document.getElementById('demoText');
const note = document.getElementsByClassName('note');
const notesColumn = document.getElementById('notesColumn');

let noteArray = [];
const allNotes = localStorage.getItem("allNotes");
let getFirstNote = false;

if(allNotes !== null){
    noteArray = JSON.parse(allNotes);
    noteArray.forEach((note) => {
        if(note.isFavorite == true){ // View the first note only
            //let noteAge = getNoteAge(note.savedDate);
            if(getFirstNote == false){
                demoTitle.textContent = note.title;
                demoText.innerHTML = note.content;
                getFirstNote = true;
            } // Create the notes
            let newNote = `
            <div class="note" id="${note.id}">
                <b class='star' onclick='favToggle(${note.id})'><i class="fas fa-star"></i></b>
                <p class='deleteNote' onclick='deleteNote(${note.id})'><i class="fas fa-trash-alt"></i></p>
                <h3>${note.title}</h3>
                <div class='content' id="${note.id}Text">${note.content}</div>
                <p class='noteDate'>Created: ${note.savedDate}<br>Last edited: ${note.editedDate}</p>
            </div>
            `;
            notesColumn.innerHTML += newNote;
            document.getElementById(note.id).content = note.content;
            document.getElementById(note.id).noteDate = `created ${note.savedDate}, last edited ${note.editedDate}`;
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'imageWrapper';
            note.img.forEach((img) => {
              const image = document.createElement('img');
              image.src = img;
              imageWrapper.appendChild(image);
            });
            document.getElementById(note.id).appendChild(imageWrapper);
        }
    });
}
// Giving (title, text, date, isfavorite) values to each note
for(let i = 0; i < note.length; i++){
    note[i].noteTitle = note[i].getElementsByTagName('h3')[0].textContent;
    note[i].date = note[i].getElementsByTagName('p')[0].innerHTML.replaceAll('<br>', ', ');
    note[i].isFavorite = true;
}

let currentNote; // Getting the chosen note

//Checking of there are notes and choose the first note as the current one
if(note.length != 0){
   selectedItem(note[0].id);
   currentNote = note[0].id;
}


document.addEventListener('click', (evt) => {
    if(evt.target.className == 'note'){ // If note is clicked, display it
        currentNote = evt.target.id;
        demoTitle.textContent = evt.target.noteTitle;
        demoText.innerHTML = document.getElementById(evt.target.id + 'Text').innerHTML;
        demo.scrollTop = 0;
        demo.dataset.content = evt.target.date;
        document.getElementById('noteDate').innerHTML = evt.target.noteDate;
        selectedItem(evt.target.id);
    }
    else if(evt.target.id == 'demo'){
        noteArray.find(note => {
            if(note.id == currentNote){
                localStorage.setItem("notes", JSON.stringify(note));
                location.href = 'index.html';
                localStorage.updateNote = true;
            }
        });
    }
});

function deleteNote(note){
    document.getElementById(note).classList.add('noteDeleted');
    setTimeout(() => {
      document.getElementById(note).remove();
    }, 300);
    let tempArray = noteArray;
    noteArray = tempArray.filter((n) => n.id != note);
    localStorage.setItem("allNotes", JSON.stringify(noteArray));
}

function favToggle(note){ // Chenge star button from yellow to grey, and toggle the favorite status
    let currentNote = document.getElementById(note);
    if(currentNote.isFavorite === true){
        currentNote.isFavorite = false;
        currentNote.getElementsByClassName('star')[0].classList.add('greyStar')
    } else {
        currentNote.isFavorite = true;
        currentNote.getElementsByClassName('star')[0].classList.remove('greyStar')
    }
    noteArray.find(notes => {
        if(notes.id == note){
            notes.isFavorite = currentNote.isFavorite;
            localStorage.setItem("allNotes", JSON.stringify(noteArray));
        }
    });
}

function selectedItem(n){ // Make the chosen note appearance different to others
    for(let i = 0; i < note.length; i++)
        note[i].classList.remove('selectedNote');
    document.getElementById(n).classList.add('selectedNote');
}