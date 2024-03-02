import React , {useEffect , useContext , useState } from 'react'
import Post from './ReuseableComp/Post.js'
import { useParams , Link } from 'react-router-dom';
import {MyContext} from '../ContextApi/MyContext.js'

const Profile = () => {
  const { id } = useParams();
  const {MyInfo , user , Mytoken} = useContext(MyContext); 
  const [User, setUser] = useState({})
  const [Posts, setPosts] = useState([])
  const [CurrentUser, setCurrentUser] = useState(false)
  const [CurrentUserDetail, setCurrentUserDetail] = useState({})


  const FetchData = async ()=>{
    const token = Mytoken()
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/UserDetail/${id}` , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if (response.ok) {
      const data = await response.json(); 
      console.log('Data:', data); 
      setUser(data.userdetail)
      setPosts(data.Posts)
      setCurrentUser(data.user)

    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
}
const FetchData2 = async()=>{
  const currentUser2 = await MyInfo()
  setCurrentUserDetail(currentUser2)
}

  const Follow = async()=>{
    const token = Mytoken()
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/UserDetail/follow/${User?._id}` , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if(response.ok){
      const data = await response.json()
      setUser(data.updatedUser)
    }
  
  }

  const unFollow = async()=>{
    const token = Mytoken()
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/UserDetail/unfollow/${User?._id}` , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if(response.ok){
      const data = await response.json()
      setUser(data.updatedUser)
    }
  
  }

  useEffect(() => {
    FetchData()
    FetchData2()
  }, [])
  
  return (
    <div className="Home  py-8    "> 
    
      <div className="flex  justify-center items-center w-4/6  m-auto myp  py-8  ">

            <div className="img-section mx-12 ">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/ProfileImg/${User?.profileImg}`} alt="" className="rounded-full  " width="200px " />
            </div>
            <div className="text-section    ">
              <div className="first flex justify-between items-center my-8   ">
                    <div className="mx-6">{User?.username}</div>
                    {CurrentUser && 
                        <button  className="mx-6  bg-gray-600 px-4 py-1  rounded font-bold" >
                          
                            <Link to="/edit" >Edit Profile </Link>
                           </button>
                    }
                   {
                      !CurrentUser && (
                        <>
                          {User?.FollowedBy?.includes(CurrentUserDetail?.email) ? (
                            <button className="mx-6 bg-gray-600 px-4 py-1 rounded font-bold" onClick={unFollow}>
                              unfollow
                            </button>
                          ) : (
                            <button className="mx-6 bg-blue-600 px-4 py-1 rounded font-bold" onClick={Follow}>
                              Follow
                            </button>
                          )}
                        </>
                      )
                    }
                    <button className="mx-6  bg-gray-600 px-4 py-1  rounded font-bold">Message</button>
                    <div className="mx-6 font-bold  ">....</div>
              </div>
              <div className="second my-8 flex  ">

                <div className="mx-6"> <b>{Posts.length }</b>  {Post.length == 1?"Post" : "Posts "}</div>

                <Link to={`/follower/${User._id}`} className="mx-6">  <b>{User?.FollowedBy?.length}</b>  {User?.FollowedBy?.length == 1?"follower" : "followers"}  </Link>
                <Link to={`/following/${User._id}`} className="mx-6"> <b>{User?.FollowingBy?.length}</b>  following </Link>
              </div>

              <div className="third mx-6 " >
                {User?.Bio}
              </div>
            </div>
        </div>

    

        <div className="posts w-4/6  m-auto flex pt-14 flex-wrap  justify-between   ">
        {Posts.map((item) => (
          
                  <div className="post w-4/12    px-1 my-2    ">
                        <Link to={`/Post/${item?._id}`}> 
                               <img src={`${process.env.REACT_APP_BACKEND_URL}/PostImg/${item?.postImg}`} alt=""/>
                               </Link>
                  </div>
                    ))}
         
        </div>
    
     </div>

  )
}

export default Profile