import { useThemeContext } from "../providers/ThemeProvider";

export default function ThemeSwitch() {
	const { darkMode, toggleTheme } = useThemeContext();
	//console.log(darkMode);
	
	return (
		
			<div className="form-switch theme-switch">
				<input
                onChange={toggleTheme}
					className="form-check-input switch"
					type="checkbox"
					role="switch"
					id="themeSwitch"
					checked={darkMode}
				/>
			</div>
			
		
	);
}