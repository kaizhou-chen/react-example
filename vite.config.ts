import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from "path"; 
import fs from 'fs';
import dayjs from 'dayjs'

const timestamp = dayjs(new Date()).format('YYYY-MM-DD_HH.mm.ss')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let env = loadEnv(mode, process.cwd())
  console.log('env - ' + mode, env)

  return {
    plugins: [
      react(),

      // 自定义插件
      githubPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    },

    // 项目的 base
    base: env.VITE_BASE_PATH, 
    
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },

    // 打包
    build: {
      rollupOptions: {
        // 打包时，将多个入口，分开打包
        input: {
          main: resolve(__dirname, 'index.html'),
          login: resolve(__dirname, 'login.html')
        },
        
        output: {
          // 文件名添加时间戳，避免缓存
          entryFileNames: `assets/[name].[hash].${timestamp}.js`,
          chunkFileNames: `assets/[name].[hash].${timestamp}.js`,
          assetFileNames: `assets/[name].[hash].${timestamp}.[ext]`,

          // 处理文件名里的特殊符号
          sanitizeFileName,
        },
      }
    },

    server: {
      port: 8092, // 端口号

      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8090',  // 后台接口域名端口
          changeOrigin: true,               // 是否跨域
        },
      }
    }
  }
})


/**
 * 部署到 github 时，覆盖 .gitignore，删除掉里面的 dist 目录。
 * 因为 dist 目录要提交到 gh-pages 分支，以便部署到 Github Pages
 */
function githubPlugin() {
  const gitignore = '# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\n.DS_Store\n*.local\n\n# Editor directories and files\n.idea\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?'

  return {
    name: 'github-plugin',
    writeBundle() {
      // 
      if (process.argv.includes('--deploy')) {
        const file = path.resolve(__dirname, '.gitignore');
        fs.writeFileSync(file, gitignore, 'utf8');
      }
    }
  }
}

const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// 解决问题：部署到github后，_plugin-vue_export-helper.js 访问不到
// https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
function sanitizeFileName(name: any) {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : "";
  // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
  // Otherwise, avoid them because they can refer to NTFS alternate data streams.
  return (
    driveLetter +
    name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
  );
}
