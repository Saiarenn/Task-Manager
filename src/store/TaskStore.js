import img1 from "../assets/taskimg1.png";
import {makeAutoObservable} from "mobx";

export default class TaskStore {
    constructor() {
        this._tasks = [
            // {
            //     id: 1,
            //     taskInfo: {
            //         status: 1,
            //         type: 1,
            //         title: "Create styleguide foundation",
            //         taskDescription: 'Create content for landing App',
            //         start: '2023-10-20',
            //         img: img1,
            //         points: [
            //             { id: 1, pointDescription: 'Step 1', completed: true },
            //             { id: 2, pointDescription: 'Step 2', completed: false },
            //             { id: 3, pointDescription: 'Step 3', completed: true },
            //         ]
            //     }
            // },
            // {
            //     id: 2,
            //     taskInfo: {
            //         status: 1,
            //         type: 3,
            //         title: "Create styleguide foundation",
            //         taskDescription: 'Create content for landing App',
            //         start: '2023-10-20',
            //         img: '',
            //         points: [
            //             { id: 1, pointDescription: 'Step 1', completed: true },
            //             { id: 2, pointDescription: 'Step 2', completed: false },
            //             { id: 3, pointDescription: 'Step 3', completed: true },
            //         ]
            //     }
            // },
            // {
            //     id: 3,
            //     taskInfo: {
            //         status: 2,
            //         type: 4,
            //         title: "Create styleguide foundation",
            //         taskDescription: 'Create content for landing App',
            //         start: '2023-10-20',
            //         img: img1,
            //         points: [
            //             { id: 1, pointDescription: 'Step 1', completed: true },
            //             { id: 2, pointDescription: 'Step 2', completed: false },
            //             { id: 3, pointDescription: 'Step 3', completed: true },
            //         ]
            //     }
            // },
            // {
            //     id: 4,
            //     taskInfo: {
            //         status: 3,
            //         type: 2,
            //         title: "Create styleguide foundation",
            //         taskDescription: 'Create content for landing App',
            //         start: '2023-10-20',
            //         img: '',
            //         points: [
            //             { id: 1, pointDescription: 'Step 1', completed: true },
            //             { id: 2, pointDescription: 'Step 2', completed: false },
            //             { id: 3, pointDescription: 'Step 3', completed: true },
            //         ]
            //     }
            // },
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