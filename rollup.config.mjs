import terser from '@rollup/plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';
import typescript from '@rollup/plugin-typescript';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].es.js',
      preserveModules: true
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].js',
      exports: 'auto',
      preserveModules: true
    }
  ],
  plugins: [
    typescript({
      exclude: ['**/*.test.ts']
    }),
    terser(),
    autoExternal(),
    filesize({
      showMinifiedSize: false,
      showGzippedSize: false
    })
  ]
};
