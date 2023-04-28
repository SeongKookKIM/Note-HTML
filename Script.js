const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector(".title input");
const descTag = popupBox.querySelector(".descripttion textarea");
const addBtn = popupBox.querySelector("button");

const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false;
let updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());

  notes.forEach((note, index) => {
    let liTag = `
    <li class="note">
    <div class="details">
      <p>${note.title}</p>
      <span
        >${note.description}</span
      >
    </div>
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings">
        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
        <ol class="menu">
        <li onclick="updateNote(${index},'${note.title}','${note.description}')">
          <i class="uil uil-pen"></i>
          Edit
        </li>
        <li onclick="deleteNote(${index})">
          <i class="uil uil-trash"></i>
          Delete
        </li>
      </ol>
      </div>
    </div>
  </li>
    `;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("add");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("add");
    }
  });
}

function deleteNote(noteId) {
  let confirmDel = confirm("삭제하시겠습니까?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "update Note";
  popupTitle.innerText = "update a Note";
}

addBtn.addEventListener("click", () => {
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;
  let confirmUpdate = false;

  if (!confirmUpdate) {
    confirm("수정하시겠습니까?");
  } else {
    return;
  }

  if (noteTitle || noteDesc) {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${year}년 ${month} ${day}일`,
    };

    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    // notes.push(noteInfo);
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
