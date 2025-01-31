import { createTaskItemComponent } from "./taskItemComponent.js";
import { taskListUIManager } from "./taskListUIManager";

const uiManager = (function () {
    let selectedProjectID = null;
    const taskListEl = document.querySelector(".task-list");
    function addTaskNodeToList(task, onTaskEdit, onTaskRemoved, onTaskFinishedToggled) {
        const taskItem = createTaskItemComponent(
            task,
            (newTitle, newDesc, newPriority, newDueDate) => {
                onTaskEdit(newTitle, newDesc, newPriority, newDueDate)
            },
            () => onTaskRemoved(),
            () => onTaskFinishedToggled()
        );
        taskListEl.appendChild(taskItem);
    }

    function removeTaskNodeFromList(task) {
        const node = findTaskNodeByID(task.id);
        if (node !== null) {
            node.parentElement.removeChild(node);
        }
    }

    function updateTaskNodeInTheList(task) {
        const taskItemComponent = findTaskNodeByID(task.id);
        const summaryTitlePara = taskItemComponent.querySelector(".task-title");
        const summaryFinishedCheckbox = taskItemComponent.querySelector("input.task-finished");
        const summaryDueDatePara = taskItemComponent.querySelector(".task-due-date");
        summaryTitlePara.innerText = task.title;
        summaryFinishedCheckbox.checked = task.finished;
        summaryDueDatePara.innerText = (task.dueDate ?? "No due date");

        const detailsDiv = taskItemComponent.querySelector(".task-details-default");

        if (detailsDiv !== null) {
            const detailsTitlePara = detailsDiv.querySelector(".title");
            const detailsDescPara = detailsDiv.querySelector(".description");
            const detailsPriorityPara = detailsDiv.querySelector(".priority");
            const detailsDueDatePara = detailsDiv.querySelector(".due-date");

            detailsTitlePara.innerText = task.title;
            detailsDescPara.innerText = task.desc;
            detailsPriorityPara.innerText = task.priority;
            detailsDueDatePara.innerText = (task.dueDate ?? "No due date");
        }

        const editDetailsDiv = taskListUIManager.querySelector(".task-details-edit");
        if (editDetailsDiv !== null) {
            const taskForm = editDetailsDiv.querySelector("form");
            const titleInput = taskForm.querySelector("input.title-input");
            const prioritySelect = taskForm.querySelector("select.priority-input");
            const descInput = taskForm.querySelector("input.description-input");
            const dueDateInput = taskForm.querySelector("input.due-date-input");

            titleInput.innerText = task.title;
            prioritySelect.value = task.priority;
            descInput.innerText = task.desc;
            dueDateInput.innerText = task.dueDate;

        }
    }

    function findTaskNodeByID(taskID) {
        const taskListEl = document.querySelector(".task-list");
        const taskListItems = [...taskListEl.querySelectorAll("li.task-item")];

        for (let i = 0; i < taskListItems.length; i++) {
            const taskLI = taskListItems[i];
            if (taskLI.dataset.taskID === taskID) {
                return taskLI;
            }
        }

        return null;
    }

    return {
        addTaskNodeToList,
        removeTaskNodeFromList,
        updateTaskNodeInTheList,
    }

})();

export {
    uiManager,
}