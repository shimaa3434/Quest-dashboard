import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const AddPost = () => {
    const [values, setValues] = useState({
        title : "", 
        body: "",
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const validateForm = () => {
    const newErrors = {}
    if (!values.title.trim()) {
      newErrors.title = "title is required"
    }
    if (!values.body.trim()) {
      newErrors.body = "body is required"
    } else if (values.body.length > 1000) {
      newErrors.body = "المحتوى يجب ألا يزيد عن 1000 حرف"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 
  }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!validateForm()) {
             return 
            }
        fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {'Content-type': 'application/json; charset=UTF-8',}})
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    const newPosts = JSON.parse(localStorage.getItem("newPosts") || "[]");
    localStorage.setItem("newPosts", JSON.stringify([...newPosts, json]));
    navigate("/posts")
});
    }
  return (
    <div className='d-flex w-100 justify-content-center align-items-center bg-body-tertiary py-5'>
        <div className="w-75 border bg-white shadow px-5 pt-3 pb-5 rounded">
            <h3>add post</h3>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label"> title</label>
                    <input type= "text" className={`form-control ${errors.title ? "is-invalid" : ""}`} name="title" 
                    onChange={e => setValues({...values, title: e.target.value})}/>
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className="mb-3">
                    <label  className="form-label">body</label>
                    <textarea className={`form-control ${errors.body ? "is-invalid" : ""}`}  rows="3"  name="body" 
                    onChange={e => setValues({...values, body: e.target.value})}></textarea>
                    {errors.body && <div className="invalid-feedback">{errors.body}</div>}
                    <div className="text-muted">
                        {values.body.length}/1000
                    </div>
                </div>
                <button className="btn btn-success">save</button>
            </form>
        </div>
    </div>
  )
}

export default AddPost