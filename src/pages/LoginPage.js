import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Footer from '../components/Footer';
export default function LoginPage() {
    return (
        <div className="login-container">
            <LoginForm />
            <Footer />
        </div>
    )
}

//component for invalid input feedback
function InvalidFeedback({ children }) {
    return (
        <div className="invalid-feedback">{children}</div>
    )
}

//from component 
function LoginForm() {
    const navigate = useNavigate(); //for navigating to dashboard
    const [cookies, setCookie] = useCookies(['authenticated']); //session cookies
    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberMe: false,
        invalidPasswordText: "Password must be at least 6 characters long"
    }); //form data


    useEffect(() => {
        //filling the form if user previously clicked remember me (i'm not storing password in cookies for safety purposes)
        if (cookies.rememberMe) {
            setForm(f => { return { ...f, email: cookies.uid, rememberMe: true } })
        }
        //navigating to dashboard if user is already authenticated
        if (cookies.authenticated) {
            navigate('/dashboard');
        }
    }, [cookies, navigate]);


    //validation
    function isLoginInfoValid() {
        return isEmailCorrect() && isPasswordCorrect();
    }

    function isEmailCorrect() {
        return form.email === 'user@gmail.com'
    }
    function isPasswordCorrect() {
        return form.password === 'abc12345678'
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isLoginInfoValid()) {
            //setForm({...form, invalidPasswordText: "Password must be at least 6 characters long"});
            emailInput.current.classList.remove("is-invalid");
            passwordInput.current.classList.remove("is-invalid");

            navigate('/dashboard');
            setCookie('authenticated', true, { path: '/' });
            //setting additional cookies if user checked remember me 
            if (form.rememberMe) {
                setCookie('uid', form.email, { path: '/' }); //user id
                setCookie('rememberMe', true, { path: '/' });
            } else {
                setCookie('rememberMe', false, { path: '/' });
            }
        } else {
            //showing invalid feedback if inputs data is invalid (unrecognized email and wrong password)
            if (!isPasswordCorrect()) {
                setForm({ ...form, invalidPasswordText: "Wrong password" });
                passwordInput.current.classList.add("is-invalid");
            }
            if (!isEmailCorrect()) {
                emailInput.current.classList.add("is-invalid");
            }
        }
    }
    return (
        <form id="login-form" className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-title">Login to Weather</h1>
            <div className="row">
                <div className="col-12">
                    <label htmlFor="email-input" className="form-label">Email</label>
                    <input type="email" id="email-input" className="form-control login-input" placeholder="Enter your login" required ref={emailInput}

                        onChange={e => {
                            setForm({ ...form, email: e.target.value })
                            e.target.classList.remove("is-invalid");
                        }}
                        value={form.email} />
                    <InvalidFeedback>This email is not recognized </InvalidFeedback>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <label htmlFor="password-input" className="form-label">Password</label>
                    <input type="password" id="password-input" className="form-control login-input" placeholder="Enter your password" required
                        ref={passwordInput}
                        value={form.password}
                        onChange={e => {
                            //showing invalid feedback message if password is too short
                            if (e.target.value.trim().length < 6) {
                                e.target.classList.add("is-invalid")
                            } else {
                                e.target.classList.remove("is-invalid")
                            }
                            setForm({
                                ...form,
                                password: e.target.value,
                                invalidPasswordText: "Password must be at least 6 characters long"
                            });

                        }
                        } />

                    <InvalidFeedback>{form.invalidPasswordText}</InvalidFeedback>

                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-check remember-me">
                        <input type="checkbox" id="remember-me" className="form-check-input"
                            onChange={(e) => {
                                setForm({ ...form, rememberMe: e.target.checked })
                            }}
                            checked={form.rememberMe}
                        />
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


