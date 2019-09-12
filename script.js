(function() {
    "use strict";

    class Task {
        constructor(id = 0, description = "", status = "false") {
            this.id = id;
            this.description = description;
            this.status = status;
        }
    }

    const taskStorage = window.localStorage;

    // проверяем, доступен ли вообще localStorage
    function availableLocalStorage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    function taskToJson(task) {
        return JSON.stringify(task);
    }

    function addTask() {
        const newTask = new Task();

        newTask.description = "Описание задачи";

        const jTask = taskToJson(newTask);
        console.log(jTask);
        taskStorage.setItem("task", jTask);
    }

    window.onstorage = event => {
        if (event.key = 'task') console.log(taskStorage.getItem('task'));
    }
    console.log(availableLocalStorage());
    addTask();
})();