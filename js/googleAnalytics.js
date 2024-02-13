document.addEventListener("DOMContentLoaded", function () {
  // Gtag for search icon - Johan
  const searchIcon = document.querySelector(".search-icon");

  searchIcon.addEventListener("click", function () {
    // Custom gtag event when the search icon is clicked
    gtag("event", "search", {
      event_category: "click_engagement",
      event_label: "search_icon_click",
    });
  });
  // ------------------------------------------------------

  //Gtag for new-note-button - Ellen
  const addNoteBtn = document.querySelector(".add-note");

  //eventListener with custom gtag event for click on new note
  addNoteBtn.addEventListener("click", function () {
    gtag("event", "Add_new_note", {
      event_category: "click_engagement",
      event_label: "new_note_click",
    });
  });
  // ------------------------------------------------------

  // gtag för spara-knappen - Anna-Sara
  const saveNoteBtn = document.getElementById("save-notes");

  // custom gtag event when you save a note
  saveNoteBtn.addEventListener("click", function () {
    gtag("event", "click", {
      event_category: "click_engagement",
      event_label: "save_note",
    });
  });
});
