import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightBar from './components/Rightbar';
import { useTheme } from "./contexts/ThemeContext"
import Dashboard from './components/Dashboard/Dashboard';
import {useState} from "react";

function App() {
    const [showSidebar , setShowSidebar] = useState(true);
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
      <Router>
          <div 
            className={`
                  flex h-screen overflow-hidden
                  ${isDark ? "bg-neutral-900" : "bg-white"} 
                  transition-colors duration-300
              `}>
                <Sidebar showSidebar={showSidebar}/>
                <Routes>
								    <Route path="/" element={<Dashboard showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>} />
								    {/* <Route path="/orders" element={<Table />} /> */}
							  </Routes>
          </div>
    </Router>
  )
}

export default App
