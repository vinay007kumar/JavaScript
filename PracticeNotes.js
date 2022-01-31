showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
        console.log("null is");
    }
    else{
        notesObj = JSON.parse(notes);
        console.log("not null");
    }

    let myObj = {
        title : addTitle.value,
        text : addTxt.value,
    };
    notesObj.push(myObj);

    
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    addTitle.value = '';
    console.group(notesObj);
    showNotes();
});
function showNotes() {
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let html ='';
    notesObj.forEach(function(element, index) {
        html += `
        <div class="playingCards">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <div class="form-group">
                    <p class="form-control" id="addTxt" rows="3">${element.text}</p>
                </div>
                <button id="${index}" onclick='deleteNote(this.id)' class="btn btn-primary" >Delete Note</button>
            </div>
        </div>
        `;
    });
    let notesElem = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `Please Add Your First Note`;
    }
}


function deleteNote(index){
    console.log('Delete this', index);

    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){

    let inputVal = search.value.toLowerCase();
    console.log('Input Event Fired, ', inputVal);

    let noteCards = document.getElementsByClassName("playingCards");
    Array.from(noteCards).forEach(function(element){
        cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
        console.log(cardTxt);
    });
});