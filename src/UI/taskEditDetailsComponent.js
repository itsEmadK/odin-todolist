import { Task } from "../logic/task.js";

function createTaskEditDetailsComponent(task, onSave, onDiscard) {
    const taskEditDetailsDiv = document.createElement("div");
    taskEditDetailsDiv.classList.add("task-details-edit");

    const taskForm = document.createElement("form");

    const titleContainer = document.createElement("label");
    titleContainer.classList.add("title-container");
    const titleLabelTextNode = document.createTextNode("Title:")
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("title-input");
    titleInput.value = task.title;
    titleContainer.appendChild(titleLabelTextNode);
    titleContainer.appendChild(titleInput);

    const descContainer = document.createElement("label");
    descContainer.classList.add("description-container");
    const descLabelTextNode = document.createTextNode("Description:")
    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.classList.add("description-input");
    descInput.value = task.desc;
    descContainer.appendChild(descLabelTextNode);
    descContainer.appendChild(descInput);

    const dateContainer = document.createElement("label");
    dateContainer.classList.add("due-date-container");
    const dateLabelTextNode = document.createTextNode("Due date:")
    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";
    dateInput.classList.add("due-date-input");
    dateInput.value = task.dueDate ?? "";
    dateContainer.appendChild(dateLabelTextNode);
    dateContainer.appendChild(dateInput);

    const priorityContainer = document.createElement("label");
    priorityContainer.classList.add("priority-container");
    const priorityLabelTextNode = document.createTextNode("Priority:")
    const prioritySelect = createPrioritySelectElement();
    prioritySelect.classList.add("priority-input");
    prioritySelect.value = task.priority;
    priorityContainer.appendChild(priorityLabelTextNode);
    priorityContainer.appendChild(prioritySelect)

    const saveEditButton = document.createElement("button");
    saveEditButton.innerText = "Save";
    saveEditButton.classList.add("save-edit");
    saveEditButton.addEventListener("click", (e) => {
        e.preventDefault();
        onSave(taskTitle, taskDesc, taskDueDate, taskPriority);
    });

    const discardEditButton = document.createElement("button");
    discardEditButton.innerText = "Discard";
    discardEditButton.classList.add("discard-edit");
    discardEditButton.addEventListener("click", () => {
        onDiscard();
    });

    const formButtonsContainer = document.createElement("div");
    formButtonsContainer.classList.add("form-buttons-container");
    formButtonsContainer.appendChild(saveEditButton);
    formButtonsContainer.appendChild(discardEditButton);

    taskForm.appendChild(titleContainer);
    taskForm.appendChild(descContainer);
    taskForm.appendChild(dateContainer);
    taskForm.appendChild(priorityContainer);
    taskForm.appendChild(formButtonsContainer);

    taskEditDetailsDiv.appendChild(taskForm);

    return taskEditDetailsDiv;
}

function createPrioritySelectElement() {
    const prioritySelect = document.createElement("select");

    const noPriorityOption = document.createElement("option");
    noPriorityOption.value = Task.NO_PRIORITY;
    noPriorityOption.innerText = Task.getPriorityText(Task.NO_PRIORITY);

    const priorityLowOption = document.createElement("option");
    priorityLowOption.value = Task.PRIORITY_LOW;
    priorityLowOption.innerText = Task.getPriorityText(Task.PRIORITY_LOW);

    const priorityMedOption = document.createElement("option");
    priorityMedOption.value = Task.PRIORITY_MEDIUM;
    priorityMedOption.innerText = Task.getPriorityText(Task.PRIORITY_MEDIUM);

    const priorityHighOption = document.createElement("option");
    priorityHighOption.value = Task.PRIORITY_HIGH;
    priorityHighOption.innerText = Task.getPriorityText(Task.PRIORITY_HIGH);

    const priorityUrgentOption = document.createElement("option");
    priorityUrgentOption.value = Task.PRIORITY_URGENT;
    priorityUrgentOption.innerText = Task.getPriorityText(Task.PRIORITY_URGENT);

    prioritySelect.appendChild(noPriorityOption);
    prioritySelect.appendChild(priorityLowOption);
    prioritySelect.appendChild(priorityMedOption);
    prioritySelect.appendChild(priorityHighOption);
    prioritySelect.appendChild(priorityUrgentOption);

    return prioritySelect;
}

export {
    createTaskEditDetailsComponent
}