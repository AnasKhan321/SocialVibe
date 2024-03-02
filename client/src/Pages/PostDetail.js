import React , {useContext , useEffect , useState} from 'react'
import Profile  from  '../Images/profile-round-1342-svgrepo-com.svg' 
import Like from '../Images/heart-svgrepo-com.svg'
import chat from '../Images/chat-round-svgrepo-com.svg'
import share from '../Images/share-svgrepo-com.svg'
import telegram from '../Images/telegram-svgrepo-com.svg'
import Send from '../Images/send-svgrepo-com.svg'
import redHeart from '../Images/redheart.svg'
import { useParams , Link} from 'react-router-dom';
import {MyContext} from '../ContextApi/MyContext.js'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PostDetail = () => {
    const {MyInfo , user , Mytoken} = useContext(MyContext)
    const { id } = useParams();
    const [Post, setPost] = useState({})
    const [Comment, setComment] = useState("")
    const [comments, setcomments] = useState([])
    const [User, setUser] = useState({})
    const navigate = useNavigate()

    const [showComments, setshowComments] = useState(false)

    const FetchData2 = async()=>{

      // Fetch the data for curretn User 
        const currentUser = await MyInfo()
        setUser(currentUser)
      }
    
    const FetchData = async()=>{
        const token = Mytoken()

        // loading the Post from backend
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/post/${id}` , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        if (response.ok) {
          const data = await response.json(); 
          setPost(data.post) 
          setcomments(data.comments)
          console.log(data);
  
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
    }

    // Handling the Comment visiblity 
    const handleClick = (e)=>{
        if(showComments == false ){
            setshowComments(true )

        }else{
            setshowComments(false)
        }
    }
    useEffect(()=>{

      // Loading the Data after page loaded 
        FetchData2()
        FetchData()
    },[])

    // Convert the Date for readable Date format 
    const ConvertDate = (dateString)=>{
        const date = new Date(dateString);

        const formattedDate = date.toLocaleString(); 
        return formattedDate
      }

      // handle The Comment Change 
      const handleChange = (e)=>{
        setComment(e.target.value)
      }

            // add the comment in the Backend  
      const FromSubmit = async()=>{

       
        if(Comment !== ""){
             const token = Mytoken()

            const postData = {
                comment : Comment
            }
            setComment("")
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/addComment/${Post?._id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postData) 
              })

            const data = await response.json()
            console.log(data)
                

        }else{
            console.log("enter something then submit ")
        }
      }


      // Update like Post in backend 
      const LikedPost = async()=>{
        const token = Mytoken()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/likePost/${Post?._id}` , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await response.json()

        // checking the response 

        if(data.success){
          setPost(data.post)

        }
  
  
    }

  // Update dislike Post in backend 
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


    // Handling the Delete Post in it Delete the Post from backend 
    const deletePost = async()=>{
      const token = Mytoken()
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/delete/${Post?._id}` , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('Post Deleted Successfully ')
        navigate('/')
      }
      else{
        const data = await response.json()
        toast.error(data.error)
      }
    
    }

  return (
    <div  className=" " >
    <div className="py-8 card2  p-4  ">

        {/* Image Section  */}

        <div className="img-section flex justify-between items-center    ">
                <div className="flex items-center  ">
                <img src={`${process.env.REACT_APP_BACKEND_URL}/ProfileImg/${Post?.User?.profileImg}`} alt="" className="rounded-full  " width="40px " />

                    <span className="px-4 " >{Post?.User?.username} </span>
        

                    <span className="px-4 " >{ConvertDate(Post?.date)} </span>

                    {Post?.User?.email == User?.email   && 

                      <button  className='cursor-pointer  px-4 py-2  bg-red-500 text-white ' onClick={deletePost} >Delete </button>
                    }

                     {Post?.User?.email !== User?.email   && 
                      <Link to={`/Profile/${Post?.User?._id}`}  className="text-blue-400 " >View Profile </Link>
                    
                    }

                </div>
        

            <div className="dots font-bold text-xl ">
            ....
            </div>
        </div>

        <div className="img mt-5 border rounded ">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/PostImg/${Post?.postImg}`}  alt="" width="700px "/>
        </div>

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
            <div className="addComment flex mt-4  ">
                <input type="text"  className="w-11/12 text-white   px-4 py-2 bg-black   " 
                 placeholder= "Add a Comment ...."  value={Comment} onChange={handleChange}/>
                <img src={Send} alt="" width="25px " className="invert  mx-4  cursor-pointer " onClick={FromSubmit} />
            </div>
    

        {/* Comment Section  */}

        {showComments && 
                <div className="allcomments">
                {comments.map((item) => (


                        <div  className="flex items-center  mx-2 my-4 shadow-md " > 
                            <div>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/ProfileImg/${item?.User?.profileImg}`} alt="" className="rounded-full  " width="50px " />
                            </div>
                            <div  className="px-4 " >
                              <Link to={`/Profile/${item?.User?._id}`}> 
                                <div  className="font-bold py-1 text-base  " > @{item?.User.username} </div></Link>
                                <div  className="text-lg  " > {item?.comment} </div>
                            </div>
                            
                            </div>
                            ))}
                </div>
        
        }

<div className="view ml-4 my-4 text-blue-400 cursor-pointer hover:underline  " onClick={handleClick}>
          
            {showComments?"Show Less ... " : "  View all Comments ... "}
        </div>
        


        </div>

     
        


    </div>
  )
}

export default PostDetail