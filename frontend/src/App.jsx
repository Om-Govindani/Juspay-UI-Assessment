import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightBar from './components/Rightbar';
import { useTheme } from "./contexts/ThemeContext"
import Dashboard from './components/Dashboard/Dashboard';
import {useState} from "react";
import OrdersPage from './components/OrderList/OrderPage';

function App() {
    const [showSidebar , setShowSidebar] = useState(true);
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
								    <Route path="/" element={<Dashboard showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>} />
								    <Route path="/orders" element={<OrdersPage showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>} />
							  </Routes>
          </div>
    </Router>
  )
}

export default App
