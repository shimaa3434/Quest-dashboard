import { useEffect, useState } from "react"
import { MdDelete , MdModeEdit} from "react-icons/md";
import TopCard from "./TopCard";
import TitleHeader from "./TitleHeader";
import {Link} from "react-router-dom"

// import {useNavigate} from "react-router-dom"


const Posts = ()=>{
const [posts, setPosts]= useState([])
const[loading, setLoading]= useState(false)
const [error, setError]= useState("")
const [filterText, setFilterText] = useState("");
const [filteredPosts, setFilteredPosts] = useState([]);

const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 15;


// const navigate = useNavigate()

const [showModal, setShowModal] = useState(false);
const [editPost, setEditPost] = useState({ title: "", body: "" });


useEffect(()=>{
    setLoading(true)
    try{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        setPosts(data)
        setFilteredPosts(data);
    })
    }catch(e){
        setError(e.message)
    }finally{
        setLoading(false)
    }
    
}, [])


useEffect(() => {
    const filtered = posts.filter((item) =>
        item.title.toLowerCase().includes(filterText.toLowerCase()) ||
        item.body.toLowerCase().includes(filterText.toLowerCase()) 
    );
    setFilteredPosts(filtered);
  }, [filterText, posts]);

const handleEdit = (post) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${post}`)
  .then((response) => response.json())
  .then((json) => {
    setEditPost(json)
    setShowModal(true)
  });
  
  };
const handleSave = (post)=>{
  fetch(`https://jsonplaceholder.typicode.com/posts/${post}`, {
          method: 'PUT',
          body: JSON.stringify(editPost),
          headers: {'Content-type': 'application/json; charset=UTF-8'},})
  .then((response) => response.json())
  .then((json) => {
      // تحديث البوست داخل state
      setPosts(posts.map((item) => (item.id === post ? json : item)));
      setFilteredPosts(filteredPosts.map((item) => (item.id === post ? json : item)));
      setShowModal(false);
    });
}

  const handleDelete = (row) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${row}`, {
      method: 'DELETE',
    })
    .then(() => {
      setPosts(posts.filter((item) => item.id !== row));
      setFilteredPosts(filteredPosts.filter((item) => item.id !== row));
    })
    
  };

  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPosts, indexOfLastPosts);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  // تغيير الصفحة
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

if(loading){
    return (
        <>
        loading.....
        </>
    )
}
if(error){
    return (
        <>
        {error}
        </>
    )
}
    return(
        <>
        <TitleHeader title="Posts"/>
         <div className="row gap-4 d-flex justify-content-around my-4">
                        <div className= "col-lg-3 p-0 ">
                          <TopCard title={1} text={"PieChart 1"} val_1={100} val_2= {500} val_3= {300} val_4= {80}
                          color1={"#F08787"} color2={"#FFC7A7"} color3={"#FEE2AD"} color4={"#F8FAB4"} />
                        </div>
                        <div className= "col-lg-3 p-0 ">
                           <TopCard title={2} text={"PieChart 2"} val_1={4} val_2= {50} val_3= {30} val_4= {800}
                           color1={"#154D71"} color2={"#1C6EA4"} color3={"#33A1E0"} color4={"#DDF4E7"}/>
        
                        </div>
                        <div className= "col-lg-3 p-0 ">
                            <TopCard title={3} text={"PieChart 3"} val_1={150} val_2= {770} val_3= {30} val_4= {881}
                            color1={"#3E0703"} color2={"#660B05"} color3={"#8C1007"} color4={"#FFF0C4"}/>
                        </div>
          </div>
        <div className="col-lg-10 bg-body-tertiary shadow d-flex flex-column">
          <div className="d-flex justify-content-between my-3">
                <div className="me-auto my-2">
                  <Link to="/addPost">
                    <button className="btn btn-primary">add post</button>
                  </Link>
                    
                </div>
                <div className="d-flex  my-3 ms-auto">
                <input className="form-control " type="search" placeholder="Search" aria-label="Search"
                value={filterText}
                onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(1);
                }}/>
                
            </div>
          </div>
        <div>
          <table className="table align-middle table-responsive">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">title</th>
      <th scope="col">body</th>
      <th scope="col">actions</th>
    </tr>
  </thead>
  <tbody>
    {
            currentPosts.map((item, i)=> (
                <tr key= {i}>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    <td>
                        <button
                        onClick={() => handleEdit(item.id)}
                        className="btn text-info m-1"
                    >
                        <MdModeEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="btn text-danger m-1"
                    >
                        <MdDelete />
                    </button>
          </td>
                </tr>
            ))
        }
    
  </tbody>
</table>
        </div>  
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm ">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
                    </li>
                        { Array.from({ length: totalPages }, (_, i) => (
                    <li
                    key={i + 1}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                    <button className="page-link" onClick={() => goToPage(i + 1)}>
                        {i + 1}
                    </button>
                    </li>
                ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>        
        </div>
{showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> edit post: {editPost.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editPost.title}
                    onChange={(e) =>
                      setEditPost({ ...editPost, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">content</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={editPost.body}
                    onChange={(e) =>
                      setEditPost({ ...editPost, body: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={()=> handleSave(editPost.id)}
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Posts