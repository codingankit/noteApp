/* JavaScript Document */

import getDate from "./evalDate.js";
import validateNote from "./validate.js";

const wrapper = document.querySelector("#wrapper");
const notesWrapper = document.querySelector("#notesWrapper");
const noteAddDiv = document.querySelector("#noteAddDiv");
const noteEditDiv = document.querySelector("#noteEditDiv");
const noteAddForm = document.querySelector("#noteAddForm");
const noteEditForm = document.querySelector("#noteEditForm");
const noteAddTitle = document.querySelector("#noteAddTitle");
const noteEditTitle = document.querySelector("#noteEditTitle");
const noteAddNoteTxt = document.querySelector("#noteAddNoteTxt");
const noteEditNoteTxt = document.querySelector("#noteEditNoteTxt");
const noteAddTitleErrTxt = document.querySelector("#noteAddTitleErrTxt");
const noteEditTitleErrTxt = document.querySelector("#noteEditTitleErrTxt");
const noteTextAddErrTxt = document.querySelector("#noteTextAddErrTxt");
const noteTextEditErrTxt = document.querySelector("#noteTextEditErrTxt");
const noteAddBtn = document.querySelector("#noteAddBtn");
const noteEditBtn = document.querySelector("#noteEditBtn");
const noteAddCloseBtn = document.querySelector("#noteAddCloseBtn");
const noteEditCloseBtn = document.querySelector("#noteEditCloseBtn");
const nothingToShowDiv = document.querySelector("#nothingToShowDiv");
const addNoteBtn = document.querySelector("#addNoteBtn");
const addNoteText = document.querySelector("#addNoteText");

const NOTE_STORAGE_NAME = "noteStorage";

let noteUpdateIndex;

function addNoteToStorage({ note, noteTitle, date }) {
  const noteStorage = JSON.parse(localStorage.getItem(NOTE_STORAGE_NAME));
  if (noteStorage === null) {
    const noteToAdd = JSON.stringify([{ note, noteTitle, date }]);
    localStorage.setItem(NOTE_STORAGE_NAME, noteToAdd);
    Toast.fire({
      icon: "success",
      title: "Note added successfully",
    });
    showNote();
    resetForms();
  } else {
    const noteToAddObj = { note, noteTitle, date };
    noteStorage.unshift(noteToAddObj);
    const noteToAddJSON = JSON.stringify(noteStorage);
    localStorage.setItem(NOTE_STORAGE_NAME, noteToAddJSON);
    Toast.fire({
      icon: "success",
      title: "Note added successfully",
    });
    showNote();
    resetForms();
  }
}

function showNote() {
  const noteStorage = JSON.parse(localStorage.getItem(NOTE_STORAGE_NAME));
  if (noteStorage === null || noteStorage.length === 0) {
    notesWrapper.style.display = "none";
    nothingToShowDiv.style.display = "block";
  } else {
    nothingToShowDiv.style.display = "none";
    notesWrapper.style.display = "block";
    notesWrapper.innerHTML = "";
    noteStorage.forEach((value, index) => {
      const noteDiv = document.createElement("div");
      const noteDivHeader = document.createElement("div");
      const noteTitleDiv = document.createElement("div");
      const mainNoteDiv = document.createElement("div");
      const noteDivFooter = document.createElement("div");
      const editBtn = document.createElement("span");
      const deleteBtn = document.createElement("span");
      const dateTime = document.createElement("span");
      noteDiv.classList.add("noteDiv");
      noteDivHeader.classList.add("noteDivHeader");
      noteTitleDiv.classList.add("noteTitle");
      mainNoteDiv.classList.add("mainNote");
      noteDivFooter.classList.add("noteDivFooter");
      editBtn.classList.add("editBtn", "material-symbols-rounded");
      deleteBtn.classList.add("deleteBtn", "material-symbols-rounded");
      dateTime.classList.add("dateTime");
      editBtn.innerText = "edit_note";
      deleteBtn.innerText = "delete";
      noteTitleDiv.innerText = value.noteTitle;
      mainNoteDiv.innerText = value.note;
      dateTime.innerText = value.date;
      editBtn.setAttribute("data-index", index);
      deleteBtn.setAttribute("data-index", index);
      noteDivHeader.append(noteTitleDiv, mainNoteDiv);
      noteDivFooter.append(editBtn, deleteBtn, dateTime);
      noteDiv.append(noteDivHeader, noteDivFooter);
      notesWrapper.append(noteDiv);
    });
  }
}

