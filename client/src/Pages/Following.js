import React, { useState , useContext , useEffect  } from 'react';
import { useParams , Link } from 'react-router-dom';
import {MyContext} from '../ContextApi/MyContext.js'
const Following = () => {
    const { Mytoken } = useContext(MyContext)
    const {id} = useParams()
    const [Following, setFollowing] = useState([])

    const FetchData = async()=>{
        const token = Mytoken()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/UserDetail/following/${id}` , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
        const data = await response.json()
        console.log(data)
        if(data.success){
            setFollowing(data.following)
        }
    }

    useEffect(()=>{
        FetchData()
    },[])

  return (
    <div className="Home " >
    {
        Following.map((item)=>(
            <div className="user flex justify-center items-center my-8" key={item._id}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/ProfileImg/${item.profileImg}`}
              alt=""
              className="rounded-full mx-4"
              width="80px"
            />
            <div className="userdetails flex flex-col mx-4">
              <div className="text-sm font-bold">{item.username}</div>
              <div className="text-sm text-gray-400">{item.Bio.slice(0 , 20 )}</div>
            </div>
            <Link className="follow mx-4 text-blue-500 font-sm" to={`/Profile/${item._id}`}>
              Profile
            </Link>
          </div>
        ))

    }
    </div>
  )
}

export default Following