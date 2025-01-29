import { Task } from "./task.js";

const appManager = (function () {

    let projects = [];

    function findProjectIndexByID(projectID) {
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            if (project.id === projectID) {
                return i;
            }
        }
        return -1;
    }

    function findProjectByID(projectID) {
        const projectIndex = findProjectIndexByID(projectID);
        if (projectIndex > -1) {
            return projects[projectIndex].clone();
        } else {
            return null;
        }
    }

    function createTaskInProject(projectID, taskTitle, taskDesc, taskDueDate, taskPriority) {
        const newTaskID = generateNextTaskIDForProject(projectID);
        const task = new Task(
            newTaskID,
            taskTitle,
            taskDesc,
            taskDueDate, taskPriority
        );
        addTaskToProject(projectID, task);
    }

    function addTaskToProject(projectID, task) {
        const projectIndex = findProjectIndexByID(projectID);
        const project = projects[projectIndex];
        project.addTask(task);
        projects[projectIndex] = project;
    }

    function generateNextTaskIDForProject(projectID) {
        const projectIndex = findProjectIndexByID(projectID);
        return projects[projectIndex].length;
    }

    return {
        findProjectByID,
        createTaskInProject,
    };
})();

export { appManager }