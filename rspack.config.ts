import { resolve } from 'node:path';
import { defineConfig } from '@rspack/cli';
import { type RspackPluginFunction, rspack } from '@rspack/core';
import UnoCSS from '@unocss/postcss';
import AutoImport from 'unplugin-auto-import/rspack';
import Components from 'unplugin-vue-components/rspack';
import { VueLoaderPlugin } from 'vue-loader';

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

const _resolve = (...paths: string[]) => resolve(__dirname, ...paths);

export default defineConfig({
  context: __dirname,
  entry: {
    main: _resolve('./src/main.ts'),
  },
  resolve: {
    extensions: ['...', '.ts', '.vue'],
    alias: {
      '@': _resolve('./src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                },
              },
              env: { targets },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [UnoCSS()],
              },
            },
          },
        ],
        type: 'css',
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
    new VueLoaderPlugin() as RspackPluginFunction,
    AutoImport({
      dts: './.temp/auto-imports.d.ts',
      imports: ['vue', 'vue-router'],
    }),
    Components({
      dts: './.temp/components.d.ts',
      resolvers: [
        {
          type: 'component',
          resolve: (name: string) => {
            if (name.match(/^(C[A-Z]|c-[a-z])/)) {
              return {
                from: `@/components/${name.replace(/([A-Za-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
              };
            }
          },
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  watchOptions: {
    poll: true,
  },
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
