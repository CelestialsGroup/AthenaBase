import { EnterFullScreenIcon, ExitFullScreenIcon } from "@radix-ui/react-icons";
import { Button } from "@shadcn/component/ui/button";
import React from "react";

declare global {
	interface Document {
		webkitFullscreenElement: Element | null;
		mozFullScreenElement: Element | null;
		msFullscreenElement: Element | null;
		webkitRequestFullscreen: () => Promise<void>;
		mozRequestFullScreen: () => Promise<void>;
		msRequestFullscreen: () => Promise<void>;
		webkitExitFullscreen: () => Promise<void>;
		mozCancelFullScreen: () => Promise<void>;
		msExitFullscreen: () => Promise<void>;
	}

	interface HTMLElement {
		webkitRequestFullscreen: () => Promise<void>;
		mozRequestFullScreen: () => Promise<void>;
		msRequestFullscreen: () => Promise<void>;
		webkitExitFullscreen: () => Promise<void>;
		mozCancelFullScreen: () => Promise<void>;
		msExitFullscreen: () => Promise<void>;
	}
}

const FullScreen: React.FC = () => {
	const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);

	const handleFullScreenChange = () => {
		setIsFullScreen(
			document.fullscreenElement ||
				document.webkitFullscreenElement ||
				document.mozFullScreenElement ||
				document.msFullscreenElement
				? true
				: false
		);
	};

	React.useEffect(() => {
		// Add event listeners to handle fullscreen change
		document.addEventListener("fullscreenchange", handleFullScreenChange);
		document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
		document.addEventListener("mozfullscreenchange", handleFullScreenChange);
		document.addEventListener("msfullscreenchange", handleFullScreenChange);

		// Cleanup event listeners when component unmounts
		return () => {
			document.removeEventListener("fullscreenchange", handleFullScreenChange);
			document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
			document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
			document.removeEventListener("msfullscreenchange", handleFullScreenChange);
		};
	}, []);

	const toggleFullScreen = () => {
		if (
			!document.fullscreenElement &&
			!document.webkitFullscreenElement &&
			!document.mozFullScreenElement &&
			!document.msFullscreenElement
		) {
			// Enter full-screen mode
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
		} else {
			// Exit full-screen mode
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	};

	return <div>
		<Button variant="ghost" size="icon" onClick={toggleFullScreen}>
			{isFullScreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
		</Button>
	</div>;
};

export default FullScreen;