let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let completedTasks = document.getElementById("completedTasks");
let allTasks = document.getElementById("allTasks");
let allTaskBtn = document.getElementById("allTaskBtn");
let completeTaskBtn = document.getElementById("completeTaskBtn");

completedTasks.style.display = "none";
allTasks.style.display = "none";

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskText = taskInput.value.trim();
    if (!taskText) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    taskInput.value = "";
}

function renderTasks() {
    taskList.innerHTML = "";
    allTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerText = task.text;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            completedTasks.appendChild(li);
        } else {
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.style.marginLeft = "10px";
            completeBtn.onclick = function () {
                task.completed = true;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.style.marginLeft = "5px";
            deleteBtn.onclick = function () {
                tasks = tasks.filter(t => t.text !== task.text);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            };

            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        }

        const allLi = document.createElement("li");
        allLi.innerText = task.text;
        allTasks.appendChild(allLi);
    });
}

function loadTasks() {
    renderTasks();
}

allTaskBtn.onclick = function () {
    allTasks.style.display = "block";
    completedTasks.style.display = "block";
    taskList.style.display = "block";
};

completeTaskBtn.onclick = function () {
    completedTasks.style.display = "block";
    allTasks.style.display = "none";
    taskList.style.display = "none";
};
