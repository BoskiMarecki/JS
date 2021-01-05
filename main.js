function lz(i) {
    return `${i}`.padStart(2, "0");
}

const elDate = document.querySelector("#Date")
const elTime = document.querySelector("#Time")

function showTextTime() {
    const now = new Date();
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    const textDate = `${lz(now.getDate())} . ${lz((now.getMonth()+1))} . ${now.getFullYear()} (${days[now.getDay()]})`;
    const textTime = `${lz(now.getHours())} : ${lz(now.getMinutes())} : ${lz(now.getSeconds())}`;

    elDate.innerHTML = textDate;
    elTime.innerHTML = textTime;

    window.requestAnimationFrame(showTextTime);
}
window.requestAnimationFrame(showTextTime);

const localStorageNotesKey = 'notes';
const notes = [];

document.querySelector('#noteAdd').addEventListener('click', onNewNote);

function removeNote(e) {
    let noteToRemove = e.target.parentNode;
    noteToRemove.parentNode.removeChild(noteToRemove);
}

function onNewNote() {
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    const color = document.querySelector('#color').value;
    //const pin = document.querySelector('#pinned').;
    const note = {
        title: title,
        content: content,
        colour: color,
        //pinned: pin,
        createDate: new Date(),
    };
    

notes.push(note);
console.log(note);

localStorage.setItem(localStorageNotesKey, JSON.stringify(notes));

const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNotesKey));

const converted = notesFromStorage.map( note => {
    note.createDate = new Date(note.createDate);
    return note;
});

const asidenotes = document.querySelector('aside');
asidenotes.innerHTML = '';

for (const note of converted) {
    const htmlSection = document.createElement('section');
    const htmlTitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlData = document.createElement('time');
    const htmlButton = document.createElement('button');

    htmlSection.style.backgroundColor = note.colour;

    htmlTitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlData.innerHTML = note.createDate.toLocaleString();
    htmlButton.innerHTML = 'Remove';
    htmlButton.onclick = ((e)=>{removeNote(e)});
    htmlSection.appendChild(htmlTitle);
    htmlSection.appendChild(htmlContent);
    htmlSection.appendChild(htmlData);
    htmlSection.appendChild(htmlButton);

    asidenotes.appendChild(htmlSection);
    
}
}