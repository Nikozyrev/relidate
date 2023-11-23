import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: 'src/test/index.tsx',
    output: [
      {
        file: 'public/build/index.js',
        format: 'iife',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      nodeResolve({
        extensions: ['.js', '.jsx'],
      }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
        extensions: ['.js', '.jsx'],
      }),
      replace({
        preventAssignment: false,
        'process.env.NODE_ENV': '"development"',
      }),
    ],
  },
];
