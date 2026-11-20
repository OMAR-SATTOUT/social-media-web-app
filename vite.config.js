import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // الصفحة الرئيسية
        main: resolve(__dirname, 'index.html'),
        // صفحة البروفايل
        profile: resolve(__dirname, 'profile.html'),
        // صفحة تفاصيل البوست
        postDetails: resolve(__dirname, 'postDetails.html'),
      }
    }
  }
});