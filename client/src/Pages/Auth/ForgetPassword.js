import React  , {useState} from 'react'
import logo from '../../Images/logo.png'
import { useNavigate , Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPassword = () => {


  const [email, setemail] = useState("")
  const [otp , setotp] = useState("")
  const [inputOtp , setinputOtp] = useState("")
  const [otpGenerated, setOtpGenerated] = useState(false);
  const navigate = useNavigate()

    const  handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/verifyEmail/${email}`)
        const data = await response.json()

        if(data.success){
            toast.success('OTP  Sent Successfully  '); 
            setotp(data.otp.toString())
            setOtpGenerated(true)
        }else{
            toast.error(`${data.error} `); 

        }

    }


const handleChange = (e)=>{
    if(e.target.name == "email"){
        setemail(e.target.value)
      }
    else{
        setinputOtp(e.target.value)
    }
}

const handleSubmit2 = (e)=>{
    e.preventDefault()
    console.log(inputOtp);
    console.log(otp);
    if(otp == inputOtp.trim()){
        toast.error("OTP matched Successfully  ")

        navigate(`/ChangePassword/${email}`)
    }else{
        toast.error("otp not matching ")
    }
}

  return (
    <div className = "">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto  w-44" src={logo} alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-yellow-500 "> Forget Password </h2>
  </div>

   {/* input Section  */}

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


{otpGenerated?(  <form className="space-y-6"  onSubmit={handleSubmit2}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-yellow-600">Enter Otp  </label>
        <div className="mt-2">
          <input id="email" value={inputOtp} name="inputOtp" type="text"  required className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6" onChange={handleChange} />
          <small className="text-sm  text-zinc-400 my-2 " > without reloading the page  </small>
        </div>
      </div>


      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Verify </button>
      </div>
    </form>) : (<form className="space-y-6"  onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-yellow-600">Email address</label>
        <div className="mt-2">
          <input id="email" value={email} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6" onChange={handleChange} />
        </div>
      </div>


      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Generate OTP</button>
      </div>
    </form>)}

    



  

  </div>
</div>
    </div>
  )
}

export default ForgetPassword