function editNote(index) {
  const noteStorage = JSON.parse(localStorage.getItem(NOTE_STORAGE_NAME));
  const noteToEdit = noteStorage[index];
  noteEditTitleErrTxt.innerText = "";
  noteTextEditErrTxt.innerText = "";
  noteEditTitle.value = noteToEdit.noteTitle;
  noteEditNoteTxt.value = noteToEdit.note;
  noteUpdateIndex = index;
  noteEditDiv.classList.add("active");
  noteEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const noteTitle = noteEditTitle.value;
    const note = noteEditNoteTxt.value;
    const date = getDate();
    const validate = validateNote({ note, noteTitle });
    if (validate.errCode == 0) editNoteInStorage({ noteTitle, note, date });
    if (validate.errCode == 1 && validate.target == 3) {
      noteEditTitleErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "";
      noteEditTitleErrTxt.innerText = "Please fill out this field";
      noteTextEditErrTxt.innerText = "Please fill out this field";
    }
    if (validate.errCode == 1 && validate.target == 2) {
      noteEditTitleErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "Please fill out this field";
    }
    if (validate.errCode == 1 && validate.target == 1) {
      noteEditTitleErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "Please fill out this field";
    }
    if (validate.errCode == 2 && validate.target == 3) {
      noteEditTitleErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "";
      noteEditTitleErrTxt.innerText =
        "This field must not exceed 50 characters.";
      noteTextEditErrTxt.innerText =
        "This field must not exceed 1000 characters.";
    }
    if (validate.errCode == 2 && validate.target == 2) {
      noteEditTitleErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "";
      noteTextEditErrTxt.innerText =
        "This field must not exceed 1000 characters.";
    }
    if (validate.errCode == 2 && validate.target == 1) {
      noteEditTitleErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "";
      noteTextEditErrTxt.innerText =
        "This field must not exceed 50 characters.";
    }
    if (validate.errCode == 3) {
      noteEditTitleErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "";
      noteEditTitleErrTxt.innerText =
        "This field must not exceed 50 characters.";
      noteTextEditErrTxt.innerText = "Please fill out this field";
    }
    if (validate.errCode == 4) {
      noteEditTitleErrTxt.innerText = "";
      noteTextEditErrTxt.innerText = "";
      noteEditTitleErrTxt.innerText = "Please fill out this field";
      noteTextEditErrTxt.innerText =
        "This field must not exceed 1000 characters.";
    }
  });
}

function editNoteInStorage({ note, noteTitle, date }) {
  const noteStorage = JSON.parse(localStorage.getItem(NOTE_STORAGE_NAME));
  const editedNote = { note, noteTitle, date };
  noteStorage.splice(noteUpdateIndex, 1, editedNote);
  const newEditedNotesJSON = JSON.stringify(noteStorage);
  localStorage.setItem(NOTE_STORAGE_NAME, newEditedNotesJSON);
  showNote();
  resetForms();
  Toast.fire({
    icon: "success",
    title: "Note updated successfully",
  });
}

function deleteNote(index) {
  let noteStorage = JSON.parse(localStorage.getItem(NOTE_STORAGE_NAME));
  noteStorage.splice(index, 1);
  noteStorage = JSON.stringify(noteStorage);
  localStorage.setItem(NOTE_STORAGE_NAME, noteStorage);
}

function resetForms() {
  noteAddDiv.classList.remove("active");
  noteEditDiv.classList.remove("active");
  wrapper.classList.remove("active");
  noteAddTitle.value = "";
  noteAddNoteTxt.value = "";
  noteEditTitle.value = "";
  noteEditNoteTxt.value = "";
  noteEditTitleErrTxt.innerText = "";
  noteTextEditErrTxt.innerText = "";
  noteAddTitleErrTxt.innerText = "";
  noteTextAddErrTxt.innerText = "";
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

noteAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteTitle = noteAddTitle.value;
  const note = noteAddNoteTxt.value;
  const date = getDate();
  const validate = validateNote({ note, noteTitle });
  if (validate.errCode == 0) addNoteToStorage({ note, noteTitle, date });
  if (validate.errCode == 1 && validate.target == 3) {
    noteAddTitleErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "";
    noteAddTitleErrTxt.innerText = "Please fill out this field";
    noteTextAddErrTxt.innerText = "Please fill out this field";
  }
  if (validate.errCode == 1 && validate.target == 2) {
    noteAddTitleErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "Please fill out this field";
  }
  if (validate.errCode == 1 && validate.target == 1) {
    noteAddTitleErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "";
    noteAddTitleErrTxt.innerText = "Please fill out this field";
  }
  if (validate.errCode == 2 && validate.target == 3) {
    noteAddTitleErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "";
    noteAddTitleErrTxt.innerText = "This field must not exceed 50 characters.";
    noteTextAddErrTxt.innerText = "This field must not exceed 1000 characters.";
  }
  if (validate.errCode == 2 && validate.target == 2) {
    noteAddTitleErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "This field must not exceed 1000 characters.";
  }
  if (validate.errCode == 2 && validate.target == 1) {
    noteAddTitleErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "";
    noteAddTitleErrTxt.innerText = "This field must not exceed 50 characters.";
  }
  if (validate.errCode == 3) {
    noteAddTitleErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "";
    noteAddTitleErrTxt.innerText = "This field must not exceed 50 characters.";
    noteTextAddErrTxt.innerText = "Please fill out this field";
  }
  if (validate.errCode == 4) {
    noteAddTitleErrTxt.innerText = "";
    noteTextAddErrTxt.innerText = "";
    noteAddTitleErrTxt.innerText = "Please fill out this field";
    noteTextAddErrTxt.innerText = "This field must not exceed 1000 characters.";
  }
});

notesWrapper.addEventListener("click", (e) => {
  if (e.target.className === "editBtn material-symbols-rounded") {
    const index = e.target.getAttribute("data-index");
    editNote(index);
  }
});

notesWrapper.addEventListener("click", (e) => {
  if (e.target.className === "deleteBtn material-symbols-rounded") {
    const index = e.target.getAttribute("data-index");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(index);
        Toast.fire({
          icon: "success",
          title: "Note deleted successfully",
        });
        showNote();
      }
    });
  }
});

addNoteBtn.addEventListener("click", () => {
  noteAddDiv.classList.add("active");
  wrapper.classList.add("active");
});
addNoteText.addEventListener("click", () => {
  noteAddDiv.classList.add("active");
  wrapper.classList.add("active");
});
noteAddCloseBtn.addEventListener("click", () => {
  noteAddDiv.classList.remove("active");
  wrapper.classList.remove("active");
});
noteEditCloseBtn.addEventListener("click", () => {
  noteEditDiv.classList.remove("active");
  wrapper.classList.remove("active");
});


showNote();
