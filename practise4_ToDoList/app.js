let todoList = document.getElementById('todo-list');
const userSelect = document.getElementById('user-todo');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handlerSubmit);

let ToDoList
let Users
let lastid = 201

function getUserName(userId){
    const user = Users.find(u => u.id === userId);
    return user.name;
}

function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then (
        parse => {
            [ToDoList, Users] = parse
            fillUsers()
            fillToDoList()
        }
    )
}

async function getAllTodos() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        return data;
    } catch(error) {
        alertError(error);
    }
}

async function getAllUsers() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        return data;
    } catch(error) {
        alertError(error);
    }
}

function removeTodo(todoId) {
    ToDoList.splice(ToDoList.findIndex(elem => elem.id == todoId), 1)
    const todo = todoList.querySelector(`[data-id="${todoId}"]`);
    todo.remove();
    fillToDoList()
}

function fillToDoList(){
    
    const htmlToDoList = document.getElementById("todo-list")
    htmlToDoList.innerHTML = ''
    ToDoList.forEach(element => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = element.id;
        
        if (element.completed) {
            li.innerHTML = `<span class="liText strikethroughText"> <del> ${element.title} <i>by <b>${getUserName(element.userId)}</b></i> </del> </span>`;
        } else {
            li.innerHTML = `<span class="liText"> ${element.title} <i>by <b>${getUserName(element.userId)}</b></i> </span>`;
        }
    
        const status = document.createElement('input');
        status.type = 'checkbox';
        status.checked = element.completed;
        status.addEventListener('change', eventStatus)
    
        const close = document.createElement('span');
        close.innerHTML = '&times;';
        close.className = 'close';
        close.addEventListener('click', eventDelete);
    
        li.append(close);
        li.prepend(status);
        todoList.append(li);
    });
}

function eventStatus(){
    const id = this.parentElement.dataset.id;
    ToDoList[ToDoList.findIndex(e => e.id == id)].completed = !(ToDoList[ToDoList.findIndex(e => e.id == id)].completed)
    TodoCompeted(id, ToDoList[ToDoList.findIndex(e => e.id == id)].completed)
    fillToDoList();
}

function eventDelete(){
    const todoId = this.parentElement.dataset.id;
    deleteTodo(todoId);
}

async function TodoCompeted(todoId, completed) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
            method: 'PATCH',
            body: JSON.stringify({completed: completed}),
            headers : {
                'Content-Type' : 'application/json',
            },
        });
    
        const data = await response.json();
        if (!response.ok) {
            alert('Sorry, error with connecting...');
        }
    } catch(error) {
        alertError(error);
    }

}

async function deleteTodo(todoId) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
            method: 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
            },
        });
        const data = await response.json();
        if(response.ok) {
            removeTodo(todoId);
        }
    } catch(error) {
        alert("error");
    }
}

async function createToDo(todo) {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers : { 'Content-Type' : 'application/json'},
        });    
        const newTodo = await response.json();        
        ToDoList.unshift(todo)
        fillToDoList();
    } catch(error) {
        alert("error");
    }
}

function handlerSubmit(event) {
    event.preventDefault();
    createToDo({
        userId : Users.findIndex(el => el.name == form.user.value) + 1,
        id : lastid++,
        title : form.todo.value,
        completed : false
    });
    form.todo.value = "";
}

function fillUsers(){
    const htmlToDoList = document.getElementById("user-todo")
    Users.forEach(element => {
        const el = document.createElement('option');
        el.innerText = element.name;
        htmlToDoList.append(el)
        
    });
}
