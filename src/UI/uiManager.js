import { createTaskItemComponent } from "./taskItemComponent.js";
import { createTaskFormComponent } from "./taskFormComponent.js";
import { TIME_FRAME_VALUES } from "./timeFrameValues.js";
import { isValid, format } from "date-fns";

const uiManager = (function () {
    let isAnyProjectSelectedYet = false;
    const taskListEl = document.querySelector(".task-list");
    function addTaskNodeToList(task, onTaskEdit, onTaskRemoved, onTaskFinishedToggled) {
        const taskItem = createTaskItemComponent(
            task,
            onTaskEdit,
            onTaskRemoved,
            onTaskFinishedToggled
        );
        taskListEl.appendChild(taskItem);
    }

    function removeTaskNodeFromList(task) {
        const node = findTaskNodeByID(task.id);
        if (node !== null) {
            node.parentElement.removeChild(node);
        }
    }

    function updateTaskNodeInTheList(task) {
        const taskItemComponent = findTaskNodeByID(task.id);
        taskItemComponent.dataset.priority = task.priority;
        const summaryTitlePara = taskItemComponent.querySelector(".task-title");
        const summaryFinishedCheckbox = taskItemComponent.querySelector("input.task-finished");
        const summaryDueDatePara = taskItemComponent.querySelector(".task-due-date");
        const summaryCheckbox = taskItemComponent.querySelector("input.task-finished");

        summaryTitlePara.innerText = task.title;
        summaryFinishedCheckbox.checked = task.finished;
        if (isValid(task.dueDate)) {
            summaryDueDatePara.innerText = format(task.dueDate, "yyyy/MM/dd");
        } else {
            summaryDueDatePara.innerText = "No due date"
        }
        summaryCheckbox.checked = task.finished;

        const detailsDiv = taskItemComponent.querySelector(".task-details-default");

        if (detailsDiv !== null) {
            const detailsTitlePara = detailsDiv.querySelector(".title");
            const detailsDescPara = detailsDiv.querySelector(".description");
            const detailsPriorityPara = detailsDiv.querySelector(".priority");
            const detailsDueDatePara = detailsDiv.querySelector(".due-date");

            detailsTitlePara.innerText = task.title;
            detailsDescPara.innerText = task.desc;
            detailsPriorityPara.innerText = task.priority;
            if (isValid(task.dueDate)) {
                detailsDueDatePara.innerText = format(task.dueDate, "yyyy/MM/dd");
            } else {
                detailsDueDatePara.innerText = "No due date"
            }
        }

        const editDetailsDiv = taskItemComponent.querySelector(".task-form-container");
        if (editDetailsDiv !== null) {
            const taskForm = editDetailsDiv.querySelector("form");
            const titleInput = taskForm.querySelector("input.title-input");
            const prioritySelect = taskForm.querySelector("select.priority-input");
            const descInput = taskForm.querySelector("input.description-input");
            const dueDateInput = taskForm.querySelector("input.due-date-input");

            titleInput.innerText = task.title;
            prioritySelect.value = task.priority;
            descInput.value = task.desc;
            if (isValid(task.dueDate)) {
                dueDateInput.value = task.dueDate.toISOString().slice(0, 16);;
            }
        }
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

    function reOrderTaskNode(taskID, newPosition) {
        //TODO: reposition task node to new position.
    }

    function init(onTaskAddedListener, onTimeFrameChanged, onProjectSelected) {
        const addTaskContainer = document.querySelector(".add-task-container");
        const addTaskButton = addTaskContainer.querySelector("button.add-task");
        addTaskButton.classList.add("hidden");
        const taskFormContainer = document.createElement("div");
        taskFormContainer.classList.add("task-form-container", "hidden");

        const taskForm = createTaskFormComponent(
            (newTitle, newDesc, newPriority, newDueDate) => {
                onTaskAddedListener(newTitle, newDesc, newPriority, newDueDate);
                addTaskContainer.appendChild(addTaskButton);
                addTaskButton.classList.remove("hidden");
                taskFormContainer.classList.add("hidden");
                taskFormContainer.querySelector("form").reset();
            },
            () => {
                addTaskButton.classList.remove("hidden");
                taskFormContainer.classList.add("hidden");
                taskFormContainer.querySelector("form").reset();
            },
            null
        );
        const taskFormContainerHeading = document.createElement("h3");
        taskFormContainerHeading.innerText = "Add a new task";
        taskFormContainer.appendChild(taskFormContainerHeading);
        taskFormContainer.appendChild(taskForm);

        addTaskContainer.appendChild(taskFormContainer);
        addTaskButton.addEventListener("click", () => {
            taskFormContainer.classList.remove("hidden");
            addTaskButton.classList.add("hidden");
        });

        const noTimeFrameEl = document.querySelector(".nav-item.all");
        const todayTimeFrameEl = document.querySelector(".nav-item.today");
        const nextSevenTimeFrameEl = document.querySelector(".nav-item.next-7-days");

        noTimeFrameEl.addEventListener("click", () => {
            onTimeFrameChanged(TIME_FRAME_VALUES.NONE);
            todayTimeFrameEl.classList.remove("selected");
            nextSevenTimeFrameEl.classList.remove("selected");
            noTimeFrameEl.classList.add("selected");
        });

        todayTimeFrameEl.addEventListener("click", () => {
            onTimeFrameChanged(TIME_FRAME_VALUES.TODAY);
            todayTimeFrameEl.classList.add("selected");
            nextSevenTimeFrameEl.classList.remove("selected");
            noTimeFrameEl.classList.remove("selected");
        });

        nextSevenTimeFrameEl.addEventListener("click", () => {
            onTimeFrameChanged(TIME_FRAME_VALUES.NEXT_SEVEN_DAYS);
            todayTimeFrameEl.classList.remove("selected");
            nextSevenTimeFrameEl.classList.add("selected");
            noTimeFrameEl.classList.remove("selected");
        });


        const projectNodes = document.querySelectorAll(".project");
        projectNodes.forEach(node => {
            node.addEventListener("click", () => {
                addTaskButton.classList.remove("hidden");
                isAnyProjectSelectedYet = true;
                const projectID = node.dataset.projectID;
                projectNodes.forEach(node => node.classList.remove("selected"));
                node.classList.add("selected");
                onProjectSelected(projectID);
            });
        });
    }


    function addProjectNodeToList(project) {
        const projectList = document.querySelector(".project-list");
        const projectNode = document.createElement("li");
        projectNode.classList.add("project");
        projectNode.dataset.projectID = project.id;
        projectNode.innerText = project.title;
        projectList.appendChild(projectNode);
    }

    function removeAllTaskNodes() {
        const list = document.querySelector(".task-list");
        list.innerHTML = "";
    }

    return {
        addTaskNodeToList,
        removeTaskNodeFromList,
        updateTaskNodeInTheList,
        init,
        removeAllTaskNodes,
        addProjectNodeToList,
    }

})();

export {
    uiManager,
}