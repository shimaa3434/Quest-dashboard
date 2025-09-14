import './App.css';
import { BrowserRouter, Routes, Route , Outlet} from 'react-router-dom';

import Header from './components/Header'
import Navigation from './components/Navigation'
import Posts from './components/Posts'
import AddPost from "./components/AddPost"
import Users from './components/Users'
import Login from './components/Login'
import Signup from './components/Signup'
import Products from './api/Products'
import Product from './api/Product'
import CreateProduct from './api/CreateProduct'
import Edit from './api/Edit'



const AuthLayout = () => {
  return (
    <div className="auth-layout d-flex justify-content-center align-items-center bg-light" style={{height:"100vh"}}>
      <div className="card shadow p-4" style={{width: "400px"}}>
        <Outlet /> {/* هنا يتم عرض login أو register */}
      </div>
    </div>
  );
};
const DashboardLayout = () => {
  return (
    <>
   <Header />
      <div className= "container-fluid">
      <div className= "row">
        <div className= "z-1 sidebar border border-right col-2 col-md-1 p-0 bg-body-tertiary shadow vh-100 position-fixed d-flex align-items-center justify-content-center">
          <div className= "bg-body-tertiary h-100" tabIndex= "-1" id= "sidebarMenu" aria-labelledby= "sidebarMenulabel">
            <div className= "d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto h-100">
                <Navigation />
            </div>
          </div>
        </div>
        <main className= "ms-auto col-10 col-xs-9 col-md-11 px-md-4">
          
            <div className= "row d-flex justify-content-around my-5">
              <Outlet />
            </div>
        </main>
      </div>
    </div>
    </>
  );
};


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
        </Route>

        
        <Route element={<DashboardLayout />}>
          <Route path="/products" element={<Products />} />
          <Route path ="/createProduct" element={<CreateProduct />}></Route>
          <Route path ="/product/:id" element={<Product  />}></Route>
          <Route path ="/edit/:id" element={<Edit />}></Route>
          <Route path="/posts" element={<Posts />}/>
          <Route path="/addPost" element={<AddPost />}/>
          <Route path="/user" element={<Users />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
