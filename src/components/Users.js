import { useEffect, useState } from "react"
import TitleHeader from "./TitleHeader"
import { useNavigate } from "react-router-dom"



const Users = ()=>{
    const [data, setData]= useState({
        email: "",
        username: "",
        bio: "",
        gender: "",
        image: "",
    })
    const [editBtn, setEditBtn] = useState(false);
    const navigate= useNavigate()

     useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setData({ ...storedUser, bio: storedUser.bio || "", gender: storedUser.gender || "", image: storedUser.image || "" });
    } else {
      navigate("/login");
    }
  }, [navigate]);

    const handleSave = (e) => {
        e.preventDefault()
        localStorage.setItem("user", JSON.stringify(data));
        setEditBtn(false);
  };

    return(
        <>
        <TitleHeader title="USER INFO"/>
        <div className="col-lg-10 bg-body-tertiary shadow d-flex flex-column p-3">
            {
                editBtn ? (
                    <form onSubmit={handleSave}>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="username" value={data.username} onChange={(e)=> setData({...data, username: e.target.value})} />
                        </div>
                    
                        <div className="mb-3">
                            <input type="text" className="form-control" name="gender" value={data.gender} onChange={(e)=> setData({...data, gender: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            
                            <textarea type="text" className="form-control" name="bio" placeholder="bio" value={data.bio} onChange={(e)=> setData({...data, bio: e.target.value})} ></textarea>
                        </div>
                        <div className="mb-3">
                            <input type="file" className="form-control" name="image"  onChange={(e)=> setData({...data, image: URL.createObjectURL(e.target.files[0])})}/>
                            {data.image ? ( <img src={data.image} className ="img-thumbnail rounded mt-3 w-50 h-50"/>) : ""}
                           
                        </div>
                    <button className="btn btn-outline-secondary">Save</button>
                    </form>
                ) : (
                    <div className="card mb-3 bg-body-tertiary shadow">
              <div className="row g-0 d-flex">
                <div className="col-md-4 align-self-center">
                  <img src={data.image || "https://th.bing.com/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH?w=208&h=200&c=7&r=0&o=7&pid=1.7&rm=3"} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{data.username || "no username"}</h5>
                    <p className="card-text">{data.email || "no email"}</p>
                    <p className="card-text"><small className="text-muted">{data.gender || "no gender"}</small></p>
                    <p className="card-text">{data.bio || "no bio"}</p>
                    <div className='d-flex justify-content-between w-75 align-items-center'>
                        <button className="btn btn-primary" onClick={() => setEditBtn(true)}>edit account</button>
                        <button className="btn btn-info" onClick={()=> {
                            localStorage.removeItem("user");
                            navigate("/signup");
                        }}>delete account</button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
                )
            }
            
        </div>
        </>
    )
}


export default Users