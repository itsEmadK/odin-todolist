function createTaskItemComponent(task) {
    const taskListItemEl = document.createElement("li");
    taskListItemEl.classList.add("task-item");
    taskListItemEl.dataset.priority = task.priority;
    taskListItemEl.dataset.taskID = task.id;

    const detailsElement = document.createElement("details");

    const taskSummaryElement = document.createElement("summary");
    taskSummaryElement.classList.add("task-summary");
    const checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";

    const taskTitlePara = document.createElement("p");
    taskTitlePara.classList.add("task-title");
    taskTitlePara.innerText = task.title;

    const taskDueDatePara = document.createElement("p");
    taskDueDatePara.classList.add("task-due-date");
    taskDueDatePara.innerText = (task.dueDate ?? "No due date");

    const taskDetailsButton = document.createElement("button");
    taskDetailsButton.classList.add("task-details");
    taskDetailsButton.innerText = "DETAILS";

    const editTaskButton = document.createElement("button");
    editTaskButton.classList.add("edit-task");
    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("remove-task");

    taskSummaryElement.appendChild(checkBoxEl);
    taskSummaryElement.appendChild(taskTitlePara);
    taskSummaryElement.appendChild(taskDetailsButton);
    taskSummaryElement.appendChild(taskDueDatePara);
    taskSummaryElement.appendChild(editTaskButton);
    taskSummaryElement.appendChild(removeTaskButton);

    detailsElement.appendChild(taskSummaryElement);
    taskListItemEl.appendChild(detailsElement);
    return taskListItemEl;


}

export {
    createTaskItemComponent
}