const localStorageManager = (function () {

    function saveProjectsToLocalStorage(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    return {
        saveProjectsToLocalStorage,
    }

})();

export {
    localStorageManager
}