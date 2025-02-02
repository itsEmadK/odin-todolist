import { createTaskSummaryComponent } from "./taskSummaryComponent.js";
import { createTaskDetailsComponent } from "./taskDetailsComponent.js";
import { createTaskEditDetailsComponent } from "./taskEditDetailsComponent.js"

function createTaskItemComponent(task, onTaskEdited, onTaskRemoved, onTaskFinishedToggled) {
    const taskListItemEl = document.createElement("li");
    taskListItemEl.classList.add("task-item");
    taskListItemEl.dataset.priority = task.priority;
    taskListItemEl.dataset.taskID = task.id;

    const detailsElement = document.createElement("details");
    detailsElement.addEventListener("click", (e) => {
        if (![...e.target.classList].includes("due-date-input")) {
            e.preventDefault();
        }
    });
    const taskSummary = createTaskSummaryComponent(task,
        () => {
            detailsElement.toggleAttribute("open");
        },
        () => {
            detailsElement.setAttribute("open", "");
            const detailsDefaultDiv = taskListItemEl.querySelector(".task-details-default");
            const editDetailsDiv = taskListItemEl.querySelector(".task-form-container");
            editDetailsDiv.classList.remove("disabled");
            detailsDefaultDiv.classList.add("disabled");
        },
        onTaskRemoved,
        onTaskFinishedToggled
    );
    const taskDetailsComp = createTaskDetailsComponent(task);
    const taskEditDetailsComp = createTaskEditDetailsComponent(
        task,
        (newTitle, newDesc, newPriority, newDueDate) => {
            const detailsEditComponent = taskListItemEl.querySelector(".task-form-container");
            detailsEditComponent.classList.add("disabled");
            taskDetailsComp.classList.remove("disabled");
            detailsElement.setAttribute("open", "");
            onTaskEdited(newTitle, newDesc, newPriority, newDueDate);
        },
        () => {
            const detailsEditComponent = taskListItemEl.querySelector(".task-form-container");
            const detailsComponent = taskListItemEl.querySelector(".task-details-default");
            detailsEditComponent.classList.add("disabled");
            detailsComponent.classList.remove("disabled");
            detailsElement.removeAttribute("open");
        }
    );
    taskEditDetailsComp.classList.add("disabled");

    detailsElement.appendChild(taskSummary);
    detailsElement.appendChild(taskDetailsComp);
    detailsElement.appendChild(taskEditDetailsComp);
    taskListItemEl.appendChild(detailsElement);
    return taskListItemEl;
}

export { createTaskItemComponent }