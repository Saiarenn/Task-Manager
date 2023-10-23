import VerticalMenu from "./components/VerticalMenu";
import Navbar from "./components/Navbar";
import './style/App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <div style={{display: "flex", background: "#F3F4F8"}}>
                <VerticalMenu/>
                <div style={{width: '94px'}}></div>
                <div style={{width: '100%'}}>
                    <Navbar/>
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
