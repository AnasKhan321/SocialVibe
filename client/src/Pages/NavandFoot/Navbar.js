import React, { useState , useContext , useEffect   , useRef } from 'react';
import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom';
import {MyContext} from '../../ContextApi/MyContext.js'
import gsap from 'gsap';
import {useGSAP}  from "@gsap/react"
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
const Navbar = ({setopen}) => {
  const [User, setUser] = useState({})

 const {MyInfo , user , IsAuthenticated , Mytoken ,showDialog, setshowDialog} = useContext(MyContext)

  const controlref = useRef(null)
  const [show ,setshow ]  = useState(false)

 useGSAP(()=>{

  controlref.current = gsap.timeline({paused : true})


  controlref.current.to(".sidebar"  , {
    transform : "translateX(0%)" , 
    duration : 1 , 

    
  })

  controlref.current.from(".sidebar div"  , {
    x : -150 ,
    stagger: 0.3,
    opacity: 0,
  })

 })

 useEffect(()=>{
  if(show){
    controlref.current.play()
  }else{
    controlref.current.reverse()
  }
 },[show])

//  Fetching the data of current user 
 const FetchData = async()=>{
      if(IsAuthenticated){
            try {
              const token = Mytoken()
              const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/me`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const data = await response.json();
              setUser(data.user)
              console.log(data)
            } catch (error) {
              console.error('Error:', error);
            }
      }

}
  const handleClick = ()=>{
    setshowDialog(true)
    console.log('this is here ')
  }

  useEffect(() => {
    FetchData()
  }, [])
  

  return (

    
    <>
  

    <div className="cursor-pointer top-1 left-2   z-10 relative"  onClick={()=>{
      setshow(true)
      
      
      }}><IoMdMenu className="text-6xl s " /> </div> 
      
      
    <div className="h-screen w-64 fixed bg-black  top-0 left-0 overflow-y-auto m-auto flex z-40  items-start sidebar  translate-x-[-100%]">
 
    <div className="p-4 text-white mt-12  sidebar2  ">

  
      <div className="Logo"> 
                <Link to="/" className="text-2xl font-bold "> SocialVibe  </Link>
         </div>
      <ul className="mt-10 ">
        <div className="flex  items-center mt-4  p-3  cursor-pointer  nav-item   ">
        <TiHome className='text-2xl' />
            <Link to="/" className="text-xl   px-2  ">Home </Link>

        </div>

        <div className="flex  items-center  mt-4 nav-item   p-3  cursor-pointer  ">
           <FaUser className='text-2xl' /> 
            <Link to={`/Profile/${User?._id }`} className="text-xl   mx-2  ">Profile  </Link>
        </div>

        <div className="flex  items-center  mt-4 nav-item   p-3  cursor-pointer ">
            <FaSearch className="text-2xl" />
            <Link to="/search" className="text-xl   mx-2  ">Search   </Link>
        </div>

        <div className="flex  items-center  mt-4 nav-item   p-3 cursor-pointer  " >
            <IoIosAddCircle className="text-2xl" /> 
            <button onClick={()=>{setopen(true)}}  className="text-xl   mx-2  ">Create    </button>
        </div>


        <IoCloseCircle className="text-5xl text-center mx-auto mt-10 cursor-pointer  "  onClick={()=>{setshow(false )}} />

       



      </ul>
    </div>
  </div>

  </>
  )
}

export default Navbar