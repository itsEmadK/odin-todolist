import { createPrioritySelectElement } from "./prioritySelectComponent.js";

function createTaskFormComponent(onSave, onDiscard, task = null) {
    const taskForm = document.createElement("form");
    if (task !== null) {
        taskForm.id = "task-form-" + task.id;
    } else {
        taskForm.id = "task-form";
    }

    const titleContainer = document.createElement("label");
    titleContainer.classList.add("title-container");
    const titleLabelTextNode = document.createTextNode("Title:")
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.setAttribute("required", "");
    titleInput.classList.add("title-input");
    if (task !== null) {
        titleInput.value = task.title;
    }
    titleContainer.appendChild(titleLabelTextNode);
    titleContainer.appendChild(titleInput);

    const descContainer = document.createElement("label");
    descContainer.classList.add("description-container");
    const descLabelTextNode = document.createTextNode("Description:")
    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.classList.add("description-input");
    if (task !== null) {
        descInput.value = task.desc;
    }
    descContainer.appendChild(descLabelTextNode);
    descContainer.appendChild(descInput);

    const dateContainer = document.createElement("label");
    dateContainer.classList.add("due-date-container");
    const dateLabelTextNode = document.createTextNode("Due date:")
    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";
    dateInput.classList.add("due-date-input");
    if (task !== null) {
        dateInput.value = task.dueDate ?? "";
    }
    dateContainer.appendChild(dateLabelTextNode);
    dateContainer.appendChild(dateInput);

    const priorityContainer = document.createElement("label");
    priorityContainer.classList.add("priority-container");
    const priorityLabelTextNode = document.createTextNode("Priority:")
    const prioritySelect = createPrioritySelectElement();
    prioritySelect.classList.add("priority-input");
    if (task !== null) {
        prioritySelect.value = task.priority;
    }
    priorityContainer.appendChild(priorityLabelTextNode);
    priorityContainer.appendChild(prioritySelect)

    const saveEditButton = document.createElement("button");
    saveEditButton.innerText = "Save";
    saveEditButton.type = "submit";
    saveEditButton.setAttribute("form", taskForm.id);
    saveEditButton.classList.add("save-edit");
    saveEditButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (taskForm.reportValidity()) {
            const newTitle = titleInput.value;
            const newDesc = descInput.value;
            const newPriority = +prioritySelect.value;
            const newDueDate = dateInput.value;
            onSave(newTitle, newDesc, newPriority, newDueDate);
        }
    })

    const discardEditButton = document.createElement("button");
    discardEditButton.innerText = "Discard";
    discardEditButton.type = "button";
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

    return taskForm
}


export { createTaskFormComponent }