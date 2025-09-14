import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function CreateProduct() {
    const [values, setValues]= useState({
        title : "", 
        description: "",
        thumbnail : ""
    })
    const navigate = useNavigate()
const handleSubmit =(e)=>{
    e.preventDefault()
    axios.post('https://dummyjson.com/products/add', values)
    .then(res => {
        console.log(res)
        navigate("/", { state: { message: "تم الاضافة بنجاح ✅" ,type: "success"} })
    }).catch(err => {
    navigate("/", { state: { message: "حدث خطأ أثناء الاضافة ❌", type: "error" } });
  });
}
  return (
    <div className='d-flex w-100 justify-content-center align-items-center bg-body-tertiary py-5'>
        <div className="w-75 border bg-white shadow px-5 pt-3 pb-5 rounded">
            <h3>add product</h3>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label">product title</label>
                    <input type= "text" className="form-control" name="title" required
                    onChange={e => setValues({...values, title: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">description</label>
                    <textarea className="form-control"  rows="3"  name="description" required
                    onChange={e => setValues({...values, description: e.target.value})}></textarea>
                </div>
                <div className="mb-3">
                    <label  className="form-label">image</label>
                    <input className="form-control" type="file" name="thumbnail" required 
                    onChange={e => setValues({...values, thumbnail: URL.createObjectURL(e.target.files[0])})}
                    />
                    {values.thumbnail ? <img src={values.thumbnail} className ="img-thumbnail rounded mt-3 w-50 h-50"/> : ""}
                    
                </div>
                <button className="btn btn-success">save</button>
            </form>
        </div>
    </div>
  )
}

export default CreateProduct
