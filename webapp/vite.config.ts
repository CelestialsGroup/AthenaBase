import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0", port: 5173,
		proxy: {
			"/api": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
		},
	},
	build: {
		assetsDir: "static/assets",
		chunkSizeWarningLimit: 3500,
	},
	plugins: [react()],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src"),
			"@shadcn": path.resolve(__dirname, "./shadcn"),
			"@component": path.resolve(__dirname, "./component"),
			"@internal": path.resolve(__dirname, "./internal"),
		},
	},
});
