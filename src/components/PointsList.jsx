import React, {useState} from 'react';
import {addTaskPoint, changeStatePoint, deleteTaskPointById, fetchTaskById} from "../http/TaskAPI";
import {useParams} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PointsList = ({task, setTask}) => {
    const [filter, setFilter] = useState('all');
    const [value, setValue] = useState('');
    const {id} = useParams()

    const filteredPoints = task.taskInfo.points.filter(point => {
        if (filter === 'all') return true;
        if (filter === 'active') return !point.completed;
        if (filter === 'completed') return point.completed;
        return false;
    });

    const togglePointCompletion = (point) => {
        changeStatePoint(id, point.id, !point.completed).then(() => fetchTaskById(id).then(data => setTask(data)))
        // setTask((task) => {
        //     return {
        //         ...task,
        //         taskInfo: {
        //             ...task.taskInfo,
        //             points: task.taskInfo.points.map((point) => {
        //                 if (point.id === pointId) {
        //                     return {
        //                         ...point,
        //                         completed: !point.completed,
        //                     };
        //                 }
        //                 return point;
        //             }),
        //         },
        //     };
        // });
    };

    const removePoint = (pointId) => {
        deleteTaskPointById(id, pointId).then(() => fetchTaskById(id).then(data => setTask(data)))
        // setTask({
        //     ...task,
        //     taskInfo: {
        //         ...task.taskInfo,
        //         points: task.taskInfo.points.filter(point => point.id !== id)
        //     }
        // })
    }

    const addPoint = e => {
        e.preventDefault()
        let newPoint = {pointDescription: value}
        // setTask({
        //     ...task,
        //     taskInfo: {
        //         ...task.taskInfo,
        //         points: [...task.taskInfo.points, newPoint]
        //     }
        // })
        if (value !== '') {
            addTaskPoint(id, newPoint).then(() => fetchTaskById(id).then(data => setTask(data)))
            setValue('')
        } else alert('Fill the input')
    }

    return (
        <div>
            <svg viewBox="0 0 0 0" style={{position: 'absolute', zIndex: -1, opacity: 0}}>
                <defs>
                    <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25"
                                    y2="25">
                        <stop offset="0%" stopColor="#1EA7FF"/>
                        <stop offset="100%" stopColor="#5051F9"/>
                    </linearGradient>

                    <linearGradient id="lineGradient">
                        <stop offset="0%" stopColor="#5051F9"/>
                        <stop offset="100%" stopColor="#1EA7FF"/>
                    </linearGradient>

                    <path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z"></path>
                    <path id="todo__box" stroke="url(#boxGradient)"
                          d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path>
                    <path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5"></path>
                    <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>
                </defs>
            </svg>
            <div className="todo-list">
                <h3>Points</h3>

                <div className={'todo-header'}>
                    <span>
                        {task.taskInfo.points.length + ' points'}
                    </span>
                    <div className={'todo-buttons'}>
                        <button
                            className={filter === 'all' ? 'active todo-button' : 'todo-button'}
                            onClick={() => setFilter('all')}>
                            All
                        </button>
                        <button
                            className={filter === 'active' ? 'active todo-button' : 'todo-button'}
                            onClick={() => setFilter('active')}>
                            Active
                        </button>
                        <button
                            className={filter === 'completed' ? 'active todo-button' : 'todo-button'}
                            onClick={() => setFilter('completed')}>
                            Completed
                        </button>
                    </div>
                </div>

                <form className="point__form" onSubmit={addPoint}>
                    <input className="point__input"
                           value={value}
                           onChange={e => setValue(e.target.value)}/>
                    {/*<button className="add__btn">Add</button>*/}
                </form>
                <TransitionGroup>
                    {filteredPoints.map(point => (
                        <CSSTransition
                            key={point.id}
                            timeout={500}
                            classNames="todo">
                            <div className="todo">
                                <label className="todo__item">
                                    <input className="todo__state" type="checkbox"
                                           onChange={() => togglePointCompletion(point)}
                                           checked={point.completed}
                                    />
                                    <svg viewBox="0 0 200 25" className="todo__icon">
                                        <use xlinkHref="#todo__line" className="todo__line"></use>
                                        <use xlinkHref="#todo__box" className="todo__box"></use>
                                        <use xlinkHref="#todo__check" className="todo__check"></use>
                                        <use xlinkHref="#todo__circle" className="todo__circle"></use>
                                    </svg>

                                    <div className="todo__text">
                                        {point.pointDescription}
                                    </div>
                                </label>

                                <button
                                    className={'todo-delete'}
                                    onClick={() => removePoint(point.id)}
                                >&#10006;</button>

                            </div>
                        </CSSTransition>

                    ))}
                </TransitionGroup>

            </div>
        </div>
    );
};

export default PointsList;