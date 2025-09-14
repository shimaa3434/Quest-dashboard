import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
    const [values, setValues] = useState({
            email: "",
            password: "",
        })
    const [message, setMessage] = useState("")
     const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const validateForm = () => {
    const newErrors = {}
    if (!values.email.trim()) {
      newErrors.email = "email is required"
    } 
    if (!values.password.trim()) {
      newErrors.password = "password is required"
    } 
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // يرجع true لو مفيش أخطاء
  }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const gatDate = JSON.parse(localStorage.getItem("user"));
        if (!validateForm()) {
            return 
        }else if (gatDate && gatDate.email === values.email && gatDate.password === values.password) {
            navigate("/user")
        } else {
            setMessage("error data")
        }
        
    }
  return (
     <div className= "container">
            <div className='row justify-content-center align-items-center bg-body-tertiary p-3 mx-auto'>
                   <h3 className="text-center my-3 fw-bold fs-3">LogIn</h3>
                   {message ? (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
               ): ""}
                   <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                       <div className="mb-3">
                           <label  className="form-label">Email</label>
                           <input type= "email" className={`form-control ${errors.email ? "is-invalid" : ""}`} name="email"
                           onChange={(e)=> setValues({...values, email: e.target.value})}/>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                       </div>
                       <div className="mb-3">
                           <label  className="form-label">password</label>
                           <input type= "password" className={`form-control ${errors.password ? "is-invalid" : ""}`} name="password" 
                           onChange={(e)=> setValues({...values, password: e.target.value})}/>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                       </div>
                        <p className="test-success">Idon't have account yet <Link to="/signup"> Signup </Link></p>
                        <div className="d-flex align-items-center jsutify-content-center my-3">
                            <button className="btn btn-success">login</button>
                        </div>
                       
                   </form>
               </div>
        </div>
  )
}

export default Login