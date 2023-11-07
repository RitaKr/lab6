import { useThemeContext } from "../providers/ThemeProvider";

export default function ThemeSwitch() {
	const { darkMode, toggleTheme } = useThemeContext();
	//console.log(darkMode);
	
	return (
		
			<div className="form-switch justify-content-center theme-switch">
				<input
                onClick={toggleTheme}
					className="form-check-input switch"
					type="checkbox"
					role="switch"
					id="flexSwitchCheckDefault"
					checked={darkMode}
				/>
			{/* <label className="form-check-label switch-label" 
                htmlFor="flexSwitchCheckDefault">
					Dark mode
				</label> */}
			</div>
			
		
	);
}