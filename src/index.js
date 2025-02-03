import "./styles.css";
import { appManager } from "./logic/appManager.js";
import { uiManager } from "./UI/uiManager.js";
import { TIME_FRAME_VALUES } from "./UI/timeFrameValues.js";
import { isValid } from "date-fns";

const project1ID = appManager.createProject("P1", "PD1");
const project2ID = appManager.createProject("P2", "PD1");
const project3ID = appManager.createProject("P3", "PD1");

uiManager.addProjectNodeToList(appManager.findProjectByID(project1ID));
uiManager.addProjectNodeToList(appManager.findProjectByID(project2ID));
uiManager.addProjectNodeToList(appManager.findProjectByID(project3ID));

appManager.createTaskInProject(0, "T1", "TD1", new Date(2025, 0, 28), 1);
appManager.createTaskInProject(1, "T2", "TD2", new Date(2025, 1, 3), 2);
appManager.createTaskInProject(1, "T3333", "TD2", new Date(2025, 11, 3), 2);
appManager.createTaskInProject(0, "T3", "TD3", new Date(2025, 0, 5), 3);
appManager.createTaskInProject(2, "ATa3", "TD3", new Date(2024, 1, 5), 3);

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
    console.log(taskID);

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
    uiManager.updateTaskNodeInTheList(editedTask);
};

let onTaskRemoved = (taskID) => {
    appManager.removeTaskFromProject(selectedProjectID, taskID);
    uiManager.removeTaskNodeFromList(taskID);
}

let onTaskFinishedToggled = (taskID) => {
    appManager.toggleTaskFinishedState(selectedProjectID, taskID);
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



uiManager.init(
    onTaskAdded,
    onTimeFrameChanged,
    onSelectedProjectChanged
);


onTimeFrameChanged(TIME_FRAME_VALUES.NONE)