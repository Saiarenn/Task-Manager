import React, {useContext, useState} from 'react';
import '../style/Tasks.css'
import img1 from '../assets/taskimg1.png';
import '../fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf'
import TaskModal from "../components/modals/TaskModal";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Tasks = observer(() => {
    const {task} = useContext(Context)
    const [heads, setHeads] = useState([
        {title: "Backlog", tasks: []},
        {title: "To Do", tasks: []},
        {title: "In Progress", tasks: []},
        {title: "Review", tasks: []},
    ])
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState('');

    // const addTaskToColumn = (columnId, newTask) => {
    //     const targetColumn = heads.find(column => column.id === columnId);
    //
    //     targetColumn.tasks.push(newTask);
    // };


    const openModal = (title) => {
        setVisible(true)
        setShowModal(title);
    };

    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    return (
        <div style={{padding: '30px'}}>
            <h1>Task</h1>

            <div className={'task-wrapper'}>
                {task.tasks.map((head) => (
                    <div className={'task-column'} key={head.title}>
                        <div className={'task-header'}>

                            <div className={'task-title'}>
                                {head.title}
                            </div>

                            <button className={'task-add'} onClick={() => openModal(head.title)}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" width="2" height="10" fill="#6772FE"/>
                                    <rect y="6" width="2" height="10" transform="rotate(-90 0 6)" fill="#6772FE"/>
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
                            <div className={'task-item'} key={task.id}>
                                <div className={'task-item-type'}>
                                    {task.type}
                                </div>
                                {
                                    task.img &&
                                        <div className={'task-item-img'}>
                                            <img src={task.img} alt={''}/>
                                        </div>
                                }

                                <div className={'task-item-title'}>
                                    {task.title}
                                </div>

                                <div className={'task-item-description'}>
                                    {task.description}
                                </div>

                                <div className={'task-item-date'}>
                                    {formatDate(task.date)}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Tasks;