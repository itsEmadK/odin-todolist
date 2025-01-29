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
        for (let i = 0; i < this.tasks.length; i++) {
            if (task.id === taskID) {
                return task;
            };
        }
        return null;
    }
    
    containsTask(taskID) {
        if (this.findTaskByID(taskID) === null) {
            return false;
        }
        return true;
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

}

export {
    Project
}