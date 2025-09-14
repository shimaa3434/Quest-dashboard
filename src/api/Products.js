import { useState, useEffect } from "react"
import axios from "axios"
import {Link, useLocation, useNavigate} from "react-router-dom"
import TitleHeader from "../components/TitleHeader"

const Products = () =>{
    const[loading, setLoading]= useState(false)
    const [error, setError]= useState("")
    const [products, setProducts]= useState([])
    const location = useLocation();
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate()

useEffect(()=>{
     axios.get('https://dummyjson.com/products')
    .then(res => setProducts(res.data.products))
}, [])
useEffect(() => {
    if (location.state?.message) {
      setAlert(location.state);
      const timer = setTimeout(() => setAlert(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  const handleDelete = (id) =>{
    const confirm= window.confirm("هل تريد حقًا الحذف؟")
    if(confirm){
        axios.delete(`https://dummyjson.com/products/${id}`)
        .then(res => {
            console.log(res.data)
            setProducts(products.filter((item) => item.id !== id));
            navigate("/products", { state: { message: "تم الحذف بنجاح ✅", type: "success" } })
        }).catch(err => {
        navigate("/products", { state: { message: "حدث خطأ أثناء الحذف ❌", type: "error" } });
  });
    }
  }


  if(loading){
    return (
        <div className="alert alert-success"role="alert">
            loading.....
        </div>
    )
}
if(error){
    return (
        <div className="alert alert-danger"role="alert">
        {error}
        </div>
    )
  }
    return (
        <>
        <TitleHeader title="PRODUCTS"/>
        <div className="d-flex justify-content-center flex-column  bg-body-tertiary">
        {alert ? (
        <div
          className={`alert ${alert.type === "success" ? "alert-success" : "alert-danger"}`}
          role="alert"
        >
          {alert.message}
        </div>
      ): ""}
        <div className="d-flex justify-content-end my-3">
            <Link to= "/createProduct">
                <button className="btn btn-dark">add product</button>
            </Link>
        </div>
        <div className="row gap-4 d-flex justify-content-around align-items-center">
             {products.map((item, i) => (
                
                <div className= "col-lg-3 p-0 " key={i}>
                        <div className="card" >
                            <img src={item.thumbnail} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <Link to= {`/product/${item.id}`} className="text-decoration-none">
                                <h5 className="card-title">{item.title}</h5>
                                </Link>
                                <p className="card-text">{item.description}</p>
                                <div className="card-footer d-flex justify-content-between">
                                    <Link to={`/edit/${item.id}`}>
                                    <button className="btn btn-primary">edit</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={(e)=> handleDelete(item.id)}>delete</button>
                                </div>
                            </div>
                        </div>
                </div>
            ))}   
        </div>
        </div>
        </>
    )
}

export default Products