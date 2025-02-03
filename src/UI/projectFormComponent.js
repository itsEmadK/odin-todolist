function createProjectFormComponent(onSave, onDiscard) {

    const projectForm = document.createElement("form");
    projectForm.classList.add("project-form");
    projectForm.id = "project-form";

    const formHeading = document.createElement("h4");
    formHeading.innerText = "Add a new project";
    formHeading.classList.add("project-form-heading");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Project Title";
    titleInput.classList.add("project-title");
    titleInput.setAttribute("required", "");

    const saveProjectBtn = document.createElement("button");
    saveProjectBtn.innerText = "Save";
    saveProjectBtn.type = "submit";
    saveProjectBtn.classList.add("save-edit");
    saveProjectBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (projectForm.reportValidity()) {
            onSave(titleInput.value);
        }
    });

    const discardProjectBtn = document.createElement("button");
    discardProjectBtn.innerText = "Discard";
    discardProjectBtn.type = "button";
    discardProjectBtn.classList.add("discard-edit");
    discardProjectBtn.addEventListener("click", onDiscard);

    projectForm.appendChild(formHeading);
    projectForm.appendChild(titleInput);
    projectForm.appendChild(saveProjectBtn);
    projectForm.appendChild(discardProjectBtn);

    return projectForm;
}

export {
    createProjectFormComponent
}