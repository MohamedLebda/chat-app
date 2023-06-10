import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

function Profile(){
    const {username, userId} = useContext(UserContext)
    const [ws, setWs] = useState(null)
    const [onlinePeople, setOnlinePeople] = useState({})

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
            <div className="bg-white w-1/3 pl-4 pt-4 ">
                <div className="text-blue-700 font-bold flex gap-2 mb-4">   
                    Chat app
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                </div>
                {Object.keys(onlinePeople).map(id => (
                    <div key={id} className="border-b border-gray-100 py-2">{onlinePeople[id]}</div>
                ))}
            </div>
            <div className=" flex  flex-col bg-blue-100 w-2/3 p-2">
                <div className="flex-grow">messages</div>
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
