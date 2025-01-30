import { createTaskSummaryComponent } from "./taskSummaryComponent.js";
import { createTaskDetailsComponent } from "./taskDetailsComponent.js";

const taskListUIManager = (function () {
    let taskItems = [];

    // taskItem : {
    //     taskLIComponent,
    //     task,
    //     isOpen,
    //     isEditing,
    // }

    function displayTasks(tasks) {
        updateTaskItemsArray(tasks);
        const taskListEl = document.querySelector(".task-list");
        taskListEl.innerHTML = "";
        taskItems.forEach(item => {
            const taskItemComponent = item.taskLIComponent;
            taskListEl.appendChild(taskItemComponent);
            taskItemComponent.addEventListener("click", e => {
                item.isOpen = !item.isOpen;
            });
        });
    }

    function updateTaskItemsArray(tasks) {
        const newTaskItems = [];
        const oldTasks = taskItems.map(item => item.task);
        const oldTaskIDs = oldTasks.map(task => task.id);
        //Update taskItems based on changes(edition, removal, addition):
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (oldTaskIDs.includes(task.id)) {
                const oldTask = oldTasks.find(old => old.id === task.id);
                if (oldTask == task) { //task has not been changed since last render.
                    const oldTaskItem = taskItems.find(taskItem => taskItem.task.id === task.id);
                    newTaskItems.push(oldTaskItem);
                } else { //task info has been changed(so definitely its not in edit mode).
                    const oldTaskItem = taskItems.find(taskItem => taskItem.task.id === task.id);

                    const taskLiComp = createTaskListItemComponent(task);
                    const detailsEl = taskLiComp.querySelector("details");
                    if (oldTaskItem.isOpen) {
                        detailsEl.setAttribute("open", "");
                    }
                    const newTaskItem = {
                        taskLIComponent: taskLiComp,
                        task,
                        isOpen: oldTaskItem.isOpen,
                        isEditing: oldTaskItem.isEditing,
                    }
                    newTaskItems.push(newTaskItem);
                }
            } else {
                const taskLIComp = createTaskListItemComponent(task);
                const temp = {
                    taskLIComponent: taskLIComp,
                    task,
                    isOpen: false,
                    isEditing: false,
                };
                newTaskItems.push(temp);
            }
        }
        taskItems = newTaskItems.slice();
    }

    function createTaskListItemComponent(task) {
        const taskListItemEl = document.createElement("li");
        taskListItemEl.classList.add("task-item");
        taskListItemEl.dataset.priority = task.priority;
        taskListItemEl.dataset.taskID = task.id;

        const detailsElement = document.createElement("details");
        const taskSummary = createTaskSummaryComponent(task);
        const taskDetailsComp = createTaskDetailsComponent(task);
        detailsElement.appendChild(taskSummary);
        detailsElement.appendChild(taskDetailsComp);
        taskListItemEl.appendChild(detailsElement);
        return taskListItemEl;
    }

    return {
        displayTasks,
    }

})();

export {
    taskListUIManager
}