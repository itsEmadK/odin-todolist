class Task {
    id;
    title;
    desc;
    dueDate;
    priority;
    finished = false;

    constructor(
        id,
        title,
        desc = "",
        dueDate = null,
        priority = 0,
    ) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    static NO_PRIORITY = 0;
    static PRIORITY_LOW = 1;
    static PRIORITY_MEDIUM = 2;
    static PRIORITY_HIGH = 3;
    static PRIORITY_URGENT = 4;

    static getPriorityText(priority) {
        switch (priority) {
            case this.NO_PRIORITY:
                return "No priority";
            case this.PRIORITY_LOW:
                return "Low";
            case this.PRIORITY_MEDIUM:
                return "Medium";
            case this.PRIORITY_HIGH:
                return "High";
            case this.PRIORITY_URGENT:
                return "Urgent";
            default:
                return null;
        }
    }

    isOverDue() {
        const now = new Date(Date.now());
        if (this.dueDate < now) {
            return true;
        }
        return false;
    }

    clone() {
        const clone = new Task(
            this.id,
            this.title,
            this.desc,
            this.dueDate,
            this.priority,
            this.notes
        );
        clone.finished = this.finished;
        return clone;
    }

    equals(task) {
        return (
            this.id === task.id &&
            this.title === task.title &&
            this.desc === task.desc &&
            this.dueDate === task.dueDate &&
            this.priority === task.priority
        );
    }
}

export {
    Task
}