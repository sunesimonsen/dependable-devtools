import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

const plugins = [
  nodeResolve(),
  commonjs(),
  babel({
    babelHelpers: "bundled",
    plugins: [
      "stylewars",
      [
        "htm",
        {
          import: "@dependable/view",
          useBuiltIns: true,
          useNativeSpread: true,
        },
      ],
    ],
  }),
];

export default [
  {
    input: "plugin/index.js",
    output: {
      file: "dist/plugin.js",
      format: "iife",
    },
    plugins,
  },
  {
    input: "panel/index.js",
    output: {
      file: "dist/panel.js",
      format: "iife",
    },
    plugins,
  },
];
