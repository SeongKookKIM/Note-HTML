const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
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

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
});
closeIcon.addEventListener("click", () => {
  titleTag.value = "";
  descTag.value = "";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());

  notes.reverse().forEach((note) => {
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
        <li>
          <i class="uil uil-pen"></i>
          Edit
        </li>
        <li>
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

addBtn.addEventListener("click", () => {
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

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

    notes.push(noteInfo);
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
