// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::", // allow IPv6 + localhost
//     port: 8080, // development server port
//   },
//   plugins: [
//     react(), // React plugin
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"), // path alias for src
//     },
//   },
//   css: {
//     // optional: configure CSS modules if you use them
//     modules: {
//       scopeBehaviour: "local",
//     },
//   },
//   build: {
//     sourcemap: mode === "development", // enable sourcemaps in dev
//     outDir: "dist",
//   },
// }));
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

