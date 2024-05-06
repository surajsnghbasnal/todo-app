import React, { useEffect } from "react";
import './App.css';
import { Route, Routes, useLocation , useNavigate} from 'react-router-dom'
import Todo from './todo';
import Register from './register';
import Login from './login';



const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(()=>{
        location.pathname === "/" && navigate("/login")
    }, [])

    return (
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/todo" element={<Todo/>} />
            </Routes>
    )
}

export default App