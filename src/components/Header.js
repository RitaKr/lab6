import logo from "../assets/images/logo.png"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Header(){
    const [cookies, setCookie] = useCookies(['authenticated']);
    const navigate = useNavigate();
    return (
        <header className="header">
            <section className="logo-section">
            <img src={logo} alt="logo" className="logo-img"/>
            <h1 className="header-title">Weather</h1>
            </section>
            <button className="btn btn-primary button" onClick={(e)=>{
                //useEffect(()=>{
                    setCookie('authenticated', false, { path: '/' });
                    setCookie('rememberMe', false, { path: '/' });
                    navigate('/');
                //}, cookies.rememberMe)
                
            }}>Log out</button>
        </header>
    )
}