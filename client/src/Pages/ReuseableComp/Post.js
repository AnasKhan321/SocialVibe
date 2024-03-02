import React , {useEffect , useState,useContext} from 'react'
import Profile  from  '../../Images/profile-round-1342-svgrepo-com.svg' 
import Like from '../../Images/heart-svgrepo-com.svg'
import chat from '../../Images/chat-round-svgrepo-com.svg'
import share from '../../Images/share-svgrepo-com.svg'
import telegram from '../../Images/telegram-svgrepo-com.svg'
import { Link } from 'react-router-dom'
import redHeart from '../../Images/redheart.svg'
import {MyContext} from '../../ContextApi/MyContext.js'

const Post = (props) => {
  const [Post, setPost] = useState({})
  const {MyInfo , user , IsAuthenticated , Mytoken ,showDialog, setshowDialog} = useContext(MyContext)
  const [User, setUser] = useState({})


  const FetchData = async()=>{
    const currentUser = await MyInfo()
    setUser(currentUser)
  }

  useEffect(() => {
    
    const {post} = props 
    console.log(post);
    setPost(post)
    FetchData()
  
  }, [])

  const ConvertData = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
};

  const LikedPost = async()=>{
      const token = Mytoken()
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/likePost/${Post?._id}` , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const data = await response.json()
       setPost(data.post)


  }

  const dislikePost = async()=>{
    const token = Mytoken()
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/dislikePost/${Post?._id}` , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await response.json()
    setPost(data.post)
  }
  
  return (
    <div className="py-8 card1  p-4  ">


        <div className="img-section flex justify-between items-center cursor-pointer     ">
                <div className="flex items-center  ">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/ProfileImg/${Post?.User?.profileImg}`} alt="" className="rounded-full  " width="40px " />

                    <Link to={`/Profile/${Post?.User?._id}`} className="px-2 ">   { Post?.User?.email  } </Link>
          
 
                    <span className="px-2 text-xs " >{ConvertData(Post?.date)} </span>
                    <Link to={`/Profile/${Post?.User?._id}`} className="px-2 text-blue-400 ">    Profile  </Link>

                </div>
          

            <div className="dots font-bold text-xl ">
            ....
                  </div>
        </div>

        <Link to={`/Post/${Post?._id}`}> 

        <div className="img mt-5 border rounded ">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/PostImg/${Post?.postImg}`} alt="" width="490px "/>
        </div>
        </Link>

        <div className="like-section flex justify-between  py-4 " >
          <div className="flex justify-between ">
              {Post?.LikedBy?.includes(User?.email)   && 
              <img src={redHeart} alt="" srcset=""  width="30px " className="  mx-2  " onClick={dislikePost}/>
              
              }
              {!Post?.LikedBy?.includes(User?.email)  && 
                       <img src={Like} alt="" srcset=""  width="30px " className="invert  mx-2  "   onClick={LikedPost} />
              }
              <img src={chat} alt="" srcset="" width="30px " className="invert mx-2  " />
              <img src={telegram} alt="" srcset="" width="30px " className="invert mx-2  " />
          </div>
          <div>
            <img src={share} alt="" srcset="" className="invert "  width="30px "/>
          </div>
         

        </div>

        <div className="showlikes">
          <span className="font-bold text-sm mx-2  ">
              {Post?.LikedBy?.length }
              {Post?.LikedBy?.length ==1? "   Like" : "   Likes"}
          </span>
        </div>
    </div>
  )
}

export default Post