import img1 from "../assets/taskimg1.png";
import {makeAutoObservable} from "mobx";
import tasks from "../pages/Tasks";

export default class TaskStore {
    constructor() {
        this._tasks = [
            {
                id: 1,
                title: "Backlog",
                tasks: [
                    {
                        id: 1,
                        type: 'Design',
                        title: "Create styleguide foundation",
                        description: 'Create content for landing App',
                        date: '2023-10-20',
                        img: img1
                    },
                    {
                        id: 2,
                        type: 'Design',
                        title: "Create styleguide foundation",
                        description: 'Create content for landing App',
                        date: '2023-10-20',
                        img: ''
                    },
                ]
            },
            {
                id: 2,
                title: "To Do", tasks: [
                    {
                        id: 1,
                        type: 'Design',
                        title: "Create styleguide foundation",
                        description: 'Create content for landing App',
                        date: '2023-10-20',
                        img: ''
                    },
                    {
                        id: 2,
                        type: 'Design',
                        title: "Create styleguide foundation",
                        description: 'Create content for landing App',
                        date: '2023-10-20',
                        img: ''
                    },
                ]
            },
            {
                id: 3,
                title: "In Progress", tasks: [
                    {
                        id: 1,
                        type: 'Design',
                        title: "Create styleguide foundation",
                        description: 'Create content for landing App',
                        date: '2023-10-20',
                        img: ''
                    },
                    {
                        id: 2,
                        type: 'Design',
                        title: "Create styleguide foundation",
                        description: 'Create content for landing App',
                        date: '2023-10-20',
                        img: ''
                    },
                ]
            },
            {
                id: 4,
                title: "Review", tasks: [
                    {
                        id: 1,
                        type: 'Design',
                        title: "Create styleguide foundation",
                        description: 'Create content for landing App',
                        date: '2023-10-20',
                        img: ''
                    },
                    {
                        id: 2,
                        type: 'Design',
                        title: "Create styleguide foundation",
                        description: 'Create content for landing App',
                        date: '2023-10-20',
                        img: ''
                    },
                ]
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