import React, { useState , useContext , useEffect  } from 'react';
import {MyContext} from '../ContextApi/MyContext.js'
import { toast } from 'react-toastify';

const EditProfile = () => {
  const {MyInfo , user , IsAuthenticated , Mytoken} = useContext(MyContext)
  const [User, setUser] = useState({})
  const [selectedFile, setSelectedFile] = useState(null);
  const [change, setchange] = useState(false)
  const fetchUser = async()=>{
    if(IsAuthenticated){
        const data = await MyInfo(); 
        setUser(data)
    }else{
        console.log("Login First ")
    }
  }

  const handleChange = (event)=>{
    const { name, value } = event.target;
    setUser({
      ...User,
      [name]: value,
    });
  }

  const formSubmit = (e)=>{
    e.preventDefault()
    const token = Mytoken()
    fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/update`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(User) 
    })
      .then(response => {
     
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        return response.json();
      })
      .then(data => {
        if(data.success){
          toast.success('Profile Updated Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }else{
          toast.error(data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
      })
      .catch(error => {
        console.error('Post request error:', error);
      });
  }
  const handleFileChange = (event) => {
    // Access the uploaded file
    const file = event.target.files[0];
    setSelectedFile(file);

    // You can perform further actions here with the selected file
  };
  useEffect(() => {
    fetchUser()
  }, [])

  const handleClick = ()=>{
    if(change == false){
      setchange(true)
    }else{
      setchange(false)
    }
  }

  const ChangeProfile = ()=>{
    const formData = new FormData();
    formData.append('image', selectedFile);
    const token = Mytoken()
    console.log(formData);
    fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/updateProfileImg`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData 
    })
      .then(response => {
     
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        return response.json();
      })
      .then(data => {
        if(data.success){
          toast.success('Profile Image Updated  Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }else{
          toast.error(data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
      })
      .catch(error => {
        console.error('Post request error:', error);
      });

  }
  
  return (
    <div className="Home ">
            <div className="w-2/6 mt-10  EditProfile  " >
                <img src={  User.profileImg == null  ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQArAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EADQQAAICAQIDBAcIAwEAAAAAAAABAgMEESEFQVESMWFxMkJSgaGx4RMiIzNykcHRFGJzNP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A/WwAVAAAAAAAOd11dFfbtkox+L8gOh5nZCta2TjFdW9CkyuLW2axo+5Hq/S+hXyblLWTcn1e7LBpHnYie+RD3PU9RzMab0jfW307RmAIla5brVboGWpyLqHrTZKPk9v2LbD4tGxqGTFQlyku5kVZgfIAAAAAAAAAAAAAAAAAcsi6GPU7LHpFcur6GdysmzJt+0s26R6I78Vyv8jI7EX+HXqlpzfNkEoAAIAAAAALLhee6mqbpfh9yk/V+heGR9xfcIyftqHXN62V8+q6jVWAAIAAAAAAAAAAAEfPudGJZYu/TSPm9iQVfHZ6U1Q9qWr9y+oFKACoAAAAAAAAEnh1zozK5eq32ZLwZGAGuB4pl26a5+1FP4HsigAAAAAAAAAAFPx70qfJ/wAFwVXHoa1VT6SaApgfT4VAAAAAAAAAAFGmwP8Aw0f84/IkHPHj2KKo+zBI6GVAAAAAAAAAAAIvEqXdh2RivvL7y80SgBkQS+JYzxslpflz3j/REKgAAAAAAAAd8Kl35VcF3a6y8uZwLvguN2KnfPaU/R8gLMAEUAAAAAAAAAAAAAcMvGjlUuuWz9WXRmcupnRY4WR0l811NUccrGryodm1bruku9Foy4JmVw6+jWSX2kPaj/RDCAAAA9QhKcuzCLlLoty0w+Et6Synt7C5+bAj8NwXkzU7E1Sua9bwRfpaJJchGKjFRikktklyPpFAAAAAAAAAAAAAAHyUoxTcmklzfcV9/F6K9VVF2vw2QFieZSjHecox8W9Cgv4nlW66SUF0ht8SHKUpvWcnJ/7PUsStJPPxYt9q+DfSO/yIl+Xw2z06+0+qr0KUAWEp8Mb1Vd3uf1PULOFp/k2P9W5WgC/pz8GEdK9K107OnyJVeRRb+XdXJ+EkZYaCFa4GXqybqtPs7Zx95Oo4xbHa6uM1za2YiroEfGzaMjaE12/Zls/2JBAAAAAAAAAIObxKvHbhX+Jbz6Ih8R4m561YstI9zn1Xh4FWVHbIybsmWt0217PL9jiAAAAAAAAAAAAAAAPLYsMTiltWkbdbIeL3Xv5leANTRfXkQ7dMtV8V5nUy1F9lFinVPRrvXVGgwcyGXXqtpr0ovkRUkAACn4vm6641T/W18ifxDJ/xcZzXpvaPmZvVttt6t8y4PjAAQAAAAAAAAAAAAAAAAAAA6U2zpsjOtuMlucwBqMTIjk0qyOz7nHXuZ2M7wzJePkpSf4c9pfwaLciqTjs28muD9FQ1Xm39CsAKgAAAAAAAAAAAAAAAAAAAAAAAD71NLhWSnh0yk9W4LVn0BX//2Q==" :   `${process.env.REACT_APP_BACKEND_URL}ProfileImg/${User.profileImg}` } alt="" className="rounded-full mb-8 " width="250px" />

                <button className="mb-4 text-blue-600 " onClick={handleClick}>Change Profile Image </button>
                {change && 
                        <div className="mt-4 mb-8 ">
                        <label className="block text-sm font-medium text-yellow-500">
                            Change Profile Photo 
                        </label>
                        <input
                            type="file"
                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-md"
                            onChange={handleFileChange}
                        />
                        {selectedFile && (
                            <p className="mt-2 text-sm text-yellow-500">
                            Selected file: {selectedFile.name}
                            </p>
                        )}

                        <button className="px-4 py-1 bg-yellow-500 text-white my-4" onClick={ChangeProfile}>Change </button>
                      </div>
                
                }
                

                <form onSubmit={formSubmit} className="flex justify-center   h-full  flex-col ">
                        <label htmlFor="username">UserName : </label>
                        <input type="text" value={User.username} name ="username"  onChange={handleChange} className="text-yellow-500  my-2  focus:border-yellow-400 outline-none  p-4 bg-black mb-8 border rounded-lg  "  />
                        <label htmlFor="email">Email : </label>
                        <input type="text" value={User.email} name="email"   className="text-yellow-500  my-2 focus:border-yellow-400 outline-none   p-4 rounded-lg  bg-black mb-8  border   " />
                        <label htmlFor="Bio">Bio  : </label>
                        <input type="text" value={User.Bio?User.Bio : ""} name="Bio"  onChange={handleChange} className="text-yellow-500  focus:border-yellow-400 outline-none my-2  p-4 rounded-lg  bg-black mb-8 border    " />
                       
      
                        <label>Gender :</label>
                            <select className="text-yellow-500 my-2  p-4 rounded-lg  focus:border-yellow-400 outline-none bg-black  mb-8  border   " value={User.Gender?User.Gender: ""} onChange={handleChange} name="Gender">
                                <option   className="text-white "  value="Men">Men  </option>
                                <option  className="text-white "  value="Women">Women </option>
                                <option  className="text-white  "  value="No to say ">Prefer no to say </option>
                            </select>
                        <button type="submit" className=" bg-yellow-500 py-2 text-black  ">Update  </button>

                </form>
               </div> 
    </div>
  )
}

export default EditProfile