import React, {useContext, useEffect, useState} from 'react';
import '../style/Tasks.css'
import '../fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf'
import TaskModal from "../components/modals/TaskModal";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchTasks} from "../http/TaskAPI";


const Tasks = observer(() => {
    const {task} = useContext(Context)
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState('');

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

    const getTypeString = {
        1: "Design",
        2: "Research",
        3: "Content",
        4: "Planning",
    };

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

    const completedPointsCount = (task) => task.taskInfo.points.filter(step => step.completed).length;

    return (
        <div style={{padding: '30px'}}>
            <h1>Task</h1>

            <div className={'task-wrapper'}>
                {heads.map((head) => (
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
                                <div className={`task-item-type  ${getTypeString[task.taskInfo.type]}`}>
                                    {getTypeString[task.taskInfo.type]}
                                </div>
                                {
                                    task.taskInfo.img &&
                                    <div className={'task-item-img'}>
                                        <img src={task.taskInfo.img} alt={''}/>
                                    </div>
                                }

                                <div className={'task-item-title'}>
                                    {task.taskInfo.title}
                                </div>

                                <div className={'task-item-description'}>
                                    {task.taskInfo.taskDescription}
                                </div>

                                <div className={'task-item-date'}>
                                    {formatDate(task.taskInfo.start)}
                                </div>

                                <div className={'task-item-points'}>
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.812 5.7715L7.1655 9.4265L5.763 8.024C5.6868 7.93502 5.59303 7.86275 5.48758 7.81173C5.38212 7.76071 5.26726 7.73204 5.1502 7.72752C5.03314 7.723 4.9164 7.74272 4.80733 7.78546C4.69825 7.82819 4.59919 7.89301 4.51635 7.97584C4.43351 8.05868 4.36869 8.15775 4.32596 8.26682C4.28323 8.3759 4.2635 8.49263 4.26802 8.60969C4.27255 8.72675 4.30122 8.84162 4.35224 8.94707C4.40326 9.05253 4.47552 9.1463 4.5645 9.2225L6.562 11.2285C6.64143 11.3073 6.73562 11.3696 6.83918 11.4119C6.94274 11.4542 7.05364 11.4756 7.1655 11.475C7.38849 11.4741 7.60218 11.3855 7.7605 11.2285L12.0105 6.9785C12.0902 6.89948 12.1534 6.80547 12.1966 6.70189C12.2397 6.59831 12.2619 6.48721 12.2619 6.375C12.2619 6.26279 12.2397 6.15169 12.1966 6.04811C12.1534 5.94453 12.0902 5.85052 12.0105 5.7715C11.8512 5.61319 11.6358 5.52432 11.4113 5.52432C11.1867 5.52432 10.9713 5.61319 10.812 5.7715ZM8.5 0C6.81886 0 5.17547 0.498516 3.77766 1.43251C2.37984 2.3665 1.29037 3.69402 0.647028 5.24719C0.00368291 6.80036 -0.164645 8.50943 0.163329 10.1583C0.491303 11.8071 1.30085 13.3217 2.4896 14.5104C3.67834 15.6992 5.1929 16.5087 6.84173 16.8367C8.49057 17.1646 10.1996 16.9963 11.7528 16.353C13.306 15.7096 14.6335 14.6202 15.5675 13.2223C16.5015 11.8245 17 10.1811 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0ZM8.5 15.3C7.15509 15.3 5.84038 14.9012 4.72212 14.154C3.60387 13.4068 2.7323 12.3448 2.21762 11.1022C1.70295 9.85971 1.56828 8.49245 1.83066 7.17338C2.09304 5.85431 2.74068 4.64267 3.69168 3.69167C4.64267 2.74068 5.85432 2.09304 7.17339 1.83066C8.49246 1.56828 9.85971 1.70294 11.1022 2.21762C12.3448 2.73229 13.4068 3.60387 14.154 4.72212C14.9012 5.84037 15.3 7.15509 15.3 8.5C15.3 10.3035 14.5836 12.0331 13.3083 13.3083C12.0331 14.5836 10.3035 15.3 8.5 15.3Z"
                                            fill="#768396"/>
                                    </svg>
                                    {completedPointsCount(task) + "/" + task.taskInfo.points.length}
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