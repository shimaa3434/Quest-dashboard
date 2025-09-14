import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from 'react'
const Edit = () => {
    const [values, setValues]= useState({
            title : "", 
            description: " ",
            thumbnail : " "
        })
    const {id}= useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`https://dummyjson.com/products/${id}`)
        .then(res => setValues(res.data))
        .catch(err => console.error("API Error:", err))
    }, [id])

const handleSubmit= (e)=>{
  e.preventDefault()
  axios.put(`https://dummyjson.com/products/${id}`, {
    title: values.title,
    description: values.description, 
    thumbnail : values.thumbnail

  }, {headers: {'Content-Type': 'application/json'}}
  )
  .then(res => {
    console.log(res.data)
    setValues(res.data)
    navigate("/products", { state: { message: "تم التعديل بنجاح ✅", type: "success" } })
  }).catch(err => {
    navigate("/products", { state: { message: "حدث خطأ أثناء التعديل ❌", type: "error" } });
  });
}
  return (
    <div className='d-flex w-100 justify-content-center align-items-center bg-body-tertiary py-5'>
        <div className="w-75 border bg-white shadow px-5 pt-3 pb-5 rounded">
            <h3>edit : {values.title}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label">product title</label>
                    <input type= "text" className="form-control" name="title" required
                    value={values.title} onChange={e => setValues({...values, title: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">description</label>
                    <textarea className="form-control"  rows="3"  name="description" required
                    value={values.description} onChange={e => setValues({...values, description: e.target.value})}></textarea>
                </div>
                <div className="mb-3">
                    <label  className="form-label">image</label>
                    <input className="form-control" type="file" name="thumbnail" required 
                    onChange={e => setValues({...values, thumbnail: URL.createObjectURL(e.target.files[0])})}
                    />
                    {values.thumbnail ? (<img src={values.thumbnail} className ="img-thumbnail rounded mt-3 w-50 h-50"/>) : ""}
                </div>
                <button className="btn btn-success">update</button>
                <Link to="/products">
                  <button className="btn btn-dark mx-3">back</button>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default Edit