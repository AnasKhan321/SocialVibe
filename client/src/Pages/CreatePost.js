import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../ContextApi/MyContext.js";
import { AlertDialog, Button } from "react-onsenui";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import {useGSAP}  from "@gsap/react"
import { IoCloseCircle } from "react-icons/io5";
const CreatePost = ({ isOpen, onClose }) => {
  const [showdila, setdialog] = useState(false);
  const [caption, setcaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { MyInfo, user, IsAuthenticated, Mytoken, showDialog, setshowDialog } =
    useContext(MyContext);

  const navigate = useNavigate();


  const style1 = {
    width: "500px",
    height: "450px",
    TextAlign: "center",
    backgroundColor: "black",
    margin: "auto",
  };
  const style3 = {
    margin: "15px 10px  ",
    TextAlign: "center",
    color: "black",
  };

  const handleClick = () => {
    console.log("his is ");

    setdialog(true);
  };
  const mystyle2 = {
    margin: "10px ",
    width: "500px ",
    color: "white",
    backgroundColor: "#2c2b2b",
    padding: "20px ",
  };

  const handleChange = (e) => {
    setcaption(e.target.value);
  };

  const handleFileChange = (event) => {
    // Access the uploaded file
    const file = event.target.files[0];
    setSelectedFile(file);

    // You can perform further actions here with the selected file
  };


  useGSAP(()=>{
    

    if(isOpen){
      gsap.from(".modal"  , {
        y  : -500  , 
        duration : 1 , 
        ease: "back.out(1.7)",

      })
    }else{
      gsap.to(".modal"  , {
        opacity : 0 ,
        duration : 1 , 
        ease: "back.out(1.7)",
      })
    }
     
  },[isOpen])

  const handleSubmit = () => {
    if (caption !== "" && selectedFile !== null) {
      const token = Mytoken();
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("caption", caption);

      fetch(`${process.env.REACT_APP_BACKEND_URL}api/post/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Post Created Successfully");
            navigate("/");
          } else {
            toast.error("Some error Happens ");
          }
          setcaption("");
          setSelectedFile(null);
        });
    } else {
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black/[0.4]  backdrop-blur-xl   rounded-lg shadow-lg w-[40%] space-y-3 ">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Enter Details</h2>
          <button
            className="text-white hover:text-gray-600"
            onClick={onClose}
          >
               <IoCloseCircle className="text-2xl text-center mx-auto mt-10 cursor-pointer  "   />
          </button>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Caption</label>
              <textarea
                name="caption"
                id="caption"
                cols="70"
                rows="10"
                className="border border-2 p-4 "
                value={caption}
                style={style3}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="input-group-text my-4 "
                htmlFor="inputGroupFile"
              >
                Choose Picture{" "}
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
