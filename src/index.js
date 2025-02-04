import "./styles.css";
import { appManager } from "./logic/appManager.js";
import { uiManager } from "./UI/uiManager.js";
import { TIME_FRAME_VALUES } from "./UI/timeFrameValues.js";
import { isValid } from "date-fns";
import { localStorageManager } from "./storage/localStorage.js";

let selectedProjectID = 0;
let currentTimeFrame = TIME_FRAME_VALUES.NONE;

let addTaskNodeToList = (task) => {
    uiManager.addTaskNodeToList(
        task,
        (newTitle, newDesc, newPriority, newDueDate) => {
            onTaskEdited(task.id, newTitle, newDesc, newPriority, newDueDate);
        },
        () => { onTaskRemoved(task.id) },
        () => { onTaskFinishedToggled(task.id) }
    )
}

let onTaskAdded = (title, desc, priority, dueDate) => {
    const taskID = appManager.createTaskInProject(selectedProjectID, title, desc, new Date(dueDate), +priority);
    updateLocalStorage();
    addTaskNodeToList(appManager.findTaskByID(selectedProjectID, taskID));
}

let onTaskEdited = (taskID, newTitle, newDesc, newPriority, newDueDate) => {
    const date = new Date(newDueDate);
    appManager.editTaskInProject(
        selectedProjectID, taskID,
        newTitle,
        newDesc,
        isValid(date) ? date : null,
        +newPriority
    );
    const editedTask = appManager.findTaskByID(selectedProjectID, taskID)
    updateLocalStorage();
    uiManager.updateTaskNodeInTheList(editedTask);
};

let onTaskRemoved = (taskID) => {
    appManager.removeTaskFromProject(selectedProjectID, taskID);
    updateLocalStorage();
    uiManager.removeTaskNodeFromList(taskID);
}

let onTaskFinishedToggled = (taskID) => {
    appManager.toggleTaskFinishedState(selectedProjectID, taskID);
    updateLocalStorage();
    const editedTask = appManager.findTaskByID(selectedProjectID, taskID);
    uiManager.updateTaskNodeInTheList(editedTask);
}

let onTimeFrameChanged = (timeFrame) => {
    currentTimeFrame = timeFrame;
    uiManager.removeAllTaskNodes();
    appManager.getProjectTasks(selectedProjectID, currentTimeFrame).forEach(task => {
        addTaskNodeToList(task);
    });
}

let onSelectedProjectChanged = (projectID) => {
    selectedProjectID = +projectID;
    const tasks = appManager.getProjectTasks(selectedProjectID, currentTimeFrame);
    uiManager.removeAllTaskNodes();
    tasks.forEach(task => {
        addTaskNodeToList(task);
    });
}

let onProjectAdded = (projectTitle, projectDesc) => {
    const newProjectID = appManager.createProject(projectTitle, projectDesc);
    updateLocalStorage();
    selectedProjectID = newProjectID;
    uiManager.addProjectNodeToList(appManager.findProjectByID(newProjectID));
    uiManager.removeAllTaskNodes();
    const tasks = appManager.getProjectTasks(selectedProjectID, currentTimeFrame);
    tasks.forEach(task => {
        addTaskNodeToList(task);
    })
}

let updateLocalStorage = () => {
    const projects = appManager.getAllProjects();
    localStorageManager.saveProjectsToLocalStorage(projects);
}

uiManager.init(
    onTaskAdded,
    onTimeFrameChanged,
    onSelectedProjectChanged,
    onProjectAdded
);

