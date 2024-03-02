import React , {useState , useContext} from 'react'
import {MyContext} from '../ContextApi/MyContext.js'
import SearchGif from '../Images/loading.gif'
import { useNavigate , Link } from 'react-router-dom';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {MyInfo , user , Mytoken} = useContext(MyContext); 
    const [showloading, setshowloading] = useState(false)

    const [searchUser, setsearchUser] = useState([])
    const [message, setmessage] = useState("")

    const handleSearch = async() => {
            setshowloading(true)
            const token = Mytoken()


            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/UserDetail/search/${searchQuery}` , {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              })

            const data = await response.json()
            console.log(data);
            if(data.success){
                if(data.User.length == 0){
                    setTimeout(() => {
                        setshowloading(false)
                        setsearchUser(data.User)

                        setmessage("Nothing to Show ! ")
                      }, 1000);
                }else{
                    setTimeout(() => {
                        setmessage("")
                        setsearchUser(data.User)
                        setshowloading(false)
                      }, 1000);
                }
                
            }
          
      };
    
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };
    
      const handleChange = (event) => {
        setSearchQuery(event.target.value);
      };

  return (
    <div className="Home">

            <div  className="mt-10 " >
                <input type="text" name="query" id="query" className="bg-black border py-2 px-4 w-11/12  bg-zinc-900 " placeholder="Search ... "   value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyPress} />
            </div>
        

{showloading ? (
                 <img src={SearchGif} alt="" className="mt-5  m-auto " width="50px " />

      ) : (
        searchUser.map((item) => (
          <div className="user flex justify-center items-center my-8" key={item._id}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/ProfileImg/${item.profileImg}`}
              alt=""
              className="rounded-full mx-4"
              width="80px"
            />
            <div className="userdetails flex flex-col mx-4">
              <div className="text-sm font-bold">{item.username}</div>
              <div className="text-sm text-gray-400">Suggested for you</div>
            </div>
            <Link className="follow mx-4 text-blue-500 font-sm" to={`/Profile/${item._id}`}>
              Profile
            </Link>
          </div>
        ))
      )}

    

            {!showloading && 
                    <div  className="text-center mt-5  "  >  {message} </div>


            }




    </div>
  )
}

export default Search