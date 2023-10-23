import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";

const TaskModal = ({head, show, onHide}) => {
    const [task, setTask] = useState({type: 'Design', title: '', description: '', date: Date.now(), img: ''})
    const [errorMessage, setErrorMessage] = useState('');

    const addTask = () => {
        head.tasks.push({...task, id: Date.now()});
        onHide();
        setTask({type: 'Design', title: '', description: '', date: Date.now(), img: ''})
    }

    const fileChange = (event) => {
        const file = event.target.files[0];
        setErrorMessage('');

        if (file.size < 2 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = () => {
                setTask({...task, img: reader.result});
            };
            reader.readAsDataURL(file);
        } else {
            setErrorMessage('File Size Exceeds 2mb');
        }
        if (!event.target.value.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)) {
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
                                     value={task.type}
                                     onChange={e => setTask({...task, type: e.target.value})}
                        >
                            <option value="Design">Design</option>
                            <option value="Research">Research</option>
                            <option value="Content">Content</option>
                            <option value="Planning">Planning</option>
                        </Form.Select>
                        <Form.Control
                            className={'mb-2'}
                            placeholder={"Enter the Title"}
                            value={task.title}
                            onChange={e => setTask({...task, title: e.target.value})}
                        />
                        <Form.Control
                            className={'mb-2'}
                            as="textarea"
                            placeholder={"Enter the Description"}
                            value={task.description}
                            onChange={e => setTask({...task, description: e.target.value})}
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
                            value={task.date}
                            onChange={e => setTask({...task, date: e.target.value})}
                        />
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant="primary" onClick={addTask}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TaskModal;