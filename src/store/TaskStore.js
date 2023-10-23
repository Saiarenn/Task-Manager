import img1 from "../assets/taskimg1.png";
import {makeAutoObservable} from "mobx";
import tasks from "../pages/Tasks";

export default class TaskStore {
    constructor() {
        this._tasks = [
            {
                id: 1,
                status: 'Backlog',
                type: 'Design',
                title: "Create styleguide foundation",
                description: 'Create content for landing App',
                start: '2023-10-20',
                img: img1
            },
            {
                id: 2,
                status: 'Backlog',
                type: 'Research',
                title: "Create styleguide foundation",
                description: 'Create content for landing App',
                start: '2023-10-20',
                img: ''
            },
            {
                id: 3,
                status: 'To Do',
                type: 'Planning',
                title: "Create styleguide foundation",
                description: 'Create content for landing App',
                start: '2023-10-20',
                img: ''
            },
            {
                id: 4,
                status: 'To Do',
                type: 'Design',
                title: "Create styleguide foundation",
                description: 'Create content for landing App',
                start: '2023-10-20',
                img: ''
            },
            {
                id: 5,
                status: 'In Progress',
                type: 'Content',
                title: "Create styleguide foundation",
                description: 'Create content for landing App',
                start: '2023-10-20',
                img: ''
            },
            {
                id: 6,
                status: 'In Progress',
                type: 'Research',
                title: "Create styleguide foundation",
                description: 'Create content for landing App',
                start: '2023-10-20',
                img: ''
            },
            {
                id: 7,
                status: 'Review',
                type: 'Planning',
                title: "Create styleguide foundation",
                description: 'Create content for landing App',
                start: '2023-10-20',
                img: ''
            },
            {
                id: 8,
                status: 'Review',
                type: 'Content',
                title: "Create styleguide foundation",
                description: 'Create content for landing App',
                start: '2023-10-20',
                img: ''
            },
        ]
        makeAutoObservable(this);
    }

    setTasks(tasks) {
        this._tasks = tasks
    }

    get tasks() {
        return this._tasks
    }
}