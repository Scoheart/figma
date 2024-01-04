import typescript from "@rollup/plugin-typescript";

/**
 * @type {import("rollup").RollupOptions}
 */

const config = {
  input: "src/code.ts",
  output: {
    dir: "dist",
  },
  plugins: [typescript()],
};
2
export default config;
