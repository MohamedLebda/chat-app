import { useState, useContext } from "react"
import axios from 'axios'
import { UserContext } from "../context/userContext"
import { Link, useNavigate } from "react-router-dom";


function Register(){
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setUsername, setUserId} = useContext(UserContext)
    const navigate = useNavigate()
    async function register(e){
        e.preventDefault()
        const data = { userName, email, password }
        try {
            const response = await axios.post('http://localhost:8080/register', data)
            setUsername(userName)
            setUserId(response._id)
            navigate("/profile")
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto" onSubmit={register}>
                <input 
                    value={userName} 
                    onChange={e => setUserName(e.target.value)}
                    type="text" 
                    placeholder="username"  
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="e@e.com" 
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <input 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="password" 
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <button className="bg-blue-500 text-white block w-full rounded-sm p-2">Register</button>
                <div className="text-center mt-2">
                    <Link to="/">Go back to Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
