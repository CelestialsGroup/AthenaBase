import { useTheme } from "@component/theme-provider";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "@shadcn/component/ui/button";

const ThemeToggle: React.FC = () => {
	const { theme, setThemeMode } = useTheme();
	return <div>
		{theme === "light" && <Button
			variant="ghost" size="icon"
			onClick={() => setThemeMode("dark")}
		>
			<MoonIcon />
		</Button>}
		{theme === "dark" && <Button
			variant="ghost" size="icon"
			onClick={() => setThemeMode("light")}
		>
			<SunIcon />
		</Button>}
	</div>;
};

export default ThemeToggle;
