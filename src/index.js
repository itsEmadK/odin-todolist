import "./styles.css";
import { appManager } from "./logic/appManager.js";
import { uiManager } from "./UI/uiManager.js";

appManager.createProject("P1", "PD1");
appManager.createProject("P2", "PD2");

appManager.createTaskInProject(0, "T1", "TD1", null, 1);
appManager.createTaskInProject(0, "T2", "TD2", null, 2);
appManager.createTaskInProject(0, "T3", "TD3", null, 3);
appManager.createTaskInProject(1, "T4", "TD4", null, 4);

let selectedProjectID = 0;

let onTaskAdded = (title, desc, priority, dueDate) => {
    const taskID = appManager.createTaskInProject(selectedProjectID, title, desc, dueDate, priority);
    uiManager.addTaskNodeToList(
        appManager.findTaskByID(selectedProjectID, taskID),
        (newTitle, newDesc, newPriority, newDueDate) => {
            onTaskEdited(taskID, newTitle, newDesc, newPriority, newDueDate);
        },
        () => {
            onTaskRemoved(taskID);
        },
        () => {
            onTaskFinishedToggled(taskID);
        }
    );
}

let onTaskEdited = (taskID, newTitle, newDesc, newPriority, newDueDate) => {
    appManager.editTaskInProject(
        selectedProjectID, taskID,
        newTitle,
        newDesc,
        newDueDate,
        newPriority
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

uiManager.init(onTaskAdded);

const tasks = appManager.getProjectTasks(selectedProjectID);

for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    uiManager.addTaskNodeToList(
        task,
        (newTitle, newDesc, newPriority, newDueDate) => {
            onTaskEdited(task.id, newTitle, newDesc, newPriority, newDueDate);
        },
        () => { onTaskRemoved(task.id) },
        () => { onTaskFinishedToggled(task.id) }
    )

}