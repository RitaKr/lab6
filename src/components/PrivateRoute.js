import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const [cookies] = useCookies(['authenticated']);
  const navigate = useNavigate();
  
  //useEffect(()=>{
    console.log(cookies.authenticated)
    if (!cookies.authenticated) {
      navigate('/');
       // Redirect to the login page
      return null; // Return null to prevent rendering the component
    }
    
    //},[]);
  

  return <Element />; // Render the component if authenticated
};

export default PrivateRoute;
