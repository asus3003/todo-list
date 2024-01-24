let formInputEl = document.querySelector('.form-input'),
    // formEl = document.querySelector('form'),
    formButtonEl = document.querySelector('.form-button'),
    todoListEl = document.querySelector('.todo-list');

let clickButton = document.querySelector('html');

const name = 'todo';
let todoList = [];

checkLocalStorage(name);

//formEl.addEventListener('keypress', clearDefault);

clickButton.addEventListener('click',(e) => everyClickButton(e));

formButtonEl.addEventListener('click', () => onSubmit(name));

formInputEl.addEventListener('keydown', onKeyPress);

todoListEl.addEventListener('change', changeTodoList);

todoListEl.addEventListener('contextmenu', contextTodoList);


/*
function clearDefault(e) {
    console.log(e);
   e.preventDefault();

}*/

function checkLocalStorage(todoName) {

    if (localStorage.getItem(todoName)) {

        todoList = JSON.parse(localStorage.getItem(todoName));
        displayMessages();
    }
}

function onKeyPress(e) {
    // console.log('key',e);
    if (e.ctrlKey || e.metaKey) {
        onSubmit(name);
    }
}

function onSubmit(todoName) {
    if (!formInputEl.value) return;

    let newTodo = {
        todo: formInputEl.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem(todoName, JSON.stringify(todoList));
    formInputEl.value = '';
}

/**
 * отображение сообщений
 */
function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todoListEl.innerHTML = '';
    todoList.forEach(function (item, i) {
        displayMessage += `
        <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        // теперь выводим на страницу что получилось
        todoListEl.innerHTML = displayMessage;
    });
}

function changeTodoList(event) {
    let idInput = event.target.getAttribute('id');
    let forLabel = todoListEl.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;
    todoList.forEach((item) => {
        // console.log('change',this);
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
}

function contextTodoList(event) {
    event.preventDefault();
    todoList.forEach(function (item, i) {
        // console.log('context',this);
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }

    });
}

function everyClickButton (e) {
    console.log(e.target);
}
// document.addEventListener('click', (e)=>{
//     console.log(e.target);
//     if (клик по нужному элементу-Х или по всему что в нём){
//         произвести некоторые действия
//     }
// })
// if (e.target.closest('.className')) {}