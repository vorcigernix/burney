import solid from "solid-start/vite";
import solidStatic from "solid-start-static";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [
    solid({
      adapter: solidStatic({}),
      prerenderRoutes: ['/', 'about', 'wallet']
    }),
  ],
  define: {
    global: "globalThis",
  },
});
