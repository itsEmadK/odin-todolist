class Task {
    id;
    title;
    desc;
    dueDate;
    priority;
    notes;
    finished = false;

    constructor(
        id,
        title,
        desc = "",
        dueDate = null,
        priority = 0,
        notes = "",
    ) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

}

export {
    Task
}