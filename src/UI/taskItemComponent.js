import { createTaskSummaryComponent } from "./taskSummaryComponent.js";
import { createTaskDetailsComponent } from "./taskDetailsComponent.js";
import { createTaskEditDetailsComponent } from "./taskEditDetailsComponent.js"

function createTaskItemComponent(task, onTaskEdited, onTaskRemoved, onTaskFinishedToggled) {
    const taskListItemEl = document.createElement("li");
    taskListItemEl.classList.add("task-item");
    taskListItemEl.dataset.priority = task.priority;
    taskListItemEl.dataset.taskID = task.id;

    const detailsElement = document.createElement("details");
    const taskSummary = createTaskSummaryComponent(task,
        () => {
            detailsElement.toggleAttribute("open");
        },
        () => {
            const editDetailsDiv = taskListItemEl.querySelector(".task-details-edit");
            editDetailsDiv.classList.remove("disabled");
        },
        () => {
            onTaskRemoved();
        },
        () => {
            onTaskFinishedToggled();
        }
    );
    const taskDetailsComp = createTaskDetailsComponent(task);
    const taskEditDetailsComp = createTaskEditDetailsComponent(
        task,
        () => {
            onTaskEdited();
        },
        () => {
            const detailsEditComponent = taskListItemEl.querySelector(".task-details-edit");
            const detailsComponent = taskListItemEl.querySelector(".task-details.default");
            detailsEditComponent.classList.add("disabled");
            detailsComponent.classList.remove("disabled");
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