import { createTaskSummaryComponent } from "./taskSummaryComponent.js";

const UIManager = (function () {

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
    

})();