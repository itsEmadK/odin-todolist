import { createTaskSummaryComponent } from "./taskSummaryComponent.js";

const taskListUIManager = (function () {
    let taskItems = [];

    // taskItem : {
    //     taskLIComponent,
    //     task,
    //     isOpen,
    //     isEditing,
    // }


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
                } else { //task info has been changed.
                    const oldTaskItem = taskItems.find(taskItem => taskItem.task.id === task.id);
                    oldTaskItem.task = task;
                    newTaskItems.push(oldTaskItem);
                }
            } else {
                const temp = {
                    taskLIComponent: createTaskListItemComponent(task),
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
        detailsElement.appendChild(taskSummary);
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