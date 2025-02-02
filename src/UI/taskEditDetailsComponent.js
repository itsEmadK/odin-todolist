import { createTaskFormComponent } from "./taskFormComponent.js";

function createTaskEditDetailsComponent(task, onTaskEdited, onEditDiscard) {
    const taskEditDetailsDiv = document.createElement("div");
    taskEditDetailsDiv.classList.add("task-form-container");
    const taskForm = createTaskFormComponent(onTaskEdited, onEditDiscard, task);
    taskEditDetailsDiv.appendChild(taskForm);
    return taskEditDetailsDiv;
}


export {
    createTaskEditDetailsComponent
}