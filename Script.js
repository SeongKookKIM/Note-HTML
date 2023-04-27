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
  popupBox.classList.remove("show");
});

function showNotes() {
  notes.forEach((note) => {
    console.log(note);
  });
}
showNotes();

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
  }
});
