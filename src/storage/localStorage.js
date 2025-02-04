const localStorageManager = (function () {

    function saveProjectsToLocalStorage(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function getAllProjects() {
        const json = localStorage.getItem("projects");
        if (json === null) {
            return null;
        }

        return JSON.parse(json);
    }

    return {
        saveProjectsToLocalStorage,
        getAllProjects,
    }

})();

export {
    localStorageManager
}