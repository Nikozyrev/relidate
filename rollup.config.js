import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';

export default [
  {
    input: ['src/index.ts', 'src/validators/validators.ts'],
    output: [
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      PeerDepsExternalPlugin(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
