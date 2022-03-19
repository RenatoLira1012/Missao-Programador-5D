let input = document.getElementById("input-todo")
let addButton = document.getElementById("add-button")
let task = document.getElementById("id-task-name")
let completeTaskList = document.getElementById("container-tasks")
let arrayTasks = []
input.focus()

reloadTasks()

function showTasks() {
    let newLi = ''
    arrayTasks.forEach((task, index) => {
        newLi += `<li class="item-task ${task.done == true ? "done-task" : ""}">
        <button class="done-task-button" onclick="doneTask(${index})"><i class="fa-solid fa-circle-check"></i></button>
            <p class="task-name ${task.done == true ? "done-task" : ""}" id="id-task-name">${task.task}</p>
        <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                </li>`

    })
    completeTaskList.innerHTML = newLi

    localStorage.setItem("taskList", JSON.stringify(arrayTasks))
}

function addTask() {
    if (!input.value) {
        alert("Digite uma tarefa!")
        input.focus()
    }
    else {
        arrayTasks.push({
            task: input.value,
            done: false
        })

        input.value = ''
        input.focus()

        showTasks()
    }
}

function deleteTask(index) {
    arrayTasks.splice(index, 1)

    showTasks()
}

function doneTask(index) {
    arrayTasks[index].done = !arrayTasks[index].done

    showTasks()
}

function reloadTasks() {
    let myTasks = localStorage.getItem("taskList")

    if (myTasks) {
        arrayTasks = JSON.parse(myTasks)
    }

    showTasks()
}

addButton.addEventListener("click", addTask)

document.addEventListener('keypress', function (e) {
    if (e.which == 13) {
        addTask()
    }
}, false);