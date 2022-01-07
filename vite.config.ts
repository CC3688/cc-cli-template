import path from 'path'
import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components'
import viteSvgIcons from 'vite-plugin-svg-icons'

function resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

export default ({ mode }) => {
  const env = loadEnv(process.env.mode || mode, process.cwd())
  // mode 可以拿到 环境变量, 但预览服务器时不能, 所以用 cross-env
  console.log('mode:', process.env.mode || mode)
  return defineConfig({
    base: env.VITE_APP_BASE_URL,
    server: {
      fs: {
        strict: false,
      },
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      vue(),
      ViteComponents({
        customComponentResolvers: [ElementPlusResolver({ importStyle: true })],
      }),
      viteSvgIcons({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve('src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/echarts')) {
              return 'echarts'
            } else if (id.includes('node_modules/axios')) {
              return 'axios'
            } else if (id.includes('node_modules/element-plus')) {
              return 'element-plus'
            } else if (id.includes('node_modules/vue')) {
              return 'vue-family'
            }
          },
        },
      },
    },
  })
}
