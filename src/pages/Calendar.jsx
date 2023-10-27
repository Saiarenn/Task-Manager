import React, {useContext, useEffect} from 'react';
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

    // useEffect(() => {
    //     fetchTasks().then(data => {
    //         task.setTasks(data);
    //     })
    // }, [task])

    const taskInfoArray = task.tasks.map(task => task.taskInfo);

    const getTypeString = (type) => {
        switch (type) {
            case 1:
                return "Design";
            case 2:
                return "Research";
            case 3:
                return "Content";
            case 4:
                return "Planning";
        }
    }

    const eventContent = (eventInfo) => {
        const currentTask = taskInfoArray.find(taskInfo => taskInfo.title === eventInfo.event.title)
        return (
            <div className={'event-content'}>
                <div className={`progress-bar ${getTypeString(taskInfoArray[0].type)}`}></div>
                <div className={'event-text'}>{eventInfo.event.title}</div>
                <div>
                    <div className={'progress-percent'}>
                        48%
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
                events={taskInfoArray}
                eventContent={eventContent}
            />
        </div>
    );
});

export default Calendar;