import React, { useState , useContext , useEffect  } from 'react';
import Post from './ReuseableComp/Post.js'
import Profile  from  '../Images/profile-round-1342-svgrepo-com.svg' 
import {MyContext} from '../ContextApi/MyContext.js'
import { useNavigate , Link } from 'react-router-dom';
import SearchGif from '../Images/loading.gif'

const Home = () => {
  const {MyInfo , user , Mytoken , IsAuthenticated} = useContext(MyContext)
  const [Posts, setPosts] = useState([])
  const [suggesteduser, setsuggesteduser] = useState([])
  const [showloading, setshowloading] = useState(false)
  const navigate = useNavigate();

  const FetchData = async ()=>{
      setshowloading(true)
      const token = Mytoken()
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/allPosts` , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      if (response.ok) {
        const data = await response.json(); 
        console.log('Data:', data); 
        setTimeout(() => {
          setshowloading(false)
          setPosts(data.Posts)
        }, 1000);

   

      } else {

        console.error('Failed to fetch data:', response.statusText);
      }
  }

  const SuggestedUser = async()=>{
      const token = Mytoken()

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/UserDetail/suggest/me` , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      const data = await response.json()
      if(data.success){
        setsuggesteduser(data.suggestedUser)
        console.log(suggesteduser)

      }else{
        console.log("Error Happens ")
      }
  }

  
  const CheckUser = ()=>{
    if(localStorage.getItem('SocialUser') == null){
      navigate('/login')
    }
  }

  


  useEffect(()=>{
    CheckUser();
    FetchData();
    SuggestedUser(); 
  },[])
  
  return (
   
    <div className="Home ">


        <div className="flex items-center  ">
            <div className="w-4/6 flex justify-center items-center  mt-12  flex-col ">
                    <h1 className="my-2 ">Suggested Posts </h1>
                    {Posts.map((item) => (
                       <Post key={item._id} post={item} />
                    ))}

                        
    {showloading &&  
    
    <img src={SearchGif} alt="" className="mt-5  m-auto " width="50px " />
    
    }
                  


            </div>
            <div className="suggesteduser">
              <div className="usprofile">
                    <div className="user flex  justify-between items-center ">
                      <img src={Profile} alt="" className="invert mx-4  " width="20px " />
                      <div className="userdetails flex flex-col mx-4  ">
                            <div className="text-sm  font-bold ">
                              AnasKhan321
                            </div>
                            <div className="text-sm text-gray-400   ">
                             anasKhan
                            </div>
                      </div>
                      <div className="follow mx-4 text-blue-500   ">
                        Switch  
                      </div>
                    </div>
              </div>
              <div className="profiles">
              <h1 className="my-4  text-gray-400 ">Suggested for you   </h1>

                {suggesteduser.map((item)=>(
                  <div className="user flex  justify-between items-center  my-8 ">
                      <img src={`${process.env.REACT_APP_BACKEND_URL}/ProfileImg/${item.profileImg}`} alt="" className=" rounded-full  mx-4  " width="40px " />
                      <div className="userdetails flex flex-col mx-4  ">
                            <div className="text-sm  font-bold ">
                              {item.username}
                            </div>
                            <div className="text-sm text-gray-400   ">
                              Suggested for you 
                            </div>
                      </div>
                      <Link className="follow mx-4 text-blue-500 font-sm    " to={`/Profile/${item._id}`}>
                        Profile     
                      </Link>
                </div>
                ))}

           

                   
                </div> 
            </div>
            
        </div>
    </div>

  )
}

export default Home