import VerticalMenu from "./components/VerticalMenu";
import Navbar from "./components/Navbar";
import './style/App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import jwt_decode from "jwt-decode";
import {fetchTasks} from "./http/TaskAPI";

function App() {

    const {user, task} = useContext(Context)
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            try {
                user.setUser(jwt_decode(token))
                fetchTasks().then(data => {
                    task.setTasks(data);
                    user.setIsAuth(true)
                })
            } catch (e) {
                alert(e)
            }
        }
    }, [token]);

    return (
        <BrowserRouter>
            <div style={{display: "flex"}}>
                <VerticalMenu/>
                <div style={{width: '100px'}}></div>
                <div style={{width: '100%'}}>
                    <Navbar/>
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
