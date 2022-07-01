var inputNewTask = document.getElementById("input-new-task");
var buttonNewTask = document.getElementById("button-new-task");
var toDoList = document.getElementById("to-do-list");
var displayCompleteTasks = document.getElementById("complete-tasks")
var completeTasks = 0;
var tasksOn = 0;
var nameList = [];
var idList = [];

if(localStorage.getItem("completeTasks") == null){
    localStorage.setItem("completeTasks", 0);
}else{
    completeTasks = localStorage.getItem("completeTasks");
    console.log(completeTasks);
    displayCompleteTasks.innerHTML = completeTasks;
}

//Verificação de tarefas (tasks) ativas:
//Caso não haja tarefas ativas, é criada uma chave para guardar o número de tarefas;
//Se houver alguma tarefa em aberto, elas são resgatadas no Banco de Dados.
if(localStorage.getItem("tasksOn") == null || localStorage.getItem("tasksOn") == 0){
    localStorage.setItem("tasksOn", 0);
    localStorage.setItem("nameList", []);
    localStorage.setItem("idList", []);
}else{
    tasksOn = localStorage.getItem("tasksOn");

    nameList = JSON.parse(localStorage.nameList);
    idList = JSON.parse(localStorage.idList);

    for(let i= 0; i < tasksOn; i++){
        var task = {
            name: nameList[i],
            id: idList[i]
        };

        createTagLI(task);
    }
}

inputNewTask.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        var task = {
            name: inputNewTask.value,
            id: generateId(),
        }
        addTask(task);
        
        if(tasksOn <= 10){
            nameList.push(task.name);
            idList.push(task.id);
            localStorage.nameList = JSON.stringify(nameList);
            localStorage.idList = JSON.stringify(idList);
        }

    }
});

buttonNewTask.addEventListener('click', (e) => {
    var task = {
        name: inputNewTask.value,
        id: generateId(),
    }
    addTask(task);

    nameList.push(task.name);
    idList.push(task.id);
    localStorage.nameList = JSON.stringify(nameList);
    localStorage.idList = JSON.stringify(idList);
});

function generateId() {
    
    return Math.floor(Math.random() * 3000);
}

function addTask(task) {
    if(inputNewTask.value == '') {
        alert('Escreva alguma coisa, por favor!');
    } else {
        if(tasksOn <10) {
            var li = createTagLI(task);
            toDoList.appendChild(li);
            inputNewTask.value = '';
            tasksOn++;
            localStorage.setItem("tasksOn", tasksOn);
        } else {
            alert('Esse é o limite de tarefas.');
            tasksOn = "Max";
        }
    }
}

function removeTask(task){
    var li = document.getElementById(''+task.id+'');
    if(li) {
        toDoList.removeChild(li);
        let index = idList.indexOf(task.id);
        idList.splice(index, 1);
        nameList.splice(index, 1);

        localStorage.nameList = JSON.stringify(nameList);
        localStorage.idList = JSON.stringify(idList);
    }

    if(tasksOn == "Max"){
        tasksOn = 10;
    }
    tasksOn--;
    localStorage.setItem("tasksOn", tasksOn);
}

function createTagLI(task) {
    var li = document.createElement('li');
    li.id = task.id;

    var span = document.createElement('span');
    span.classList.add('text-task');
    span.innerHTML = task.name;

    var div = document.createElement('div');

    var buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button-action');
    buttonDelete.innerHTML = '❌';
    buttonDelete.onclick = function(){
        var confirmacao = window.confirm('A tarefa será deletada!')
        if(confirmacao) {
            removeTask(task);
        }
    }

    var buttonCheck = document.createElement('button');
    buttonCheck.classList.add('button-action');
    buttonCheck.innerHTML = '✔️';
    buttonCheck.onclick = function(){
        removeTask(task);

        completeTasks++;
        localStorage.setItem("completeTasks", completeTasks);
        displayCompleteTasks.innerHTML = completeTasks;
    }

    div.appendChild(buttonDelete);
    div.appendChild(buttonCheck);

    li.appendChild(span);
    li.appendChild(div);

    toDoList.appendChild(li);
    return li;
}
