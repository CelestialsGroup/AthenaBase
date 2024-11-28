import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	server: { host: "0.0.0.0", port: 5173 },
	build: {
		assetsDir: "static/assets"
	},
	plugins: [react()],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src"),
			"@shadcn": path.resolve(__dirname, "./shadcn"),
		},
	},
});
