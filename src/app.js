import './App.css';
import { Route, Routes, useLocation , useNavigate} from 'react-router-dom'
import Todo from './todo';
import Register from './register';
import Login from './login';



const App = () => {
    // const location = useLocation();

    return (
            <Routes>
                <Route path="/todo-home" element={<Todo/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
    )
}

export default App