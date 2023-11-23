import React, {useState} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import '../style/Dashboard.css'
import CustomTooltip from "../components/CustomTooltip";

const Dashboard = () => {
    const [filter, setFilter] = useState('monthly')
    const today = new Date();
    const currentMonthIndex = today.getMonth();
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const reorderedMonths = [
        ...months.slice(currentMonthIndex + 1),
        ...months.slice(0, currentMonthIndex + 1),
    ];

    function getHoursArray() {
        const currentHour = new Date().getHours();
        return Array.from({length: 24}, (_, index) => (currentHour + index + 1) % 24);
    }

    const getData = (arr, multiplier) => {
        return arr.map((_element) => {
            const tasks = Math.floor(multiplier + Math.random() * multiplier);
            const expectedTasks = Math.floor(Math.max(tasks + (Math.random() - 0.5) * multiplier, 0));
            return {
                name: _element,
                tasks,
                expectedTasks,
                points: Math.floor(Math.random() * multiplier),
            };
        });
    }

    const graphData = {
        daily: getData(getHoursArray(), 7),
        weekly: getData(getPreviousWeekdays(), 50),
        monthly: getData(reorderedMonths, 200)
    }

    function getPreviousWeekdays() {
        const weekdays = [];
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (let i = 1; i < 8; i++) {
            const previousDay = new Date(today);
            previousDay.setDate(today.getDate() - i);

            weekdays.push(daysOfWeek[previousDay.getDay()])
        }
        return weekdays;
    }

    return (
        <div className="graph-wrapper">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="graph-title">Tasks Done</h2>
                <div className={'graph-tools'}>
                    <button className={filter === 'daily' ? "graph-btn active" : "graph-btn"}
                            onClick={() => setFilter('daily')}>
                        Daily
                    </button>
                    <button className={filter === 'weekly' ? "graph-btn active" : "graph-btn"}
                            onClick={() => setFilter('weekly')}>
                        Weekly
                    </button>
                    <button className={filter === 'monthly' ? "graph-btn active" : "graph-btn"}
                            onClick={() => setFilter('monthly')}>
                        Monthly
                    </button>
                </div>

            </div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={graphData[filter]}>
                    <CartesianGrid
                        vertical={false}
                        strokeWidth="1"
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                    />
                    <YAxis axisLine={false} tickLine={false} tickMargin={10}/>
                    <Tooltip content={<CustomTooltip />} cursor={false}/>
                    <Line
                        type="monotone"
                        dataKey="expectedTasks"
                        stroke="#1EA7FF"
                        strokeWidth="3"
                        activeDot={{r: 8}}
                        dot={{r: 6}}
                    />
                    <Line
                        type="monotone"
                        dataKey="tasks"
                        stroke="#5051F9"
                        strokeWidth="3"
                        activeDot={{r: 8}}
                        dot={{r: 6}}
                    />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

export default Dashboard;