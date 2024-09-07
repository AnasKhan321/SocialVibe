import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        email : email , 
        phone  : phone , 
        courseid : parseInt( course)
    }

    const response =  await fetch("https://accredian-backend-task-g2l4.onrender.com/postdata"  , 
        {method : "POST"  ,   headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
    
      })

    
      
      const receivedData = await  response.json()


    if(receivedData.success){
     
        onClose()
        toast.success("Register Successfully")
    }else{
        onClose()
        console.log(receivedData)
    }

    setPhone("")
    setEmail("")
    setCourse("")
   
     
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[40%] space-y-3 ">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Enter Details</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email ID</label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Course id</label>
              <input
                type="Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

export default Modal;
