import { glob } from 'glob';
import { extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtinModules } from 'node:module';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: Object.fromEntries(
    glob
      .sync(['src/server.ts', 'src/api/**/*.ts', 'src/models/**/*.ts', 'src/utils/**/*.ts'], {
        ignore: ['**/*.d.ts', '**/*.test.ts'],
      })
      .map((file) => [
        file.slice(0, file.length - extname(file).length),
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
  ),
  output: {
    dir: 'dist', // Set to 'dist/src'
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external(id) {
    return (
      id.includes(sep + 'node_modules' + sep) || builtinModules.includes(id) || /^tslib/.test(id)
    );
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      outDir: 'dist',
      moduleResolution: 'bundler',
      outputToFilesystem: true,
      allowImportingTsExtensions: false,
    }),
    resolve({ preferBuiltins: true }),
    commonjs({
      ignoreDynamicRequires: true,
      ignore: builtinModules,
      include: /node_modules/,
      requireReturnsDefault: 'auto',
    }),
  ],
};
