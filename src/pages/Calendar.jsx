import React, {useContext, useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../style/Calendar.css'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchTasks} from "../http/TaskAPI";

const Calendar = observer(() => {
    const {task} = useContext(Context)

    const [taskArr, setTaskArray] = useState([])

    useEffect(() => {
        fetchTasks().then(data => {
            task.setTasks(data);
        })
        setTaskArray(destructureTasks(task.tasks))
    }, [task.tasks])

    function destructureTasks(task) {
        if (Array.isArray(task)) {
            return task.map((item) => {
                const { taskInfo, ...parentData } = item;
                return { ...parentData, ...taskInfo };
            });
        }
        return task;
    }

    const taskInfoArray = task.tasks.map(task => task.taskInfo);

    const getTypeString = {
        1: "Design",
        2: "Research",
        3: "Content",
        4: "Planning",
    };
    const completedPointsCount = (task) => task.points.filter(step => step.completed).length;

    const getPercentage = (task) => {
        return task.points.length === 0 ? '100%' : Math.round(completedPointsCount(task) / task.points.length * 100) + '%';
    }

    const eventContent = (eventInfo) => {
        const currentTask = taskArr.find(task => task.id == eventInfo.event.id)
        const percentage = getPercentage(currentTask)
        const type = getTypeString[currentTask.type]
        console.log(taskArr)
        return (
            <div className={`event-content ${type}`}>
                <div className={`progress-bar ${type}`} style={{width: percentage}}></div>
                <div className={'event-text'}>{eventInfo.event.title}</div>
                <div>
                    <div className={'progress-percent'}>
                        {percentage}
                    </div>
                </div>
            </div>
        );
    };

    const colors = [
        {first: '#5051F9', second: '#6869FF'},
        {first: '#2CDE9A', second: '#C4EDE1'},
        {first: '#FC9858', second: '#FFF2EA'},
        {first: '#1EA7FF', second: '#D4EEFF'},
    ]
    const random = (arr) => Math.floor(Math.random() * arr.length);

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridWeek"}
                events={taskArr}
                eventContent={eventContent}
            />
        </div>
    );
});

export default Calendar;