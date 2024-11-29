import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light"

type ThemeMode = Theme | "system"

type ThemeProviderProps = {
	children: React.ReactNode
	defaultThemeMode?: ThemeMode
	storageKey?: string
}

type ThemeProviderState = {
	themeMode: ThemeMode
	theme: Theme
	setThemeMode: (theme: ThemeMode) => void
}

const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const initialState: ThemeProviderState = {
	themeMode: "system",
	theme: getSystemTheme(),
	setThemeMode: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = ({
	children,
	defaultThemeMode = "system",
	storageKey = "athena-base-theme",
	...props
}: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(
		() => {
			const themeMode = (localStorage.getItem(storageKey) as ThemeMode) || defaultThemeMode;
			if (themeMode === "system") return getSystemTheme();
			return themeMode as Theme;
		}
	);
	const [themeMode, setThemeMode] = useState<ThemeMode>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultThemeMode
	);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		if (themeMode === "system") {
			const systemTheme = getSystemTheme();
			setTheme(systemTheme);
			root.classList.add(systemTheme);
			return;
		}
		setTheme(themeMode);
		root.classList.add(themeMode);
	}, [themeMode]);

	const value = {
		themeMode,
		theme,
		setThemeMode: (themeMode: ThemeMode) => {
			localStorage.setItem(storageKey, themeMode);
			setThemeMode(themeMode);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
