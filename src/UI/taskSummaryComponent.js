function createTaskSummaryComponent(task) {
    const taskSummaryElement = document.createElement("summary");
    taskSummaryElement.classList.add("task-summary");
    const checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.classList.add("task-finished");
    checkBoxEl.checked = task.finished;

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

    return taskSummaryElement;

}

export {
    createTaskSummaryComponent
}