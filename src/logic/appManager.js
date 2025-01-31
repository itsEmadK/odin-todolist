import { Task } from "./task.js";
import { Project } from "./project.js";

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

    function findTaskByID(projectID, taskID) {
        const project = findProjectByID(projectID);
        return project.findTaskByID(taskID);
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

    function editTaskInProject(projectID, taskID, taskTitle, taskDesc, taskDueDate, taskPriority) {
        const project = findProjectByID(projectID);
        const projectIndex = findProjectIndexByID(projectID);
        if (projectIndex !== -1) {
            const newTask = new Task(
                taskID,
                taskTitle,
                taskDesc,
                taskDueDate,
                taskPriority
            )
            project.editTask(newTask);
            projects[projectIndex] = project;
        }
    }

    function addTaskToProject(projectID, task) {
        const projectIndex = findProjectIndexByID(projectID);
        const project = projects[projectIndex];
        project.addTask(task);
        projects[projectIndex] = project;
    }

    function generateNextTaskIDForProject(projectID) {
        const projectIndex = findProjectIndexByID(projectID);
        return `${projectID}` + projects[projectIndex].tasks.length;
    }

    function generateNextProjectID() {
        return projects.length;
    }

    function createProject(projectTitle, projectDesc, tasks = []) {
        const nextProjectID = generateNextProjectID();
        const project = new Project(nextProjectID, projectTitle, projectDesc);
        project.tasks = tasks.slice();
        projects.push(project);
    }

    function removeProject(projectID) {
        const projectIndex = findProjectIndexByID(projectID);
        projects.splice(projectIndex, 1);
    }

    function removeTaskFromProject(projectID, taskID) {
        const projectIndex = findProjectIndexByID(projectID);
        const project = projects[projectIndex];
        project.removeTask(taskID);
        project[projectIndex] = project;
    }


    function getAllProjects() {
        return projects.slice().map(project => project.clone());
    }

    function getAllTasks() {
        const tasks = [];
        getAllProjects().forEach((project => {
            project.getAllTasks().forEach((task => {
                tasks.push(task);
            }));
        }));
        return tasks;
    }

    function getProjectTasks(projectID) {
        const projectIndex = findProjectIndexByID(projectID);
        return projects[projectIndex].getAllTasks();
    }

    return {
        findProjectByID,
        findTaskByID,
        createTaskInProject,
        createProject,
        removeProject,
        removeTaskFromProject,
        getAllProjects,
        getAllTasks,
        editTaskInProject,
        getProjectTasks,
    };
})();

export { appManager }