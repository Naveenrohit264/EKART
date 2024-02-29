import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
  Link,
  useNavigate
} from "react-router-dom";



import "./App.css";
import { useContext,useEffect } from "react";

import { AuthContext } from "./context/authContext";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import PasswordReset from "./components/PasswordReset";



function App() {
  const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <div className="light">
        <div>
          <Outlet />
        </div>
      </div>
    );
  };
  

  

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const RedirectIfLoggedIn = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (currentUser) {
        // Check if the user's email is "uploader@gmail.com"
        if (currentUser.email === "uploader@gmail.com") {
          // Redirect to the admin page if the user is logged in and trying to access login
          navigate('/home');
        } else {
          // Redirect to the home page for other users
          navigate('/home');
        }
      }
    }, [currentUser, navigate]);
  
    return children; // Render the children (login page) when the user is not logged in
  };
  
  



  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <RedirectIfLoggedIn>
          <Login />
        </RedirectIfLoggedIn>
      ),
    },
    {
      path: "/register",
      element: (
        <RedirectIfLoggedIn>
          <Register />
        </RedirectIfLoggedIn>
      ),
    },

    {
      path: "/forgotpassword",
      element: (
        <RedirectIfLoggedIn>
          <ForgotPassword />
        </RedirectIfLoggedIn>
      ),
    },
    
    {
      path: "/VerifyOtp",
      element: <VerifyOtp />, 
    },
    {
      path: "/PasswordReset",
      element: <PasswordReset />, 
    },


    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
       
      
       
      
       
       
        
      
       
      
       
        
        
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
