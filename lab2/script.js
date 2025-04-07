document.getElementById('add-button').addEventListener('click', function() {
    let table = document.getElementById('item-list');

    // LOCKED?
    if (document.querySelector('.editing')) {
        return;
    }

    let row = table.insertRow(-1); // -1 to add at the end

    // LOCK
    row.classList.add('editing');

    let cell1 = row.insertCell(0); // title 
    let cell2 = row.insertCell(1); // author
    let cell3 = row.insertCell(2); // buttons

    // fill the cells with..
    cell1.innerHTML = '<input type="text" id="title-cell">';
    cell2.innerHTML = '<input type="text" id="author-cell">';
    cell3.innerHTML = '<button onclick="saveItem(this)">Save</button> <button onclick="removeItem(this)">Remove</button>';

    updateRowColors();
});

function saveItem(clickedBtn) {
    let row = clickedBtn.parentNode.parentNode;
    let title = document.getElementById('title-cell').value;
    let author = document.getElementById('author-cell').value;

    // LOCKED?
    if (title === '') {
        return;
    }

    row.cells[0].innerHTML = title;
    row.cells[1].innerHTML = author;
    row.cells[2].innerHTML = '<button onclick="editItem(this)">Edit</button> <button onclick="removeItem(this)">Remove</button>';

    // UNLOCK
    row.classList.remove('editing'); 
}

function removeItem(clickedBtn) {
    let row = clickedBtn.parentNode.parentNode;
    row.remove();

    updateRowColors();
}

function editItem(clickedBtn) {
    let row = clickedBtn.parentNode.parentNode;

    // LOCKED?
    if (document.querySelector('.editing')) {
        return;
    }

    let title = row.cells[0].innerText;
    let author = row.cells[1].innerText;

    // LOCK
    row.classList.add('editing');

    row.cells[0].innerHTML = '<input type="text" id="title-cell" value="' + title + '">';
    row.cells[1].innerHTML = '<input type="text" id="author-cell" value="' + author + '">';
    row.cells[2].innerHTML = '<button onclick="saveItem(this)">Save</button> <button onclick="removeItem(this)">Remove</button>';
}

function updateRowColors() {
    let table = document.getElementById('item-list');
    for (let i = 1; i < table.rows.length; i++) { // row[0] = header
        if (i % 2 === 0) {
            table.rows[i].classList.add('color');
        } else {
            table.rows[i].classList.remove('color');
        }
    }
}