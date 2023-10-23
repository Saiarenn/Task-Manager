import React, {useContext} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../style/Calendar.css'
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Calendar = observer(() => {
    const {task} = useContext(Context)
    const eventContent = (eventInfo) => {
        const foundItem = task.tasks.find(item => item.title === eventInfo.event.title);
        return (
            <div className={'event-content'}>
                <div className={`progress-bar ${foundItem.type}`}></div>
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
                events={task.tasks}
                eventContent={eventContent}
            />
        </div>
    );
});

export default Calendar;