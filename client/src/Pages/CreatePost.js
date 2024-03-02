import React, { useState , useContext , useEffect  } from 'react';
import {MyContext} from '../ContextApi/MyContext.js'
import { AlertDialog, Button } from 'react-onsenui'; 
import { toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';

const CreatePost = () => {
 const[showdila , setdialog] = useState(false )
 const [caption, setcaption] = useState("")
 const [selectedFile, setSelectedFile] = useState(null);
 const {MyInfo , user , IsAuthenticated , Mytoken ,showDialog, setshowDialog} = useContext(MyContext)

 const navigate = useNavigate()


  const style1 = {
    "width" : "500px",
    "height" : "450px",
    "TextAlign" : "center",
    "backgroundColor" : "black",
    "margin" : "auto"
  }
  const style3 = {
    "margin" : "15px 10px  ",
    "TextAlign" : "center",
    "color" : "black"
  }

  const handleClick = ()=>{
    console.log("his is ");

        setdialog(true)
  }
  const mystyle2  = {
    "margin" : "10px ",
    "width" : "500px ",
    "color" : "white",
    "backgroundColor" : "#2c2b2b",
    "padding" : "20px "
  }

  const handleChange = (e)=>{
    setcaption(e.target.value)
  }


  const handleFileChange = (event) => {
    // Access the uploaded file
    const file = event.target.files[0];
    setSelectedFile(file);

    // You can perform further actions here with the selected file
  };

  const handleSubmit = ()=>{
    if(caption !== "" && selectedFile!== null ){
        const token = Mytoken(); 
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('caption' , caption); 
 
        
          fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
            }).then((res)=>res.json()).then((data)=>{
              if(data.success){
                toast.success("Post Created Successfully")
                navigate('/')
              }else{
                toast.error("Some error Happens ")
              }
              setcaption("")
              setSelectedFile(null)
            })
    }
    else{
      
    }
  }

  return (
    <div style={{ 
      display: 'block', width: 500, paddingLeft: 30 
  }} className = "Home"> 



    <AlertDialog isOpen={true} style={style1}  > 
  
  <div className="input-group customerFileBtn  alert-dialog flex flex-col  " style={mystyle2} >
    <label className="input-group-text my-4 " htmlFor="inputGroupFile" >Choose Picture  </label>
    <input type="file" className="form-control" id="inputGroupFile" onChange={handleFileChange} />
    <label htmlFor="caption">Enter the caption </label>
    <textarea name="caption" id="caption" cols="25" rows="10" className="border border-2 p-4 " value={caption} style={style3}   onChange={handleChange} ></textarea>
    <div className="flex  justify-between " >
      <button className="px-4 py-2 bg-blue-700 text-white border border-2  rounded-md " onClick={handleSubmit}> Post  </button>
      <button className="px-4 py-2 bg-blue-700 text-white border border-2  rounded-md "  onClick={setshowDialog(false)} > Dismiss  </button>
    </div>
</div>
</AlertDialog> 

  
    

      
  </div> 
    )
}

export default CreatePost