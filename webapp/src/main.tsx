import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/tailwind.css";
import Root from "~/root";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Root />
	</StrictMode>,
);
