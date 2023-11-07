import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Footer from '../components/Footer';
export default function LoginPage(props) {
    return (
        <div className="login-container">
            <LoginForm />
            <Footer/>
        </div>
    )
}

function InvalidFeedback({children}) {
    
    return (
<div className="invalid-feedback">{children}</div>
    )
}

function LoginForm() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['authenticated']);


    useEffect(() => {
        if (cookies.rememberMe) {
          navigate('/dashboard');
        }
    }, [cookies.rememberMe, navigate]);

    const [form, setForm] = useState({ 
        email: '', 
        password: '',
        rememberMe: false,
        invalidPasswordText: "Password must be at least 6 characters long"
      }); 
      const emailInput = React.useRef(null);
      const passwordInput = React.useRef(null);



      function isLoginInfoValid(){
        return isEmailCorrect() && isPasswordCorrect();
      }
      function isEmailCorrect(){
        return form.email === 'user@gmail.com'
      }
      function isPasswordCorrect(){
        return form.password === '12345678'
      }
      function isPasswordLongEnough(){
        return form.password.trim().length>6
      }
      function handleSubmit(e) {
        e.preventDefault();
        if ( isLoginInfoValid()) {
            //setForm({...form, invalidPasswordText: "Password must be at least 6 characters long"});
            emailInput.current.classList.remove("is-invalid");
            passwordInput.current.classList.remove("is-invalid");
            navigate('/dashboard');
            setCookie('authenticated', true, { path: '/' });
            if (form.rememberMe) {
                setCookie('rememberMe', true, { path: '/' });
            }
        } else {
            if (!isPasswordCorrect()) {
                setForm({...form, invalidPasswordText: "Wrong password"});
                passwordInput.current.classList.add("is-invalid");
            }
            if (!isEmailCorrect()) {
                emailInput.current.classList.add("is-invalid");
            }
        }
    }
    return (
        <form id="login-form" className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-title">Login</h1>
            <div className="row">
                <div className="col-12">
                    <label htmlFor="email-input" className="form-label">Email</label>
                    <input type="email" id="email-input" className="form-control login-input" placeholder="Enter your login" required ref={emailInput} onChange={e=>{
                    setForm({...form, email: e.target.value}) 
                        e.target.classList.remove("is-invalid")}}/>
                    <InvalidFeedback>This email is not recognized </InvalidFeedback>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <label htmlFor="password-input" className="form-label">Password</label>
                    <input type="password" id="password-input" className="form-control login-input" placeholder="Enter your password" required ref={passwordInput} onChange={e=>{
                        setForm({ 
                            ...form, 
                            password: e.target.value,
                            invalidPasswordText: "Password must be at least 6 characters long"
                          });
                          if (!isPasswordLongEnough()){
                            
                            e.target.classList.add("is-invalid")
                          } else {
                            e.target.classList.remove("is-invalid")
                        }
                        }
                    }/>
                    
                    <InvalidFeedback>{form.invalidPasswordText}</InvalidFeedback> 
                    
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-check remember-me">
                    <input type="checkbox" id="remember-me" className="form-check-input" onChange={(e)=>{
                        setForm({...form, rememberMe: e.target.value})
                    }}/>
                    <label className="form-check-label" htmlFor="remember-me">
                        Remember me
                    </label>
                    </div>
                    
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button type="submit" className="btn btn-primary button login-btn">
                    Login
                    </button>
                </div>
            </div>
        </form>
    )
}


