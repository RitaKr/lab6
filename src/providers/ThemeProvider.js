import React from "react";
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = React.useState(false);

	function toggleTheme() {
		console.log("state changed");
		setDarkMode(!darkMode);
		if (darkMode) {
			document
				.getElementById("root")
				.classList.replace("dark", "light");
		} else {
			document
				.getElementById("root")
				.classList.replace("light", "dark");
		}
	}
	
	
	console.log(ThemeContext);
	return (
		<ThemeContext.Provider value={{ darkMode, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	);
};
export const useThemeContext = () => React.useContext(ThemeContext);

export default ThemeProvider;