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
    const addBtn = document.querySelector(".btn-add");
    const ul = document.querySelector(".task-area");
    const newTD = document.querySelector("#newTD").value;

    //-- handlers
    function taskToJson(task) {
        return JSON.stringify(task);
    }

    function getAllTask(storage) {
        return JSON.parse(storage) || [];
    }

    function lastTaskId(taskList) {
        return taskList.length + 1;
    }



    function setNewTask(taskList) {
        const id = lastTaskId(taskList);
        const value = document.querySelector("#newTD").value;

        if (value) {
            const newTask = new Task(id, value);
            taskList.push(newTask);

            taskStorage.setItem(taskPath, taskToJson(taskList));
            clearList(ul);
            listOutput(taskList);
        }
    }

    function addTaskRow(item) {
        const taskList = document.querySelector(".task-area");

        const id = `<span class="task-id">${item.id}</span> `;
        const description = `<span class="task-description">${item.description}</span> `;
        const btn = `<span class="task-action"> <button class="btn-ok" ></button> <button class="btn-del"></button> </span>`;

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
        ul.innerHTML = "";
    }

    //-- running


    let taskList = getAllTask(taskStorage.getItem(taskPath));

    listOutput(taskList);

    addBtn.addEventListener(
        "click",
        () => {
            setNewTask(taskList, newTD);
        },
        false
    );

    function toggleTask(id, status, taskList) {
        taskList[id].status = status;
        const ttj = taskToJson(taskList);
        localStorage.setItem(taskPath, ttj);
    }

    function deleteTask(id, tasklist) {
        console.log(tasklist);
        const tmpList = taskList.filter(item => item.id !== id + 1);
        const ttj = taskToJson(tmpList);
        localStorage.setItem(taskPath, ttj);

        taskList = getAllTask(taskStorage.getItem(taskPath));
        clearList(ul);
        listOutput(taskList);

    }

    ul.addEventListener("click", event => {
        const e = event.target;

        const li = e.closest("li");
        const id = li.querySelector(".task-id").innerText - 1;

        if (e.className === "btn-ok") {
            const status = li.classList.toggle("task-done");
            toggleTask(id, status, taskList);
        }

        if (e.className === "btn-del") {
            deleteTask(id, taskList);
        }
    });
})();