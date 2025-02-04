import { Task } from "./task.js";
import { Project } from "./project.js";
import { add, isValid, isBefore, isAfter, isSameDay } from "date-fns";
import { TIME_FRAME_VALUES } from "../UI/timeFrameValues.js";

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

    function createTaskInProject(projectID, taskID, taskTitle, taskDesc, taskDueDate, taskPriority, finished = false) {
        const task = new Task(
            taskID,
            taskTitle,
            taskDesc,
            taskDueDate, taskPriority
        );
        task.finished = finished;
        addTaskToProject(projectID, task);
    }

    function editTaskInProject(projectID, taskID, taskTitle, taskDesc, taskDueDate, taskPriority) {
        const project = findProjectByID(projectID);
        const projectIndex = findProjectIndexByID(projectID);
        if (projectIndex !== -1) {
            const task = project.getTask(taskID);
            task.title = taskTitle;
            task.desc = taskDesc;
            task.priority = taskPriority;
            task.dueDate = taskDueDate;
            project.editTask(task);
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
        const tasks = projects[projectIndex].tasks;
        const taskIDs = tasks.map(task => task.id);
        if (taskIDs.length === 0) {
            return `${projectID}0`;
        }
        taskIDs.sort();
        const lastIndex = taskIDs.length - 1;
        const lastID = taskIDs[lastIndex];
        return `${projectID}${+lastID + 1}`;
    }

    function generateNextProjectID() {
        const projectIDs = projects.map((project) => project.id);
        if (projectIDs.length === 0) {
            return 0;
        }

        projectIDs.sort();
        const lastIndex = projects.length - 1
        return projectIDs[lastIndex] + 1;
    }

    function createProject(projectID, projectTitle, projectDesc, tasks = []) {
        const project = new Project(projectID, projectTitle, projectDesc);
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

    function getProjectTasks(projectID, timeFrame = TIME_FRAME_VALUES.NONE) {
        const projectIndex = findProjectIndexByID(projectID);
        const allProjectTasks = projects[projectIndex].getAllTasks();
        switch (timeFrame) {
            case TIME_FRAME_VALUES.NONE:
                return allProjectTasks;
            case TIME_FRAME_VALUES.NEXT_SEVEN_DAYS:
                return allProjectTasks.filter((task) => {
                    const taskDate = task.dueDate;
                    if (isValid(taskDate)) {
                        const today = new Date(Date.now());
                        const limit = add(today, { days: 7 });
                        if (isBefore(taskDate, limit) && isAfter(taskDate, today)) {
                            return task;
                        }
                    }
                });
            case TIME_FRAME_VALUES.TODAY:
                return allProjectTasks.filter((task) => {
                    const taskDate = task.dueDate;
                    if (isValid(taskDate)) {
                        const today = new Date(Date.now());
                        if (isSameDay(today, taskDate)) {
                            return task;
                        }
                    }
                });
            default:
                return [];
        }
    }

    function toggleTaskFinishedState(projectID, taskID) {
        const projectIndex = findProjectIndexByID(projectID);
        const project = findProjectByID(projectID);
        const task = project.getTask(taskID);
        task.finished = !task.finished;
        project.editTask(task);
        projects[projectIndex] = project;
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
        toggleTaskFinishedState,
        generateNextProjectID,
        generateNextTaskIDForProject,
    };
})();

export { appManager }