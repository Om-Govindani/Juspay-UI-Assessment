import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightBar from './components/Rightbar';
import { useTheme } from "./contexts/ThemeContext"
import Dashboard from './components/Dashboard/Dashboard';
import {useState , useEffect} from "react";
import OrdersPage from './components/OrderList/OrderPage';

function App() {
    const [showSidebar, setShowSidebar] = useState(false)
    const [showRightbar, setShowRightbar] = useState(false)

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setShowSidebar(true)
          setShowRightbar(true)
        } else {
          setShowSidebar(false)
          setShowRightbar(false)
        }
      }

      handleResize()
      window.addEventListener("resize", handleResize)

      return () => window.removeEventListener("resize", handleResize)
    }, [])
    const { themeStyles } = useTheme()
    return (
      <Router>
          <div 
            className={`
                  flex h-screen overflow-hidden
                  ${themeStyles.layoutBg} relative
                  transition-colors duration-300 select-none
              `}>
                {showSidebar && <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>}
                <Routes>
								    <Route path="/" element={<Dashboard showSidebar={showSidebar} setShowSidebar={setShowSidebar} showRightbar={showRightbar} setShowRightbar={setShowRightbar}/>} />
								    <Route path="/orders" element={<OrdersPage showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>} />
							  </Routes>
          </div>
    </Router>
  )
}

export default App
