import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightBar from './components/Rightbar';
import { useTheme } from "./contexts/ThemeContext"
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
      <Router>
          <div 
            className={`
                  flex h-screen overflow-hidden
                  ${isDark ? "bg-neutral-800" : "bg-white"} 
                  transition-colors duration-300
              `}>
                <Sidebar />
                <div className='flex flex-row w-full'>
                    <Dashboard />
                    <RightBar />
                </div>
          </div>
    </Router>
  )
}

export default App
