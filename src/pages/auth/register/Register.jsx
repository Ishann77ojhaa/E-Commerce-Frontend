import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setStatus } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/components/misc/statuses";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {status} = useSelector((state)=>state.auth);

  useEffect(() => {
  if (status === STATUSES.SUCCESS) {
    navigate("/login");
    dispatch(setStatus(STATUSES.IDLE));
  }
  if (status === STATUSES.ERROR) {
    alert("Registration failed");
    dispatch(setStatus(STATUSES.IDLE));
  }
}, [status, navigate, dispatch]);


  const [userData, setUserData] = useState({
    user_name : "",
    user_phone : "",
    user_email : "",
    user_password : ""
  })

  const handleChange =(e) =>{
    const {name, value} = e.target;

    setUserData({
      ...userData,
      [name] : value,
    });
  };

  const handleSubmit = (e) =>{
          e.preventDefault();
          dispatch(registerUser(userData))
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <form 
      onSubmit = {handleSubmit}
      className="p-8 bg-white rounded-lg shadow-lg w-96">

      <h2 className="mb-6 text-2xl font-bold text-center">
        Create Account
        </h2>

      <input 
      type="text" 
      placeholder="Full Name" 
      name = "user_name" 
      onChange={handleChange} 
      className="w-full p-3 mb-4 border rounded" />


      <input 
      type="email" 
      placeholder="Email"  
      name = "user_email" 
      onChange={handleChange}
      className="w-full p-3 mb-4 border rounded" />


      <input 
      type="number" 
      placeholder="Phone num" 
      name = "user_phone" 
      onChange={handleChange}
      className="w-full p-3 mb-4 border rounded" />


      <input 
      type="password" 
      placeholder="Password" 
      name = "user_password" 
      onChange={handleChange} 
      className="w-full p-3 mb-6 border rounded" />


      <button
      type="submit" 
      className="w-full py-3 text-white bg-blue-600 rounded">
      Create Account
      </button>
    </form>
  </div>
);
};

export default Register