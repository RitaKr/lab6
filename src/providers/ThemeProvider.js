import {useEffect, useState, createContext, useContext} from 'react';
import {useCookies} from 'react-cookie';
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [cookies, setCookie] = useCookies();
	const [darkMode, setDarkMode] = useState((cookies.theme === "dark")); //initiating darkMode accordingly to cookies value

	//updating cookies and styles according to darkMode value
	useEffect(()=>{
		setCookie("theme", (darkMode ? "dark" : "light"), { path: '/' });
		if (darkMode) {
			document
				.getElementById("root").classList.replace("light", "dark");
				
		} else {
			document
				.getElementById("root")
				.classList.replace("dark", "light");
		}
		
	},[darkMode, setCookie]);

	
	//changing darkMode value na opposite
	function toggleTheme() {
		setDarkMode(!darkMode);
	
	}
	
	
	return (
		<ThemeContext.Provider value={{ darkMode, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	);
};
export const useThemeContext = () => useContext(ThemeContext);

export default ThemeProvider;