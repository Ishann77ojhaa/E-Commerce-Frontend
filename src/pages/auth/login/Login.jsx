import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/components/misc/statuses";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data, token, status} = useSelector((state)=>state.auth)
  const [userData, setUserData] = useState({
    user_email : "",
    user_password : ""
  })

  const handleChange = (e) =>{
    const {name, value} = e.target
    setUserData({
      ...userData,
      [name] : value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(loginUser(userData))
    navigate("/")
    if(status === STATUSES.ERROR){
      alert("Something went wrong, Try again")
    }
  }

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> 

      <form className="p-8 bg-white rounded-lg shadow-lg w-96" 
      onSubmit={handleSubmit}>

      <h2 className="mb-6 text-2xl font-bold text-center">
      Login
      </h2>

      <input 
      type="email"
      placeholder="Email"
      name = "user_email" 
      onChange = {handleChange} 
      className="w-full p-3 mb-4 border rounded" />


      <input type="password" 
      name = "user_password" 
      placeholder="Password" 
      onChange = {handleChange} 
      className="w-full p-3 mb-6 border rounded" />


      <button className="w-full py-3 text-white bg-blue-600 rounded">
      Login 
      </button>
    </form>
  </div>
  )};
export default Login