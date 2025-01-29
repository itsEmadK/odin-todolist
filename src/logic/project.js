class Project {
    tasks = [];
    id;
    title;
    desc;
    //TODO: add a deadLine property...
    constructor(id, title, desc = "") {
        this.id = id;
        this.title = title;
        this.desc = desc;
    }

}

export {
    Project
}