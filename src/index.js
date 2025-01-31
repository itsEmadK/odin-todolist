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


const tasks = appManager.getProjectTasks(selectedProjectID);

for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    uiManager.addTaskNodeToList(
        task,
        (newTitle, newDesc, newPriority, newDueDate) => {
            appManager.editTaskInProject(
                selectedProjectID, task.id,
                newTitle,
                newDesc,
                newDueDate,
                newPriority
            );
            const editedTask = appManager.findTaskByID(selectedProjectID, task.id)
            uiManager.updateTaskNodeInTheList(editedTask);
            console.log("EEE", task);
        },
        () => {
            appManager.removeTaskFromProject(selectedProjectID, task.id);
            uiManager.removeTaskNodeFromList(task);
        },
        () => {
            appManager.toggleTaskFinishedState(selectedProjectID, task.id);
            const editedTask = appManager.findTaskByID(selectedProjectID, task.id);
            uiManager.updateTaskNodeInTheList(editedTask);
            console.log("TTT", task);
        },
    )

}