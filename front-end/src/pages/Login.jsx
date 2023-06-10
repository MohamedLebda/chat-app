import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

function Login(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {setUsername, setUserId} = useContext(UserContext);
    const navigate = useNavigate();

    async function login(e){
        e.preventDefault();
        const data = { userName, password };
        setUsername(userName)
        try {
            const response = await axios.post('http://localhost:8080/login', data, {
                withCredentials: true
            });
            navigate("/profile")
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto" onSubmit={login}>
                <input 
                    value={userName} 
                    onChange={e => setUserName(e.target.value)}
                    type="text" 
                    placeholder="username"  
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <input 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="password" 
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <button className="bg-blue-500 text-white block w-full rounded-sm p-2">login</button>
                <div className="text-center mt-2">
                <Link to="/register">Sign Up!</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
