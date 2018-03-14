import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'lib/index.js',
    output: {
      name: 'animated',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      globals: {
        react: 'React',
        'styled-components': 'styled',
        'prop-types': 'PropTypes'
      }
    },
    external: ['styled-components', 'react', 'prop-types'],
    plugins: [
      resolve(), // so Rollup can find external dependencies
      commonjs(), // so Rollup can convert external dependencies to an ES module
      filesize()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'lib/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named'
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named'
      }
    ],
    external: ['styled-components', 'react', 'prop-types'],
    plugins: [filesize()]
  }
];
