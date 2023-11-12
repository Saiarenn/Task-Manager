import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createTask} from "../../http/TaskAPI";

const TaskModal = observer(({head, show, onHide}) => {
    const {task} = useContext(Context);
    const [points, setPoints] = useState([])
    const addPoint = () => {
        setPoints([...points, {pointDescription: '', number: Date.now()}])
    }

    const removePoint = (number) => {
        setPoints(points.filter(point => point.number !== number))
    }

    const changePoint = (key, value, number) => {
        setPoints(points.map(point => point.number === number ? {...point, [key]: value} : point))
    }

    const getStatusInt = {
        "Backlog": 1,
        "To Do": 2,
        "In Progress": 3,
        "Review": 4,
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`
    };

    const [info, setInfo] = useState({
        status: getStatusInt[head.title],
        type: 1, title: '',
        taskDescription: '', start: formatDate(new Date(Date.now())),
        img: '', points: [],
    })

    const [errorMessage, setErrorMessage] = useState('');


    const addTask = () => {
        const newTask =
             {...info, points: points};
        createTask(newTask).then(data => {
            onHide();
            setPoints([]);
            setInfo({
                status: getStatusInt[head.title],
                type: 1, title: '',
                taskDescription: '',
                start: formatDate(new Date(Date.now())),
                img: '',
                points: [],
            });
        })
    };

    const fileChange = (e) => {
            const file = e.target.files[0];
            setErrorMessage('');

            if (file.size < 2 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onload = () => {
                    setInfo({...info, img: reader.result});
                };
                reader.readAsDataURL(file);
            } else {
                setErrorMessage('File Size Exceeds 2mb');
            }
            if (!e.target.value.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)) {
                setErrorMessage('Invalid File Type');
            }
        };

        return (
            <div>
                <Modal
                    show={show}
                    onHide={onHide}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{head.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Select className={'mb-2'} aria-label="Default select example"
                                         value={info.type}
                                         onChange={e => setInfo({...info, type: parseInt(e.target.value)})}
                            >
                                <option value="1">Design</option>
                                <option value="2">Research</option>
                                <option value="3">Content</option>
                                <option value="4">Planning</option>
                            </Form.Select>
                            <Form.Control
                                className={'mb-2'}
                                placeholder={"Enter the Title"}
                                value={info.title}
                                onChange={e => setInfo({...info, title: e.target.value})}
                            />
                            <Form.Control
                                className={'mb-2'}
                                as="textarea"
                                placeholder={"Enter the Description"}
                                value={info.description}
                                onChange={e => setInfo({...info, taskDescription: e.target.value})}
                            />
                            <Form.Control
                                className={'mb-2'}
                                type='file'
                                onChange={fileChange}
                            />
                            {errorMessage && (
                                <div style={{color: "red"}}>{errorMessage}</div>
                            )}
                            <Form.Control
                                type='date'
                                value={info.start}
                                onChange={e => setInfo({...info, start: e.target.value})}
                            />
                            <Button
                                variant={"outline-dark"}
                                className="mt-3"
                                onClick={addPoint}
                            >
                                Add new Point
                            </Button>
                            {points.map(point =>
                                <div style={{display: 'flex'}} key={point.id} className="mt-3">
                                    <Form.Control
                                        className={'me-3'}
                                        value={point.pointDescription}
                                        onChange={e => changePoint('pointDescription', e.target.value, point.number)}
                                        placeholder={"Description of the Point"}
                                    />
                                    <Button
                                        onClick={() => removePoint(point.number)}
                                        variant={"outline-danger"}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>Close</Button>
                        <Button variant="primary" onClick={addTask}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
);

    export default TaskModal;