import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import topLevelAwait from 'vite-plugin-top-level-await';
import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";
// https://vitejs.dev/config/
// https://tauri.app/v1/guides/getting-started/setup/vite#create-the-frontend

import path from "path";
export default defineConfig({
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@contexts": path.resolve(__dirname, "src/contexts"),
		},
	},
	plugins: [
		react(),
		// topLevelAwait({
		//   promiseExportName: '__TLA',
		//   promiseImportName: i => `__TLA_${i}`
		// }),
		visualizer(),
		// removeConsole({includes: ['log', 'assert', 'info', 'error']})
	],
	// prevent vite from obscuring rust errors
	clearScreen: false,
	// Tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
		// open in browser if not running with tauri
		open: process.env.TAURI_ENV_ARCH === undefined,
	},
	// to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
	// `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
	// env variables
	envPrefix: ["VITE_", "TAURI_ENV_"],

	build: {
		// Tauri supports es2021
		target: ["es2021", "chrome100", "safari13"],
		// don't minify for debug builds
		minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_ENV_DEBUG,
		outDir: "build",
	},
});
