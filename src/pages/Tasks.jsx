import React, {useContext, useEffect, useState} from 'react';
import '../style/Tasks.css'
import '../fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf'
import TaskModal from "../components/modals/TaskModal";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import TaskItem from "../components/TaskItem";
import {fetchTasks, updateTask} from "../http/TaskAPI";


const Tasks = observer(() => {
    const {task} = useContext(Context)
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    useEffect(() => {
        setHeads([
            {title: "Backlog", tasks: tasksByStatus['1'] || []},
            {title: "To Do", tasks: tasksByStatus['2'] || []},
            {title: "In Progress", tasks: tasksByStatus['3'] || []},
            {title: "Review", tasks: tasksByStatus['4'] || []},
        ])
    }, [task.tasks])

    const tasksByStatus = task.tasks.reduce((accumulator, task) => {
        const {status} = task.taskInfo;

        accumulator[status] = accumulator[status] || [];
        accumulator[status].push(task);

        return accumulator;
    }, {});

    const [heads, setHeads] = useState([
        {title: "Backlog", tasks: tasksByStatus['1'] || []},
        {title: "To Do", tasks: tasksByStatus['2'] || []},
        {title: "In Progress", tasks: tasksByStatus['3'] || []},
        {title: "Review", tasks: tasksByStatus['4'] || []},
    ])

    const getStatusInt = {
        "Backlog": 1,
        "To Do": 2,
        "In Progress": 3,
        "Review": 4,
    }

    const openModal = (title) => {
        setVisible(true)
        setShowModal(title);
    };

    const removeTask = event => {
        setSelectedTask(task.tasks.find(task => task.id == event.target.id))
    }

    const getColId = (target) => {
        if (target.className === 'task-column') return getStatusInt[target.id];
        else return getColId(target.parentNode);
    }

    const changeStatus = event => {
        let currentTask = {...selectedTask};
        currentTask.taskInfo.status = getColId(event.target)
        updateTask(currentTask).then(() => {
            fetchTasks().then(data => task.setTasks(data))
        })
        setIsDraggingOver(false);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    return (
        <div style={{padding: '30px'}}>
            <h1>Tasks</h1>

            <div className={'task-wrapper'}>
                {heads.map((head) => (
                    <div className={'task-column'} key={head.title} id={head.title}
                         onDrop={changeStatus}
                         onDragOver={handleDragOver}
                         style={{
                             border: isDraggingOver ? '1px dashed gray' : 'none',
                             borderRadius: '8px',
                         }}
                    >
                        <div className={'task-header'}>

                            <div className={'task-title'}>
                                {head.title}
                            </div>

                            <button className={'task-add'} onClick={() => openModal(head.title)}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" width="2" height="10"/>
                                    <rect y="6" width="2" height="10" transform="rotate(-90 0 6)"/>
                                </svg>
                            </button>

                        </div>

                        {
                            showModal === head.title && (
                                <TaskModal
                                    head={head}
                                    show={visible}
                                    onHide={() => setVisible(false)}
                                />
                            )
                        }

                        {head.tasks.map(task => (
                            <TaskItem
                                key={task.id} task={task} remove={removeTask}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Tasks;