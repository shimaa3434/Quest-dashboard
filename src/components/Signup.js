import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"

const Signup = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        bio: "bio",
        gender: "male",
        image: "",
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
     const validateForm = () => {
    const newErrors = {}
    if (!values.username.trim()) {
      newErrors.username = "username is required"
    }
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
        if (!validateForm()) {
            return // إيقاف الإرسال لو فيه أخطاء
        }else{
            localStorage.setItem("user", JSON.stringify(values))
            alert("signup sussessfully")
            navigate('/')
        }
        
    }
  return (
    <div className= "container">
        <div className='row justify-content-center align-items-center bg-body-tertiary p-3 mx-auto'>
               <h3 className="text-center my-3 fw-bold fs-3">SignUp</h3>
               <form onSubmit= {handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                   <div className="mb-3">
                       <label  className="form-label">username</label>
                       <input type= "text" className={`form-control ${errors.username ? "is-invalid" : ""}`} name="username" 
                       onChange={(e)=> setValues({...values, username: e.target.value})}/>
                       {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                   </div>
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
                    <p className="test-success">I have account <Link to="/"> login </Link></p>
                   <button className="btn btn-success">save</button>
                  
               </form>
           </div>
    </div>
    
  )
}

export default Signup
