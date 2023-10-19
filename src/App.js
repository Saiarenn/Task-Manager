import VerticalMenu from "./components/VerticalMenu";
import Navbar from "./components/Navbar";
import Calendar from "./pages/Calendar";
import './style/App.css'

function App() {
  return (
    <div className="" style={{display: "flex", background: "#F3F4F8"}}>
      <VerticalMenu/>
        <div style={{display: "flex", flexDirection: "column", width: '100%'}}>
            <Navbar/>
            <Calendar/>
        </div>
    </div>
  );
}

export default App;
