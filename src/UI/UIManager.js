import { createTaskSummaryComponent } from "./taskSummaryComponent.js";

const UIManager = (function () {
    let taskItems = [];

    function displayTasks(tasks) {
        taskItems = [];
        const taskListEl = document.querySelector(".task-list");
        tasks.forEach((task => {
            const taskListItemComponent = createTaskListItemComponent(task);
            taskListEl.appendChild(taskListItemComponent);
            taskItems.push({
                taskListItemComponent,
                isEditing: false,
                isOpen: false,
            })
        }));
    }

    function createTaskListItemComponent(task) {
        const taskListItemEl = document.createElement("li");
        taskListItemEl.classList.add("task-item");
        taskListItemEl.dataset.priority = task.priority;
        taskListItemEl.dataset.taskID = task.id;

        const detailsElement = document.createElement("details");
        const taskSummary = createTaskSummaryComponent(task);
        detailsElement.appendChild(taskSummary);
        taskListItemEl.appendChild(detailsElement);
        return taskListItemEl;
    }

    return {
        displayTasks,
    }

})();

export {
    UIManager
}