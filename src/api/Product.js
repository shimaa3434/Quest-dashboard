import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
const Product = () => {
    const [product, setProduct]= useState({})
    const {id}= useParams()
    useEffect(()=>{
        axios.get(`https://dummyjson.com/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error("API Error:", err))
    }, [id])
  return (
     <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-body-tertiary'>
        <div className="card mb-3">
  <div className="row g-0">
    <div className="col-md-4">
      <img src={product.thumbnail} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text"><small className="text-muted">{product.category}</small></p>
        <p className="card-text">{product.price}</p>
        <div className='d-flex justify-content-between w-75 align-items-center'>
            <Link to={`/edit/${product.id}`}>
                 <button className="btn btn-primary">edit</button>
            </Link>
            <Link to={"/"}>
                <button className="btn btn-info">products List</button>
            </Link>
        </div>
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Product