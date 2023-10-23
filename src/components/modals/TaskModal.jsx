import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const TaskModal = observer(({head, show, onHide, add}) => {
    const {task} = useContext(Context);
    const [event, setEvent] = useState({
        status: head.title, type: 'Design', title: '', description: '', start: Date.now(), img: ''
    })
    const [errorMessage, setErrorMessage] = useState('');

    const addTask = () => {
        setEvent({...event, id: Date.now()});
        head.tasks.push(event);
        task.tasks.push(event);
        onHide();
        setEvent({...event, type: 'Design', title: '', description: '', start: Date.now(), img: ''})
    }

    const fileChange = (e) => {
        const file = e.target.files[0];
        setErrorMessage('');

        if (file.size < 2 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = () => {
                setEvent({...event, img: reader.result});
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
                                     value={task.type}
                                     onChange={e => setEvent({...event, type: e.target.value})}
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
                            onChange={e => setEvent({...event, title: e.target.value})}
                        />
                        <Form.Control
                            className={'mb-2'}
                            as="textarea"
                            placeholder={"Enter the Description"}
                            value={task.description}
                            onChange={e => setEvent({...event, description: e.target.value})}
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
                            value={task.start}
                            onChange={e => setEvent({...event, start: e.target.value})}
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
});

export default TaskModal;