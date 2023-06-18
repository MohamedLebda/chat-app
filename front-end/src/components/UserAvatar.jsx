export default function UserAvatar({userName, userId}){
    const colors = ['bg-yellow-600', 'bg-blue-600', 'bg-red-600', 'bg-green-600', 'bg-purple-600']
    const color = colors[colorId(userId)]

    function colorId(userId){
        if(userId > 4){
            return colorId(userId - 4)
        }else{
            return userId
        }
    }
    return(
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white uppercase ${color}`}>{userName[0]}</div>
    )
}