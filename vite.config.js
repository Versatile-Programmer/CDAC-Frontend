import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})
// import { reactRouter } from "@react-router/dev/vite";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";
// import tailwindcss from "@tailwindcss/vite";
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     reactRouter(),
//     tsconfigPaths(),
//   ],
// });
