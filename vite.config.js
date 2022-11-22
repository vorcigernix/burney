import solid from "solid-start/vite";
import { Buffer as BufferPolyfill } from "buffer/";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [
    solid({
      ssr: false,
    }),
  ],
  define: {
    global: "globalThis",
  },
});
