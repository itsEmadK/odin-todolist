function createTaskSummaryComponent(task, onDetailsToggled, onTaskEditButtonClicked, onTaskRemoveClicked, onTaskFinishedToggled) {
    const taskSummaryElement = document.createElement("summary");
    taskSummaryElement.classList.add("task-summary");
    const checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.classList.add("task-finished");
    checkBoxEl.checked = task.finished;
    checkBoxEl.addEventListener("click", (e) => {
        // e.preventDefault();
        e.stopPropagation();
        onTaskFinishedToggled();
    });

    const taskTitlePara = document.createElement("p");
    taskTitlePara.classList.add("task-title");
    taskTitlePara.innerText = task.title;

    const taskDueDatePara = document.createElement("p");
    taskDueDatePara.classList.add("task-due-date");
    taskDueDatePara.innerText = (task.dueDate ?? "No due date");

    const taskDetailsButton = document.createElement("button");
    taskDetailsButton.classList.add("task-details");
    taskDetailsButton.innerText = "DETAILS";
    taskDetailsButton.addEventListener("click", onDetailsToggled);

    const editTaskButton = document.createElement("button");
    editTaskButton.classList.add("edit-task");
    editTaskButton.addEventListener("click", onTaskEditButtonClicked);

    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("remove-task");
    removeTaskButton.addEventListener("click", onTaskRemoveClicked);

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