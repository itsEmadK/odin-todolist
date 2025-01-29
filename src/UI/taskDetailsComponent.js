function createTaskDetailsComponent(task) {
    const taskDetailsDiv = document.createElement("div");
    taskDetailsDiv.classList.add("task-details-default");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");
    const titleLabelPara = document.createElement("p");
    titleLabelPara.innerText = "Title:";
    titleLabelPara.classList.add("title-label");
    const titlePara = document.createElement("p");
    titlePara.classList.add("title");
    titlePara.innerText = task.title;
    titleContainer.appendChild(titleLabelPara);
    titleContainer.appendChild(titlePara);

    const descContainer = document.createElement("div");
    descContainer.classList.add("description-container");
    const descLabelPara = document.createElement("p");
    descLabelPara.innerText = "Description:";
    descLabelPara.classList.add("description-label");
    const descPara = document.createElement("p");
    descPara.classList.add("description");
    descPara.innerText = task.desc;
    descContainer.appendChild(descLabelPara);
    descContainer.appendChild(descPara);

    const dateContainer = document.createElement("div");
    dateContainer.classList.add("due-date-container");
    const dateLabelPara = document.createElement("p");
    dateLabelPara.innerText = "Due date:";
    dateLabelPara.classList.add("due-date-label");
    const datePara = document.createElement("p");
    datePara.classList.add("due-date");
    datePara.innerText = task.dueDate;
    dateContainer.appendChild(dateLabelPara);
    dateContainer.appendChild(datePara);

    const priorityContainer = document.createElement("div");
    priorityContainer.classList.add("priority-container");
    const priorityLabelPara = document.createElement("p");
    priorityLabelPara.innerText = "Priority:";
    priorityLabelPara.classList.add("priority-label");
    const priorityPara = document.createElement("p");
    priorityPara.classList.add("priority");
    priorityPara.innerText = Task.getPriorityText(task.priority);
    priorityContainer.appendChild(priorityLabelPara);
    priorityContainer.appendChild(priorityPara)

    taskDetailsDiv.appendChild(titleContainer);
    taskDetailsDiv.appendChild(descContainer);
    taskDetailsDiv.appendChild(dateContainer);
    taskDetailsDiv.appendChild(priorityContainer);

    return taskDetailsDiv;
}


export {
    createTaskDetailsComponent
}