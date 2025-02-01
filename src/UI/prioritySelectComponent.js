import { Task } from "../logic/task.js";

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

export { createPrioritySelectElement };