import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import UserAvatar from "../components/UserAvatar";
import Logo from "../components/Logo";

function Profile(){
    const {username, userId} = useContext(UserContext)
    const [ws, setWs] = useState(null)
    const [onlinePeople, setOnlinePeople] = useState({})
    const [selectUser,setSelectUser] = useState(null);

    useEffect(()=>{
        const ws =new WebSocket('ws://localhost:8080')
        setWs(ws)
        ws.addEventListener('message', handleMessage)
    }, [])

    function handleMessage(e){
        const messageData = JSON.parse(e.data)
        if('online' in messageData){
            showOnlinePeople(messageData.online)
        }
    }
    function showOnlinePeople(people){
        const uniquePeople = {}
        people.forEach(({id, userName}) => {uniquePeople[id] = userName})
        setOnlinePeople(uniquePeople)
        
       
    }   

    return(
        <div className="h-screen flex">
            <div className="bg-white w-1/3">
                <Logo/>
                {Object.keys(onlinePeople).filter(contact => contact !== String(userId)).map(id => (
                    <div key={id} onClick={() => setSelectUser(id)} className={`border-b border-gray-100  flex cursor-pointer pl-3  ${id === selectUser ? 'bg-blue-50' : ''}`}>
                    <div className={`bg-blue-500 w-1 h-16 rounded-r-md transition duration-500 ${id === selectUser ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-[-10px]'}`}></div>
                    <div className={` flex items-center  gap-2 transition duration-500 ${id === selectUser ? 'transform translate-x-5' : ''}`}>
                      <UserAvatar userName={onlinePeople[id]} userId={id} />
                      <span className="capitalize">
                        {onlinePeople[id]}
                      </span>
                    </div>
                  </div>
                  
                ))}
            </div>
            <div className=" flex  flex-col bg-blue-100 w-2/3 p-2">
                {selectUser? "":<div className="flex flex-col flex-grow justify-center items-center"><Logo/><div className="text-gray-500">Send and receive messages instantly</div></div>}
                <div className="flex gap-2 ">
                    <input type="text" placeholder="Aa" className="bg-white border p-2 flex-grow rounded-md" />
                    <button className="bg-blue-500 p-2 text-white rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
