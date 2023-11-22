import React, {useState} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import '../style/Dashboard.css'

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

    const monthlyData = reorderedMonths.map((month) => {
        const tasks = Math.floor(200 + Math.random() * 200);
        const expectedTasks = Math.floor(Math.max(tasks + (Math.random() - 0.5) * 200, 0));
        return {
            name: month,
            tasks,
            expectedTasks,
            points: Math.floor(Math.random() * 50),
        };
    });

    const weeklyData = getPreviousWeekdays().map((weekday) => {
        const tasks = Math.floor(50 + Math.random() * 50);
        const expectedTasks = Math.floor(Math.max(tasks + (Math.random() - 0.5) * 50, 0));
        return {
            name: weekday,
            tasks,
            expectedTasks,
            points: Math.floor(Math.random() * 50),
        };
    });

    const dailyData = getHoursArray().map((hour) => {
        const tasks = Math.floor(7 + Math.random() * 7);
        const expectedTasks = Math.floor(Math.max(tasks + (Math.random() - 0.5) * 7, 0));
        return {
            name: hour,
            tasks,
            expectedTasks,
            points: Math.floor(Math.random() * 50),
        };
    });

    const graphData = {
        daily: dailyData,
        weekly: weeklyData,
        monthly: monthlyData
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
            <div className={'flex-grow'}>
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
                        <Tooltip cursor={false}/>
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

        </div>
    );
}

export default Dashboard;