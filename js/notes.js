//Gtag for new-note-button - Ellen
const addNoteBtn = document.querySelector(".add-button");

//eventListener with custom gtag event for click on new note
addNoteBtn.addEventListener("click", function () {
  gtag("event", "Add_new_note", {
    event_category: "click_engagement",
    event_label: "new_note_click",
  });
});
// --------------------------------------------------------------

// gtag för spara-knappen - Anna-Sara
  const saveNoteBtn = document.getElementById("save-notes");

    // custom gtag event when you save a note
    saveNoteBtn.addEventListener("click", function () {
      gtag("event", "Save_button", {
        event_category: "click_engagement",
        event_label: "save_note",
      });
    });
// --------------------------------------------------------------

class Note {
  constructor(
    title,
    content,
    savedDate = "",
    editedDate = "",
    id = Date.now(),
    isFavorite = false,
    img = []
  ) {
    (this.title = title),
      (this.content = content),
      (this.isFavorite = isFavorite),
      (this.savedDate = savedDate),
      (this.editedDate = editedDate),
      (this.id = id),
      (this.img = img);
  }
}

//list of months
let monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


let noteArray = [];
let activeNote = new Note("", "");
renderAllTumbnails();
let isNewNote = false;


document.addEventListener("DOMContentLoaded", function () {
  // check local storage for stored notes
  activeNote = JSON.parse(localStorage.getItem("notes")) || new Note("", "");

  // update notes
  const noteField = document.getElementById("note-field");
  const title = document.getElementById("title");
  const noteDate = document.querySelector('#noteDate');
  
  setTimeout( () => {
    if(document.getElementById(activeNote.id + 'Wrapper'))
    document.getElementById(activeNote.id + 'Wrapper').classList.add('selectedNote');
  }, 100);

  noteField.innerHTML = activeNote.content;
  title.value = activeNote.title;
  noteDate.innerHTML="";
  noteDate.innerHTML = `<p>Created: ${activeNote.savedDate}</p><p>Last edited: ${activeNote.editedDate}</p>`;

  // button to save
  const saveBtn = document.getElementById("save-notes");

  // hide button
  saveBtn.classList.add("hide-btn");


  const addNote = document.querySelector(".add-button");

  addNote.addEventListener("click", () => {
    if (isEditingNote == true) {
      alert("It is not possible to create a new note while in editing mode.")
      return;
    }
    const toolbar = document.getElementById("toolbar");
    toolbar.classList.remove("toolbar-hidden");
    isNewNote = true;
    title.value = "";
    noteField.textContent = "";
    activeNote = new Note(title.value, noteField.value);
    const selectTextType = document.getElementById("text-type");
    
    //function to set all tools in toolbar to default values
    resetToolbar();
  });

  // save to local storage when pressing button
  saveBtn.addEventListener("click", function () {
    let image = noteField.getElementsByTagName('img');
    let imageArray = [];
    for(let i = 0; i < image.length; i++)
      imageArray.push(image[i].src);
    if(isEditingNote == false){
      activeNote.img = imageArray;
      activeNote.title = title.value;
      activeNote.content = noteField.innerHTML;
      activeNote.savedDate = getDate()
      activeNote.editedDate = getDate()
      localStorage.setItem("notes", JSON.stringify(activeNote));
      saveBtn.classList.add("hide-btn");
      setTimeout(() => { document.getElementsByClassName('note')[document.getElementsByClassName('note').length-1].click() }, 100);
      saveAllNotes(activeNote);
    } else {
      saveChanges();
    }
  });
});

// ---- function to reset toolbar when starting new note ----
function resetToolbar(){
  const selectTextType = document.getElementById("text-type");
  selectTextType.selectedIndex = 6;
  const selectFontFamily = document.getElementById("font-family");
  selectFontFamily.selectedIndex = 1;
  const selectFontSize = document.getElementById("font-size");
  selectFontSize.selectedIndex = 2;

  const toolButtons = document.querySelectorAll(".tool-icon");
  toolButtons.forEach(function (toolButton) {
    toolButton.classList.remove("tool-btn-highlight")
  });
};

function saveAllNotes(noteObject) {
  //get localstorage
  let allNotes = localStorage.getItem("allNotes") || "[]";
  allNotes = JSON.parse(allNotes);

  //Checks if the current note exists, if not adds it to "allnotes" local storage;
  let checkNote = [];
  checkNote = allNotes.filter((e) => noteObject.id === e.id);
  if (checkNote.length === 0) {
    allNotes.push(activeNote);
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
    createTumbnail(activeNote);
  } else {
    updateNote(noteObject, allNotes);
    renderAllTumbnails();
  }
}

//If there's no new note the existing note's updated with the new content
function updateNote(noteObject, allNotes) {
  allNotes.forEach((note) => {
    if (note.id === noteObject.id) {
      note.content = noteObject.content;
      note.title = noteObject.title;
    }
  });
  localStorage.setItem("allNotes", JSON.stringify(allNotes));
}


