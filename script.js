let addMessage = document.querySelector('.message'), addButton = document.querySelector('.add'),
//cм. 5
todo = document.querySelector('.todo');

//4. массив "todoList"(см.3)
let todoList = [];

if(localStorage.getItem('todo')){

    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function (){
    if(!addMessage.value) return;
//1. каждое новое дело будем создавать в объект, а объекты будем помещать в массив
    //2. создаем массив newtodo. Массив будет создаваться, когда мы будем добавлять новое сообщение. Он будет содержать данные нашего последнего сообщения. 
let newTodo = {
    todo:addMessage.value,
    checked: false,
    important: false
};
//3. чтобы хранить каждое наше сообщение, нам нужен массив. Поэтому в начале программы, добавим пустой массив. (см. 4. массив "todoList")

todoList.push(newTodo);

//5. чтобы вывести полученные данные из массива todoList будем выводить через список <ul class="todo"> (см index.html) 
//6. убираем console.log(todoList):
    //console.log(todoList);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value ='';
});

//7. вводим функцию:
function displayMessages(){
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    //8. внутри функции будем перебирать массив todoList, и каждый объект выводить на страницу в виде <li>:
// с помощью метода перебора forEach(он принима)
todoList.forEach(function(item, i){
// с помощью consol.log проверили, что перебор работает. Теперь можем его убирать.
    //console.log(item);
    //Теперь делаем верстку с помощью тэга <li>.
    // создаем пременную  
    displayMessage += `
    <li>
    <input type='checkbox' id='item_${i}'${item.checked ? 'checked' : ''}>
    <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
    </li>
    `;
    // теперь выводим на страницу что получилось
    todo.innerHTML = displayMessage;
    //проаверили с помощью console.log('displayMessage: ', displayMessage). Теперь можем убирать
    //console.log('displayMessage: ', displayMessage);

});
}

todo.addEventListener('change',function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput +']');
    let valueLabel = forLabel.innerHTML;
    todoList.forEach(function(item){
        if (item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if (item.todo === event.target.innerHTML){
            if(event.ctrlKey || event.metaKey){
                todoList.splice(i,1);
            } else {
            item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }

    });
});