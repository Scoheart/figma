import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
/**
 * @type {import("rollup").RollupOptions}
 */

const rolupConfig = {
  input: 'src/code.ts',
  output: {
    dir: 'dist',
  },
  plugins: [
    typescript(),
    replace({
      __DEV__: true,
    }),
  ],
};

export default rolupConfig;
