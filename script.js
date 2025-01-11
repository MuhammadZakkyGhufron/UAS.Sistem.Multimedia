const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const resetBtn = document.querySelector(".reset-btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

// Event listener untuk tombol reset
resetBtn.addEventListener("click", () => {
    localStorage.removeItem("notes");  // Hapus data dari localStorage
    notesContainer.innerHTML = "";  // Bersihkan catatan dari halaman
});

// Fungsi untuk menyimpan catatan
document.getElementById('saveBtn').addEventListener('click', function() {
    const content = document.querySelector('.input-box').innerText.trim(); // Mengambil teks dari kotak catatan
    if (content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); 
        link.download = `catatan-${new Date().toISOString()}.txt`; // Nama file dengan timestamp
        link.click(); // Memulai unduhan
    } else {
        alert("Catatan kosong! Harap isi catatan terlebih dahulu.");
    }
});