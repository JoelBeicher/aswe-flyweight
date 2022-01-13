import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isProd = mode === 'production';
  const viteEnv = {};
  if (isProd) {
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith(`VITE_`)) {
        viteEnv[`import.meta.env.${key}`] = process.env[key];  // <-
      }
    });
  }

  return defineConfig( {
    assetsInclude: [ '**/*.png' ],
    ...(isProd && { define: viteEnv }),
    base: '/aswe-flyweight/',
    plugins: [
      vue()
    ],
  });
}
