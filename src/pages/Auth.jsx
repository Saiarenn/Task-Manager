import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/UserAPI";
import {CALENDAR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SEND_ROUTE} from "../utils/consts";
import {fetchTasks} from "../http/TaskAPI";

const Auth = observer(() => {
    const { user, task } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
                user.setIsAuth(true)
                navigate(CALENDAR_ROUTE)
                fetchTasks().then(data => {
                    task.setTasks(data)
                })
            } else {
                data = await registration(name, surname, email, password)
                navigate(SEND_ROUTE)
            }
            user.setUser(data)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5 auth">
                <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    {!isLogin &&
                        <div>
                            <Form.Control
                                className="mt-3"
                                placeholder="First Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Surname"
                                value={surname}
                                onChange={e => setSurname(e.target.value)}
                            />
                        </div>
                        }
                    <Form.Control
                        className="mt-3"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Container className="d-flex justify-content-between align-items-center mt-3 p-0">
                        {isLogin ?
                            <div>Does not have an account? <NavLink to={REGISTRATION_ROUTE}>Sign Up</NavLink></div>
                            :
                            <div>Have an account? <NavLink to={LOGIN_ROUTE}>Log In</NavLink></div>
                        }
                        <Button
                            className=""
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? "Log In" : "Sign Up"}
                        </Button>
                    </Container>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;
