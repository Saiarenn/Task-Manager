import React, {useEffect, useState} from 'react';
import {changeStatePoint, fetchTaskById} from "../http/TaskAPI";
import {useParams} from "react-router-dom";
import '../style/TaskPage.css'
import PointsList from "../components/PointsList";
import {Col, Row} from "react-bootstrap";

const TaskPage = () => {
    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true);
    const {id} = useParams()

    useEffect(() => {
        fetchTaskById(id).then(data => {
            setTask(data)
            setLoading(false)
        })
    }, [])

    const getTypeString = {
        1: "Design",
        2: "Research",
        3: "Content",
        4: "Planning",
    };

    const getStatusString = {
        1: "Backlog",
        2: "To Do",
        3: "In Progress",
        4: "Review",
    };

    return (
        <div className={'d-flex justify-content-center p-3'}>
            {loading ?
                <p>Loading...</p>
                :
                <Row>
                    <Col md={8}>
                        <h1>Task Details</h1>
                        <p>ID: {task.id}</p>
                        <p>Status: {getStatusString[task.taskInfo.status]}</p>
                        <p>Type: {getTypeString[task.taskInfo.type]}</p>
                        <p>Title: {task.taskInfo.title}</p>
                        <p>Task Description: {task.taskInfo.taskDescription}</p>
                        <p>Start Date: {task.taskInfo.start}</p>
                        <p>End Date: {task.taskInfo.end}</p>
                        {
                            task.taskInfo.img &&
                            <img src={task.taskInfo.img} alt="Task Image"/>
                        }
                    </Col>
                    <Col md={4}>
                        <PointsList task={task} setTask={setTask}/>
                    </Col>
                </Row>
            }
        </div>
    );
};

export default TaskPage;
