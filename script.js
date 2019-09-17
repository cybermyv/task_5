(function() {
    "use strict";

    class Task {
        constructor(id = 0, description = "", status = false) {
            this.id = id;
            this.description = description;
            this.status = status;
        }
    }

    const taskStorage = window.localStorage;
    const taskPath = "task";
    const addBtn = document.querySelector(".addBtn");
    const ul = document.querySelector(".task-area");
    const newTD = document.querySelector("#newTD").value;


    function taskToJson(task) {
        return JSON.stringify(task);
    }

    function getAllTask() {
        const task = taskStorage.getItem(taskPath);
        return JSON.parse(task) || [];
    }

    function lastTaskId(taskList) {
        return taskList.length + 1;
    }

    function setNewTask(taskList) {
        const id = lastTaskId(taskList);
        const value = document.querySelector("#newTD").value;

        const newTask = new Task(id, value);
        taskList.push(newTask);

        taskStorage.setItem(taskPath, taskToJson(taskList));

        clearList(ul);
        listOutput(taskList);
    }

    function addTaskRow(item) {
        const taskList = document.querySelector(".task-area");

        const id = `<span class="task-id">${item.id}</span> `;
        const description = `<span class="task-description">${item.description}</span> `;
        const btn = `<span class="task-action"> <button class="btn-ok">Выполнено</button> <button class="btn-del">Удалить</button> </span>`;

        const task = document.createElement("li");
        task.innerHTML = id + description + btn;
        task.classList.add("task-row");

        if (item.status) task.classList.add("task-done");



        taskList.appendChild(task);
    }

    function listOutput(tasks) {
        clearList(ul);
        tasks.forEach(element => {
            addTaskRow(element);
        });
    }

    function clearList(ul) {
        ul.innerHTML = '';
    }

    let taskList = getAllTask();

    listOutput(taskList);


    // const st = setNewTask(taskList, newTD);

    addBtn.addEventListener(
        "click",
        function() {
            setNewTask(taskList, newTD);
        },
        false
    );

    ul.addEventListener('click', event => {
        const btn = event.target.closest('.btn-ok');

        const id = li.firstChild;

        console.log(id.te);

        li.classList.add('task-done');
    })



})();