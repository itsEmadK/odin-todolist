import { createTaskSummaryComponent } from "./taskSummaryComponent.js";
import { createTaskDetailsComponent } from "./taskDetailsComponent.js";
import { createTaskEditDetailsComponent } from "./taskEditDetailsComponent.js"

const taskListUIManager = (function () {
    let taskIDs = [];
    let onTaskUpdated = null;
    let onTaskRemoved = null;


    function displayTasks(tasks) {
        // console.log("--------------------------");
        // console.log(`BEFORE ${taskIDs}`);
        const taskListEl = document.querySelector(".task-list");

        //Remove deleted tasks from DOM:
        for (let i = 0; i < taskIDs.length; i++) {
            const id = taskIDs[i];
            if (!tasks.map(t => t.id).includes(id)) {
                //old tasks include some id which is not present in new tasks,
                //so it should be removed.
                const node = findTaskNodeByID(id);
                node.parentNode.removeChild(node);
                // console.log(`DELETED ${id}`);
            }
        }

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (taskIDs.includes(task.id)) {
                // console.log(`UPDATED ${task.id}`);
                updateTaskLIComponent(task);
                const taskIdToInsertAfter = tasks[i].id;
                const taskNodeToInsertAfter = findTaskNodeByID(taskIdToInsertAfter);
                const taskNodeToInsertBefore =
                    taskNodeToInsertAfter === null ? null :
                        taskNodeToInsertAfter.nextSibling;

                const taskLIComp = findTaskNodeByID(task.id);
                if (taskNodeToInsertBefore === null) {
                    taskListEl.appendChild(taskLIComp);
                } else {
                    taskListEl.insertBefore(taskLIComp, taskNodeToInsertBefore);
                }
            } else {
                // console.log(`ADDED ${task.id}`);
                const taskIdToInsertAfter = tasks[i].id;
                const taskNodeToInsertAfter = findTaskNodeByID(taskIdToInsertAfter);
                const taskNodeToInsertBefore =
                    taskNodeToInsertAfter === null ? null :
                        taskNodeToInsertAfter.nextSibling;

                const taskLIComp = createTaskListItemComponent(task);
                if (taskNodeToInsertBefore === null) {
                    taskListEl.appendChild(taskLIComp);
                } else {
                    taskListEl.insertBefore(taskLIComp, taskNodeToInsertBefore);
                }
            }
        }
        taskIDs = tasks.map(task => task.id);
        // console.log(`AFTER ${taskIDs}`);
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

    function updateTaskLIComponent(task) {
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

    }

    function createTaskListItemComponent(task) {
        const taskListItemEl = document.createElement("li");
        taskListItemEl.classList.add("task-item");
        taskListItemEl.dataset.priority = task.priority;
        taskListItemEl.dataset.taskID = task.id;

        const detailsElement = document.createElement("details");
        const taskSummary = createTaskSummaryComponent(task);
        const taskDetailsComp = createTaskDetailsComponent(task);
        const taskEditDetailsComp = createTaskEditDetailsComponent(task);
        taskEditDetailsComp.classList.add("disabled");

        detailsElement.appendChild(taskSummary);
        detailsElement.appendChild(taskDetailsComp);
        detailsElement.appendChild(taskEditDetailsComp);
        taskListItemEl.appendChild(detailsElement);
        addTaskNodeListenersForDetailsOpenState(taskListItemEl);
        addTaskNodeListenersForEditButton(taskListItemEl);
        return taskListItemEl;
    }

    function addTaskNodeListenersForDetailsOpenState(taskNode) {
        if (taskNode !== null) {
            const detailsEl = taskNode.querySelector("details");
            const taskDetailsButton = taskNode.querySelector("button.task-details");
            taskDetailsButton.addEventListener("click", () => {
                detailsEl.toggleAttribute("open");
            });
            detailsEl.addEventListener("click", e => { e.preventDefault() });
        }
    }

    function addTaskNodeListenersForEditButton(taskNode, task) {
        if (taskNode !== null) {
            const detailsEl = taskNode.querySelector("details");
            const taskEditButton = taskNode.querySelector("button.edit-task");
            taskEditButton.addEventListener("click", () => {
                const detailsComponent = detailsEl.querySelector(".task-details-default");
                const detailsEditComponent = detailsEl.querySelector(".task-details-edit");
                detailsComponent.classList.add("disabled");
                detailsEditComponent.classList.remove("disabled");
                detailsEl.setAttribute("open", "");
            });

        }
    }

    function setOnTaskEditedListener(listenerFn) {
        onTaskUpdated = listenerFn;
    }

    function setOnTaskRemovedListener(listenerFn) {
        onTaskRemoved = listenerFn;
    }
    return {
        displayTasks,
        setOnTaskRemovedListener,
        setOnTaskEditedListener,
    }

})();

export {
    taskListUIManager
}