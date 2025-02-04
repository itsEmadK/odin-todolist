import { createTaskItemComponent } from "./taskItemComponent.js";
import { createTaskFormComponent } from "./taskFormComponent.js";
import { TIME_FRAME_VALUES } from "./timeFrameValues.js";
import { isValid, format } from "date-fns";
import { createProjectFormComponent } from "./projectFormComponent.js";

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

    function removeTaskNodeFromList(taskID) {
        const node = findTaskNodeByID(taskID);
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
            if (taskLI.dataset.taskID == taskID) {
                return taskLI;
            }
        }

        return null;
    }

    function reOrderTaskNode(taskID, newPosition) {
        //TODO: reposition task node to new position.
    }

    function init(
        onTaskAddedListener,
        onTimeFrameChanged,
        onProjectSelected,
        onProjectAdded
    ) {
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

        const projectList = document.querySelector(".project-list");
        projectList.addEventListener("click", (e) => {
            if ([...e.target.classList].includes("project")) {
                const node = e.target;
                addTaskButton.classList.remove("hidden");
                isAnyProjectSelectedYet = true;
                const projectID = node.dataset.projectID;
                const projectNodes = projectList.querySelectorAll(".project");
                projectNodes.forEach(node => node.classList.remove("selected"));
                node.classList.add("selected");
                onProjectSelected(projectID);
            }
        });

        const projectsDiv = document.querySelector(".projects");
        const addProjectBtn = projectsDiv.querySelector("button.add-project");
        addProjectBtn.addEventListener("click", () => {
            addProjectBtn.classList.add("hidden");
            projectForm.classList.remove("hidden");
        });

        const projectForm = createProjectFormComponent(
            (projectTitle, projectDesc) => {
                onProjectAdded(projectTitle, projectDesc);
                const form = projectsDiv.querySelector(".project-form");
                form.reset();
                form.classList.add("hidden");
                addProjectBtn.classList.remove("hidden");
            },
            () => {
                const form = projectsDiv.querySelector(".project-form");
                form.reset();
                form.classList.add("hidden");
                addProjectBtn.classList.remove("hidden");
            }
        );
        projectForm.classList.add("hidden");
        projectsDiv.appendChild(projectForm);

    }


    function addProjectNodeToList(project) {

        const addTaskButton = document.querySelector("button.add-task");
        addTaskButton.classList.remove("hidden");

        const projectList = document.querySelector(".project-list");
        const projectNode = document.createElement("li");
        projectNode.classList.add("project");
        projectNode.classList.add("selected");

        const projectListEl = document.querySelector(".project-list");
        const projectNodes = projectListEl.querySelectorAll("li.project");
        projectNodes.forEach(node => {
            node.classList.remove("selected");
        });
        projectNode.dataset.projectID = project.id;
        projectNode.innerText = project.title;
        projectNode.addEventListener("click", () => {
            const projectListEl = document.querySelector(".project-list");
            const projectNodes = projectListEl.querySelectorAll("li.project");
            projectNodes.forEach(node => {
                node.classList.remove("selected");
            });
            projectNode.classList.add("selected");
        });
        projectList.appendChild(projectNode);
    }

    function removeAllTaskNodes() {
        const list = document.querySelector(".task-list");
        list.innerHTML = "";
    }

    function selectProjectNode(projectID) {
        const projectNodes = document.querySelectorAll("li.project");
        projectNodes.forEach(node => {
            if (node.dataset.projectID == projectID) {
                projectNodes.forEach(node => node.classList.remove("selected"));
                node.classList.add("selected");
            }
        });
    }

    return {
        addTaskNodeToList,
        removeTaskNodeFromList,
        updateTaskNodeInTheList,
        init,
        removeAllTaskNodes,
        addProjectNodeToList,
        selectProjectNode,
    }

})();

export {
    uiManager,
}