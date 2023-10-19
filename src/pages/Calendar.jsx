import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../style/Calendar.css'

const Calendar = () => {

    const eventContent = (eventInfo) => {

        return (
            <div className={'event-content'}>
                <div className={'progress-bar'} style={{backgroundColor: colors[random(colors)].first}}></div>
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
        {first: '#5051F9', second: '#D2D3F8'},
        // {first: '#2CDE9A', second: '#C4EDE1'},
        // {first: '#FC9858', second: '#FFF2EA'},
        // {first: '#5BBFFF', second: '#D4EEFF'},
    ]
    const random = (arr) => Math.floor(Math.random() * arr.length);

    const events = [
        {
            title: 'Event1',
            start: '2023-10-20',
            backgroundColor: colors[random(colors)].second,
        },
        {
            title: 'Event2',
            start: '2023-10-25',
            backgroundColor: colors[random(colors)].second,
        },
        {
            title: 'Event3',
            start: '2023-10-15',
            end: '2023-10-25',
            backgroundColor: colors[random(colors)].second,
        },
    ];

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridWeek"}
                events={events}
                eventContent={eventContent}
            />
        </div>
    );
};

export default Calendar;