function renderAllTumbnails() {
  const allNotes = JSON.parse(localStorage.getItem("allNotes")) || "";
  noteArray = allNotes;

  if (allNotes != "") {
    allNotes.forEach((noteObject) => {
      createTumbnail(noteObject, document.querySelector(".note-list"));
    });
  }
}

//get the date for notes
function getDate(){
  const date = new Date();
  return `${monthsList[date.getMonth()]} ${(date.getDate() < 10 ? '0' : '') + date.getDate()}, ${date.getFullYear()}`

}


let editedNote = JSON.parse(localStorage.getItem("notes")) || '';
let currentNote = editedNote.id;
let newNoteArray = [];

let isEditingNote = false;
document.addEventListener('click', (evt) => {
  if(evt.target.className == 'note'){
    
    for(let i = 0; i < document.getElementsByClassName('note').length; i++)
      document.getElementsByClassName('note')[i].classList.remove('selectedNote');
    document.getElementById(evt.target.id).classList.add('selectedNote');
  
    currentNote = evt.target.idAddress;
    let targetNote = findSelectedNote(evt.target.id);
    title.value = targetNote[0].title;
    noteField.innerHTML = targetNote[0].content;
    setNewObject();
    isNewNote = false;
    viewItem();
    isEditingNote = false;
  }
  else if(evt.target.id == 'note-field'
  || evt.target.id == 'title'
  || evt.target.parentNode.id == 'note-field'){
    if(JSON.parse(localStorage.getItem("allNotes")) === null && isNewNote === false){
      alert("Please press the note creation button.");
      return;
    }
    addOrEditMode();
    if(isNewNote == false)
    isEditingNote = true;
  }
  else if(evt.target.id == 'save-notes'){
    viewItem();
    isEditingNote = false;
  }
  if(evt.target.className == 'fa-regular fa-pen-to-square'
  || evt.target.className == 'add_PrintButton add-button') {
    addOrEditMode();
  }
    
});

function viewItem(){
  document.getElementById("note-field").classList.remove('updateModeBorder');
  document.getElementById("note-field").setAttribute("contenteditable", false);
  title.style.border = 'none';
  document.getElementById('save-notes').classList.add("hide-btn");
  document.querySelector('.toolbar').classList.remove('showToolbar');
  document.querySelector('.printButton').style.display = 'flex';
}

if(localStorage.updateNote != undefined)
  setTimeout(() => { addOrEditMode() }, 100);
delete localStorage.updateNote;

function addOrEditMode(){
  document.getElementById("note-field").setAttribute("contenteditable", true);
  document.getElementById("note-field").classList.add('updateModeBorder');
  title.style.border = 'solid 2px #aaa';
  document.getElementById('save-notes').classList.remove("hide-btn");
  document.querySelector('.toolbar').classList.add('showToolbar');
  document.querySelector('.printButton').style.display = 'none';
}

function setNewObject(){
  let thisNote = document.getElementById(currentNote + 'Wrapper');
  let image = noteField.getElementsByTagName('img');
  let imageArray = [];
  for(let i = 0; i < image.length; i++)
    imageArray.push(image[i].src);
  let newObj = {
    id: thisNote.idAddress,
    isFavorite: thisNote.isFavorite,
    title: title.value,
    content: noteField.innerHTML,
    savedDate: thisNote.savedDate,
    img: imageArray,
    editedDate: getDate()
  }
  editedNote = newObj;
}

document.addEventListener('input', (evt) => {
  if(isEditingNote == true)
  if(evt.target.id == 'title' || evt.target.id == 'note-field'){
    setNewObject();
  }
});

function saveChanges(){
  let thisNote = document.getElementById(currentNote + 'Wrapper');
  thisNote.getElementsByTagName('h3')[0].textContent = editedNote.title;
  thisNote.getElementsByTagName('p')[0].innerHTML = editedNote.content;
  thisNote.getElementsByTagName('p')[0].innerHTML = editedNote.content;
  let images = thisNote.querySelector('.imageWrapper');
  while(images.lastElementChild)
  images.removeChild(images.lastElementChild);
  editedNote.img.forEach((img) => {
    const image = document.createElement('img');
    image.src = img;
    images.appendChild(image);
  });

  newNoteArray = [];
  noteArray = JSON.parse(localStorage.getItem("allNotes"));
  localStorage.setItem("notes", JSON.stringify(editedNote));

  noteArray.forEach(notes => {
    if(notes.id !== currentNote)
      newNoteArray.push(notes);
    else
      newNoteArray.push(editedNote);
  });
  localStorage.setItem("allNotes", JSON.stringify(newNoteArray));
}

//Function that finds the selected note's array based on ID
function findSelectedNote(id) {
  //Id has Wrapper attached to it, needs to be removed and converted into a number before it can be used
  let fixedId = id.replace("Wrapper", "");
  fixedId = Number(fixedId);
  let storageArray = [];
  storageArray = JSON.parse(localStorage.getItem("allNotes"));
  let findActiveNote = storageArray.filter((note) => note.id === fixedId);
  return findActiveNote;
}