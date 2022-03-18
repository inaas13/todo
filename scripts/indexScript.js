let SubmitButton = document.querySelector("#buttonSubmit");
let MainForm = document.querySelector("#mainForm");
let input = document.querySelector("#todoInput");
let itemAmount = 0;
let checkAllCheckbox = document.getElementById("checkall");
let allButton = document.querySelector("#all");
let activeButton = document.querySelector("#active");
let completedButton = document.querySelector("#completed");
let clearCompletedButton = document.querySelector("#clearcompleted");
let TodoList = document.getElementById('todoList').getElementsByTagName('li');
document.getElementById("clearcompleted").style.display = "none"

checkFooterState();
MainForm.onsubmit = event => {
    event.preventDefault();
}

checkAllCheckbox.onclick = event => {
    checkAll();
}

SubmitButton.onclick = event => {
    if (!input.value) {
        return;
    }

    const liElement = document.createElement("li");
    liElement.setAttribute("id", "todoListItem");
    liElement.innerHTML = "<input type='checkbox' class='check'>" + input.value + "<button class='delete'>❌</button>";
    
    document.querySelector("#todoList").appendChild(liElement)
    itemAmount++;
    document.getElementById("count").innerHTML = itemAmount + " items left";
    
    updateTodoFooter();
    checkFooterState();
    input.value = '';

    liElement.firstChild.addEventListener('change', function (event) {
        if (this.checked) {
            itemAmount--;
        } else {
            itemAmount++;
        }
        document.getElementById("count").innerHTML = itemAmount + " items left";
        
        addLineThrough();
        checkCheckState();
    });
}

allButton.onclick = e => {
    for (let i = 0; i < TodoList.length; i++) {
        document.getElementById("todoList").children[i].style.display = "block"
    }
}

activeButton.onclick = e => {
    for (let i = 0; i < TodoList.length; i++) {
        let liElement = TodoList[i].firstChild
        if (liElement.checked) {
            document.getElementById("todoList").children[i].style.display = "none"
        }
        else {
            document.getElementById("todoList").children[i].style.display = "block"
        }
    }
}

completedButton.onclick = e => {
    for (let i = 0; i < TodoList.length; i++) {
        let liElement = TodoList[i].firstChild
        if (liElement.checked) {
            document.getElementById("todoList").children[i].style.display = "block"
        }
        else {
            document.getElementById("todoList").children[i].style.display = "none"
        }
    }
}

clearCompletedButton.onclick = e => {
    for (let i = TodoList.length - 1; i >= 0; i--) {
        let liElement = TodoList[i].firstChild
        if (liElement.checked) {
            TodoList[i].remove(TodoList[i])
        }
        else {
            continue;
        }
    }
    checkFooterState();
}

function checkAll() {
    let shouldChecked = document.getElementById('checkall');
    let todos = document.getElementById('todoList').getElementsByTagName('li');

    for (let i = 0; i < todos.length; i++) {
        let liElement = todos[i].firstChild;
        shouldChecked.checked ? liElement.checked = true : liElement.checked = false
        if (shouldChecked.checked) {
            liElement.checked = true;
            itemAmount = 0;
        } else {
            liElement.checked = false;
            itemAmount = todos.length;
        }
    }
    checkCheckState();
    addLineThrough();
    document.getElementById("count").innerHTML = itemAmount + " items left";
}

function updateTodoFooter() {
    let remove = document.getElementsByClassName("delete");
    let i;
    for (i = 0; i < remove.length; i++) {
        remove[i].onclick = function () {
            let li = this.parentElement;
            let elem = li.firstChild;
            li.remove(li);
            if (!elem.checked) {
                itemAmount--;
            }
            document.getElementById("count").innerHTML = itemAmount + " items left";
            checkFooterState();
        }
    }
}

function checkFooterState() {
    let totalItems = document.querySelector("#todoList").children.length;
    console.log(totalItems);
    if (totalItems == 0) {
        document.getElementById("todofooter").style.display = "none";
    } else {
        document.getElementById("todofooter").style.display = "block";
    }

    checkCheckState();
}

function displayFooter() {
    if (itemAmount == 0) {
        document.getElementById("todofooter").style.display = "none";
    }
    else {
        document.getElementById("todofooter").style.display = "block";
    }
}

function addLineThrough() {
    for (let i = 0; i < TodoList.length; i++) {
        let liElement = TodoList[i].firstChild
        if (liElement.checked) {
            TodoList[i].style.textDecoration = "line-through";
            TodoList[i].style.color = "#d4d4d4";
        }
        else {
            TodoList[i].style.textDecoration = "none";
            TodoList[i].style.color = "#4e4d4d";
        }
    }
}

function checkCheckState(){
    if (isAnyChecked()) {
        document.getElementById("clearcompleted").style.display = "block"
    } else {
        document.getElementById("clearcompleted").style.display = "none"
    }
}

function isAnyChecked() {
    let listItems = document.getElementById('todoList').getElementsByTagName('li');
    let isChecked = false;
    for (let index = 0; index < listItems.length; index++) {
        const element = listItems[index].firstChild;
        if (element.checked) {
            isChecked = true;
        }
    }
    return isChecked;
}