const addNote = document.getElementById('note-add'),
popUp = document.querySelector('.popup-box'),
closePopup = popUp.querySelector("header i"),
popupTitle = popUp.querySelector("header p"),
titleTag = popUp.querySelector("input"),
decTag = popUp.querySelector("textarea"),
addBtn = popUp.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false, updateId;


addNote.addEventListener("click", () => {
    // isUpdate = false;
    titleTag.focus();
    titleTag.value = "";
    decTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add New Note";
    popUp.classList.add("show");
});

closePopup.addEventListener("click", () => {
    isUpdate = false;
    popUp.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let divTag = `
        <div class="col-lg-3 col-md-4 note bg-white m-1">
            <div class="top-details">
                <span>${note.title}</span> 
                <p>
                    ${note.description}
                </p>
            </div>
            <div class="bottem-details">
                <p>${note.date}</p>
                <div class="setting">
                    <i onclick="showManu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul class="manu">
                        <li onclick="editNote(${index}, '${note.title}', '${note.description}')" ><i class="fa-solid fa-marker"></i>Edit</li> 
                        <li onclick="deleteNote(${index})" ><i  class="fa-regular fa-square-minus"></i>Delete</li> 
                    </ul>
                </div>
            </div>
        </div> `;
        addNote.insertAdjacentHTML("afterend", divTag);
    });
}
showNotes();

function showManu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    })
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you wnat to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    // console.log(noteId);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();

}

function editNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addNote.click();
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update This Note";
    titleTag.value = title;
    decTag.value = desc;
}



addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let noteTital = titleTag.value,
    noteDec = decTag.value;
    if(noteTital ||noteDec){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()], 
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteinfo = {
            title: noteTital, description: noteDec,
            date: `${month} ${day}, ${year}`
        } 
        if(!isUpdate){
            notes.push(noteinfo);

        } else{
            isUpdate = false;
            notes[updateId] = noteinfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        
        closePopup.click();
        showNotes();
        
    }
});
