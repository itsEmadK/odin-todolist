class Project {
    tasks = [];
    id;
    title;
    desc;
    //TODO: add a deadLine property...
    constructor(id, title, desc = "") {
        this.id = id;
        this.title = title;
        this.desc = desc;
    }

    findTaskByID(taskID) {
        const taskIndex = this.#findTaskIndexByID(taskID);
    }

    containsTask(taskID) {
        return this.#findTaskIndexByID(taskID) > -1;
    }


    addTask(task) {
        this.tasks.push(task.clone());
    }

    getTask(taskID) {
        return this.findTaskByID(taskID);
    }

    getAllTasks() {
        return this.tasks.slice().map((task => task.clone()));
    }

    #findTaskIndexByID(taskID) {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id === taskID) {
                return i;
            }
        }
        return -1;
    }

    editTask(taskID, task) {
        const taskIndex = this.#findTaskIndexByID(taskID);
        if (taskIndex > -1) {
            tasks[taskIndex] = task.clone();
            return true;
        } else {
            return false;
        }
    }

}

export {
    Project
}