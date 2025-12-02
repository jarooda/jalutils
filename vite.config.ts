import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const entries = [
  resolve(__dirname, "src/index.ts"),
  resolve(__dirname, "src/function/index.ts"),
  resolve(__dirname, "src/array/index.ts"),
  resolve(__dirname, "src/date/index.ts"),
  resolve(__dirname, "src/type/index.ts"),
];

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    target: "esnext",
    lib: {
      // entry: resolve(__dirname, 'src/index.ts'),
      entry: entries,
      name: "jal-vite-lib-util",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        preserveModulesRoot: "src",
        preserveModules: true,
        exports: "named",
        entryFileNames: `[name].[format].js`,
        chunkFileNames: `[name].[format].js`,
      },
    },
    outDir: "dist",
  },
  plugins: [dts()],
});
